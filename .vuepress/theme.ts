import { hopeTheme } from "vuepress-theme-hope";


// 我们默认导出了主题对象
export default hopeTheme({
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
        text: '关于我',
        link: '/md/about/'
      }
    ],
    sidebar: false
});

// export default theme = edefaultTheme({
//     // 默认主题配置
//     navbar: [
//       {
//         text: '首页',
//         link: '/',
//       },
//       {
//         text: 'java',
//         children: [
//           {
//             text: '面向对象基础',
//             link: '/java/oop',
//           },
//           {
//             text: '面向对象基础1',
//             link: '/java/oop',
//           },
//         ],
//       },
//       {
//         text: '关于我',
//         link: '/md/about'
//       }
//     ],
//     // 你也可以直接将它设置为一个 URL
//     repo: 'https://github.com/foo/bar',
//     sidebar: false
//   })