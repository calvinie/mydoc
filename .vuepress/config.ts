import { defineUserConfig, defaultTheme } from 'vuepress';
// import { hopeTheme } from './theme.js'
import { hopeTheme } from "vuepress-theme-hope";
import navbar from './public/json/navbar.json'
import sidebar from './public/json/sidebar.json'
import { tocPlugin } from '@vuepress/plugin-toc'



export default defineUserConfig({
    lang: 'zh-CN',
    title: '学无止境！',
    description: '苦作乐！',
    theme: hopeTheme({
      // 主题配置
      navbar,
      repo: 'calvinie/mydoc',
      sidebar
  }),
  plugins: [
    tocPlugin({
      // 配置项
    })
  ]
  })