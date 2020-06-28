---
title: cocos 开发过程中的一些技巧
date: 2020-06-24
category: cocos
tag: skill
---

本文介绍一些在 cocos 开发过程中的实用技巧。

<!-- more -->

# 节点翻转

节点翻转通过设置负 scale 实现
```js
// 水平翻转
node.scaleX = -1;
// 垂直翻转
node.scaleY = -1;
```

# 点击穿透

```js
node._touchListener.setSwallowTouches(false)
```
