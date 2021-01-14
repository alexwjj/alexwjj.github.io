---
title: 【官方文档】node学习笔记
sidebar: 'auto'
date: 2020-01-01
tags:
 - 基础
categories:
 - 后端
---

> 看官网学习的笔记，这种无项目的学习意义不大，记不住，有些东西理解不了
<!-- more -->

## Node
## 1.基础概念
- 创建node应用：1.require（） 2.创建服务器  3.接受请求和响应请求
- REPL 交互式解释器 ： 读取，执行，打印，循环 Read–eval–print loop 可以直接运行各种JavaScript命令  _ + 1   下划线表示上一个命令的结果
- node事件驱动模型：当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。高并发
- node内置事件：events
- Buffer 缓冲区   node类  该类用来创建一个专门存放二进制数据的缓存区。
- 如果想要拷贝一份Buffer，得首先创建一个新的Buffer，并通过.copy方法把原Buffer中的数据复制过去。
- Buffer与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于Buffer,可以用[index]方式直接修改某个位置的字节
- Node约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象。callback = function （error，value） {}
- require命令用于指定加载模块，加载时可以省略脚本文件的后缀名
- PM2是Node.js应用程序的进程管理器
- NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。
- stream： 当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。
- 3.Node全局对象 && 全局函数 && 全局变量
- global：表示Node所在的全局环境，类似于浏览器的window对象
- process：该对象表示Node所处的当前进程，允许开发者与该进程互动。
- console：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。
- setTimeout()：用于在指定毫秒之后，运行回调函数。
- clearTimeout()：用于终止一个setTimeout方法新建的定时器。
- setInterval()：用于每隔一定毫秒调用回调函数。
- clearInterval()：终止一个用setInterval方法新建的定时器。
- require()：用于加载模块。
- Buffer()：用于操作二进制数据。
- __filename：指向当前运行的脚本文件名。
- __dirname：指向当前运行的脚本所在的目录。
## 2.Node核心模块
### 核心模块总是最优先加载的
- http：提供HTTP服务器功能。
- url：解析URL。
- fs：与文件系统交互。
- querystring：解析URL的查询字符串。
- child_process：新建子进程。
- util：提供一系列实用小工具。
- path：处理文件路径。
- crypto：提供加密和解密功能，基本上是对OpenSSL的包装。

## 3.模块使用的简单例子

```
foo.js module.exports = function( x ) { console.log( x) }
index.js  var m = require( './foo.js' )   m('面对疾风吧')
node index.js   面对疾风吧!
```

## 4.Node 异常处理
Node是单线程运行环境，一旦抛出的异常没有被捕获，就会引起整个进程的崩溃。一般处理错误有下面三种方法：
使用throw语句抛出一个错误对象，即抛出异常。
将错误对象传递给回调函数，由回调函数负责发出错误。
通过EventEmitter接口，发出一个error事件。

```
eg：fs.readFile('/foo.txt', function(err, data) {
  if (err !== null) throw err;
  console.log(data);
});
```


当一个异常未被捕获，就会触发uncaughtException事件，可以对这个事件注册回调函数，从而捕获异常。
iojs有一个unhandledRejection事件，用来监听没有捕获的Promise对象的rejected状态。
## 5.版本号
语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。
+ 如果只是修复bug，需要更新Z位。
+ 如果是新增了功能，但是向下兼容，需要更新Y位。
+ 如果有大变动，向下不兼容，需要更新X位。
## 6.文件操作
### fs文件系统
- 文件属性读写。fs.stat、fs.chmod、fs.chown等等
- 文件内容读写。fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等
- 底层文件操作。fs.open、fs.read、fs.write、fs.close等等
- 小文件拷贝：fs.readFileSync     fs.writeFileSync
- 大文件拷贝：fs.createReadStream     fs.createWriteStream
- ipe方法把两个数据流连接了起来。
### path
- path.normalize 将传入的路径转换为标准路径，具体讲的话，除了解析路径中的.与..外，还能去掉多余的斜杠。
#### 坑出没注意：
标准化之后的路径里的斜杠在Windows系统下是\，而在Linux系统下是/。如果想保证任何系统下都使用/作为路径分隔符的话，需要用.replace(/\\/g, '/')再替换一下标准路径。
- path.join 将传入的多个路径拼接为标准路径。
- path.extname 当我们需要根据不同文件扩展名做不同操作时
### 遍历
- 遍历算法： 深度优先 + 先序遍历
- 同步遍历
- 异步遍历
### 文本编码
我们常用的文本编码有UTF8和GBK两种，并且UTF8文件还可能带有BOM。在读取不同编码的文本文件时，需要将文件内容转换为JS使用的UTF8编码字符串后才能正常处理。

BOM移除：通过文本文件的头几个字符判断是否存在BOM，存在则移除

GBK转UTF8 ：node不支持GBK，可以通过npm包iconv-lite来转换

单字节编码：当我们需要处理的字符在ASCII 0-128时，使用单字节编码。不需要考虑GBK或者UTF8
## 7.网络操作
创建一个HTTP的web服务器

```
var http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
}).listen(8124);
```

创建一个HTTPS的web服务器

```
var options = {
        key: fs.readFileSync('./ssl/default.key'),
        cert: fs.readFileSync('./ssl/default.cer')
    };
var server = https.createServer(options, function (request, response) {
        // ...
    });
```


### HTTP & HTTPS
- HTTP请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。
- HTTP请求在发送给服务器时，可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的。而http模块创建的HTTP服务器在接收到完整的请求头后，就会调用回调函数。
- https模块与http模块极为类似，区别在于https模块需要额外处理SSL证书。
- 目标服务器使用的SSL证书是自制的，https模块会拒绝连接，在options里加入rejectUnauthorized: false字段可以禁用对证书有效性的检查
## URL
一个url的基本组成

```
http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----        ---------         --------       ----    --------    -------------      -----
protocol     auth        hostname   port   pathname search
```
### hash
- 我们可以使用.parse方法来将一个URL字符串转换为URL对象 键值对形式
- .parse方法还支持第二个和第三个布尔类型可选参数。第二个参数等于true时，该方法返回的URL对象中，query字段不再是一个字符串，而是一个经过querystring模块转换后的参数对象。第三个参数等于true时，该方法可以正确解析不带协议头的URL
- format方法允许将一个URL对象转换为URL字符串
- .resolve方法可以用于拼接URL，url.resolve('http://www.example.com/foo/bar', '../baz');
- querystring模块用于实现URL参数字符串与参数对象的互相转换
- querystring.parse         querystring.stringify
### Zlib
zlib模块提供了数据压缩和解压的功能。当我们处理HTTP请求和响应时，可能需要用到这个模块。
### Net
net模块可用于创建Socket服务器或Socket客户端。

## 8.进程管理
### 1.process
process一个全局对象，在任何地方都可以直接使用。
### 2.child process
使用child_process模块可以创建和控制子进程。该模块提供的API中最核心的是.spawn，其余API都是针对特定使用场景对它的进一步封装，算是一种语法糖。
### 3.cluster  （集群）
cluster模块是对child_process模块的进一步封装，专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题
### 4.应用场景
- process.argv 获取命令行参数 ，第一个命令行参数从argv[2] 开始。可以自己处理
- process.exit(1) 退出程序
- NodeJS程序的标准输入流（stdin）、一个标准输出流（stdout）、一个标准错误流（stderr）分别对应process.stdin、process.stdout和process.stderr
- 降权: Linux 使用root权限才能监听1024以下端口，完成端口监听安全考虑要把权限降下来，process.setgid(gid)   process.setuid(uid) 降权时必须先降GID再降UID
### 5.创建子进程

```
var child = child_process.spawn('node', [ 'xxx.js' ]);
```

- .spawn(exec, args, options)方法，第一个参数是执行文件路径，第二个参数中，数组中的每个成员都按顺序对应一个命令行参数。第三个参数可选，用于配置子进程的执行环境与行为。
### 6.进程之间的通讯
- 父进程通过.kill方法向子进程发送SIGTERM信号，
- 子进程监听process对象的SIGTERM事件响应信号

如果父子进程都是NodeJS进程，就可以通过IPC（进程间通讯）双向传递数据。
### 7.守护子进程
守护进程一般用于监控工作进程的运行状态，在工作进程不正常退出时重启工作进程，保障工作进程不间断运行。

```
worker.on('exit', function (code) {
        if (code !== 0) {
            spawn(mainModule);
        }
    });
```


工作进程非正常退出时，守护进程立即重启工作进程。

## 9.异步编程

### 1.回调
JS本身是单线程的，无法异步执行

setTimeout这类JS规范之外的由运行环境提供的特殊函数做的事情是创建一个平行线程后立即返回，让JS主进程可以接着执行后续代码，并在收到平行进程的通知后再执行回调函数。除了setTimeout、setInterval这些常见的，这类函数还包括NodeJS提供的诸如fs.readFile之类的异步API。

JS自身提供的异常捕获和处理机制——try..catch..，只能用于同步执行的代码。

### 2.域（Domain）
NodeJS提供了domain模块，可以简化异步代码的异常处理。简单的讲，一个域就是一个JS运行环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出。NodeJS通过process对象提供了捕获全局异常的方法

```
var d = domain.create();
d.on
d.run
```

无论是通过process对象的uncaughtException事件捕获到全局异常，还是通过子域对象的error事件捕获到了子域异常，在NodeJS官方文档里都强烈建议处理完异常后立即重启程序，发生异常后的程序处于一个不确定的运行状态，如果不立即退出的话，程序可能会发生严重内存泄漏，也可能表现得很奇怪。

## 10.Socket
### 1.TCP / IP
 - TCP/IP（Transmission Control Protocol/Internet Protocol）即传输控制协议/网间协议
- TCP/IP协议参考模型把所有的TCP/IP系列协议归类到四个抽象层中
- 应用层：TFTP，HTTP，SNMP，FTP，SMTP，DNS，Telnet 等等
- 传输层：TCP，UDP
- 网络层：IP，ICMP，OSPF，EIGRP，IGMP
- 数据链路层：SLIP，CSLIP，PPP，MTU

### 2.socket
- socket是在应用层和传输层之间的一个抽象层，它把TCP/IP层复杂的操作抽象为几个简单的接口供应用层调用以实现进程在网络中通信。
- 网络上的两个程序通过一个双向的通信连接实现数据的交换，这个连接的一端称为一个socket。
- 在本地进程通讯中我们可以使用PID来唯一标示一个进程，但PID只在本地唯一，网络中的两个进程PID冲突几率很大，
- ip地址＋协议＋端口号唯一标示网络中的一个进程。   三端
- socket是一种"打开—读/写—关闭"模式的实现
- 服务器socket与客户端socket建立连接的部分其实就是大名鼎鼎的三次握手
- Scoket api ： scoket ， bind  ， listen， connect， accept， read ，write，close
### 3.websocket
- WebSocket是一种在单个TCP连接上进行全双工通信的协议。
- HTTP 协议做不到服务器主动向客户端推送信息。
- 默认端口80 和 443
- 没有同源限制，客户端可以与任意服务器通信
- 协议标识符：ws ， wss（加密的） 

```
创建：var ws = new WebSocket('ws://localhost:8080');
webSocket.readyState()
```

- readyState属性返回实例对象的当前状态，共有四种：
- CONNECTING：值为0，表示正在连接。
- OPEN：值为1，表示连接成功，可以通信了。
- CLOSING：值为2，表示连接正在关闭。
- CLOSED：值为3，表示连接已经关闭，或者打开连接失败
### webSocket.onopen()
- 实例对象的onopen属性，用于指定连接成功后的回调函数。
- 如果要指定多个回调函数，可以使用addEventListener方法。
### webSocket.onclose()
- 实例对象的onclose属性，用于指定连接关闭后的回调函数。
### webSocket.onmessage()
- 实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
### webSocket.send()
- 实例对象的send()方法用于向服务器发送数据。
### webSocket.bufferedAmount()
- 实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。
### webSocket.onerror()
- 实例对象的onerror属性，用于指定报错时的回调函数
### webscoket数据传递
数据分片传输，根据FIN的值来判断，FIN=1表示当前数据帧为最后一个数据帧，FIN=0，还需要继续监听其他数据帧


