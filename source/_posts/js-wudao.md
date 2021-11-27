---
title: 精读 《JavaScript 悟道》
date: 2021-11-27
category: book
tag: js
---

《JavaScript 悟道》是 道格拉斯 对 js 这门语言中精华与糟粕的总结，在经过深度参与 es5 的制定后，慢慢的淡出了 tc39，但是他对 js 的感情还是在这篇文章中显露无疑。本文总结了书中比较精华的部分，并加入了一些个人理解。

<!-- more -->

# 作者介绍

![道格拉斯](https://cdn.jsdelivr.net/npm/figure-bed@0.0.61/images/5988271e-08ab-48b4-b450-0b9ca5f0bde8.png)

道格拉斯·克罗克福德 （[https://www.crockford.com/](https://www.crockford.com/)）

- 知名于对网页编程语言JavaScript推进和改良
- 轻量级资料交换格式“JSON”的创建者
- 众多JavaScript语言开发工具的创造者，例如JSLint和JSMin
- 著作：《JavaScript：语言精粹》

![《JavaScript：语言精粹》](https://cdn.jsdelivr.net/npm/figure-bed@0.0.61/images/a8dbf011-081c-4cb1-ac4e-bdc19a9e1a9f.png)

# 正文部分

## 导读

{% note primary  %}
编程语言的重要设计目标之一就是尽可能使其简洁、优雅、逻辑性强，没有各种奇怪的极端情况。然而事实上，JavaScript远没有达到这个目标。随着越来越多的特性加入，每一次新版的发布都会使其变得越来越糟糕。
我们应当尽量待在这门语言干净阳光的一面，这里已经有能让你写出好程序所需的一切了，不要让自己堕入无边黑洞。
{% endnote %}

{% note primary  %}
这是我用来提升自己所写代码的“不传之法”：如果一个特性时而有用，时而是个“坑”，并且有更好的选项，那么我们就应该始终选择那个“更好的选项”。

例如 `Object.assign`，通常使用在将多个对象合并为一个对象，但是合并时会将其他对象也合并到第一个对象上，所以尽量不要使用这种方式进行对象合并，而应该使用 `...` 代替。
{% endnote %}

{% note primary  %}
我认为1的英文拼写是错误的，因此在书中用了自认为更正确的拼写——wun。one这个单词根本不符合任何发音规则，包括各种特殊规则。此外，用一个看着像0的字母作为表示1的单词的首字母，本身就不合适。
不过，wun这个单词对于大众来说，看起来有点奇怪。之所以在书中采用这样的拼写，是因为我想通过此事让你明白一个道理：对陌生事物产生的奇怪感觉并不能证明它是错的。

由此可见 道格拉斯 是一个非常有 独特思维 的人，整本书都充斥着这样的主观内容。
{% endnote %}

## 命名

{% note primary  %}
在JavaScript中，你需要给变量、属性以及函数命名。因为JavaScript对于变量名的长度没有限制，所以不要吝惜你的起名才华。我希望你在命名的时候尽可能描述清楚被赋名者的含义，而不要使用各种隐晦的缩写。
{% endnote %}

尤其时在 js 的多层嵌套循环当中，使用缩写的命名会让溯源异常的麻烦。

{% note primary  %}
让你的命名以字母开头、以字母结尾吧。诚然，JavaScript的命名能以下划线（_）或者美元符号（$）开头和结尾，还能以数字结尾2，但我认为你不该这么做。JavaScript允许我们做很多本不该做的事情。这些命名习惯应该留给代码生成器或者宏处理器，而人类应该去做人类该做的事情
在命名时以下划线开头或结尾通常是为了表示私有属性或者全局私有变量3。所以，挂在开头或结尾的下划线是一个程序员不成熟的表现。
美元符号则通常是被一些代码生成器、转义器和宏处理器加到变量里的，以此来保证生成的变量名不会与人工编写的代码冲突。为了证明你并不是一个机器人，离美元符号远一点儿吧。
{% endnote %}

{% note primary  %}
最佳实践就应该是在变量名中使用空格
{% endnote %}

(虽然现在没有一门编程语言支持这样做...

{% note primary  %}
所有的构造函数都应该以大写字母开头，而其他任何名字都应该以小写字母开头 (函数)。
我其实还有一个诀窍：从不用 new
{% endnote %}

从这里开始，道格拉斯就展示了他对面向对象编程的不满了...

## 数值

{% note primary  %}
分析数值的本质
{% endnote %}

```js
function deconstruct (number) {
    let sign = 1;
    let coefficient = number;
    let exponent = 0;

    if (coefficient < 0) {
        coefficient = -coefficient;
        sign = -1;
    }

    if (Number.isFinite(number) && number !== 0) {
        exponent = -1128; // Number.MIN_VALUE 的指数减去有效位数减去奖励位
        let reduction = coefficient;
        while (reduction !== 0) {
            exponent += 1;
            reduction /= 2;
        }

        reduction = exponent;
        while (reduction > 0) {
            coefficient /= 2;
            reduction -= 1;
        }
        while (reduction < 0) {
            coefficient *= 2;
            reduction += 1;
        }
    }

    return {
        sign, // 符号位
        coefficient, // 整数部分
        exponent, // 小数部分
        number // 数值
    }
}

0.1
coefficient: 7205759403792794
exponent: -56
number: 0.1
sign: 1

0.2
coefficient: 7205759403792794
exponent: -55
number: 0.2
sign: 1

7205759403792794 * 2 ** -56 // 0.1000000000000000055511151231257827021181583404541015625
```

## 布尔类型

{% note primary  %}
最让人困惑的是，NaN 居然不等于它自己！这是IEEE754的糟粕，JavaScript却将其照搬了过来，没有做任何处理
{% endnote %}


{% note primary  %}
7 < NaN // false
NaN < 7 // false
!(7 < NaN) === 7 >= NaN // false
所以，避免使用布尔式犯蠢类型吧，请使用真正的布尔类型。
{% endnote %}