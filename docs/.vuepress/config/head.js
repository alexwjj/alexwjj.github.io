// head
module.exports = [
  ["script", {}, "(()=>{const h=location.hostname;const o=h==='weightbook.icu'||h.endsWith('.weightbook.icu')?'https://alexwjj-hub.weightbook.icu':'https://alexwjj-hub.vercel.app';const s=document.createElement('script');s.type='module';s.async=true;s.src=o+'/sdk/hub.js?project=alexwjj-github-io';document.head.appendChild(s)})();"],
  [
    "link",
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  [
    "meta",
    {
      name: "keywords",
      content:
        "俊劫,俊劫的博客,博客,个人博客,vue,vuejs,vuepress,vuepress-theme-reco",
    },
  ],
  [
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,user-scalable=no",
    },
  ],
  [
    "meta",
    {
      name: "baidu-site-verification",
      content: "code-qA2kKqLXFO",
    },
  ],
];
