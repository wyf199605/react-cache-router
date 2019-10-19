# react-cache-router

基于`react`![ReactVersion](https://img.shields.io/badge/npm-16.0.0-brightgreen)实现的路由缓存功能

搭配`react-router-dom`![reactRouterVersion](https://img.shields.io/badge/npm-4.0.0-brightgreen)以上进行工作

## 安装

```text
# 使用npm安装
npm install react-cache-router --save
# 或者使用yarn
yarn add react-cache-router
```

## 为何实现

在使用`vue-router`时，只要使用`keep-alive`组件包裹，便能将在路由发生改变时，将组件状态记录下来。

而在使用`react-router`时，发现`react`并没`keep-alive`组件，`route`也没有提供缓存组件状态的方法，导致每次路由回退时，当前路由下的数据和滚动位置丢失。

`react-cache-router`就是为了实现`react-router`的`keep-alive`功能。

<a href="https://on6fg.csb.app/#/home" target="_blank">DEMO演示</a>

## 实现原理

我们利用了`react-router`中，无论当前路由是否匹配，children永远不会被卸载的原理。

![react-router源码](./static/images/code.png)

## 使用方法

提供了`CacheSwitch`和`CacheRoute`，只要替换掉原本的`react-router-dom`提供的`Switch`和`Route`即可使用。

`CacheSwitch`和`CacheRoute`是互相依赖，没办法单独使用。

```typescript jsx
import * as React from 'react';
import {HashRouter} from 'react-router-dom';
import {CacheSwitch, CacheRoute} from 'react-cache-router';
import {Home} from "./pages/home";
import {Myself} from "./pages/myself"

export class App extends React.Component{
    render(){
        return <HashRouter>
            <CacheSwitch>
                <CacheRoute exact={true} path="/home" component={Home}/>
                <CacheRoute exact={true} path="/myself" component={Myself}/>
            </CacheSwitch>
        </HashRouter>;
    }
}
```

## 参数

### CacheSwitch

| 参数名称 | 类型 | 默认值 | 具体描述 |
| ----- | ----- | ----- | ----- |
| when | "forward" "back" "all" "none" | "forward" | 表示何时才缓存路由，forward表示路由前进（PUSH or REPLACE）时缓存，back表示路由后退（POP）时缓存，all无论前进和后退均缓存（即不主动卸载缓存，但超出最大缓存路由数还是会卸载路由），none即不缓存。 |
| maxRoutes | Number | -1 | 最多缓存几条路由，默认-1，即无缓存数量限制，超过数量后会优先卸载最后使用到的路由 |

### CacheRoute

cacheRoute 继承Route的所有参数，并添加了以下的参数

| 参数名称 | 类型 | 默认值 | 具体描述 |
| ----- | ----- | ----- | ----- |
| cache | Boolean | true | 设置当前路由是否需要缓存，默认需要缓存。 |
| local | Boolean | false | 本地持久缓存，仅当cache为true时生效，不受`CacheSwitch`的maxRoutes和when为forward和back的影响。 |
