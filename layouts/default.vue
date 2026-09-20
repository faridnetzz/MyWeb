<template>
  <div>
    <ScrollProgress />
    <SiteHeader />

    <main>
      <slot />
    </main>

    <SiteFooter />
    <BackToTop />
    <CommandPalette />
  </div>
</template>
