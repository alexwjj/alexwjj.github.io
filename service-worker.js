/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "700d7fbf883b8a9d97e1e69ed0c6cb46"
  },
  {
    "url": "archives/index.html",
    "revision": "13857e8111532cf94656cc0d14d8c957"
  },
  {
    "url": "assets/css/0.styles.c04ea52f.css",
    "revision": "7b22f14ad2305fbffee3a6e71802ea39"
  },
  {
    "url": "assets/img/loading.18d75e19.gif",
    "revision": "18d75e19791c1d042f102e088f463d8a"
  },
  {
    "url": "assets/js/10.39713a02.js",
    "revision": "465afdfc318b4b22156e2ec983a20bf3"
  },
  {
    "url": "assets/js/100.4ed29243.js",
    "revision": "9c40dd8ba201ed3601e8562a3244bafa"
  },
  {
    "url": "assets/js/101.5cbe7233.js",
    "revision": "2963dd3b7cf0e50c466db57771130fc6"
  },
  {
    "url": "assets/js/102.c0397e6e.js",
    "revision": "c889503b69fdebf78efe61096cfd6981"
  },
  {
    "url": "assets/js/11.ec569cef.js",
    "revision": "25a4084c47ae4820d5b9a29dfc2c1657"
  },
  {
    "url": "assets/js/12.522ecdc3.js",
    "revision": "5e2fb0c67b86b03919905fd07886f05e"
  },
  {
    "url": "assets/js/13.207c68b0.js",
    "revision": "f277482494dbed2cbabd20a9548c9e05"
  },
  {
    "url": "assets/js/14.6f3bfd93.js",
    "revision": "4adaa3762510514291d2f6615d5385cb"
  },
  {
    "url": "assets/js/15.08fd035b.js",
    "revision": "55799d3ef274b241ebb883775bb42e26"
  },
  {
    "url": "assets/js/16.53c5ba40.js",
    "revision": "36c8f6ad5e9f8a214d735b43751b3dcb"
  },
  {
    "url": "assets/js/17.567d1b3b.js",
    "revision": "dc26af1bfd42c7076e6d8680af001548"
  },
  {
    "url": "assets/js/18.f91f108b.js",
    "revision": "5ae560b7cbab3790d60c78dd78fda585"
  },
  {
    "url": "assets/js/19.ace28d8d.js",
    "revision": "44629c1e270beece744b6d9e2f473587"
  },
  {
    "url": "assets/js/2.c8a47147.js",
    "revision": "c4e93b0caac4bf7a5b6472ee05963152"
  },
  {
    "url": "assets/js/20.2097d503.js",
    "revision": "82cf4f906a19c151da2c2f723f18678a"
  },
  {
    "url": "assets/js/21.79ddc836.js",
    "revision": "095840c8bf28619b2a8c6ba12ba8d9c9"
  },
  {
    "url": "assets/js/22.6b98a5ce.js",
    "revision": "d4bd3ee610d80774c44f37f2727b6c10"
  },
  {
    "url": "assets/js/23.34c9303f.js",
    "revision": "4e667e84a4db1c467aec2e88929dace1"
  },
  {
    "url": "assets/js/24.45439902.js",
    "revision": "896a4d2ec5e5fa14e684e06d84ebdb03"
  },
  {
    "url": "assets/js/25.4d89bcf7.js",
    "revision": "5234abdb4fa2bb132f13e552c537c982"
  },
  {
    "url": "assets/js/26.fa4711d9.js",
    "revision": "34615164b28c2c183380e7423f18a102"
  },
  {
    "url": "assets/js/27.b62d88a6.js",
    "revision": "84bf9deae7e7d6a98b0b66aa8989136b"
  },
  {
    "url": "assets/js/28.4308d800.js",
    "revision": "1c1d70bb4b7b8cb157c77a625bbe99ff"
  },
  {
    "url": "assets/js/29.8f086102.js",
    "revision": "bc73fa67d3dcbb8280c1a7e9bccb9b79"
  },
  {
    "url": "assets/js/3.107a69e3.js",
    "revision": "54270406621b602f6a3247213969e674"
  },
  {
    "url": "assets/js/30.4862bcdb.js",
    "revision": "8939c7df595000cd8588c224f3d2a396"
  },
  {
    "url": "assets/js/31.ef40ed08.js",
    "revision": "bc8db6048608edfa4bf243e094c73b5e"
  },
  {
    "url": "assets/js/32.404d2163.js",
    "revision": "e7d1f9ba5fe8cbb09fbf58cd03812717"
  },
  {
    "url": "assets/js/33.f63d91fa.js",
    "revision": "2dd4cf3f64d4510bd9dc3539ec9f4390"
  },
  {
    "url": "assets/js/34.69c0674d.js",
    "revision": "1e9096fdc90a8cf98e9582771fcf5223"
  },
  {
    "url": "assets/js/35.9c66d81d.js",
    "revision": "95ce8d085a29c360ba18399fc236a8ec"
  },
  {
    "url": "assets/js/36.ded0642d.js",
    "revision": "e650adec60512167532e94f5ea78223d"
  },
  {
    "url": "assets/js/37.30c5a805.js",
    "revision": "48fa25862aad304ccc5c6c9d519c0a71"
  },
  {
    "url": "assets/js/38.93da81b5.js",
    "revision": "456018311392c5773ed5ebf49f7b5a48"
  },
  {
    "url": "assets/js/39.28df12f4.js",
    "revision": "f46790980ccde02bf855430dd1bcb881"
  },
  {
    "url": "assets/js/4.cb75aceb.js",
    "revision": "77552421ed989e9f7b994300cf98aff7"
  },
  {
    "url": "assets/js/40.0da8149c.js",
    "revision": "96cedf68bb42ae0192b1e0cf30bc028b"
  },
  {
    "url": "assets/js/41.9a5e62f5.js",
    "revision": "5f3d86e26a29af7ea2f3258b8328d8c0"
  },
  {
    "url": "assets/js/42.7b2f1416.js",
    "revision": "bf57b65a37949c63621fd0d26dd03935"
  },
  {
    "url": "assets/js/43.8c114613.js",
    "revision": "5704bd59901ac7145bea92b13972cebf"
  },
  {
    "url": "assets/js/44.eb1f3126.js",
    "revision": "dd876e50b17ec10816b5d90380a32950"
  },
  {
    "url": "assets/js/45.6af6c4c9.js",
    "revision": "13018b5e48de521d3f6cf91ee218bfc9"
  },
  {
    "url": "assets/js/46.c520d5cd.js",
    "revision": "c857b493866373476a4b6858231aa74f"
  },
  {
    "url": "assets/js/47.28c830d7.js",
    "revision": "0ddcaca5ba5faa5569a4d2de2456bf6b"
  },
  {
    "url": "assets/js/48.b290a6e6.js",
    "revision": "0ead171d87c7a2f1c65b5c2c3187ff32"
  },
  {
    "url": "assets/js/49.caa1af05.js",
    "revision": "62547d3b23dd3de7d6a3df76db043ca7"
  },
  {
    "url": "assets/js/5.1928d672.js",
    "revision": "38a6d99e288bb83f977b46f062756cfe"
  },
  {
    "url": "assets/js/50.0161c4f4.js",
    "revision": "8d430c5d2ec6e8e9d58d213ccdff59ff"
  },
  {
    "url": "assets/js/51.33bf45cb.js",
    "revision": "ccb49df9acd2b4dc3096fa92ebe85096"
  },
  {
    "url": "assets/js/52.b33ed170.js",
    "revision": "1906cbb52da8ff36f04eec6897c6cb26"
  },
  {
    "url": "assets/js/53.a37995e8.js",
    "revision": "6baa58a3e53d6d136d7e95d6c38ece34"
  },
  {
    "url": "assets/js/54.9b36e93b.js",
    "revision": "7953b4424017e485d3b1c19c7cb9700c"
  },
  {
    "url": "assets/js/55.c7c2b4ff.js",
    "revision": "20481470acfb9c9235727842f2c58d00"
  },
  {
    "url": "assets/js/56.1d3980d6.js",
    "revision": "a968b7ee739147a759671f7e74e532b8"
  },
  {
    "url": "assets/js/57.205fc147.js",
    "revision": "0c209a146bee46759b9890aa12834f7f"
  },
  {
    "url": "assets/js/58.4fe4e658.js",
    "revision": "304c25b144cfcb74ef79d84cd9b934fc"
  },
  {
    "url": "assets/js/59.b5e46b99.js",
    "revision": "beeca4090244c78e3b7365f89f413f35"
  },
  {
    "url": "assets/js/6.ef94a230.js",
    "revision": "265f7912ed22cd80cb85f9dbebd25e23"
  },
  {
    "url": "assets/js/60.e4895bcb.js",
    "revision": "27cd8208824bb98ba7d144e50ebf4250"
  },
  {
    "url": "assets/js/61.b54502c5.js",
    "revision": "6492279c3035a43037cf7eeb3b3f6ace"
  },
  {
    "url": "assets/js/62.e8847cb0.js",
    "revision": "727462483173d2bd7f5ffb5fd6724355"
  },
  {
    "url": "assets/js/63.cfad8307.js",
    "revision": "9026c01fc87e3783970ca57ac91668c4"
  },
  {
    "url": "assets/js/64.e743e2aa.js",
    "revision": "b43dd0a6235a7ad2320054c27a61c5e0"
  },
  {
    "url": "assets/js/65.7ba8a405.js",
    "revision": "c867f8232de8ee8f09f04884e319d348"
  },
  {
    "url": "assets/js/66.e6d37000.js",
    "revision": "1ebe382c7410bf02afef35c84df38ebc"
  },
  {
    "url": "assets/js/67.6b144fc4.js",
    "revision": "06f0d7e1492cce5b0c186b59336d2db2"
  },
  {
    "url": "assets/js/68.07338ba8.js",
    "revision": "2fe38a0196aaee3439da92bf038fb166"
  },
  {
    "url": "assets/js/69.e6dbc415.js",
    "revision": "1df61b6b7b1ceb96e07cf54aa07492bc"
  },
  {
    "url": "assets/js/7.3bb3e13d.js",
    "revision": "a413001d434d6a092236a00b428577a3"
  },
  {
    "url": "assets/js/70.cf6248f4.js",
    "revision": "c340871e1ca4a84a6969f0695404b64a"
  },
  {
    "url": "assets/js/71.7e0cafe9.js",
    "revision": "9d1d9b175feee36db715fee5dd3b4305"
  },
  {
    "url": "assets/js/72.f15c538f.js",
    "revision": "19d1ce01f83e8a2579f9af6bc25a2d96"
  },
  {
    "url": "assets/js/73.c1840ab2.js",
    "revision": "700d3f08d0fcf89f36cd5a6621ea94bd"
  },
  {
    "url": "assets/js/74.24bd1bfb.js",
    "revision": "0aaad254bdfb0927f5e672f9662e567d"
  },
  {
    "url": "assets/js/75.c4b01dec.js",
    "revision": "ebb94d990adf46df779b67e77bd703fd"
  },
  {
    "url": "assets/js/76.231b0541.js",
    "revision": "79a64fffcb70996cafc1b309a7a83bd6"
  },
  {
    "url": "assets/js/77.c84f02f9.js",
    "revision": "1355544a2dc6ac403caf6d72bde068db"
  },
  {
    "url": "assets/js/78.c7eb89b7.js",
    "revision": "2b5e2f2fd33f7d4374c805064ce0e8a0"
  },
  {
    "url": "assets/js/79.cf86868f.js",
    "revision": "2e8a57fe6b17c4b1a50d91cf949c817c"
  },
  {
    "url": "assets/js/8.e078f2c8.js",
    "revision": "96d24af3a6546dc28dce638f15dbf59b"
  },
  {
    "url": "assets/js/80.f8c4d374.js",
    "revision": "8abb8ac1235b6e0a39aa4e3c475fdff6"
  },
  {
    "url": "assets/js/81.ad369766.js",
    "revision": "aa5970f7473afd01410b858b001d0b37"
  },
  {
    "url": "assets/js/82.a628fc41.js",
    "revision": "9aa42b4495a204e5eb536b1d0ca13a98"
  },
  {
    "url": "assets/js/83.13a7cf10.js",
    "revision": "96cb774acc63fb27a7ac9b66e01d1285"
  },
  {
    "url": "assets/js/84.b4a2d432.js",
    "revision": "253e5f81e480df4ac9523b069b898c32"
  },
  {
    "url": "assets/js/85.61647e4e.js",
    "revision": "8c5534410907a5ceaf3c64f18e1ab483"
  },
  {
    "url": "assets/js/86.a00e1dd4.js",
    "revision": "382a4a4eb2bf9ec2b0449c6d280ee007"
  },
  {
    "url": "assets/js/87.0f62c2ae.js",
    "revision": "b5bd4eff32bac513a22a454335d66f7d"
  },
  {
    "url": "assets/js/88.097d7ab5.js",
    "revision": "5fa9b7f1e0138b3d5aa93a5d30256c8c"
  },
  {
    "url": "assets/js/89.441809aa.js",
    "revision": "8fc7ee163283de87b7faad599d6f6b2c"
  },
  {
    "url": "assets/js/9.c2449896.js",
    "revision": "98813280c0df6e37872e66bb1620c21a"
  },
  {
    "url": "assets/js/90.813e2988.js",
    "revision": "f437b06e06f6a39201cf232f92aa9bea"
  },
  {
    "url": "assets/js/91.b18c5ec1.js",
    "revision": "4a27badb1bbb528d0fdf69439ec815dd"
  },
  {
    "url": "assets/js/92.ef45e850.js",
    "revision": "d95851eb06a8152348c543ac6d0dee15"
  },
  {
    "url": "assets/js/93.997258f2.js",
    "revision": "650332e11342af730de6d6b810363687"
  },
  {
    "url": "assets/js/94.98247d47.js",
    "revision": "c8a0f5b7ea51131e34877d153cf5eb4f"
  },
  {
    "url": "assets/js/95.6a9841fb.js",
    "revision": "9f6a84feb742fe49a50e1ef36132e6fa"
  },
  {
    "url": "assets/js/96.93f2653d.js",
    "revision": "9ed003c82863a285b0090b2e24865bdc"
  },
  {
    "url": "assets/js/97.22b04994.js",
    "revision": "50f2bf665017afc1d5198b48e026d9b3"
  },
  {
    "url": "assets/js/98.5ac1583b.js",
    "revision": "a4d3b18f6aa18b2e14cc86ab7b277950"
  },
  {
    "url": "assets/js/99.de2d3b40.js",
    "revision": "adcbddc51f0d5b00b2c4c400993895f7"
  },
  {
    "url": "assets/js/app.25a6c90c.js",
    "revision": "62b8ed685a59e838b9343f49cfc53d1d"
  },
  {
    "url": "baidu_verify_code-qA2kKqLXFO.html",
    "revision": "bd90e0a808ea51f25c0ec9c619cd3b0a"
  },
  {
    "url": "bookshop/friendslink/index.html",
    "revision": "283ceaa6b770d41917ec483cbcdf363e"
  },
  {
    "url": "bookshop/linkme/index.html",
    "revision": "040ccdb8fa724e4ad999dc0435ba9d85"
  },
  {
    "url": "bookshop/message-board/index.html",
    "revision": "8da52fb7f4a2623e6aadbc076504ba12"
  },
  {
    "url": "categories/index.html",
    "revision": "c0a3b5359258b31ecc03f3f079c7d1fd"
  },
  {
    "url": "fe-optimize-ppt/dist/index.css",
    "revision": "6a85ecbd56893b84c2ced56cac0d87ad"
  },
  {
    "url": "fe-optimize-ppt/dist/reset.css",
    "revision": "4042c1a43777d540673cabc97cec67b2"
  },
  {
    "url": "fe-optimize-ppt/dist/reveal.css",
    "revision": "fb190b58a8ad7e758578f8908f66e738"
  },
  {
    "url": "fe-optimize-ppt/dist/reveal.esm.js",
    "revision": "551ac08d8cf1e54d9f864fd9d997a977"
  },
  {
    "url": "fe-optimize-ppt/dist/reveal.js",
    "revision": "0d51b30ccefb9fa78c3b0299f70e8ba4"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/beige.css",
    "revision": "168843d058f77ce1b862753eca43d30c"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/black.css",
    "revision": "8a3401cc1e186995a9a7fc8a4b99bb82"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/blood.css",
    "revision": "19425df0662435565eb8e1a63e65dddc"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/league-gothic/league-gothic.css",
    "revision": "488966d15e97f072801d7e348f4b5141"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/league-gothic/league-gothic.eot",
    "revision": "9900a4643cc63c5d8f969d2196f72572"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/league-gothic/league-gothic.ttf",
    "revision": "91295fa87df918411b49b7531da5d558"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/league-gothic/league-gothic.woff",
    "revision": "cd382dc8a9d6317864b5810a320effc5"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.eot",
    "revision": "72217712eb8d28872e7069322f3fda23"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.ttf",
    "revision": "8256cfd7e4017a7690814879409212cd"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-italic.woff",
    "revision": "e74f0128884561828ce8c9cf5c284ab8"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.eot",
    "revision": "1d71438462d532b62b05cdd7e6d7197d"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.ttf",
    "revision": "2da39ecf9246383937da11b44b7bd9b4"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-regular.woff",
    "revision": "e7acc589bb558fe58936a853f570193c"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.eot",
    "revision": "0f3da1edf1b5c6a94a6ad948a7664451"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.ttf",
    "revision": "f3565095e6c9158140444970f5a2c5ed"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibold.woff",
    "revision": "1cb8e94f1185f1131a0c895165998f2b"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.eot",
    "revision": "58153ac7194e141d1e73ea88c6b63861"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.ttf",
    "revision": "c7e698a4d0956f4a939f42a05685bbf5"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro-semibolditalic.woff",
    "revision": "6b058fc2634b01d837c3432316c3141f"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/fonts/source-sans-pro/source-sans-pro.css",
    "revision": "5ae239fba183e7f0dd606e4c79caf533"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/league.css",
    "revision": "2fab5ea22adfd7f54895534568de3a6c"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/moon.css",
    "revision": "4b5c35dbcf6447be91bdb5e8cc503057"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/night.css",
    "revision": "ab28f9552296fbef915916adf1d2bd8f"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/serif.css",
    "revision": "2a041eb1d6931608f224bd30c174f48c"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/simple.css",
    "revision": "a7b43905ec2f19f2e74d38233d45d44f"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/sky.css",
    "revision": "105ae904114465f48da51860171b6858"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/solarized.css",
    "revision": "ef1a9af27a4f36d2bf2955801b598b5a"
  },
  {
    "url": "fe-optimize-ppt/dist/theme/white.css",
    "revision": "a3b0a31c1d49bbed890bf1a4b2222a29"
  },
  {
    "url": "fe-optimize-ppt/index.html",
    "revision": "303f4a2868300a036e421e5fe31d11d1"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/highlight.esm.js",
    "revision": "a8d0717a9a746848cff76bafdcdc295d"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/highlight.js",
    "revision": "691702d292e8fc58261570028f7af601"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/monokai.css",
    "revision": "8c43a819e1268fc57605f500adff816b"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/plugin.js",
    "revision": "f6168dfe21b1bd3d98d09916fb6bd641"
  },
  {
    "url": "fe-optimize-ppt/plugin/highlight/zenburn.css",
    "revision": "28d5b9497037a12cb5a15644fea2f1c3"
  },
  {
    "url": "fe-optimize-ppt/plugin/markdown/markdown.esm.js",
    "revision": "fdfa34f2c1d23b8386ea91464acaf7ff"
  },
  {
    "url": "fe-optimize-ppt/plugin/markdown/markdown.js",
    "revision": "9166010a6466bbad0ea0ae00c52b2927"
  },
  {
    "url": "fe-optimize-ppt/plugin/markdown/plugin.js",
    "revision": "2fe72cc983411cf94dd81d679955f141"
  },
  {
    "url": "fe-optimize-ppt/plugin/math/math.esm.js",
    "revision": "1475913f4862b5e8f7f1536391893a18"
  },
  {
    "url": "fe-optimize-ppt/plugin/math/math.js",
    "revision": "533dd2f86ac5475cd0d20d2f77efde36"
  },
  {
    "url": "fe-optimize-ppt/plugin/math/plugin.js",
    "revision": "9be0251dd9411c0a96ee050d5bc3bef1"
  },
  {
    "url": "fe-optimize-ppt/plugin/notes/notes.esm.js",
    "revision": "22a20e5a835c1ce6ec06c8f87ba8dd44"
  },
  {
    "url": "fe-optimize-ppt/plugin/notes/notes.js",
    "revision": "25124c87ba29154deecbec4a95f12005"
  },
  {
    "url": "fe-optimize-ppt/plugin/notes/plugin.js",
    "revision": "49924c937e252f47ac915f643e01ec43"
  },
  {
    "url": "fe-optimize-ppt/plugin/notes/speaker-view.html",
    "revision": "1599c3637c3db09d47992d53891f7e08"
  },
  {
    "url": "fe-optimize-ppt/plugin/search/plugin.js",
    "revision": "032f7408cd38991c3bd861582dd6322d"
  },
  {
    "url": "fe-optimize-ppt/plugin/search/search.esm.js",
    "revision": "132b99229d67db17feda69678556142a"
  },
  {
    "url": "fe-optimize-ppt/plugin/search/search.js",
    "revision": "ecc723fcbd433db7b74fd2cab115ff67"
  },
  {
    "url": "fe-optimize-ppt/plugin/zoom/plugin.js",
    "revision": "20eb10e380080e9f750ec77dedb76618"
  },
  {
    "url": "fe-optimize-ppt/plugin/zoom/zoom.esm.js",
    "revision": "8e430e6444e4f75223fd407e59d20488"
  },
  {
    "url": "fe-optimize-ppt/plugin/zoom/zoom.js",
    "revision": "b209a75b6c4cc6df8dd5383cf9b6ee22"
  },
  {
    "url": "img/avatar-2.jpg",
    "revision": "55b9603cdb0caff91ecd803d047730b1"
  },
  {
    "url": "img/avatar-2.png",
    "revision": "d3a1ca94d8290aa71371dda0664aaf14"
  },
  {
    "url": "img/avatar.jpg",
    "revision": "037dec754a042491ae29f2bc02eb1814"
  },
  {
    "url": "img/avatar.png",
    "revision": "a19cc6aacf9b570b8a4047da4796146f"
  },
  {
    "url": "img/bg.jpg",
    "revision": "c8f26794a0ee092e62abbd0f99857064"
  },
  {
    "url": "img/logo.png",
    "revision": "421642f8c4c77139f133d7d1ec05168c"
  },
  {
    "url": "img/pikapika.jpg",
    "revision": "0b6e65b4475bc068ac04c9c24204f1d4"
  },
  {
    "url": "img/wechat.png",
    "revision": "2704d1953e515766289875286fad8c7c"
  },
  {
    "url": "img/wx-global.png",
    "revision": "18b6df3db6504f9a729dfcaedbdb3f71"
  },
  {
    "url": "index.html",
    "revision": "5c0a7c82bc7b159db93c90ada699f0d2"
  },
  {
    "url": "love-fe.png",
    "revision": "c631ad86af0196d6257306305dd13659"
  },
  {
    "url": "pages/005afb7501ebf/index.html",
    "revision": "5b0dd9e2dc4119a21fe9ee3ad0ef4c92"
  },
  {
    "url": "pages/02cc618debc84/index.html",
    "revision": "15368f0d7dbffa8584d11b4c1e5f2f6c"
  },
  {
    "url": "pages/04ac7e87719d9/index.html",
    "revision": "4afd5aa12171ea1977d3453c509591f1"
  },
  {
    "url": "pages/05c534dbae294/index.html",
    "revision": "a29d0e46cedd64dd6ca8599dc504e65b"
  },
  {
    "url": "pages/0d5c101d17afe/index.html",
    "revision": "88034c7574e115ac14881035a3a2b871"
  },
  {
    "url": "pages/12bb6ee186b54/index.html",
    "revision": "63a9a8d4c71c08da06e154956f26d44c"
  },
  {
    "url": "pages/136f8f068dffe/index.html",
    "revision": "3a21fe3ebdd731c329fdd644c1915552"
  },
  {
    "url": "pages/1736b20fa8753/index.html",
    "revision": "b20838901012382cb8927dedc633f2a5"
  },
  {
    "url": "pages/1972bdb1cd34c/index.html",
    "revision": "deb6b8809cef50db605cbd4ccd35e51f"
  },
  {
    "url": "pages/274c978ad5b9/index.html",
    "revision": "1bfb376318fc9d9227968af00eee7460"
  },
  {
    "url": "pages/290a2fbb1e629/index.html",
    "revision": "c4551006530f41b5dc7236216e6eb028"
  },
  {
    "url": "pages/2c385d954af63/index.html",
    "revision": "72ae55ccd0c22815bb065ca7375927da"
  },
  {
    "url": "pages/38a448a32b1a5/index.html",
    "revision": "267b6cfeddcb13fbedc5d8e055e847c6"
  },
  {
    "url": "pages/3cea8c7d5577f/index.html",
    "revision": "b376dc1ba717890b5aef595ea56340cd"
  },
  {
    "url": "pages/3d292acfbd9ca/index.html",
    "revision": "cda52648fd668014523a66f54caa94dd"
  },
  {
    "url": "pages/3f814143a603f/index.html",
    "revision": "cbd986b418423b25426b2500a4aceae5"
  },
  {
    "url": "pages/416517735bb6/index.html",
    "revision": "5ec2da38d43495fe65aeaec83a1b2cc5"
  },
  {
    "url": "pages/4265332f4a648/index.html",
    "revision": "176b407cecaffe94eba174bbb112208e"
  },
  {
    "url": "pages/43eb19df1cf71/index.html",
    "revision": "8f5b5cf9cbd93128cfc9c6265bc173d2"
  },
  {
    "url": "pages/45a4597f46504/index.html",
    "revision": "61eabff9849ef9a561d19afdd992969b"
  },
  {
    "url": "pages/463caf542a8ff/index.html",
    "revision": "549d1bd413823f86625539c04e00ec73"
  },
  {
    "url": "pages/4737f1e54803f/index.html",
    "revision": "d094605b630b0b5a33480e3e45617e5f"
  },
  {
    "url": "pages/49e2a780662e9/index.html",
    "revision": "a7370e368e608b37faa4db71ace31147"
  },
  {
    "url": "pages/4e3130c16c521/index.html",
    "revision": "7dedd7d8ff861d492e70efc8b5d441ed"
  },
  {
    "url": "pages/4e5aefd9d013e/index.html",
    "revision": "867537940373d6fe84bc049976b75963"
  },
  {
    "url": "pages/512f6ae339a31/index.html",
    "revision": "2974ad9786b209085f1db7dba446d3c1"
  },
  {
    "url": "pages/514d9f101e80a/index.html",
    "revision": "d129234eab73ca1b83805b04c9a3e75c"
  },
  {
    "url": "pages/55e7bb3eb7802/index.html",
    "revision": "03f9001f02be67f53de7079f5aa8c9c6"
  },
  {
    "url": "pages/57a4c8a168dc4/index.html",
    "revision": "299d71ea432112801096a0405ff6f5e2"
  },
  {
    "url": "pages/60de467682ba1/index.html",
    "revision": "33e39288a634257558d05a812acb63f1"
  },
  {
    "url": "pages/614ed4dacc61a/index.html",
    "revision": "e474345198dd8d0fb159731537852ba9"
  },
  {
    "url": "pages/6db6295ccd96/index.html",
    "revision": "e7641a8e0325467cbbc8b393d1678773"
  },
  {
    "url": "pages/71a2332238f87/index.html",
    "revision": "92b620b0a10bfe5fc8ee7f46aa451b43"
  },
  {
    "url": "pages/72dcdd7f52781/index.html",
    "revision": "af293da84a8219015d9e4ec975c93a4d"
  },
  {
    "url": "pages/745d319268407/index.html",
    "revision": "f1242d8f2ccb48430181454f7e4bbeb1"
  },
  {
    "url": "pages/74b89136d37c/index.html",
    "revision": "b564a77fa552ab8b2bcd8a7ed55c754c"
  },
  {
    "url": "pages/77fef2df2a1fa/index.html",
    "revision": "9646603733f843e1a2ed627ee7ea601d"
  },
  {
    "url": "pages/785710818c193/index.html",
    "revision": "f58250743cd98e43c3c1178032b1db42"
  },
  {
    "url": "pages/7e7aff8d9771b/index.html",
    "revision": "2b6a25c8509966607ec2d4264ac96c89"
  },
  {
    "url": "pages/83bbb9b9abbe7/index.html",
    "revision": "55daa910a1c81c74d02899861cfa8d36"
  },
  {
    "url": "pages/8c4ef214c7886/index.html",
    "revision": "9f950becef06235edfc7313beca04ba4"
  },
  {
    "url": "pages/90e7ed083bcfe/index.html",
    "revision": "b4397274b109d66a5a195b7ee7c7c3b9"
  },
  {
    "url": "pages/91bad3266146c/index.html",
    "revision": "c092d414ae1e153a8f4be708e2ae2799"
  },
  {
    "url": "pages/98a7a4ab3b308/index.html",
    "revision": "22e78d230d2adae7aa0a2db1bdb5868e"
  },
  {
    "url": "pages/9c687ea799c4e/index.html",
    "revision": "f5fe3aaefffd5cae438be7580b4d86ca"
  },
  {
    "url": "pages/9c7717d989fc6/index.html",
    "revision": "c3c69037d347cf588282d5efd4e504d7"
  },
  {
    "url": "pages/9de40adc21b12/index.html",
    "revision": "d7858ff0edb006e487dc9dbe67ac4ef4"
  },
  {
    "url": "pages/a336385364f8/index.html",
    "revision": "9780322c6d282268449ef8039709a7ea"
  },
  {
    "url": "pages/a606010c57cc5/index.html",
    "revision": "1ab9b2227b6f8e51a08289832605ad3a"
  },
  {
    "url": "pages/aa9d140ec6135/index.html",
    "revision": "e1f44387391a197bc53f626748418a0d"
  },
  {
    "url": "pages/ac34940436a4a/index.html",
    "revision": "d76c3dfde00496abf8d5f16bc203c55b"
  },
  {
    "url": "pages/ae21b75e82658/index.html",
    "revision": "bd73c39ad40e932afc70cc7c32c0b025"
  },
  {
    "url": "pages/b0c63028d916e/index.html",
    "revision": "a0933c52c65f35a972f320abeaedeecf"
  },
  {
    "url": "pages/b4081db6efbd9/index.html",
    "revision": "cf746f245a6d3ccc6dca45dd0c95ff17"
  },
  {
    "url": "pages/bc7fdbb035246/index.html",
    "revision": "949caf1ee7aad88b471f2abae37aa65a"
  },
  {
    "url": "pages/be18cb94e364/index.html",
    "revision": "7b2153f6dc04c3b13c879e129d23df5b"
  },
  {
    "url": "pages/c863681e7285f/index.html",
    "revision": "081d152ab64430fe9a2d657f19e5a836"
  },
  {
    "url": "pages/cf42a74e3cc8f/index.html",
    "revision": "d58f8e5d20a6237c696f257c71a06175"
  },
  {
    "url": "pages/db19da37f8d9a/index.html",
    "revision": "709ff2d8cedfe088d8ebb44ce7f07779"
  },
  {
    "url": "pages/dc00f73d9d1d9/index.html",
    "revision": "2154beac836e9e6f582fb28059f74529"
  },
  {
    "url": "pages/e19d1d769db25/index.html",
    "revision": "c102b175177bd77a9e7887010de407b8"
  },
  {
    "url": "pages/e8f47145dd883/index.html",
    "revision": "8cba2b339b959a3998a77f894000d39c"
  },
  {
    "url": "pages/eaca6b104f0f4/index.html",
    "revision": "31b08381061df2ebeafcec9a05d17571"
  },
  {
    "url": "pages/ef5b9c9dd32a7/index.html",
    "revision": "0230d52963bd865e1599f8d9e5ac301c"
  },
  {
    "url": "pages/f15a7725f87e7/index.html",
    "revision": "282d6b0c36cb79a02bb2a0388411f7df"
  },
  {
    "url": "pages/f16531008c5a4/index.html",
    "revision": "a46a9d7bc97256daaef89db9fd03719b"
  },
  {
    "url": "pages/f593514e1a9d6/index.html",
    "revision": "c9c0a39c208fc211596c22fe698ee5ff"
  },
  {
    "url": "pages/f83fb19d191d9/index.html",
    "revision": "3bab23f719a22150392f5a295004024a"
  },
  {
    "url": "resource-tools/44207a5ef0a8a/index.html",
    "revision": "514325f1f724dddb340e0c11e63b36be"
  },
  {
    "url": "resource-tools/4c19c32335465/index.html",
    "revision": "bec90e033ce81b7d14da25f93c5c00c5"
  },
  {
    "url": "resource-tools/5f440c9bb4359/index.html",
    "revision": "637a7bc2fcfa2bd05b38864002967519"
  },
  {
    "url": "resource-tools/7566c0ff5a24c/index.html",
    "revision": "afe28c33990dba9b6b84b31584286d5f"
  },
  {
    "url": "resource-tools/8396c1c08f1b6/index.html",
    "revision": "dc0bf67d10fbcf90baa60767c9656477"
  },
  {
    "url": "resource-tools/9d5d91d08c126/index.html",
    "revision": "b058ef24185669ecd155b98e97dca4f3"
  },
  {
    "url": "resource-tools/c618db4b32e39/index.html",
    "revision": "0ca0937741ffa1b1a8c8a6eec5581bac"
  },
  {
    "url": "resource-tools/c9e44ab0fce9a/index.html",
    "revision": "aaec70dd690beba8405e68e8005ff922"
  },
  {
    "url": "resource-tools/ed602e9a815f6/index.html",
    "revision": "6d708e5acbc56806d59df06a8acbb721"
  },
  {
    "url": "study/css/reset.css",
    "revision": "c8df9e9e48e86c4fcd3972a0111e46fc"
  },
  {
    "url": "study/index.html",
    "revision": "21b33b932fd25ce8cbf7fc91e28e5bab"
  },
  {
    "url": "study/precache-manifest.05b24b6636bd972f0f436263abc9dea0.js",
    "revision": "05b24b6636bd972f0f436263abc9dea0"
  },
  {
    "url": "study/static/css/2.8f6577cd.chunk.css",
    "revision": "8aacd14455dd3a1064dca30097202e31"
  },
  {
    "url": "study/static/css/main.61320533.chunk.css",
    "revision": "0ff1be3b98657889bb1d1ba0da308239"
  },
  {
    "url": "study/static/js/main.f022aa25.chunk.js",
    "revision": "b08cd1d21871988e888f3ea9f6a76fee"
  },
  {
    "url": "study/static/js/runtime-main.3725ae0b.js",
    "revision": "371fc4c0b43299ae7ad805c2e21ff81d"
  },
  {
    "url": "study/static/media/404.9161e238.png",
    "revision": "9161e238b798c444b732dbbb7420a09e"
  },
  {
    "url": "study/static/media/logo.421642f8.png",
    "revision": "421642f8c4c77139f133d7d1ec05168c"
  },
  {
    "url": "tags/index.html",
    "revision": "80da63312833be5e2f418237851fd759"
  },
  {
    "url": "vue-iframe-print/css/app.80764a13.css",
    "revision": "41670c952da5bab26acafc6186da19b0"
  },
  {
    "url": "vue-iframe-print/index.html",
    "revision": "c7e039d95a143d64b93bd473f2638d22"
  },
  {
    "url": "vue-iframe-print/js/app.47469697.js",
    "revision": "1e472a8fb25771accb2f89487ccc440f"
  },
  {
    "url": "vue-iframe-print/js/chunk-vendors.4f44ce85.js",
    "revision": "5d2e1c01d27e71fb2895708d03590996"
  },
  {
    "url": "web/docs/alexwjj/fe-study/index.html",
    "revision": "672d46458fb02ea953c10419103d2a4a"
  },
  {
    "url": "web/docs/babel/index.html",
    "revision": "d1e4d3cd0159b26085e69457e6be347a"
  },
  {
    "url": "web/docs/docschina/index.html",
    "revision": "2b14f49d3ef342ae022749574d153d28"
  },
  {
    "url": "web/docs/es6/index.html",
    "revision": "33a1db1e790a1a747dbe962ff665eead"
  },
  {
    "url": "web/docs/nav/index.html",
    "revision": "e9af599489d201cbd38857987b29cd8b"
  },
  {
    "url": "web/docs/node/index.html",
    "revision": "33b4a5bc293b0055528be0f5db4441f1"
  },
  {
    "url": "web/docs/react/index.html",
    "revision": "2753de3dd9504e6265768bdb63948b1d"
  },
  {
    "url": "web/docs/runoob/index.html",
    "revision": "13906f898a844c0599fa4a637f28e41a"
  },
  {
    "url": "web/docs/typescript/index.html",
    "revision": "5374eee6e24553194ae2b5955660fac1"
  },
  {
    "url": "web/docs/vue/index.html",
    "revision": "5fdbdfcd3e3b7752e4cdd05409dc984a"
  },
  {
    "url": "web/docs/webpack/index.html",
    "revision": "280508f991d47cb93ba0109c321019f2"
  },
  {
    "url": "web/git/f85d0c838f3f3/index.html",
    "revision": "e068556f9c82ed0b145d037aacb1be7a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
