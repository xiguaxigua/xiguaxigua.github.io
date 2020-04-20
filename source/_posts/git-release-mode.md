---
title: 基于 release 分支的合作开发模式
date: 2020-04-20
category: git
tag: git
---

关于 git 合作模式，我们比较常听说的是 **git flow**，但是 **git flow** 在部分业务开发的场景中并不是很实用，尤其是当业务快速迭代的过程中。本文介绍一种基于 release 分支的合作开发模式，以及记录在实践过程中遇到的问题。

<!-- more -->

# 场景介绍

假设 alice 和 bob 同时开发名为 `demo` 的仓库，他们的需求上线时间基本是固定的（例如每周三），存在跨版本开发（例如 alice 开发本周上线的 release/1.0.0，bob 开发 一周后上线的 release/1.1.1）。

首先需要作出如下约定：

- 主仓库的主分支为 `master`
- release 分支为每个版本上线对应分支，例如本周上线 v1.0.0，则 release 分支命名为 release/1.0.0，所有该版本上线的内容都合并到此分支
- feat 分支用于开发每个人的需求

# 流程

## fork 仓库

首先将「主仓库」 fork 到自己的 git 空间中（以下命名为「个人仓库」），然后 clone 「个人仓库」到本地，添加「主仓库」到 remote。

```
git clone git@github.com:self/demo.git
git remote add upstream git@github.com:main/demo.git
git fetch upstream
```

此时，查看 remote 信息：

```
git remote -v
----
origin	git@github.com:self/demo.git (fetch)
origin	git@github.com:self/demo.git (push)
upstream	git@github.com:main/demo.git (fetch)
upstream	git@github.com:main/demo.git (push)
```

## 创建 release 分支

从最新的 `master` 分支下创建 `release` 分支，推送`release` 分支到「主仓库」中

```
git checkout -b release/1.0.0 upstream/master
git push -u upstream
```

{% note %}
`release` 分支在该 `release` 开始前创建，创建后基本就不涉及在本地操作 `release` 分支了。
{% endnote %}

## 创建 feat 分支

在 `release` 分支的基础上创建 `feat` 分支，进行需求的开发

```
git checkout -b feat/add-home-page
```

## pull request

开发完成后，将 `feat` 分支推送到「个人仓库」中，并向主仓库提 `pull request`（或 `merge request`）

```
git push -u origin
```

当 `release` 分支超前于 `feat` 分支时，需要先将 `feat` 分支 `rebase` 到最新的 `release` 分支

```
git fetch upstream
git rebase upstream/release/1.0.0
```

## 上线

在所有 `feat` 合并到对应 `release` 后，将 `release` 分支 `pull request` 到 `master` 分支即可。

# 其他

## 临时需求与 hotfix 的处理

通常一些临时需求的上线时间会与 `release` 的上线时间不一致，此时可以创建 `cr` 分支。例如 `cr/20-04-20`，然后使用与 `release` 分支相同的方式，进行上线。

## release 上处理冲突

在 `release` 分支落后 `master` 的情况下（例如上面有临时需求的情况），上线前需要将 `release` 分支 `rebase` 到最新的 master 分支下，此时要注意如果出现冲突，需要操作者找到对应冲突位置的代码进行严谨的分析解决（通常此处不仅会涉及到一个人的修改）。

## 优势

- 开发和发布相对比较隔离
- 开发分支不会污染主仓库
