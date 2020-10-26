---
title: 图解HTTP 读书笔记
sidebar: 'auto'
date: 2020-07-19
tags:
 - 基础
categories:
 - 计算机网络
---

> 学习笔记，多图警告 🚫🚫🚫
<!-- more -->

# 知识点
* tcp/ip三次握确保通信可靠性。TCP标志SYN/ACK
* ping www.baidu.com 解析对应的IP地址
* HTTP/1.1 虽然是无状态协议，但为了实现期望的保持状态功能，于 是引入了 Cookie 技术。
* 服务端数据无更，返回304状态码
* kee-alive 持久连接的特点是，只要任意一端 没有明确提出断开连接，则保持 TCP 连接状态
* 第一次连接服务端返回Set-Cookie
* 使用Content-Range 来限制请求大小，范围请求返回206状态码
* 403 服务器禁止访问， 500服务器错误
* 使用代理服务器的理由有：利用缓存技术减少网络带宽的流量，组织内部针对特定网站的访问控制，以获取访问日志为主要 目的，等等。
* 网关的工作机制和代理相似
* 首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式。Transfer-Encoding: chunked
* 使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文 的传输路径。
* Cookie 的 secure 属性用于限制 Web 页面仅在 HTTPS 安全连接时，才 可以发送 Cookie。
* Cookie 的 HttpOnly 属性是 Cookie 的扩展功能，它使 JavaScript 脚本 无法获得 Cookie。其主要目的为防止跨站脚本攻击（Cross-site scripting，XSS）对 Cookie 的信息窃取。
* 首部字段 DNT 属于 HTTP 请求首部，其中 DNT 是 Do Not Track 的简 称，意为拒绝个人信息被收集，是表示拒绝被精准广告追踪的一种方 法，0同意被追踪，1：拒绝
* 

## TCP/IP

![](https://user-gold-cdn.xitu.io/2019/12/9/16ee9c4f7d2d5b20?w=1108&h=1232&f=png&s=360723)


![](https://user-gold-cdn.xitu.io/2019/12/9/16ee9c783cf7e1ee?w=1146&h=1030&f=png&s=527885)

## 一个http传输过程

![](https://user-gold-cdn.xitu.io/2019/12/9/16ee9d6aaae9b25a?w=1182&h=1666&f=png&s=1001333)

## 内容协商
内容协商机制是指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最为适合的资源。内容协商会以响应资源的语言、字 符集、编码方式等作为判断的基准。

## 首部字段

![](https://user-gold-cdn.xitu.io/2019/12/11/16ef2cc992307205?w=800&h=600&f=png&s=112199)
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef2cd4eb9440a9?w=854&h=1012&f=png&s=235022)
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef2cd8a74efe7a?w=848&h=614&f=png&s=132476)
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef2ce6b5229b7e?w=824&h=676&f=png&s=138794)

## 缓存
* Cache-Control: public 缓存公用，private缓存只提供给一个用户
* Pragm: no-cache 兼容http1.0
* no-cache 强制缓存服务器从资源服务器重新拉取对应资源
* max-age 指定缓存有效的时间，max-age=0，请求要转发给源服务器。http 1.1中，存在Expires和max-age时，优先处理max-age，htt 1.0相反

![](https://user-gold-cdn.xitu.io/2019/12/11/16ef2d5d104c979e?w=1042&h=706&f=png&s=287405)

![](https://user-gold-cdn.xitu.io/2019/12/11/16ef2dd553aadccf?w=1036&h=370&f=png&s=80988)

## Connection 
* 控制不转发给代理的字段
* 持久连接 keep-Alive 关闭 close

![](https://user-gold-cdn.xitu.io/2019/12/11/16ef2e969a719b65?w=1034&h=742&f=png&s=337741)

## 请求首部字段

![](https://user-gold-cdn.xitu.io/2019/12/11/16ef2fe735ba94f2?w=1212&h=816&f=png&s=384769)

* 只有当 If-Match 的字段值跟 ETag 值匹配一致时，服务器才会接受请求。If-None-Match相反
* 如果在 If-Modified-Since 字段指定的日期时间后，资源发生了 更新，服务器才会接受请求

![](https://user-gold-cdn.xitu.io/2019/12/11/16ef3ad41e82f163?w=1176&h=1124&f=png&s=393138)
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef3b32a34673c7?w=1128&h=860&f=png&s=340253)
![](https://user-gold-cdn.xitu.io/2019/12/11/16ef3b594ac9a3ea?w=1116&h=720&f=png&s=135095)

![](https://user-gold-cdn.xitu.io/2019/12/11/16ef3b7dab2a2309?w=1198&h=1444&f=png&s=706944)

![](https://user-gold-cdn.xitu.io/2019/12/11/16ef3c23be804f80?w=1112&h=506&f=png&s=149512)
## HTTPS
* HTTPS 是身披 SSL 外壳的 HTTP

通常，HTTP 直接和 TCP 通信。当使用 SSL时，则演变成先和 SSL通 信，再由 SSL和 TCP 通信了。简言之，所谓 HTTPS，其实就是身披 SSL协议这层外壳的 HTTP。
* 公钥和私钥 （公钥可能被替换，用证书（收费））

公开密钥加密使用一对非对称的密钥。使用公开密钥加密方式，发送密文的一方使用对方的公开密钥进 行加密处理，对方收到被加密的信息后，再使用自己的私有密钥 进行解密。

* HTTPS 采用混合加密机制

采用共享密钥加密和公开密钥加密两者并用的混合加密

* https 比 http 慢2-100倍，会消耗服务器大量资源，一般涉及隐私的时候用 https

## WebScoket
为了实现 WebSocket 通信，在 HTTP 连接建立之后，需要完成一 次“握手”（Handshaking）的步骤。对于之前的请求，返回状态码 101 Switching Protocols 的响应

![](https://user-gold-cdn.xitu.io/2019/12/16/16f0e50efa52e305?w=1320&h=684&f=png&s=185953)


![](https://user-gold-cdn.xitu.io/2019/12/16/16f0e520891c6b05?w=1238&h=964&f=png&s=492027)
