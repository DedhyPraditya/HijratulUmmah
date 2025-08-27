<template>
  <section id="tentang" class="py-16 bg-white scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Tentang Pembangunan Tempat Wudhu</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h4 class="text-2xl font-bold text-green-700 mb-4">Ajakan Donasi</h4>
          <p class="text-lg text-gray-700 mb-4">
            Sahabat dermawan, pembangunan tempat wudhu Masjid Hijratull Ummah sudah dimulai sejak beberapa waktu lalu melalui swadaya dan wakaf dari jamaah. Alhamdulillah, pondasi dan dinding utama sudah berdiri. Namun, pembangunan terhenti karena keterbatasan dana, sehingga kondisinya masih terbengkalai hingga sekarang.
          </p>
          <p class="text-lg text-gray-700 mb-4">
            Agar jamaah bisa berwudhu dengan nyaman dan ibadah lebih khusyuk, kami mengajak Anda untuk ikut serta menyelesaikan pembangunan ini. InsyaAllah, setiap tetes air wudhu yang digunakan jamaah akan menjadi pahala jariyah yang terus mengalir bagi para donatur.
          </p>
          <p class="text-lg text-gray-700 mb-4">
            Mari kita rampungkan bersama. Donasi sekecil apa pun sangat berarti untuk menghidupkan kembali amal jariyah ini.
          </p>
        </div>
        <div>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-100 rounded-lg h-40 flex items-center justify-center text-gray-400">
              <img src="/img/img-1.jpg" alt="" class="object-cover w-full h-full rounded-lg tentang-img cursor-pointer transition-transform duration-300 hover:scale-105" @click="openPreview('/img/img-1.jpg')" />
            </div>
            <div class="bg-gray-100 rounded-lg h-40 flex items-center justify-center text-gray-400">
              <img src="/img/img-2.jpg" alt="" class="object-cover w-full h-full rounded-lg tentang-img cursor-pointer transition-transform duration-300 hover:scale-105" @click="openPreview('/img/img-2.jpg')" />
            </div>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="bg-gray-100 rounded-lg h-40 flex items-center justify-center text-gray-400">
              <img src="/img/img-3.jpg" alt="" class="object-cover w-full h-full rounded-lg tentang-img cursor-pointer transition-transform duration-300 hover:scale-105" @click="openPreview('/img/img-3.jpg')" />
            </div>
            <div class="bg-gray-100 rounded-lg h-40 flex items-center justify-center text-gray-400">
              <img src="/img/img-4.jpg" alt="" class="object-cover w-full h-full rounded-lg tentang-img cursor-pointer transition-transform duration-300 hover:scale-105" @click="openPreview('/img/img-4.jpg')" />
            </div>
    <!-- Modal Preview Gambar -->
    <div v-if="previewImg" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" @click="closePreview">
      <img :src="previewImg" class="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg border-4 border-white" @click.stop />
    </div>
          </div>
          <div class="text-xs text-gray-400 mt-2 text-center">(Foto terkini Tempat Wudhu)</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const previewImg = ref(null);
function openPreview(src) {
  previewImg.value = src;
}
function closePreview() {
  previewImg.value = null;
}
</script>
