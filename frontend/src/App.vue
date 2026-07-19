<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 鼠标光晕
  const glow = document.querySelector('.cursor-glow')
  if (glow) {
    document.onmousemove = e => requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
    })
  }
  // 粒子
  const box = document.querySelector('.particles')
  if (box) {
    for (let i = 0; i < 25; i++) {
      const s = document.createElement('div')
      s.className = 'pt'
      const size = 1 + Math.random() * 2
      s.style.cssText = `left:${Math.random()*100}%;width:${size}px;height:${size}px;background:${Math.random()>.5?'var(--cyan)':'var(--blue)'};animation-duration:${10+Math.random()*15}s;animation-delay:${Math.random()*12}s;box-shadow:0 0 ${size*4}px currentColor`
      box.appendChild(s)
    }
  }
})
</script>

<template>
  <div class="cursor-glow"></div>
  <div class="bg">
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
    <div class="bg-grid"></div>
    <div class="bg-vig"></div>
  </div>
  <div class="particles"></div>
  <router-view />
</template>
