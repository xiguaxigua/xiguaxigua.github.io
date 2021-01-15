---
title: 面试编程题
date: 2021-01-15
category: interval
tag: program
---

本文介绍一些面试过程中常见的非算法编程题

<!-- more -->

# 判断数组的包含关系

```js
function arrayInclude(arrA, arrB) {
  // 遍历 A 数组，生成 A 的数值与数量的对应关系
  let arrAMap = {};
  arrA.forEach((item) => {
    arrAMap[item] = arrAMap[item] ? ++arrAMap[item] : 1;
  });

  // 遍历 B 数组，对 arrAMap 进行运算
  arrB.forEach((item) => {
    arrAMap[item] = arrAMap[item] ? --arrAMap[item] : -1;
  });

  // 对 arrAMap 的结果进行分析
  let hasPositive = false;
  let hasNegative = false;
  const values = Object.values(arrAMap);
  for (let i = 0; i < values.length; i++) {
    if (values[i] > 0) {
      hasPositive = true;
      if (hasNegative) return -1;
    }
    if (values[i] < 0) {
      hasNegative = true;
      if (hasPositive) return -1;
    }
  }

  if (!hasPositive && hasNegative) return 1;
  if (hasPositive && !hasNegative) return 2;
  if (!hasPositive && !hasNegative) return 0;
}

const a1 = [4, 2, 3, 1, 4];
const a2 = [4, 2, 3, 1, 4, 5];
console.log(arrayInclude(a1, a2)); // 1

const a3 = [4, 2, 3, 1, 4];
const a4 = [4, 2, 3, 1];
console.log(arrayInclude(a3, a4)); // 2

const a5 = [4, 2, 3, 1, 4];
const a6 = [4, 2, 3, 1, 4];
console.log(arrayInclude(a5, a6)); // 0

const a7 = [4, 2, 3, 1, 4];
const a8 = [3, 2, 3, 1, 4];
console.log(arrayInclude(a7, a8)); // -1

```


# 请求最大并发数


# 请求重试


# 观察者模式

