---
title: 二维码的历史与技术细节
date: 2020-08-28
category: qrcode
tag: qrcode
---
<div />
<!-- more -->

# 历史背景

从超市说起 -> 条形码 -> 二维码
<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a3.jpg" alt="原昌宏" />

# 如何创建二维码

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a4.jpg" alt="" />

## 定位图案

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a11.jpg" alt="" />

## 数据码

```
数字编码(Numeric Mode): 只支持数字 0~9 的编码
字符编码(Alphanumeric Mode)：支持包含数字、大写的A-Z(不包含小写)、以及$ % * + – . / :和空格
字节编码(Byte Mode): 支持0x00~0xFF内所有的字符
日文编码(Kanji Mode)： 只能支持0x8140~0x9FFC、0xE040~0xEBBF的字符，可以在这里找到
```

123456789
（123）(456)(789)
01010101010 010101100 100100101  11010100 
数据码+补齐码 236 17 

## 纠错码

解一道数学题：已知 d1 d2 d3 y1 y2， 新增一个数，保证丢失一个数之后这个数可以被恢复

d1 + d2 + d3 = y1
d1 + 2d2 + 4d3 = y2

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a9.jpg" alt="里德、所罗门" />

里德所罗门码
基于有限域的多项式除法

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a1.jpg" alt="伽罗瓦" />

数据码加纠错码加补 0
01010101101010100000000000011111111111111

## 绘制

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a6.jpg" alt="" />

## 遮罩

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a5.jpg" alt="" />

惩罚机制

## 绘制格式信息

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a10.jpg" alt="" />

# 自定义二维码

## 在中间增加图案

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a2.jpg" alt="" />

## 在二维码内增加图案

> https://qrbtf.com/

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a8.jpg" alt="" />

## 自定义二维码的编解码

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.53/images/a7.jpg" alt="" />

## 动态二维码

> https://github.com/divan/txqr

<img width="250" src="https://cdn.jsdelivr.net/npm/figure-bed@0.0.54/images/a12.gif" alt="" />
