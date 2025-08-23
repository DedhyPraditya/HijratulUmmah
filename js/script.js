// --------- QRIS statis popup logic & upload bukti transfer ---------
document.addEventListener('DOMContentLoaded', function() {
    const btnDonasiBebas = document.getElementById('btn-donasi-bebas');
    const inputDonasiBebas = document.getElementById('input-donasi-bebas');
    const qrisModal = document.getElementById('qris-modal');
    const qrisModalClose = document.getElementById('qris-modal-close');
    const qrisNominal = document.getElementById('qris-nominal');
    const buktiNominal = document.getElementById('bukti-nominal');
    const formBukti = document.getElementById('form-bukti-transfer');
    const buktiSuccess = document.getElementById('bukti-transfer-success');
    const showUploadForm = document.getElementById('show-upload-form');
    const btnKirimBukti = document.getElementById('btn-kirim-bukti');
    const buktiFile = document.getElementById('bukti-file');
    // Tambah elemen error
    let buktiError = document.getElementById('bukti-transfer-error');
    if (!buktiError && formBukti) {
        buktiError = document.createElement('div');
        buktiError.id = 'bukti-transfer-error';
        buktiError.className = 'text-red-600 font-semibold mt-2';
        formBukti.parentNode.insertBefore(buktiError, formBukti.nextSibling);
        buktiError.style.display = 'none';
    }

    if(btnDonasiBebas && inputDonasiBebas && qrisModal && qrisModalClose && qrisNominal) {
        btnDonasiBebas.addEventListener('click', function(e) {
            let nominal = parseInt(inputDonasiBebas.value);
            if (!isNaN(nominal) && nominal > 0) {
                e.preventDefault();
                qrisNominal.textContent = nominal.toLocaleString('id-ID', {style:'currency', currency:'IDR'});
                // Set value input nominal di form upload dengan angka murni (tanpa format)
                if (buktiNominal) buktiNominal.value = nominal;
                qrisModal.classList.remove('hidden');
            }
        });
        qrisModalClose.addEventListener('click', function() {
            qrisModal.classList.add('hidden');
        });
        qrisModal.addEventListener('click', function(e) {
            if (e.target === this) qrisModal.classList.add('hidden');
        });
    }
    if(showUploadForm && formBukti) {
        showUploadForm.addEventListener('click', function() {
            formBukti.classList.remove('hidden');
            showUploadForm.classList.add('hidden');
        });
    }
    if(buktiFile && btnKirimBukti) {
        buktiFile.addEventListener('change', function() {
            btnKirimBukti.disabled = !buktiFile.files.length;
        });
    }
    if(formBukti) {
        formBukti.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (buktiError) { buktiError.style.display = 'none'; buktiError.textContent = ''; }
            buktiSuccess.classList.add('hidden');
            const formData = new FormData(formBukti);
            // Pastikan nominal dikirim dalam format angka saja
            if (buktiNominal && buktiNominal.value) {
                formData.set('nominal', buktiNominal.value.replace(/[^\d]/g, ''));
            }
            try {
                const res = await fetch('http://localhost:3000/api/bukti-transfer', {
                    method: 'POST',
                    body: formData
                });
                if (res.ok) {
                    if (buktiError) { buktiError.style.display = 'none'; buktiError.textContent = ''; }
                    console.log('Swal akan dipanggil');
                    Swal.fire({
                        icon: 'success',
                        title: 'Bukti berhasil dikirim!',
                        text: 'Donasi Anda akan segera diverifikasi.',
                        confirmButtonColor: '#16a34a'
                    });
                    qrisModal.classList.add('hidden');
                    formBukti.reset();
                    formBukti.classList.add('hidden');
                    if(showUploadForm) showUploadForm.classList.remove('hidden');
                    if(btnKirimBukti) btnKirimBukti.disabled = true;
                } else {
                    let errorMsg = 'Gagal mengirim bukti transfer.';
                    try {
                        const data = await res.json();
                        errorMsg = data.error || errorMsg;
                    } catch (e) {
                        // fallback jika bukan json
                        errorMsg = await res.text() || errorMsg;
                    }
                    if (buktiError) {
                        buktiError.textContent = errorMsg;
                        buktiError.style.display = 'block';
                    }
                }
            } catch (err) {
                if (buktiError) {
                    buktiError.textContent = 'Terjadi kesalahan koneksi. Silakan cek jaringan/server.';
                    buktiError.style.display = 'block';
                }
            }
        });
    }
});

// Animasi hover dan popup gambar untuk section tentang
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tentang-img').forEach(function(img) {
        img.addEventListener('click', function() {
            var modal = document.getElementById('tentang-modal');
            var modalImg = document.getElementById('tentang-modal-img');
            modalImg.src = this.src;
            modal.classList.remove('hidden');
        });
    });
    var closeBtn = document.getElementById('tentang-modal-close');
    if(closeBtn) closeBtn.addEventListener('click', function() {
        document.getElementById('tentang-modal').classList.add('hidden');
    });
    var modal = document.getElementById('tentang-modal');
    if(modal) modal.addEventListener('click', function(e) {
        if (e.target === this) this.classList.add('hidden');
    });
});
// --------- Daftar Donasi Terbaru ---------
const DONASI_API = 'http://localhost:3000/api/donasi';

// Tampilkan daftar donasi terbaru (jika ada elemen #daftar-donasi-terbaru)
async function tampilkanDonasiTerbaru() {
    const el = document.getElementById('donatur-terbaru-list');
    if (!el) return;
    let semuaDonatur = [];
    let modeSemua = false;

    async function renderList(showAll = false) {
        try {
            const res = await fetch(DONASI_API);
            const data = await res.json();
            if (data.success) {
                semuaDonatur = data.data;
                if (semuaDonatur.length === 0) {
                    el.innerHTML = '<div class="text-center col-span-3 text-gray-400">Belum ada donasi</div>';
                    return;
                }
                const list = (showAll ? semuaDonatur : semuaDonatur.slice(0, 6)).map((d, i) => {
                    const colors = [
                        {bg: 'bg-green-50', text: 'bg-green-500', nominal: 'text-green-600'},
                        {bg: 'bg-blue-50', text: 'bg-blue-500', nominal: 'text-blue-600'},
                        {bg: 'bg-purple-50', text: 'bg-purple-500', nominal: 'text-purple-600'},
                        {bg: 'bg-orange-50', text: 'bg-orange-500', nominal: 'text-orange-600'},
                        {bg: 'bg-pink-50', text: 'bg-pink-500', nominal: 'text-pink-600'},
                        {bg: 'bg-indigo-50', text: 'bg-indigo-500', nominal: 'text-indigo-600'},
                    ];
                    const color = colors[i % colors.length];
                    let inisial = (d.nama||'').split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
                    if (!inisial) inisial = 'NN';
                    const waktu = waktuRelatif(d.waktu);
                    return `
                    <div class="flex items-center space-x-4 p-4 ${color.bg} rounded-lg">
                        <div class="w-12 h-12 ${color.text} rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">${inisial}</span>
                        </div>
                        <div>
                            <h5 class="font-semibold">${d.nama}</h5>
                            <p class="${color.nominal} font-bold">Rp ${Number(d.nominal).toLocaleString('id-ID')}</p>
                            <p class="text-xs text-gray-500">${waktu}</p>
                        </div>
                    </div>
                    `;
                }).join('');
                el.innerHTML = list;
                // Tambahkan tombol lihat semua/kecilkan
                const btnContainer = document.createElement('div');
                btnContainer.className = 'text-center mt-8';
                btnContainer.innerHTML = `<button id="btn-lihat-semua-donatur" class="text-green-600 hover:text-green-700 font-semibold">${showAll ? 'Kecilkan' : 'Lihat Semua Donatur →'}</button>`;
                el.parentNode.appendChild(btnContainer);
                document.getElementById('btn-lihat-semua-donatur').onclick = function() {
                    document.querySelectorAll('#btn-lihat-semua-donatur').forEach(btn=>btn.remove());
                    renderList(!showAll);
                };
            } else {
                el.innerHTML = '<div class="col-span-3 text-center text-red-500">Gagal memuat data</div>';
            }
        } catch (e) {
            el.innerHTML = '<div class="col-span-3 text-center text-red-500">Error koneksi</div>';
        }
    }
    renderList();
}

// Fungsi untuk menampilkan waktu relatif (misal: 2 jam yang lalu)
function waktuRelatif(waktu) {
    const now = new Date();
    const tgl = new Date(waktu);
    const selisih = Math.floor((now - tgl) / 1000); // detik
    if (selisih < 60) return selisih + ' detik yang lalu';
    if (selisih < 3600) return Math.floor(selisih/60) + ' menit yang lalu';
    if (selisih < 86400) return Math.floor(selisih/3600) + ' jam yang lalu';
    if (selisih < 2592000) return Math.floor(selisih/86400) + ' hari yang lalu';
    return tgl.toLocaleDateString('id-ID');
}

// Panggil otomatis jika ada tabel donasi terbaru
document.addEventListener('DOMContentLoaded', tampilkanDonasiTerbaru);
// --------- Donatur Tetap ---------
const DONATUR_API = 'http://localhost:3000/api/donatur-tetap';

// Tampilkan daftar donatur tetap (jika ada elemen #daftar-donatur-tetap)
async function tampilkanDonaturTetap() {
    const el = document.getElementById('daftar-donatur-tetap');
    if (!el) return;
    try {
        const res = await fetch(DONATUR_API);
        const data = await res.json();
        if (data.success) {
            el.innerHTML = data.data.map(d => `
                <tr>
                    <td>${d.nama}</td>
                    <td>${d.email}</td>
                    <td>${d.phone || '-'}</td>
                    <td>${d.aktif ? 'Aktif' : 'Nonaktif'}</td>
                    <td>
                        <button onclick="editDonaturTetap(${d.id})">Edit</button>
                        <button onclick="hapusDonaturTetap(${d.id})">Hapus</button>
                    </td>
                </tr>
            `).join('');
        } else {
            el.innerHTML = '<tr><td colspan="5">Gagal memuat data</td></tr>';
        }
    } catch (e) {
        el.innerHTML = '<tr><td colspan="5">Error koneksi</td></tr>';
    }
}

// Tambah donatur tetap
async function tambahDonaturTetap(nama, email, phone) {
    const res = await fetch(DONATUR_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, phone })
    });
    const data = await res.json();
    if (data.success) {
        alert('Donatur tetap berhasil ditambah!');
        tampilkanDonaturTetap();
    } else {
        alert(data.message || 'Gagal menambah donatur tetap');
    }
}

// Edit donatur tetap (popup prompt sederhana)
async function editDonaturTetap(id) {
    const res = await fetch(`${DONATUR_API}`);
    const data = await res.json();
    const donatur = data.data.find(d => d.id === id);
    if (!donatur) return alert('Data tidak ditemukan');
    const nama = prompt('Nama:', donatur.nama);
    const email = prompt('Email:', donatur.email);
    const phone = prompt('Phone:', donatur.phone || '');
    const aktif = confirm('Aktifkan donatur ini? (OK=Aktif, Cancel=Nonaktif)');
    const res2 = await fetch(`${DONATUR_API}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, phone, aktif })
    });
    const data2 = await res2.json();
    if (data2.success) {
        alert('Donatur tetap diupdate!');
        tampilkanDonaturTetap();
    } else {
        alert(data2.message || 'Gagal update');
    }
}

// Hapus donatur tetap
async function hapusDonaturTetap(id) {
    if (!confirm('Yakin hapus donatur tetap ini?')) return;
    const res = await fetch(`${DONATUR_API}/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
        alert('Donatur tetap dihapus!');
        tampilkanDonaturTetap();
    } else {
        alert(data.message || 'Gagal hapus');
    }
}

// Panggil otomatis jika ada tabel donatur tetap
document.addEventListener('DOMContentLoaded', tampilkanDonaturTetap);


// Ganti URL sesuai backend Next.js Anda
const API_BASE = 'http://localhost:3000/api';

// Ambil statistik donasi dari backend
async function fetchStatistikDonasi() {
    try {
        // Ambil statistik utama
        const res = await fetch(`${API_BASE}/statistik`);
        const data = await res.json();
        if (!data.success) return;
        const { target, terkumpul, persen } = data.data;

        // Update status timeline pembangunan fisik dan peresmian
        if(document.getElementById('timeline-menunggu')) {
            if (persen === 0) {
                document.getElementById('timeline-menunggu').textContent = 'Menunggu - Target donasi belum tercapai';
            } else if (persen < 100) {
                document.getElementById('timeline-menunggu').textContent = 'Menunggu - Penggalangan dana masih berlangsung';
            } else {
                document.getElementById('timeline-menunggu').textContent = 'Pembangunan Dimulai / Sementara Berjalan';
            }
        }
        if(document.getElementById('timeline-rencana')) {
            document.getElementById('timeline-rencana').textContent = 'Rencana - Peresmian setelah pembangunan selesai';
        }

        // Ambil total donatur tetap
        let totalDonaturTetap = 0;
        try {
            const resTetap = await fetch(`${API_BASE}/donatur-tetap`);
            const dataTetap = await resTetap.json();
            if (dataTetap.success) {
                totalDonaturTetap = dataTetap.data.length;
            }
        } catch {}

        // Ambil total donasi umum (semua donasi, meskipun nama sama, tetap dihitung)
        let totalDonaturUmum = 0;
        try {
            const resDonasi = await fetch(`${API_BASE}/donasi`);
            const dataDonasi = await resDonasi.json();
            if (dataDonasi.success) {
                totalDonaturUmum = dataDonasi.data.length;
            }
        } catch {}

        // Total donatur = donatur tetap + total donasi umum
        const totalDonatur = totalDonaturTetap + totalDonaturUmum;
        // Sisa target (%)
        const sisaTarget = Math.max(0, 100 - persen);

        // Update elemen utama (hero)
        if(document.getElementById('target-donasi'))
            document.getElementById('target-donasi').textContent = 'Rp ' + target.toLocaleString('id-ID');
        if(document.getElementById('terkumpul'))
            document.getElementById('terkumpul').textContent = 'Terkumpul: Rp ' + terkumpul.toLocaleString('id-ID');
        if(document.getElementById('persen'))
            document.getElementById('persen').textContent = persen + '%';
        if(document.getElementById('progress-bar'))
            document.getElementById('progress-bar').style.width = persen + '%';

        // Update Statistik Donasi
        if(document.getElementById('statistik-persentase'))
            document.getElementById('statistik-persentase').textContent = persen + '%';
        if(document.getElementById('statistik-progress-bar'))
            document.getElementById('statistik-progress-bar').style.width = persen + '%';
        if(document.getElementById('statistik-terkumpul'))
            document.getElementById('statistik-terkumpul').textContent = 'Rp ' + terkumpul.toLocaleString('id-ID');
        if(document.getElementById('statistik-target'))
            document.getElementById('statistik-target').textContent = 'Rp ' + target.toLocaleString('id-ID');
        if(document.getElementById('statistik-total-donatur'))
            document.getElementById('statistik-total-donatur').textContent = totalDonatur;
        if(document.getElementById('statistik-sisa-target'))
            document.getElementById('statistik-sisa-target').textContent = sisaTarget + '%';

        // Update persentase timeline
        if(document.getElementById('timeline-persen-value'))
            document.getElementById('timeline-persen-value').textContent = persen + '%';
    } catch (err) {
        console.error('Gagal fetch statistik donasi:', err);
    }
}

document.addEventListener('DOMContentLoaded', fetchStatistikDonasi);
window.addEventListener('load', function() {
    setTimeout(() => {
        fetchStatistikDonasi();
    }, 500);
});

// Kirim donasi baru ke backend
async function kirimDonasiBaru(nama, nominal) {
    try {
        const res = await fetch(`${API_BASE}/donasi`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, nominal })
        });
        let data = { success: false };
        try {
            data = await res.json();
        } catch {}
        if (res.ok && data.success) {
            alert('Donasi berhasil! Terima kasih.');
            fetchStatistikDonasi(); // refresh progress
        } else if (res.ok && !data.success) {
            alert(data.message || 'Donasi gagal');
        } else {
            alert('Gagal mengirim donasi.');
        }
    } catch (err) {
        alert('Gagal mengirim donasi.');
    }
}

        // Donation functionality


// Handle donasi bebas
document.addEventListener('DOMContentLoaded', function() {
    const btnDonasiBebas = document.getElementById('btn-donasi-bebas');
    const inputDonasiBebas = document.getElementById('input-donasi-bebas');
    const qrisModal = document.getElementById('qris-modal');
    const qrisModalClose = document.getElementById('qris-modal-close');
    const qrisNominal = document.getElementById('qris-nominal');

    if(btnDonasiBebas && inputDonasiBebas && qrisModal && qrisModalClose && qrisNominal) {
        btnDonasiBebas.addEventListener('click', function(e) {
            let nominal = parseInt(inputDonasiBebas.value);
            if (!isNaN(nominal) && nominal >= 1000) {
                e.preventDefault();
                qrisNominal.textContent = nominal.toLocaleString('id-ID', {style:'currency', currency:'IDR'});
                qrisModal.classList.remove('hidden');
            }
        });
        qrisModalClose.addEventListener('click', function() {
            qrisModal.classList.add('hidden');
        });
        qrisModal.addEventListener('click', function(e) {
            if (e.target === this) qrisModal.classList.add('hidden');
        });
    }
});

        function selectDonation(amountText) {
            const amount = parseInt(amountText.replace(/[^\d]/g, ''));
            processDonation(amount);
        }

        function processDonation(amount) {
            // Simulate donation process
            const confirmation = confirm(`Anda akan berdonasi sebesar Rp ${amount.toLocaleString('id-ID')}. Lanjutkan ke pembayaran?`);
            
            if (confirmation) {
                // Update total donation
                totalDonation += amount;
                updateProgress();
                
                // Show success message
                alert(`Barakallahu fiik! Donasi Anda sebesar Rp ${amount.toLocaleString('id-ID')} telah diterima. Silakan lakukan pembayaran melalui rekening yang tersedia.`);
                
                // Add to recent donors (simulation)
                addRecentDonor(amount);
            }
        }

        function updateProgress() {
            const percentage = Math.min((totalDonation / targetDonation) * 100, 100);
            
            // Update progress bars
            document.querySelectorAll('.progress-bar').forEach(bar => {
                bar.style.width = percentage + '%';
            });
            
            // Update text
            document.querySelectorAll('.text-4xl.font-bold.text-green-600').forEach(el => {
                if (el.textContent.includes('Rp')) {
                    el.textContent = `Rp ${totalDonation.toLocaleString('id-ID')}`;
                }
            });
            
            // Update percentage displays
            document.querySelectorAll('span').forEach(span => {
                if (span.textContent.includes('%') && span.textContent.includes('68')) {
                    span.textContent = Math.round(percentage) + '%';
                }
            });
        }

        function addRecentDonor(amount) {
            const donorNames = ['Ahmad S.', 'Siti F.', 'Muhammad R.', 'Fatimah A.', 'Abdullah H.'];
            const randomName = donorNames[Math.floor(Math.random() * donorNames.length)];
            
            // This would typically update the recent donors section
            console.log(`New donor: ${randomName} - Rp ${amount.toLocaleString('id-ID')}`);
        }

        // Copy account number functionality
        document.querySelectorAll('button').forEach(button => {
            if (button.textContent.includes('Salin')) {
                button.addEventListener('click', function() {
                    let textToCopy = '';
                    
                    if (this.textContent.includes('Rekening')) {
                        textToCopy = '7232200598';
                    } else if (this.textContent.includes('E-Wallet')) {
                        textToCopy = '081234567890';
                    }
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalText = this.textContent;
                        this.textContent = 'Tersalin! ✓';
                        this.classList.add('bg-green-700');
                        
                        setTimeout(() => {
                            this.textContent = originalText;
                            this.classList.remove('bg-green-700');
                        }, 2000);
                    });
                });
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Initialize progress animation on page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                updateProgress();
            }, 500);
        });

// Debug log nominal
console.log('Nominal diterima dari frontend:', nominal);
const nominalAngka = parseInt(nominal.replace(/[^\d]/g, ''));
console.log('Nominal setelah parsing:', nominalAngka);

const donasi = await prisma.donasi.create({
  data: {
    nama,
    nominal: nominalAngka,
    pesan,
    bukti: `/bukti-transfer/${fileName}`,
    status: 'MENUNGGU_VERIFIKASI',
  },
});

Swal.fire({
  icon: 'success',
  title: 'Bukti berhasil dikirim!',
  text: 'Donasi Anda akan segera diverifikasi.',
  confirmButtonColor: '#16a34a'
});
