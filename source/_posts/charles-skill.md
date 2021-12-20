---
title: charles 使用过程中的一些技巧
date: 2020-04-14
category: charles
tag: skill
---

charles 作为一款实用性很强的抓包工具，在前端，客户端开发，QA 过程中都有较多的使用场景，本文主要介绍一些 charles 的使用技巧，以及常见问题的解决方案。
<!-- more -->

# 修改跨域接口的返回值

单纯的修改接口返回值有如下方法：

1. 通过 **breakpoint**，缺点是每次接口有返回值都需要改一次；
2. 通过 **map local**，将请求打到本地的某个文件；

通常 **map local** 是比较好的解决方案，但是在接口跨域的情况下，这种方式则无法打到目的，此时，可以使用 **map remote** + [mockapp](https://github.com/xiguaxigua/mockapp) 实现。

<img alt="mockapp" src="https://unpkg.com/figure-bed@0.0.29/images/mockapp.png" style="width:100%;max-width:400px;border:1px solid #eee;" />

<img alt="map-remote" src="https://unpkg.com/figure-bed@0.0.29/images/map-remote.png" style="width:100%;max-width:200px;border:1px solid #eee;" />

# 安卓 app 抓 https 接口

安卓机安装证书的难度跟手机厂商和安卓版本有关，部分版本安装证书十分繁琐或无法安装证书，此时，可以尝试下面的方案：

- 首先安装 [VirtualXposed](https://github.com/android-hacker/VirtualXposed)
- 打开VirtualXposed，从VirtualXposed的 “ 添加应用 ” 中找到[JustTrustMe](https://github.com/Fuzion24/JustTrustMe)的apk安装包并执行安装，JustTrustMe是VirtualXposed的一个模块，所以安装完毕JustTrustMe后，记得在VirtualXposed的模块管理里勾选一下JustTrustMe模块
- 重启一下VirtualXposed让它生效
- 想对谁家app进行数据分析，你需要在VirtualXposed里重新安装一边这个app

# 接口请求不显示在 charles 中

按照以下顺序检查：

- charles 是否代理成功（通常在电脑上开启 ss 会影响 charles 的代理接口）
- 端是否配置接口代理，例如手机的接口配置、证书配置，电脑上是否开启了 **mac proxy** （手机上的 ss 同样会影响代理接口）

# 微信支付调试

微信支付需要在配置的安全域名下，安全域名可配置数量有限，测试环境下可以通过访问可支付域名（比如 a.com），然后将可支付域名的数据 **map remote** 到测试域名下（比如 test.b.com）,此时即可使用测试环境的页面来进行支付了。
<img alt="sale-map" src="https://unpkg.com/figure-bed@0.0.30/images/sale.png" style="width:100%;max-width:200px;border:1px solid #eee;" />