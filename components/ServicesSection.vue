<script setup lang="ts">
const { services } = usePortfolio()
</script>

<template>
  <section id="services" class="section">
    <div class="wrap">
      <SectionHead
        num="02"
        :eyebrow="$t('services.eyebrow')"
        :title="$t('services.title')"
        :lead="$t('services.lead')"
      />

      <div class="services">
        <article
          v-for="(service, i) in services"
          :key="service.title"
          class="service reveal"
          v-reveal="i * 70"
        >
          <div class="service-icon"><AppIcon :name="service.icon" /></div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.desc }}</p>
          <div class="service-scope">
            <span v-for="item in service.scope" :key="item" class="tag">{{ item }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
