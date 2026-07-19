<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { sendCode } from '../api/user'

const store = useUserStore()
const tab = ref('pwd')
const f = ref({ username: '', password: '', phone: '', code: '' })
const loading = ref(false)
const error = ref('')
const cd = ref(0)
const codeText = computed(() => cd.value > 0 ? `${cd.value}s` : '获取验证码')

async function send() {
  try { await sendCode(f.value.phone); cd.value = 60; const t = setInterval(() => { if (--cd.value <= 0) clearInterval(t) }, 1000) }
  catch (e) { error.value = e.response?.data?.detail || '发送失败' }
}

async function submit() {
  loading.value = true; error.value = ''
  try {
    tab.value === 'pwd'
      ? await store.login({ username: f.value.username, password: f.value.password })
      : await store.loginByPhone({ phone: f.value.phone, code: f.value.code })
  } catch (e) { error.value = e.response?.data?.detail || '登录失败' }
  finally { loading.value = false }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="card-glow"></div>
      <div class="badge">Electricity Sales System</div>
      <h1>售电管理</h1>
      <div class="divider"></div>

      <div class="tabs">
        <button :class="{ on: tab === 'pwd' }" @click="tab = 'pwd'; error = ''"><span>密码登录</span></button>
        <button :class="{ on: tab === 'sms' }" @click="tab = 'sms'; error = ''"><span>验证码登录</span></button>
      </div>

      <form @submit.prevent="submit" style="display:flex;flex-direction:column;gap:12px;animation:up .8s var(--e) .4s both">
        <template v-if="tab === 'pwd'">
          <input v-model="f.username" placeholder="用户名" autocomplete="username" />
          <input v-model="f.password" type="password" placeholder="密码" autocomplete="current-password" />
        </template>
        <template v-else>
          <input v-model="f.phone" placeholder="手机号" />
          <div class="code-row">
            <input v-model="f.code" placeholder="验证码" />
            <button type="button" class="btn btn-ghost code-btn" :disabled="cd > 0 || !f.phone" @click="send">{{ codeText }}</button>
          </div>
        </template>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="btn btn-primary full" :disabled="loading"><span>{{ loading ? '验证中...' : '登 录' }}</span></button>
      </form>

      <p class="link">还没有账号？<router-link to="/register">立即注册</router-link></p>
    </div>
  </div>
</template>
