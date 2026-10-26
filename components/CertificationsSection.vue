<script setup lang="ts">
const { certifications } = usePortfolio()
</script>

<template>
  <section class="section">
    <div class="wrap">
      <SectionHead
        :eyebrow="$t('credentials.eyebrow')"
        :title="$t('credentials.title')"
        :lead="$t('credentials.lead')"
      />

      <div class="certs">
        <article
          v-for="(cert, i) in certifications"
          :key="cert.name"
          class="cert reveal"
          v-reveal="i * 70"
        >
          <div class="cert-badge"><AppIcon name="award" /></div>
          <div>
            <h3>{{ cert.name }}</h3>
            <p>{{ cert.issuer }}</p>
            <small>{{ cert.period }} · {{ cert.note }}</small>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
