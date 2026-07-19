<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const store = useUserStore()
const active = ref('node_price')
const collapsed = ref(false)
onMounted(() => { if (!store.userInfo) store.fetchUser() })

const menu = [
  { key: 'node_price', icon: '⚡', label: '节点电价' },
  { key: 'load_data', icon: '📊', label: '负荷数据' },
  { key: 'new_energy', icon: '🔋', label: '新能源出力' },
  { key: 'spot_trade', icon: '💹', label: '现货交易' },
  { key: 'weather', icon: '🌤', label: '天气数据' },
  { key: 'customer', icon: '🏭', label: '客户档案' },
  { key: 'bill', icon: '📋', label: '账单管理' },
]
</script>

<template>
  <div class="layout" :class="{ collapsed }">
    <!-- 常驻小按钮 -->
    <button class="toggle" @click="collapsed = !collapsed">
      <span>{{ collapsed ? '›' : '‹' }}</span>
    </button>

    <aside v-show="!collapsed">
      <div class="logo"><span class="mi">⚡</span><span class="logo-text">售电管理</span></div>
      <nav>
        <button v-for="m in menu" :key="m.key" :class="{ on: active === m.key }" @click="active = m.key">
          <span class="mi">{{ m.icon }}</span><span>{{ m.label }}</span>
        </button>
      </nav>
      <div class="sidebar-footer">
        <div v-if="store.userInfo" class="user-info">
          <div class="uname">{{ store.userInfo.username }}</div>
          <div class="urole">{{ store.userInfo.role }}</div>
        </div>
        <button class="btn btn-ghost sm" @click="store.logout"><span>退出</span></button>
      </div>
    </aside>

    <main>
      <div class="page-head">
        <h1>{{ menu.find(m => m.key === active)?.label }}</h1>
        <div class="badge">{{ active }}</div>
      </div>
      <div class="content-card"><p class="placeholder">数据加载中...</p></div>
    </main>
  </div>
</template>

<style scoped>
.layout { position: relative; z-index: 10; display: flex; min-height: 100vh; }

.toggle {
  position: fixed;
  top: 22px;
  z-index: 30;
  width: 28px;
  height: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--t3);
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color .2s, left .2s;
  left: 174px;
}
.toggle:hover { color: var(--cyan); }
.collapsed .toggle { left: 14px; }

aside {
  width: 200px;
  background: var(--surface);
  backdrop-filter: blur(30px) saturate(2);
  border-right: 1px solid var(--border);
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0; bottom: 0; left: 0;
}

.logo { display: flex; align-items: center; justify-content: center; gap: 8px; padding-bottom: 20px; border-bottom: 1px solid var(--border); margin-bottom: 16px; width: 100%; }
.logo-text { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 400; letter-spacing: .06em; background: linear-gradient(135deg, var(--cyan-b), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

nav { flex: 1; display: flex; flex-direction: column; gap: 4px; width: 100%; }

nav button {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  padding: 11px 8px; background: transparent; border: none; border-radius: 12px;
  color: var(--t2); font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 300;
  cursor: pointer; transition: background .2s, color .2s; white-space: nowrap; width: 100%;
}
nav button:hover { background: rgba(255,255,255,.03); color: var(--t1); }
nav button.on { background: linear-gradient(135deg, rgba(0,212,170,.1), rgba(0,212,170,.03)); color: var(--cyan); font-weight: 400; border: 1px solid rgba(0,212,170,.12); }

.mi { font-size: 16px; flex-shrink: 0; }

.sidebar-footer { border-top: 1px solid var(--border); padding-top: 14px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; }
.user-info { flex: 1; min-width: 0; }
.uname { font-size: 13px; font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.urole { font-size: 11px; color: var(--t3); }
.sm { padding: 8px 12px; font-size: 12px; flex-shrink: 0; }

main { flex: 1; margin-left: 200px; padding: 40px; transition: margin-left .2s; }
.collapsed main { margin-left: 0; }

.page-head { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
.page-head h1 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; }
.badge { display: inline-flex; padding: 4px 14px; background: rgba(0,212,170,.06); border: 1px solid rgba(0,212,170,.12); border-radius: 100px; font-size: .6rem; font-weight: 600; letter-spacing: .15em; color: var(--cyan); }

.content-card { background: var(--surface); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: var(--r); padding: 48px; }
.placeholder { color: var(--t3); font-weight: 300; text-align: center; }
</style>
