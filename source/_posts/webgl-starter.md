---
title: webgl 绘图基础流程
date: 2021-02-09
category: webgl
tag: starter
---

webgl 绘制图形的基本流程：
创建 webgl 上下文 -> 创建 webgl 程序 -> 数据存入缓冲区 -> 将缓冲区数据读取到 GPU -> GPU 执行 webgl 程序

<!-- more -->

# 创建 webgl 上下文

```js
const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl');
```

# 创建 webgl 程序

webgl 绘图过程需要两个着色器：顶点着色器和片元着色器，分别处理图形的顶点信息和像素信息

```js
const vertex = `
  attribute vec2 position;

  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
  }
`;

const fragment = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`;
```

接下来使用上面创建好的着色器创建 shader 对象

```js
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);
```

接下来将 shader 关联到 webgl 程序中

```js
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
```

最后，启用该 program 对象

```js
gl.useProgram(program);
```

# 数据存入缓冲区

使用 Float32Array 定义三角形的节点信息，并将定义好的数据写入到 webgl 的缓冲区中

```js
const points = new Float32Array([
  -1, -1,
  0, 1,
  1, -1,
]);

const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
```

# 将缓冲区数据读取到 GPU

将 buffer 中的数据绑定给顶点着色器的 position 变量

```js
const vPosition = gl.getAttribLocation(program, 'position');
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);
```

# GPU 执行 webgl 程序

清空画布，执行绘制方法

```js
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
```

# 示例

<div id="app">
  <vuep template="#webgl_starter_demo"></vuep>
</div>

<script v-pre type="text/x-template" id="webgl_starter_demo">
<template>
  <canvas ref="canvas" width="200" height="200"></canvas>
</template>

<script>
module.exports = {
  mounted () {
    const gl = this.$refs.canvas.getContext('webgl');

    const vertex = `
      attribute vec2 position;

      void main() {
        gl_PointSize = 1.0;
        gl_Position = vec4(position, 1.0, 1.0);
      }
    `;

    const fragment = `
      precision mediump float;

      void main() {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.useProgram(program);

    const points = new Float32Array([
      -1, -1,
      0, 1,
      1, -1,
    ]);

    const bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const vPosition = gl.getAttribLocation(program, 'position');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
  }
}
</script>
</script>

# 使用 varying 变量传值

顶点着色器的数据可以通过 varying 变量传递给片元着色器

<div id="app">
  <vuep template="#webgl_starter_demo_varying"></vuep>
</div>

<script v-pre type="text/x-template" id="webgl_starter_demo_varying">
<template>
  <canvas ref="canvas" width="200" height="200"></canvas>
</template>

<script>
module.exports = {
  mounted () {
    const gl = this.$refs.canvas.getContext('webgl');

    const vertex = `
      attribute vec2 position;
      varying vec3 color;

      void main() {
        gl_PointSize = 1.0;
        color = vec3(0.5 + position * 0.5, 0.0);
        gl_Position = vec4(position * 0.5, 1.0, 1.0);
      }
    `;

    const fragment = `
      precision mediump float;
      varying vec3 color;

      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.useProgram(program);

    const points = new Float32Array([
      -1, -1,
      0, 1,
      1, -1,
    ]);

    const bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const vPosition = gl.getAttribLocation(program, 'position');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
  }
}
</script>
</script>
