---
title: cocos 开发过程中的一些技巧
tags: [cocos]
---

本文介绍一些在 cocos 开发过程中的实用技巧。

<!-- truncate -->

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

# 获取图片像素点信息

```js
const node = new cc.Node();
node.parent = this.target.node; // 截当前图
const camera = node.addComponent(cc.Camera);

node.x = this.target.node.x;
node.y = this.target.node.y;

camera.cullingMask = 0xffffffff;


const texture = new cc.RenderTexture();
const gl = cc.game._renderContext;

texture.initWithSize(
  this.target.node.width,
  this.target.node.height,
  gl.STENCIL_INDEX8
);
camera.targetTexture = texture;

camera.render(undefined);

const data = texture.readPixels();

console.log(data);
```


