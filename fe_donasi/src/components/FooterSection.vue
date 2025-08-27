<template>
  <footer class="gradient-islamic text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span class="text-2xl">🕌</span>
            </div>
            <div>
              <h4 class="text-xl font-bold">Mushollah Hijratul Ummah</h4>
            </div>
          </div>
          <p class="opacity-90 mb-4">
            Mari bersama-sama membangun fasilitas ibadah yang lebih baik untuk kemajuan umat Islam.
          </p>
          <div class="arabic-font text-lg opacity-90">
            جَزَاكَ اللَّهُ خَيْرًا
          </div>
        </div>
        <div>
          <h5 class="font-semibold mb-4">Menu</h5>
          <ul class="space-y-2 opacity-90">
            <li><a href="#beranda" class="hover:text-green-200">Beranda</a></li>
            <li><a href="#tentang" class="hover:text-green-200">Tentang Proyek</a></li>
            <li><a href="#progress" class="hover:text-green-200">Progress</a></li>
            <li><a href="#donatur" class="hover:text-green-200">Donatur</a></li>
            <li><a href="#kontak" class="hover:text-green-200">Kontak</a></li>
          </ul>
        </div>
        <div>
          <h5 class="font-semibold mb-4">Informasi</h5>
          <ul class="space-y-2 opacity-90 text-sm">
            <li>📍 Purnama town house, Moncongloe Bulu, Kec. Moncong Loe, Kabupaten Maros, Sulawesi Selatan 90562</li>
            <li>📱 +62 853-4144-2000</li>
            <li>📧 info@hijratulummah.org</li>
            <li>🌐 www.hijratulummah.org</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white border-opacity-20 mt-8 pt-8 text-center opacity-80">
        <p>&copy; 2025 Mushollah Hijratul Ummah. Semua hak dilindungi. Dibuat dengan ❤️ untuk kemajuan umat.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No logic needed for static footer
</script>

<style scoped>
.gradient-islamic {
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
}
</style>
