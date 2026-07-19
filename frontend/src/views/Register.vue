<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { sendCode } from '../api/user'

const store = useUserStore()
const router = useRouter()
const f = ref({ username: '', phone: '', password: '', confirm: '', code: '' })
const loading = ref(false)
const error = ref('')
const cd = ref(0)
const codeText = computed(() => cd.value > 0 ? `${cd.value}s` : '获取验证码')

async function send() {
  try { await sendCode(f.value.phone); cd.value = 60; const t = setInterval(() => { if (--cd.value <= 0) clearInterval(t) }, 1000) }
  catch (e) { error.value = e.response?.data?.detail || '发送失败' }
}

async function submit() {
  if (f.value.password !== f.value.confirm) { error.value = '两次密码不一致'; return }
  loading.value = true; error.value = ''
  try { await store.register({ username: f.value.username, phone: f.value.phone, password: f.value.password, code: f.value.code }); router.push('/login') }
  catch (e) { error.value = e.response?.data?.detail || '注册失败' }
  finally { loading.value = false }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="card-glow"></div>
      <div class="badge">Create Account</div>
      <h1>创建账号</h1>
      <div class="divider"></div>

      <form @submit.prevent="submit" style="display:flex;flex-direction:column;gap:12px;animation:up .8s var(--e) .35s both">
        <input v-model="f.username" placeholder="用户名" autocomplete="username" />
        <input v-model="f.phone" placeholder="手机号" />
        <div class="code-row">
          <input v-model="f.code" placeholder="验证码" />
          <button type="button" class="btn btn-ghost code-btn" :disabled="cd > 0 || !f.phone" @click="send">{{ codeText }}</button>
        </div>
        <input v-model="f.password" type="password" placeholder="密码" autocomplete="new-password" />
        <input v-model="f.confirm" type="password" placeholder="确认密码" autocomplete="new-password" />
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="btn btn-primary full" :disabled="loading"><span>{{ loading ? '注册中...' : '注 册' }}</span></button>
      </form>

      <p class="link">已有账号？<router-link to="/login">去登录</router-link></p>
    </div>
  </div>
</template>
