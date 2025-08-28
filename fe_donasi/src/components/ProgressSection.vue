<template>
  <section id="progress" class="py-16 bg-white scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Progress Pembangunan</h3>
        <p class="text-xl text-gray-600">Transparansi penggunaan dana donasi Anda</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8">
            <h4 class="text-2xl font-bold text-gray-900 mb-6">Statistik Donasi</h4>
            <div class="space-y-6">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="font-semibold">Dana Terkumpul</span>
                  <span class="font-bold text-green-600">{{ persen }}%</span>
                </div>
                <div class="bg-gray-200 rounded-full h-3">
                  <div
                    class="progress-bar h-3 rounded-full bg-green-500"
                    :style="{ width: persen + '%' }"
                  ></div>
                </div>
                <div class="flex justify-between mt-1 text-sm text-gray-600">
                  <span>Rp {{ terkumpul.toLocaleString('id-ID') }}</span>
                  <span>Rp {{ target.toLocaleString('id-ID') }}</span>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold text-green-600">{{ totalDonatur }}</div>
                  <div class="text-sm text-gray-600">Total Donatur</div>
                </div>
                <div class="bg-white rounded-lg p-4 text-center">
                  <div class="text-2xl font-bold text-blue-600">{{ sisaTarget }}%</div>
                  <div class="text-sm text-gray-600">Sisa Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 class="text-2xl font-bold text-gray-900 mb-6">Timeline Pembangunan</h4>
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div
                class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white text-sm">✓</span>
              </div>
              <div>
                <h5 class="font-semibold text-gray-900">Perencanaan & Desain</h5>
                <p class="text-gray-600 text-sm">Desain tempat wudhu telah selesai dan disetujui</p>
                <span class="text-xs text-green-600 font-semibold">Selesai - Jan 2024</span>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div
                class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-white text-sm">✓</span>
              </div>
              <div>
                <h5 class="font-semibold text-gray-900">Penggalangan Dana</h5>
                <p class="text-gray-600 text-sm">Mengumpulkan donasi dari jamaah dan masyarakat</p>
                <span class="text-xs text-yellow-600 font-semibold"
                  >Berlangsung - <span>{{ persen }}%</span> tercapai</span
                >
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-gray-600 text-sm">3</span>
              </div>
              <div>
                <h5 class="font-semibold text-gray-600">Pembangunan Fisik</h5>
                <p class="text-gray-500 text-sm">Mulai pembangunan setelah target 100% tercapai</p>
                <span class="text-xs text-gray-500 font-semibold">{{ statusFisik }}</span>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-gray-600 text-sm">4</span>
              </div>
              <div>
                <h5 class="font-semibold text-gray-600">Peresmian</h5>
                <p class="text-gray-500 text-sm">Peresmian tempat wudhu baru</p>
                <span class="text-xs text-gray-500 font-semibold"
                  >Rencana - Peresmian setelah pembangunan selesai</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Ambil base URL dari environment variable VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const target = ref(0)
const terkumpul = ref(0)
const persen = ref(0)
const totalDonatur = ref(0)
const sisaTarget = ref(0)
const statusFisik = ref('Memuat...')

async function fetchStatistik() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/statistik`)
    const data = await res.json()
    if (!data.success) return
    target.value = data.data.target
    terkumpul.value = data.data.terkumpul
    persen.value = data.data.persen
    sisaTarget.value = Math.max(0, 100 - persen.value)

    // Donatur tetap
    let totalDonaturTetap = 0
    try {
      const resTetap = await fetch(`${API_BASE_URL}/api/donatur-tetap`)
      const dataTetap = await resTetap.json()
      if (dataTetap.success) {
        totalDonaturTetap = dataTetap.data.length
      }
    } catch {}

    // Donasi umum
    let totalDonaturUmum = 0
    try {
      const resDonasi = await fetch(`${API_BASE_URL}/api/donasi`)
      const dataDonasi = await resDonasi.json()
      if (dataDonasi.success) {
        totalDonaturUmum = dataDonasi.data.length
      }
    } catch {}
    totalDonatur.value = totalDonaturTetap + totalDonaturUmum

    // Status timeline
    if (persen.value === 0) {
      statusFisik.value = 'Menunggu - Target donasi belum tercapai'
    } else if (persen.value < 100) {
      statusFisik.value = 'Menunggu - Penggalangan dana masih berlangsung'
    } else {
      statusFisik.value = 'Pembangunan Dimulai / Sementara Berjalan'
    }
  } catch (err) {
    statusFisik.value = 'Gagal memuat data'
  }
}

onMounted(() => {
  fetchStatistik()
})
</script>
