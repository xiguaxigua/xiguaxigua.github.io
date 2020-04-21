---
title: 前端如何更好的使用 qiniu
date: 2020-04-21
category: cdn
tag: skill
---

提到七牛，前端同学通常想到的是使用七牛存储图片和一些静态资源，用于网络加速，实际上，我们能够利用七牛进行的优化和开发的功能还有很多，本文简单列举几项使用七牛时技巧。

<!-- more -->

# 图片处理

## 设备自适应

当前移动端设备通常都是支持高分屏的，但首次加载图片时，加载一张低分辨率的图会让用户拥有更好的使用体验。

七牛本身提供根据通过 url参数 来获取不同尺寸图片的方式，利用这种方式我们便可以实现上述的功能：

```
imageView2/{mode}/w/{LongEdge}
                 /h/{ShortEdge}
                 /format/{Format}
                 /interlace/{Interlace}
                 /q/{Quality}
                 /colors/{colors}
                 /ignore-error/{ignoreError}
```

其中 {mode} 分为如下几种情况：

| 模式 | 说明 | 
| --- | -- |
| /0/w/{LongEdge}/h/{ShortEdge} |	限定缩略图的长边最多为{LongEdge}，短边最多为{ShortEdge}，进行等比缩放，不裁剪。如果只指定 w 参数则表示限定长边（短边自适应），只指定 h 参数则表示限定短边（长边自适应）。|
| /1/w/{Width}/h/{Height} |	限定缩略图的宽最少为{Width}，高最少为{Height}，进行等比缩放，居中裁剪。转后的缩略图通常恰好是 {Width}x{Height} 的大小（有一个边缩放的时候会因为超出矩形框而被裁剪掉多余部分）。如果只指定 w 参数或只指定 h 参数，代表限定为长宽相等的正方图。|
| /2/w/{Width}/h/{Height} |	限定缩略图的宽最多为{Width}，高最多为{Height}，进行等比缩放，不裁剪。如果只指定 w 参数则表示限定宽（高自适应），只指定 h 参数则表示限定高（宽自适应）。它和模式0类似，区别只是限定宽和高，不是限定长边和短边。从应用场景来说，模式0适合移动设备上做缩略图，模式2适合PC上做缩略图。|
| /3/w/{Width}/h/{Height} |	限定缩略图的宽最少为{Width}，高最少为{Height}，进行等比缩放，不裁剪。如果只指定 w 参数或只指定 h 参数，代表长宽限定为同样的值。你可以理解为模式1是模式3的结果再做居中裁剪得到的。|
| /4/w/{LongEdge}/h/{ShortEdge} |	限定缩略图的长边最少为{LongEdge}，短边最少为{ShortEdge}，进行等比缩放，不裁剪。如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。这个模式很适合在手持设备做图片的全屏查看（把这里的长边短边分别设为手机屏幕的分辨率即可），生成的图片尺寸刚好充满整个屏幕（某一个边可能会超出屏幕）。|
| /5/w/{LongEdge}/h/{ShortEdge} |	限定缩略图的长边最少为{LongEdge}，短边最少为{ShortEdge}，进行等比缩放，居中裁剪。如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。同上模式4，但超出限定的矩形部分会被裁剪。|

那么，在代码中，我们就可以进行如下处理：

```js
<img ref={imgRef} onLoad={loadSuitableImage} src="xxx" />

const IMAGE = {
  src: 'xxx',
  width: 375,
  height: 500
}

function loadMiniImg () {
  // ...
  let miniImg = `${src}?imageView2/2/h/${height}/q/100!`;
  imgRef.current.src = miniImg;
}

function loadSuitableImage () {
  // ...
  let suitableImg = dpr === 3 ? src : `${src}?imageView2/2/h/${height * dpr}/q/100!`;
  imgRef.current.src = suitableImg;
}
```

## 使用 webp

WebP 具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量。七牛支持使用 url 参数将图片格式化为 webp，在页面中使用图片时，可以检测浏览器是否支持 webp，如果支持则将 webp 参数加到 url 上。

```js
function checkWebp() {
  try {
    return (
      !![].map &&
      document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0
    );
  } catch (err) {
    return false;
  }
}

if (checkWebp() && !ignoreWebp) {
  suitableImg = `${suitableImg}?imageMogr2/format/webp`;
}

```

> 需要注意的是，某些图片在使用 webp 格式时可能出现问题，此时可以在组件上提供一个参数（ignoreWebp），用来决定是否使用 webp 格式。

## 图片压缩

图片瘦身服务（imageslim）在尽可能不影响画质的情况下，将JPEG、PNG格式的图片实时压缩，大幅缩小文件体积，只需要在 url 后缀参数即可。

```js
http://7xkv1q.com1.z0.glb.clouddn.com/grape.jpg?imageslim
```

> 这种方式在实际使用过程中，遇到过图片压缩失败返回原图的情况，可选的方案是先用 tinypng 预先进行压缩，此时可以不加 `imageslim` 参数。

# 数据存储

## 搭建一个简单的 K-V 存储项目

默认 cdn 内存储的内容会缓存 1 年，在七牛后台将浏览器缓存时间修改为 0，缓存刷新时间修改为 0 即可实现类似数据库的存储，可以将 json 数据存储在 cdn 上，同时可以利用 cdn 的分发机制，加速用户的加载。

## 使用 script 加速资源加载

存储 json 数据时，加载一般需要在 react/vue 的静态资源加载完成后进行，此处可以优化为：上传时将 json 数据使用 js 的方式上传，然后在加载静态资源时同步加载对应的 js，这样可以将加载提前，节省加载时间。

```html
<script src="https://cdn/data.js"></script>

// data.js 文件内容
;window[document.currentScript.dataset.name||'CDN_DATA']={ data }
```

# 其他

## 获取视频缩略图

七牛支持通过参数获取视频的缩略图，可以获取视频中的任意位置，用于优化用户的浏览体验，并且使页面展示更加灵活：

```
vframe/<Format>
      /offset/<Second>
      /w/<Width>
      /h/<Height>
      /rotate/<Degree>
```

| 参数名称 | 必填 |	说明 |
| --- | --- | --- |
| {Format} | 是 | 输出的目标截图格式，支持jpg、png等。 |
| /offset/{Second} | 是 | 指定截取视频的时刻，单位：秒，精确到毫秒。 |
| /w/{Width} | - | 缩略图宽度，单位：像素（px），取值范围为1-3840。只指定w时，h按比例缩放。同时指定时，按照指定w、h缩放。 |
| /h/{Height} | - | 缩略图高度，单位：像素（px），取值范围为1-2160。只指定h时，w按比例缩放。同时指定时，按照指定w、h缩放。 |
| /rotate/{Degree} | - | 指定顺时针旋转的度数，可取值为90、180、270、auto，默认为不旋转。 |