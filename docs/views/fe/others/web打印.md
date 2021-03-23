---
title: web打印，一篇搞定
date: 2020-11-05
tags:
 - 基础
categories:
 - 前端
sidebar: 'auto'
---


> 对一个前端来说，没被打印折磨过的，你是最最幸福的😭。对于我现在的中后台业务来讲，不同的浏览器兼容性，不同的业务场景，不同的设备调试，每次都要浪费巨多的时间😭。

> 针对个人遇到的，以及现有的一些方案对比，总结一波😎（文末有PPT版本，需要留言），希望能帮助同样头疼的你

## 1.浏览器打印

### 优缺点
通过 `window.print() 、document.execCommand('print’) ` 调用浏览器打印

不同浏览器的区别：在Safari和Chrome都会弹起打印预览的窗口，FireFox和 IE 没有预览而是直接让你选择打印机

但是直接使用浏览器打印虽然省事，但是存在很多问题，无法满足我们的打印需求：

* 1、打印的是整个网页，不能打印局部内容；
* 2、打印不支持自定义分页行为，默认不支持批量打印；
* 3、打印的时候样式有问题，所见非所得；
* 4、打印可以准确识别的样式单位是绝对单位（如pt、mm、cm），对相对单位识别不同打印机可能会得到意想不到的结果；

### 问题来了：如何实现局部打印？🤔
#### （1）简单粗暴，在你不需要考虑体验，项目里面用的也比较少时，可以试试看😆
```
function innerHtmlPrint(){
    // 缓存页面内容
    const bodyHtml = window.document.body.innerHTML;
    // 获取要打印的dom
    const printContentHtml = document.getElementById("print").innerHTML;
    // 替换页面内容
    window.document.body.innerHTML = printContentHtml;
    // 全局打印
    window.print();
    // 还原页面内容
    window.document.body.innerHTML = bodyHtml;
}
```

#### （2）iframe，稍微复杂点，需要将打印的内容添加到iframe里，然后打印整个iframe，需要注意：往iframe里写一些样式的时候，一些checkbox，radio要特殊处理。

这里我把项目中用到的iframe局部打印抽出来了，各位可以直接npm使用 [vue-iframe-print](https://github.com/alexwjj/vue-iframe-print) https://github.com/alexwjj/vue-iframe-print  😎😎😎

如果你是vue项目，只需要安装后，在需要打印的dom上加上 v-print即可，主要实现路径如下（样式部分省略）：

* 创建iframe
* 构建iframe docTyp、 head信息
* 获取局部dom，插入iframe
* window.print()

```
   function onIframePrint(printId) {
      const printContentHtml = document.getElementById("printId").innerHTML;
      const iframe = document.createElement("iframe");
      iframe.setAttribute(
        "style",
        "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
      );
      document.body.appendChild(iframe);
      iframe.contentDocument.write(printContentHtml);
      iframe.contentDocument.close();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    },

```
### （3）将打印内容转为图片

> 一倍清晰度模糊，可以用2倍canvas。缺点：pdf需要下载，有的产品需求需要一键打印。html2canvas不支持ie，兼容性也是个问题

```
function print() {
  var target = document.getElementsByClassName("right-aside")[0];
  target.style.background = "#FFFFFF";

  html2canvas(target, {
    onrendered:function(canvas) {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;

    //一页pdf显示html页面生成的canvas高度;
    var pageHeight = contentWidth / 592.28 * 841.89;
    //未生成pdf的html页面高度
    var leftHeight = contentHeight;
    //页面偏移
    var position = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = 595.28;
    var imgHeight = 592.28/contentWidth * contentHeight;

    var pageData = canvas.toDataURL('image/jpeg', 1.0);

    var pdf = new jsPDF('', 'pt', 'a4');

    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
    } else {
        while(leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if(leftHeight > 0) {
              pdf.addPage();
            }
        }
    }

    pdf.save("content.pdf");
}
  })
}
```
### pdf转成图片，会失真，打印一定程度上会模糊，如果用的是针式打印机，打出来的东西基本不能看。👿
也是想了很久找的的解决办法（完美还原）：😬😬😬
```
  <object
    type="application/pdf"
    data="./滴滴出行行程报销单A.pdf"
    width="100%"
    height="700"
  ></object>
  
  <embed 
     type="application/pdf" 
     src="./滴滴出行行程报销单A.pdf" 
     width="100%" 
     height="700px"
  />
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cfc29a3f12e478cbb4c7dec90c6ff38~tplv-k3u1fbpfcp-zoom-1.image)
## 2.插件打印
一般是通过项目里面嵌入脚本，或者安装本地插件来完成，优缺点也都很明显

**优点：**

1、功能强大，可以调用到系统底层的东西，比如获取系统打印机列表，设置默认打印机等

2、可以实现无预览打印

**缺点：**

1、需要安装客户端，大多收费

2、第三方插件，无技术支持，出现问题难以解决（版本问题，chrome84升级导致的证书问题）

3、本地插件的方式基本只有window系统版本

我们项目目前在使用的插件是C-lodop，收费，现在用的**注册码**也不知道是**谁**在**那**搞得 🌚。

如果失效，意味着我们项目的所有打印基本废了。目前来看，好像是一次购买永久有效的，**先不慌** 🌚

这里列出几个插，仅供参考：

[C-lodop](http://www.c-lodop.com/index.html)：功能强大，兼容性不是很好，你想在保证清晰度的情况下，没办法写css3，画个圆角边框都不行🤧🤧🤧，依赖于系统IE版本，IE9以下，打出来的东西乱七八糟。。。建议使用之前，仔细研究下官网给的demo，这个插件的原理是，在页面嵌入一段js，和本地客户端通过webscoket进行通信

[HttpPrinter](http://www.httpprinter.com/)：和C-lodop差不多，可以去了解下

[HiPrint](http://hiprint.io/)：不需要安装客户端，但是没有npm包，依赖于jQuery


### 打个嘴炮 😈😈😈
其实，大家要是有时间，可以自己用nw.js和electron.js自己撸一个，这位大佬自己就搞了一个：[如何通过Nw.js纯前端实现调用热敏打印机打印小票？](https://juejin.im/post/6844903778827649032)


## 3.打印样式

### 先看下基本的页面模型
![](https://user-gold-cdn.xitu.io/2019/12/16/16f0d84fc49433c9?w=267&h=266&f=png&s=36609)

### @media print 
`可以控制打印时的样式，仅在打印生效，可以实现一些特殊需求。`
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fbe1b531f734ebaafc07133cc9e6e00~tplv-k3u1fbpfcp-zoom-1.image)

### @page 
`设置页面大小（A3，A4，A5）、边距（margin）、方向（ auto、landscape、portrait）等。`
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/830b907d14694d419ba79c0ab0147844~tplv-k3u1fbpfcp-zoom-1.image)
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0150e4841c2f4d059b8cf9abec53b4e4~tplv-k3u1fbpfcp-zoom-1.image)

### page-break-xxx（划重点）
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bc91383478441b9904f5b4683ba8acb~tplv-k3u1fbpfcp-zoom-1.image)
```
page-break-before( after ) 用于设置元素前( 后 )的分页行为,可取值:

   * auto默认值。如果必要则在元素前插入分页符。
   * always在元素前插入分页符。
   * avoid避免在元素前插入分页符。
   * left在元素之前足够的分页符，一直到一张空白的左页为止。
   * right在元素之前足够的分页符，一直到一张空白的右页为止。
   * inherit规定应该从父元素继承 page-break-before 属性的设置。

page-break-inside设置元素内部的分页行为。取值如下:

   * auto默认。如果必要则在元素内部插入分页符。
   * avoid避免在元素内部插入分页符。
   * inherit规定应该从父元素继承 page-break-inside 属性的设置。
 
orphans设置当元素内部发生分页时必须在页面底部保留的最少行数。

widows设置当元素内部发生分页时必须在页面顶部保留的最少行数。
```

## 4.云打印（node + ipp）
### 先科普下打印机类型 🤔🤔🤔
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53fbb27706954d09b24c2f4041c7b9b1~tplv-k3u1fbpfcp-zoom-1.image)
**激光打印机**，办公室常见的打印机，一般用打印普通文档材料。利用激光加热将墨粉固定在纸上，从而实现打印功能。平常的耗材是墨粉，使用的纸张是普通纸，一般是打印黑白色。打印速度快 后期耗材便宜
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3444427bf38f418a8dd2bae70c3fdd2f~tplv-k3u1fbpfcp-zoom-1.image)
**针式打印机**，一般用于打印票据，或者需要按压打印的纸张。将色带上的墨水压在纸上，从而实现打印功能。平常的耗材是色带，使用的纸张是多联纸，比起其他两个分类针式打印机可以说是元老级别的，它是是市场上较早出现的种类。主要有9针、24针、72针、144针等多种针式打印机。其特点比较鲜明结构简单、技术成熟、性能价格比好、消耗费用低。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b6911600862494bbbe084af53c3aab2~tplv-k3u1fbpfcp-zoom-1.image)
**热敏打印机**，使用专用纸张,靠高温显示需要打印的信息.主要用于打印小票.
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24f08ca94c244fffbefc96b04fefd96d~tplv-k3u1fbpfcp-zoom-1.image)
**喷墨打印机**，一般用于打印彩色材料。将墨水喷射在纸上，从而实现打印功能。平常的耗材是墨水，使用的纸张是普通纸，一般可以打印彩色。（另外也有一个耗材是墨盒，有些机型不必频繁更换）

### node + ipp
#### 先了解下两个前缀概念：🤔🤔🤔

**互联网打印协议** （IPP；Internet Printing Protocol）是一个在互联网上打印的标准网络协议，它容许用户可以透过互联网作遥距打印及管理打印工作等工作。用户可以透过相关界面来控制打印品所使用的纸张种类、分辨率等各种参数。

**无头浏览器** 指的是我们使用脚本来执行以上过程的浏览器，能模拟真实的浏览器使用场景。
Puppeteer: [无头浏览器 Puppeteer 初探 - 蚂蚁金服](https://juejin.im/post/6844903504276881422)

### 云打印流程图

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00a7035e0ea8479fabdcda93b0cfc7f3~tplv-k3u1fbpfcp-zoom-1.image)

### 目前我们组的云打印已经落地，但是存在诸多限制，使用的还不多，源码暂无开放，如有需要的同学，留言，抽空抽一下🙄🙄🙄

## 5.一些思考

1.无特殊要求的还是建议使用window.print()   局部打印可以使用我写的插件 [vue-iframe-print](https://github.com/alexwjj/vue-iframe-print) https://github.com/alexwjj/vue-iframe-print  😎😎😎
  
2.看业务需求，如果是网络打印机，需要无痕打印，可以采用node+ipp的云打印，实现起来也不难。🕵
  
3.后端给的源文件，要求不高可以用pdfjs转canvas，要求比较高用`<object>、<embed>`标签加载后端给的文件流，完美还原源文件清晰度
  
4.[pdf2htmlEX插件](https://github.com/coolwanglu/pdf2htmlEX)，pdf转html，4年前最后一次维护，可以尝试
  
也查了很多资料，目前web打印这块感觉还是window.print比较实用，也没找到什么开源项目。哪位大佬有没有的，推荐一下的


  
## 参考资料：
 * [由打印机TCP协议引起的网络通讯协议深入研究：从TCP到万能打印、云打印](https://juejin.im/post/6844903893038546957)
 * [无头浏览器 Puppeteer 初探](https://juejin.im/post/6844903504276881422)
 * [浏览器打印方案调研](https://juejin.im/post/6844904164938498055)
 * [前端一键打印解决方案](https://zhuanlan.zhihu.com/p/83068956)
 * [PDF 能转成 HTML 吗？如何转换？](https://www.zhihu.com/question/20249686)
  
## PPT截图，如有需要，可发邮箱
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82889f7336c94a42b7e388a3e9ca6d42~tplv-k3u1fbpfcp-zoom-1.image)
  ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c917e05af46e46da93451eb3614a72a5~tplv-k3u1fbpfcp-zoom-1.image)
有兴趣的可以看下我的个人博客：http://alexwjj.online/  😎😎😎
