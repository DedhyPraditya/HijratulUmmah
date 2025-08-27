<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 gradient-islamic rounded-full flex items-center justify-center">
            <span class="text-white text-2xl">🕌</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">Mushollah Hijratul Ummah</h1>
          </div>
        </div>
        <nav class="hidden md:flex space-x-6">
          <a href="#beranda" class="text-green-600 font-semibold border-b-2 border-green-600">Beranda</a>
          <a href="#tentang" class="text-gray-700 hover:text-green-600">Tentang</a>
          <a href="#progress" class="text-gray-700 hover:text-green-600">Progress</a>
          <a href="#donatur" class="text-gray-700 hover:text-green-600">Donatur</a>
          <a href="#kontak" class="text-gray-700 hover:text-green-600">Kontak</a>
        </nav>
        <a href="#option" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors pulse-green block text-center">
          Donasi Sekarang
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
// No logic needed for static header
</script>

<style scoped>
.gradient-islamic {
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
}
</style>
