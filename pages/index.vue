<script setup lang="ts">
const { profile } = usePortfolio()

useSeoMeta({
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary
})
</script>

<template>
  <div>
    <HeroSection />
    <MarqueeStrip />
    <StatsStrip />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <ExperienceSection />
    <StackSection />
    <CertificationsSection />
    <ContactSection />
  </div>
</template>
