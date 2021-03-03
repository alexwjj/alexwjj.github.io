---
title: 【React】react 基础
sidebar: "auto"
date: 2021-02-10
tags:
  - React
categories:
  - 前端
---

> 边写项目边总结，冲冲冲！

## 1、知识点

-

## 2、对比 vue

## 3、React

### react + zent

项目搭建，写了个登录页面。写的时候磕磕碰碰，之前学的 react，忘的差不多了，晚上复习一波；

### 引入图片

```js
import imgURL from './../images/photo.png';
<img src={imgURL } />
// 或者
<img src={require('./../images/photo.png')} />
```

### created-react-app

- 创建 ts 应用： `npx create-react-app appName --template typescript`
- 暴露默认配置(不可逆)：`npm run eject`
- 默认支持 scss，less 需要按照 scss 的配置加一下

## 4、React Router

### react-router 配置

```js
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
```

### route 属性 exact

exact 是 Route 下的一条属性，一般而言，react 路由会匹配所有匹配到的路由组价，exact 能够使得路由的匹配更严格一些。

exact 的值为 bool 型，为 true 是表示严格匹配，为 false 时为正常匹配。

如在 exact 为 true 时，’/link’与’/’是不匹配的，但是在 false 的情况下它们又是匹配的。
`<Route path="/home" component={Home} exact></Route>`

### react-router 跳转

```js
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```
### withRouter

