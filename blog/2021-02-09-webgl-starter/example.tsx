import React, { useEffect, useRef } from "react";

function Example() {
  const canvasEl = useRef(null);
  useEffect(() => {
    const gl = canvasEl.current.getContext("webgl");

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

    const points = new Float32Array([-1, -1, 0, 1, 1, -1]);

    const bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const vPosition = gl.getAttribLocation(program, "position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
  }, []);

  return <canvas ref={canvasEl} />;
}

export { Example };
