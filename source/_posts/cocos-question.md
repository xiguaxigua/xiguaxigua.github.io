---
title: cocos 开发过程中常见的问题及解决方案
date: 2020-06-22
category: cocos
tag: Q&A
---

本文介绍一些在 cocos creator 开发过程中常见的问题及相应的解决方案。

<!-- more -->

# 粒子系统卡顿

> 通常是由于粒子文件贴图过大导致，转换成 base64 时过长

- 将贴图使用本地文件替换，将贴图置于 plist 目录下，修改资源为 filename
