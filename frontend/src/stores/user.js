import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '../api/user'
import router from '../router'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)

  // 用户名密码登录
  async function login(form) {
    const { data } = await api.login(form)
    setAuth(data)
  }

  // 手机号验证码登录
  async function loginByPhone(form) {
    const { data } = await api.loginPhone(form)
    setAuth(data)
  }

  // 注册
  async function register(form) {
    await api.register(form)
  }

  // 获取用户信息
  async function fetchUser() {
    const { data } = await api.getHome()
    userInfo.value = data
  }

  // 退出登录
  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  // 存 token + 用户信息 + 跳首页
  function setAuth(data) {
    token.value = data.access_token
    userInfo.value = data.user
    localStorage.setItem('token', data.access_token)
    router.push('/')
  }

  return { token, userInfo, login, loginByPhone, register, fetchUser, logout }
})
