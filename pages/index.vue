<script setup lang="ts">
const { profile } = usePortfolio()

usePageSeo(
  () => `${profile.value.name} — ${profile.value.title}`,
  () => profile.value.summary
)
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
