<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-md w-full relative p-0 overflow-hidden max-h-[90vh] overflow-y-auto"
    >
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 bg-gray-200 rounded-full p-2 hover:bg-gray-300 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="bg-gradient-to-r from-green-500 to-green-400 py-6 px-6 text-center">
        <div class="text-3xl mb-2">🤲</div>
        <h4 class="text-2xl font-bold text-white mb-1">Scan QRIS Donasi</h4>
        <div class="text-white text-sm mb-2">
          Dukung pembangunan tempat wudhu Mushollah Hijratul Ummah
        </div>
      </div>
      <div class="p-6 pt-4 flex flex-col items-center">
        <img
          src="/img/kris.jpg"
          alt="QRIS Statis"
          class="mx-auto mb-3 rounded-lg shadow-lg border-2 border-green-200 bg-white"
          style="max-width: 200px"
        />
        <div class="mb-1 text-gray-700 font-semibold">Transfer sesuai nominal berikut:</div>
        <div class="text-2xl font-bold text-green-600 mb-2">{{ formattedNominal }}</div>
        <div class="text-xs text-gray-500 mb-4 text-center">
          Pastikan nominal transfer <b>sama persis</b> agar donasi Anda mudah diverifikasi.<br />Setelah
          transfer, klik tombol di bawah untuk upload bukti.
        </div>
        <button
          v-if="!showForm"
          @click="showForm = true"
          class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 font-semibold text-sm mb-2"
        >
          Upload Bukti Transfer
        </button>
        <form
          v-if="showForm"
          @submit.prevent="submitBukti"
          class="bg-gray-50 rounded-lg p-3 flex flex-col gap-2 w-full"
          enctype="multipart/form-data"
        >
          <label class="text-left text-xs font-semibold text-gray-700">Nama Donatur</label>
          <input
            type="text"
            v-model="form.nama"
            class="border rounded px-3 py-2 mb-1 text-sm"
            required
          />
          <label class="text-left text-xs font-semibold text-gray-700">Nominal</label>
          <input
            type="text"
            v-model="form.nominal"
            class="border rounded px-3 py-2 mb-1 bg-gray-100 text-sm"
            readonly
          />
          <label class="text-left text-xs font-semibold text-gray-700">Pesan (opsional)</label>
          <input type="text" v-model="form.pesan" class="border rounded px-3 py-2 mb-1 text-sm" />
          <label class="text-left text-xs font-semibold text-gray-700">Upload Bukti Transfer</label>
          <input
            type="file"
            @change="onFileChange"
            accept="image/*"
            class="mb-2 text-xs"
            required
          />
          <button
            type="submit"
            :disabled="!form.bukti"
            class="bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold text-sm mt-2"
          >
            Kirim Bukti & Daftarkan Donasi
          </button>
        </form>
        <div v-if="success" class="text-green-600 font-semibold mt-2">
          Bukti berhasil dikirim! Donasi Anda akan segera diverifikasi.
        </div>
        <div v-if="error" class="text-red-600 font-semibold mt-2">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

// Ambil base URL dari environment variable VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
import Swal from 'sweetalert2'

const props = defineProps({
  show: Boolean,
  nominal: Number,
})
const emit = defineEmits(['close'])

const showForm = ref(false)
const success = ref(false)
const error = ref('')
const form = ref({ nama: '', nominal: '', pesan: '', bukti: null })

watch(
  () => props.nominal,
  (val) => {
    form.value.nominal = val ? val.toString() : ''
  },
)

const formattedNominal = computed(() => {
  return props.nominal
    ? props.nominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    : 'Rp 0'
})

function onFileChange(e) {
  form.value.bukti = e.target.files[0]
}

async function submitBukti() {
  error.value = ''
  success.value = false
  const formData = new FormData()
  formData.append('nama', form.value.nama)
  formData.append('nominal', form.value.nominal.replace(/[^\d]/g, ''))
  formData.append('pesan', form.value.pesan)
  formData.append('bukti', form.value.bukti)
  try {
    const res = await fetch(`${API_BASE_URL}/api/bukti-transfer`, {
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      success.value = true
      Swal.fire({
        icon: 'success',
        title: 'Bukti berhasil dikirim!',
        text: 'Donasi Anda akan segera diverifikasi.',
        confirmButtonColor: '#16a34a',
      })
      setTimeout(() => {
        emit('close')
        showForm.value = false
        form.value = { nama: '', nominal: props.nominal.toString(), pesan: '', bukti: null }
        success.value = false
      }, 1500)
    } else {
      error.value = 'Gagal mengirim bukti. Coba lagi.'
    }
  } catch (e) {
    error.value = 'Terjadi kesalahan. Coba lagi.'
  }
}
</script>
