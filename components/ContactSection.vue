<script setup lang="ts">
const { profile, socials } = usePortfolio()
const { t } = useI18n()

const form = reactive({ name: '', email: '', message: '' })

/**
 * No backend yet — the form composes a mailto so nothing is silently dropped.
 * Swap this for a POST to /api/contact (or Formspree/Resend) when one exists.
 */
const submit = () => {
  const subject = encodeURIComponent(t('contact.subject', { name: form.name || t('contact.subjectFallback') }))
  const body = encodeURIComponent(`${form.message}\n\n—\n${form.name}\n${form.email}`)
  window.location.href = `mailto:${profile.value.email}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section id="contact" class="section">
    <div class="wrap">
      <SectionHead
        num="06"
        :eyebrow="$t('contact.eyebrow')"
        :title="$t('contact.title')"
        :lead="$t('contact.lead')"
      />

      <div class="contact">
        <div class="reveal" v-reveal>
          <div class="contact-list">
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer">
              <AppIcon :name="s.icon" />
              <span>
                <small>{{ s.label }}</small>
                {{ s.handle }}
              </span>
            </a>
            <div>
              <AppIcon name="map-pin" />
              <span>
                <small>{{ $t('contact.location') }}</small>
                {{ profile.location }}
              </span>
            </div>
          </div>
        </div>

        <form class="form reveal" v-reveal="90" @submit.prevent="submit">
          <div class="field">
            <label for="cf-name">{{ $t('contact.name') }}</label>
            <input
              id="cf-name"
              v-model="form.name"
              type="text"
              required
              :placeholder="$t('contact.namePlaceholder')"
            />
          </div>
          <div class="field">
            <label for="cf-email">{{ $t('contact.email') }}</label>
            <input
              id="cf-email"
              v-model="form.email"
              type="email"
              required
              :placeholder="$t('contact.emailPlaceholder')"
            />
          </div>
          <div class="field">
            <label for="cf-message">{{ $t('contact.message') }}</label>
            <textarea
              id="cf-message"
              v-model="form.message"
              required
              :placeholder="$t('contact.messagePlaceholder')"
            />
          </div>
          <button class="btn btn-primary" type="submit" style="width: 100%">
            <AppIcon name="send" />
            {{ $t('contact.send') }}
          </button>
          <p class="form-note">{{ $t('contact.note') }}</p>
        </form>
      </div>
    </div>
  </section>
</template>
