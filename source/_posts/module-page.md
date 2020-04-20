---
title: 可视化页面配置实现方案
date: 2020-04-19
category: web
tag: js
---

在开发面向营销的页面时，通常页面会有如下特点：{% label primary@组件复用率高 %}、{% label primary@页面结构简单 %}、{% label primary@包含一些通用的业务逻辑 %}、{% label primary@上线频繁且紧急 %}；本文介绍一种简单的实现可视化页面配置的方案，用于聚合业务逻辑和视图展现，提高页面的生产效率。

<!-- more -->

# 抽离通用配置

当前业务在处理的售前页会经历以下流程：

**点击链接进入页面 -> 授权 -> 购买 -> 加群；**

其中，授权行为包括 微信授权、手机号授权、微信+手机号授权，购买需要支持在 app 、微信、浏览器内购买，加群包括 app 内跳转加群小程序的引导页、微信内展示加群二维码、浏览器内展示公众号引导页等；页面展示时需要支持容器、图片，以及一些业务组件，比如轮播图，限额模块等；页面需要支持 ab 测试。以上内容加以抽象和整合，便可以得出可视化配置需要实现的内容：

{% label primary@列表页 %}：管理所有页面的入口，支持增删改查操作，支持权限控制
<br />
{% label primary@详情页 %}：管理具体页面的配置，支持模块拖拽页面结构，配置页面级、组件级信息，支持发布、预览等行为，其中，页面级信息包括标题、SKU、授权、加群样式等；组件支持容器、图片及其他业务组件，支持配置组件的显隐、样式和一些组件的私有逻辑
<br />
{% label primary@用户端页面 %}：解析由可视化配置生成的数据内容，封装授权、购买、加群等行为，根据 配置 + 环境 来决定具体的页面行为。

# 整体实现方案

<img alt="实现方案" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.38/images/flow1.png" style="width:100%;max-width:600px;" />

为了快速上线进行验证，前端使用 cdn 进行数据存储，此时 cdn 承担了两部分功能：「配置cd」，存储列表、页面数据，用于可视化配置；「页面数据cdn」，存储用户端页面数据，用于渲染页面，控制页面行为和样式。

> cdn 需要配置缓存时间为0，使其更像是“数据库”。

# 具体细节

## 列表页

### 数据格式

```json
[
  {
    "name": "phonics-test",
    "desc": "phonics 测试售前页",
    "path": "phonics-test",
    "id": "158702705797685291",
    "creator": "alice",
    "createdAt": 1587027057976
  }
]

```

### 页面样式

<img alt="页面样式" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.40/images/Xnip2020-04-20_11-39-39.png" style="width:100%;max-width:1000px;" />

### 权限控制

权限分为 **使用者** 和 **管理员** 两种权限，使用者可以查看所有页面、编辑和删除自己创建的页面，管理员在使用者的基础上，可以操作其他人创建的页面。

### 数据流

数据操作过程中，一般需要同时操作列表数据和页面数据，例如：新增时，需要在列表中新增一条数据，并新增一条初始的页面数据（包括页面路径等基础信息）；删除时，除了列表数据和页面数据，面向用户侧的「页面数据cdn」中的内容也需要一并删除（相当于下线页面）。

## 详情页

### 数据格式

```json
{
  "content": [
    {
      "type": "picture",
      "children": [],
      "settings": {
        "enable": true,
        "abName": "",
        "abVersion": "",
        "app": "all",
        "platform": "all",
        "src": "https://sprout.llscdn.com/da16fccf3532c275410bc1840f731e4b.png",
        "width": "375",
        "height": "513",
        "center": true,
        "style": {
          "margin": "0 0 0 0"
        },
        "fixed": "none",
        "clickable": false,
        "clickArea": {
          "area": "0 0 50 50",
          "opacity": 0
        },
        "clickAction": {
          "type": "link",
          "href": ""
        }
      },
      "order": 0
    }
  ],
  "order": 1,
  "env": {
    "abList": [
      {
        "abName": "",
        "abVersion": "",
        "id": "158702705479768196"
      }
    ],
    "app": "wechat",
    "platform": "ios"
  },
  "settings": {
    "title": "流利说-少儿英语",
    "share": {
      "title": "【流利说®少儿英语】让孩子边玩边学，培养英语兴趣",
      "desc": "给宝宝第一份学习自信",
      "imgUrl": "https://cdn.llscdn.com/sprout/leo.jpeg"
    },
    "wechatAuth": {
      "enable": true,
      "useURL": false,
      "loginType": "wechat",
      "register": "1"
    },
    "extra": {
      "withChannel": true,
      "withCourseStart": false
    },
    "joinTheme": "",
    "sku": {
      "defaultSKU": {
        "upc": "xxxxxxx",
        "price": "1698"
      }
    },
    "style": {
      "backgroundColor": "rgba(51, 0, 162, 1)",
      "padding": "0 0 80 0",
      "margin": "0 0 0 0"
    }
  },
  "name": "phonics-test",
  "desc": "测试售前页",
  "path": "phonics-test",
  "id": "158702705797685291",
  "creator": "alice",
  "createdAt": 1587027057976
}
```

### 页面样式

<img alt="页面样式" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.41/images/Xnip2020-04-20_11-57-44.png" style="width:100%;max-width:1000px;" />

### 数据流

 1. 配置部分：通过拖拽组件在 `data.content` 中增加组件数据，然后通过 `data.content` 渲染页面结构，页面级配置直接操作 `data.settings`，组件级配置直接对 `content` 中具体的组件数据 `settings` 进行修改。
 2. 预览部分：本地预览通过 postmessage 传递数据给 **渲染页面**，手机预览会将数据上传到「页面数据cdn」的预览路径下。
 3. 发布部分：点击发布按钮，会将数据上传到「页面数据cdn」的生产路径下。

### 拖拽系统

1. 拖拽需要处理容器型组件和非容器型组件，区别在于容器是可以装组件的
2. 在页面结构中进行拖拽时，为了处理层级关系，需要将组件看做为三等分，拖拽到不同位置时需要进行不同的处理
3. 为了保证页面结构中的操作尽量单一，复制和删除使用拖拽区域的方式实现

# 其他

## ab 测试预览的实现方案

<img alt="环境配置" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.42/images/Xnip2020-04-20_12-09-52.png" style="width:100%;max-width:600px;" />

<img alt="组件配置" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.43/images/Xnip2020-04-20_12-11-37.png" style="width:100%;max-width:450px;" />

组件内增加用于控制显隐的配置，环境配置用于在搭建页面的过程中，调试不用 `abName` 的情况下页面的展示情况。

## 如何处理移动端自适应

首先，用户端页面使用的自适应方案是 `px-to-vw`，为了平衡配置过程和渲染过程，涉及到尺寸的样式数据，存储的都是样式的原始值，例如 `margin: 0 0 37.5 0`；在用户侧页面进行渲染时，对这种样式进行处理并赋值给对应 dom 的 style，例如上面的样式将被转化为 `margin: 0 0 10vw 0`。

## 一些提升使用体验的点

- 交互式新手引导，可以减少沟通成本
- 模板，将某些页面设置为模板后，新增页面时可以选择对应的模板，提升配置效率
- 版本管理与回滚，增加容错

## 测试环境与正式环境的数据联动

购买时，由于正式环境与测试环境对应的授权、SKU、加群页等都不相同，所以，配置时需要在测试环境和正式环境分别配置。为了简化流程，当前做法是在页面的右上角提供数据导入导出按钮，支持数据的快速转移

# 总结

以上是关于可视化页面配置的一种简单的实现方案，只需要单纯的前端知识无需后端提供任何接口即可实现，方便且快速；但是这种方式也会有一些问题，比如前端没有锁的概念，在列表中容易出问题，此时引入后端进行处理配置化流程将会更加稳妥。
