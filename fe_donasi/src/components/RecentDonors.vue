<template>
  <section id="donatur" class="py-16 bg-gray-50 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Donatur Terbaru</h3>
        <p class="text-xl text-gray-600">Terima kasih kepada para dermawan yang telah berdonasi</p>
      </div>

      <div class="bg-white rounded-xl card-shadow p-8">
        <!-- Toggle Show All -->
        <!-- Toggle Show All dipindah ke bawah -->

        <!-- Donatur Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(donatur, idx) in displayedDonors"
            :key="donatur.id"
            :style="{ background: getCardColor(donatur, idx) }"
            class="rounded-lg p-3 flex items-center space-x-3 min-h-[50px]"
          >
            <!-- Avatar -->
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
              :style="{ background: getAvatarColor(donatur.nama || 'Hamba Allah') }"
            >
              {{ getInitials(donatur.nama) }}
            </div>
            <!-- Info -->
            <div class="flex-1">
              <div class="font-large text-base">
                <strong>{{ donatur.nama || 'Hamba Allah' }}</strong>
              </div>
              <div class="text-base font-bold text-green-600">
                Rp {{ donatur.nominal.toLocaleString('id-ID') }}
              </div>
              <div class="text-sm text-gray-500">{{ waktuRelatif(donatur.waktu) }}</div>
            </div>
          </div>
        </div>

        <!-- Link Lihat Semua -->
        <div class="flex justify-center mt-6">
          <button
            @click="toggleShowAll"
            class="text-green-600 font-semibold hover:underline text-sm bg-transparent border-0 cursor-pointer"
            type="button"
          >
            {{ showAll ? 'Kecilkan' : 'Lihat Semua Donatur →' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

// Ambil base URL dari environment variable VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Array warna pastel (lebih banyak)
const pastelColors = [
  '#e6f7e6', // hijau muda
  '#e6f3ff', // biru muda
  '#f3e6ff', // ungu muda
  '#fff7e6', // oranye muda
  '#ffe6f3', // pink muda
  '#e6f7ff', // biru muda lain
  '#f9f0e6', // krem
  '#e6f7f0', // hijau muda lain
  '#f0e6ff', // ungu muda lain
  '#fff0e6', // oranye muda lain
]

// Warna avatar (solid)
const avatarColors = [
  '#10b981', // hijau
  '#3b82f6', // biru
  '#a78bfa', // ungu
  '#f59e42', // oranye
  '#ec4899', // pink
  '#06b6d4', // biru muda
  '#f97316', // oranye terang
  '#8b5cf6', // ungu tua
  '#14b8a6', // toska
  '#f472b6', // merah muda
]

// Fungsi untuk warna kartu (random pastel)
function getCardColor(donatur, idx) {
  let seed = donatur.id ? parseInt(String(donatur.id).replace(/\D/g, '')) : idx
  if (isNaN(seed)) seed = idx
  const colorIdx = Math.floor((Math.sin(seed) * 10000) % pastelColors.length)
  return `background: ${pastelColors[colorIdx]}`
}

// Fungsi untuk warna avatar
function getAvatarColor(nama) {
  if (!nama) return '#16a34a'
  const colors = ['#10b981', '#3b82f6', '#a78bfa', '#f59e42', '#ec4899', '#06b6d4']
  let hash = 0
  for (let i = 0; i < nama.length; i++) {
    hash = nama.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Fungsi inisial
function getInitials(nama) {
  if (!nama) return 'HA'
  const parts = nama.trim().split(' ')
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

// Fungsi waktu relatif
function waktuRelatif(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = (now - date) / 1000
  if (diff < 60) return 'Baru saja'
  if (diff < 3600) return Math.floor(diff / 60) + ' menit lalu'
  if (diff < 86400) return Math.floor(diff / 3600) + ' jam lalu'
  if (diff < 2592000) return Math.floor(diff / 86400) + ' hari lalu'
  return date.toLocaleDateString('id-ID')
}

// State
const donors = ref([])
const showAll = ref(false)

const displayedDonors = computed(() => {
  return showAll.value ? donors.value : donors.value.slice(0, 6)
})

function toggleShowAll() {
  showAll.value = !showAll.value
}

async function fetchDonaturTerbaru() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/donasi`)
    const data = await res.json()
    if (!data.success) return
    // Hanya donasi terverifikasi
    donors.value = data.data
      .filter((d) => d.status === 'TERVERIFIKASI' || d.status === undefined)
      .sort((a, b) => new Date(b.waktu) - new Date(a.waktu))
  } catch {
    // ignore error
  }
}

onMounted(() => {
  fetchDonaturTerbaru()
})
</script>
