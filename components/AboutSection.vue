<script setup lang="ts">
const { about, profile } = usePortfolio()

/** Only **bold** is supported — the copy is authored in usePortfolio, not user input. */
const emphasise = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
</script>

<template>
  <section id="about" class="section">
    <div class="wrap">
      <SectionHead
        num="01"
        eyebrow="About"
        title="Engineer first, supervisor second."
        :lead="profile.summary"
      />

      <div class="about">
        <div class="about-body">
          <p
            v-for="(para, i) in about.paragraphs"
            :key="i"
            class="reveal"
            v-reveal="i * 80"
            v-html="emphasise(para)"
          />
        </div>

        <aside class="about-panel reveal" v-reveal="120">
          <h3>Quick facts</h3>
          <ul class="about-list">
            <li v-for="fact in about.facts" :key="fact.k">
              <b>{{ fact.k }}</b>
              <span>{{ fact.v }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>
