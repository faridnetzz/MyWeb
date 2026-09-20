<script setup lang="ts">
const { profile, socials } = usePortfolio()

const form = reactive({ name: '', email: '', message: '' })

/**
 * No backend yet — the form composes a mailto so nothing is silently dropped.
 * Swap this for a POST to /api/contact (or Formspree/Resend) when one exists.
 */
const submit = () => {
  const subject = encodeURIComponent(`Halo Farid — dari ${form.name || 'website'}`)
  const body = encodeURIComponent(`${form.message}\n\n—\n${form.name}\n${form.email}`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section id="contact" class="section">
    <div class="wrap">
      <SectionHead
        num="06"
        eyebrow="Contact"
        title="Punya project atau posisi yang cocok?"
        lead="Cerita saja soal kameranya, lokasinya, dan apa yang mau dideteksi — sisanya kita bedah bareng."
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
                <small>Location</small>
                {{ profile.location }}
              </span>
            </div>
          </div>
        </div>

        <form class="form reveal" v-reveal="90" @submit.prevent="submit">
          <div class="field">
            <label for="cf-name">Nama</label>
            <input id="cf-name" v-model="form.name" type="text" required placeholder="Nama kamu" />
          </div>
          <div class="field">
            <label for="cf-email">Email</label>
            <input id="cf-email" v-model="form.email" type="email" required placeholder="kamu@email.com" />
          </div>
          <div class="field">
            <label for="cf-message">Pesan</label>
            <textarea
              id="cf-message"
              v-model="form.message"
              required
              placeholder="Ceritain project atau posisinya…"
            />
          </div>
          <button class="btn btn-primary" type="submit" style="width: 100%">
            <AppIcon name="send" />
            Kirim pesan
          </button>
          <p class="form-note">Form ini membuka aplikasi email kamu — belum ada backend yang menyimpan pesan.</p>
        </form>
      </div>
    </div>
  </section>
</template>
