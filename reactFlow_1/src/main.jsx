import './polyfills'

// 全局关闭部分控制台输出（log/info/debug）
// (() => {
//   try {
//     const noop = () => {}
//     if (typeof console !== 'undefined') {
//       try { if (typeof console.log === 'function') console.log = noop } catch {}
//       try { if (typeof console.info === 'function') console.info = noop } catch {}
//       try { if (typeof console.debug === 'function') console.debug = noop } catch {}
//     }
//   } catch {}
// })()
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

// // 全局关闭控制台输出（生产/当前需求）
// (() => {
//   try {
//     const noop = () => {}
//     // 仅当存在对象且为函数再覆盖
//     if (typeof console !== 'undefined') {
//       try { if (typeof console.log === 'function') console.log = noop } catch {}
//       try { if (typeof console.warn === 'function') console.warn = noop } catch {}
//       try { if (typeof console.error === 'function') console.error = noop } catch {}
//     }
//   } catch {}
// })()

// 暂时禁用 StrictMode 以避免开发环境双重请求
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
