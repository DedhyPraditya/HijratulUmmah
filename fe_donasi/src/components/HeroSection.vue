
<template>
  <section id="beranda" class="gradient-islamic text-white py-20 islamic-pattern scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="arabic-font text-3xl mb-4 text-center lg:text-left">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
          <h2 class="text-4xl lg:text-4xl font-bold mb-6">
            Mari Bersama Membangun Tempat Wudhu yang Layak
          </h2>
          <p class="text-xl mb-8 opacity-90">
            Mushollah Hijratul Ummah membutuhkan bantuan Anda untuk membangun fasilitas tempat wudhu yang bersih dan nyaman bagi jamaah. Setiap rupiah yang Anda sumbangkan adalah investasi pahala yang mengalir terus.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#option" class="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
              🤲 Donasi Sekarang
            </a>
            <a href="#tentang" class="button border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              📖 Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-white rounded-2xl p-8 card-shadow">
            <div class="text-6xl mb-4">🕌</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Target Donasi</h3>
            <div class="text-4xl font-bold text-green-600 mb-2">{{ loading ? 'Memuat...' : formatRupiah(target) }}</div>
            <div class="text-gray-600 mb-6">Untuk pembangunan tempat wudhu lengkap</div>
            <div class="bg-gray-200 rounded-full h-4 mb-4">
              <div class="progress-bar h-4 rounded-full bg-green-500" :style="{ width: persen + '%' }"></div>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Terkumpul: {{ loading ? 'Memuat...' : formatRupiah(terkumpul) }}</span>
              <span>{{ persen }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const target = ref(0);
const terkumpul = ref(0);
const persen = ref(0);
const loading = ref(true);

function formatRupiah(val) {
  if (!val) return 'Rp 0';
  return 'Rp ' + val.toLocaleString('id-ID');
}

async function fetchStatistik() {
  loading.value = true;
  try {
    const res = await fetch('http://localhost:3000/api/statistik');
    const data = await res.json();
    if (!data.success) return;
    target.value = data.data.target;
    terkumpul.value = data.data.terkumpul;
    persen.value = data.data.persen;
  } catch {
    // ignore error
  }
  loading.value = false;
}

onMounted(() => {
  fetchStatistik();
});
</script>

<style scoped>
.gradient-islamic {
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
}
</style>
