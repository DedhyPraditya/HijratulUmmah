
<template>
  <section id="option" class="py-16 bg-gray-50 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Pilihan Donasi</h3>
        <p class="text-xl text-gray-600">Setiap nominal donasi sangat berarti bagi pembangunan tempat wudhu</p>
      </div>
      <div class="flex flex-col items-center gap-8">
        <div class="bg-white rounded-xl p-8 card-shadow w-full max-w-md">
          <div class="text-center">
            <div class="text-4xl mb-4">🤲</div>
            <h4 class="text-2xl font-bold text-green-600 mb-2">Donasi Seikhlasnya</h4>
            <p class="text-gray-600 mb-4">Masukkan nominal sesuai keikhlasan dan kemampuan Anda. Setiap rupiah sangat berarti!</p>
            <div class="mb-6">
              <input type="number" min="1000" v-model.number="nominal" placeholder="Masukkan nominal donasi (Rp)" class="w-full border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <button class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold" :disabled="!nominal || nominal < 1000" @click="openModal">
              Donasi Sekarang
            </button>
            <ModalQris :show="showModal" :nominal="nominal" @close="closeModal" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ModalQris from './ModalQris.vue';

const nominal = ref(0);
const showModal = ref(false);

function openModal() {
  if (nominal.value && nominal.value >= 1000) {
    showModal.value = true;
  }
}
function closeModal() {
  showModal.value = false;
}
</script>
