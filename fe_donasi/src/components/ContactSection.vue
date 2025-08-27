<template>
  <section id="kontak" class="py-16 bg-white scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 class="text-3xl font-bold text-gray-900 mb-6">Hubungi Kami</h3>
          <p class="text-gray-600 mb-8">
            Jika Anda memiliki pertanyaan tentang donasi atau ingin informasi lebih lanjut,
            jangan ragu untuk menghubungi kami.
          </p>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 text-xl">📍</span>
              </div>
              <div>
                <h5 class="font-semibold">Alamat Masjid</h5>
                <p class="text-gray-600">Purnama town house, Moncongloe Bulu, Kec. Moncong Loe, Kabupaten Maros, Sulawesi Selatan 90562</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 text-xl">📱</span>
              </div>
              <div>
                <h5 class="font-semibold">WhatsApp</h5>
                <p class="text-gray-600">+62 853-4144-2000</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span class="text-purple-600 text-xl">📧</span>
              </div>
              <div>
                <h5 class="font-semibold">Email</h5>
                <p class="text-gray-600">info@hijratulummah.org</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-3xl font-bold text-gray-900 mb-6">Rekening Donasi</h3>
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h5 class="font-semibold text-lg">Bank Syariah Mandiri/BSI</h5>
                <span class="text-2xl"><img src="/img/logo-bsi.png" alt="Logo Bank Syariah Mandiri/BSI" width="100"></span>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">No. Rekening:</span>
                  <span class="font-mono font-bold">7232200598</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Atas Nama:</span>
                  <span class="font-semibold">Mushollah Hijratul Ummah</span>
                </div>
              </div>
              <button class="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                Salin Nomor Rekening
              </button>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h5 class="font-semibold text-lg">DANA / GoPay</h5>
                <span class="text-2xl">📱</span>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Nomor:</span>
                  <span class="font-mono font-bold">081234567890</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Atas Nama:</span>
                  <span class="font-semibold">Takmir Mushollah Hijratul Ummah</span>
                </div>
              </div>
              <button class="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors" disabled>
                Salin Nomor E-Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No logic needed for static contact section
</script>
