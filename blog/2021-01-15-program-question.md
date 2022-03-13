---
title: 面试编程题
tags: [interview]
---

本文介绍一些面试过程中常见的非算法编程题

<!-- truncate -->

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

```js
function fetch(url) {
  console.log(`[开始获取数据]: ${url}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[返回数据]: ${url}`);
      resolve(`result: ${url}`);
    }, Math.random() * 10000);
  });
}

async function limitFetch(urls, limitNum) {
  let count = 0;
  const len = urls.length;
  let result = new Array(len).fill(false);

  return new Promise((resolve) => {
    while (count < limitNum) {
      next();
    }

    function next() {
      let currentCount = count++;

      if (currentCount >= len) {
        !result.includes(false) && resolve(result);
        return;
      }

      fetch(urls[currentCount]).then(
        (res) => {
          result[currentCount] = res;
          if (currentCount < len) next();
        },
        (err) => {
          result[currentCount] = err;
          if (currentCount < len) next();
        }
      );
    }
  });
}

limitFetch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3).then((res) => {
  console.log(res);
});
```


# 请求重试

```js
function fetch(url) {
  console.log(`[开始获取数据]: ${url}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`[返回数据]: ${url}`);
      reject();
    }, Math.random() * 5000);
  });
}

function fetchRetry(url, retryTimes = 5) {
  return fetch(url).catch((err) => {
    if (retryTimes) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fetchRetry(url, --retryTimes));
        }, 1000);
      });
    } else {
      throw err;
    }
  });
}

fetchRetry("1");
```


# 观察者模式

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, handler) {
    this.events[eventName]
      ? this.events[eventName].push(handler)
      : (this.events[eventName] = [handler]);
  }

  off(eventName, handler) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((item) => {
        return item !== handler && item !== handler.realHandler;
      });
    }
  }

  once(eventName, handler) {
    const wrap = (...args) => {
      handler(args);
      this.off(eventName, handler);
    };
    wrap.realHandler = handler;

    this.on(eventName, wrap);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((handler) => {
        handler.apply(this, args);
      });
    }
  }
}

const ee = new EventEmitter();
function handler(v) {
  console.log(v);
}
ee.on("a", handler);
ee.emit("a", 1); // 打印 1
ee.off("a", handler);
ee.emit("a", 1); // 不打印
```

# 多维数组去重

```js
function unique(arr, store = []) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(unique(item, store));
    } else {
      if (!store.includes(item)) {
        result.push(item);
        store.push(item);
      }
    }
  });
  return result;
}

console.log(
  JSON.stringify(
    unique([1, 2, 3, [4, 9, 11, [3, 5, 12, 14]], 4, 5, 6, 7, 8]),
    null,
    2
  )
);
```

# 扁平结构转树状结构

```js
function convert(data, flow) {
  const result = [];
  data.forEach((item) => {
    let target = result.find((sub) => sub.value === item[flow[0]]);
    if (!target) {
      target = {
        value: item[flow[0]],
        children: [],
      };
      result.push(target);
    }
    if (flow.length > 1) target.children.push(convert([item], flow.slice(1)));
  });
  return result;
}

const data = [
  { a: "a1", b: "b1", c: "c1", d: "d1" },
  { a: "a1", b: "b2", c: "c1", d: "d1" },
  { a: "a2", b: "b1", c: "c1", d: "d1" },
  { a: "a3", b: "b1", c: "c1", d: "d1" },
  { a: "a1", b: "b2", c: "c2", d: "d1" },
  { a: "a3", b: "b2", c: "c1", d: "d1" },
  { a: "a4", b: "b1", c: "c2", d: "d1" },
  { a: "a5", b: "b1", c: "c1", d: "d1" },
  { a: "a2", b: "b1", c: "c2", d: "d2" },
  { a: "a5", b: "b1", c: "c1", d: "d2" },
  { a: "a6", b: "b1", c: "c1", d: "d1" },
];

console.log(JSON.stringify(convert(data, ["a", "b", "c", "d"]), null, 2));
```
