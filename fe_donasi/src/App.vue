
<script setup>
import HeaderSection from './components/HeaderSection.vue';
import HeroSection from './components/HeroSection.vue';
import TentangSection from './components/TentangSection.vue';
import UrgencySection from './components/UrgencySection.vue';
import DonationOptions from './components/DonationOptions.vue';
import ProgressSection from './components/ProgressSection.vue';
import RecentDonors from './components/RecentDonors.vue';
import ContactSection from './components/ContactSection.vue';
import FooterSection from './components/FooterSection.vue';
</script>

<template>
  <div class="main-font bg-gray-50">
    <HeaderSection />
    <HeroSection />
    <TentangSection />
    <UrgencySection />
    <DonationOptions />
    <ProgressSection />
    <RecentDonors />
    <ContactSection />
    <FooterSection />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade:wght@400;700&display=swap');
.main-font {
  font-family: 'Inter', Arial, sans-serif;
}
</style>
