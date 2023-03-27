import { link } from 'fs';
import { text } from 'stream/consumers';
import { defineUserConfig, defaultTheme } from 'vuepress';
// import { hopeTheme } from './theme.js'
import { hopeTheme } from "vuepress-theme-hope";


export default defineUserConfig({
    base: 'mydoc',
    lang: 'zh-CN',
    title: '学无止境！',
    description: '苦作乐！',
    theme: hopeTheme({
      // 主题配置
      navbar: [
        {
          text: '首页',
          link: "/"
        },
        {
          text: 'java',
          children: [
            {
              text: '面向对象基础',
              link: '/java/oop/',
            },
            {
              text: '面向对象基础1',
              link: '/java/oop/',
            },
          ],
        },
        {
          text: '软考',
          children: [
                {
                text: '计算机基础知识',
                children: [       
                  {
                    text: '操作系统知识',
                    link: '/md/ruankao/技术类/计算机基础知识/操作系统基础/README.md',
                  },           
                    {
                      text: '计算机基础',
                      link: '/md/ruankao/技术类/计算机基础知识/计算机基础/'
                    },
                    {
                      text: '计算机网络基础',
                      link: '/md/ruankao/技术类/计算机基础知识/计算机网络基础/'
                    },
                    {
                      text: '数据库基础',
                      link: '/md/ruankao/技术类/计算机基础知识/数据库基础/'
                    }
                ]
              },
            {
              text: '系统架构设计师',
              link: '/md/about/'
            }
          ]
        },
        {
          text: '关于我',
          link: '/md/about/'
        }
      ],
      repo: 'calvinie/mydoc',
      sidebar: false
  }),
  plugins: [
  ]
  })
