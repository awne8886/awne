/**
 *   3D cube created with vanilla Javascript by awne.
 *   Note: I wrote this code when during my time learning JavaScript
 *   and Math, enjoy!
 **/
"use strict";

const CTX = document.querySelector("#main").getContext("2d");

/* Play with these variables to get different results. */
let enableBlur = false; /* Enable this if your computer can run it fine. */
let enableTrans = true; /* Transparency, it is enabled by default. */
let blurIntensity = 20; /* Blur intensity/amount. */
let margin = 12; /* Distance Between each vertex. */
let verCount = 10; /* The number of vertices per axis. */
let verRadius = 7; /* Radius of a vertex. */
let focalLength = 320; /* How close the camera from the projected vertices. */
let rotX = 0.01; /* Rotation amount on X axis. */
let rotY = 0.02; /* Rotation amount on Y axis. */
let rotZ = 0.02; /* Rotation amount on Z axis. */
let pos = {
  x: 0,
  y: 0,
  z: 0
};

const W = (CTX.canvas.width = 400);
const _H = (CTX.canvas.height = 400);
const _HALFW = W * 0.5;
const _HALF_H = _H * 0.5;
const _PI = Math.PI;
const _PI2 = Math.PI * 2;
let cube;

let _helpers = {
  random(min, max) {
    return min + Math.random() * (max - min);
  },
  rangeScale(num, inMin, inMax, outMin, outMax) {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
};
class Vec {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
class Cube {
  constructor() {
    this.pos = pos;
    this.margin = margin;
    this.rad = verRadius;
    this.FOCAL_LENGTH = focalLength;
    this.verCount = verCount;
    this.verData = [];
    let start = 0;
    let end = this.verCount;
    /**
     * I'm basically creating x, y, z vertices.
     */
    for (let x = start; x < end; x += 1) {
      for (let y = start; y < end; y += 1) {
        for (let z = start; z < end; z += 1) {
          let r = _helpers.rangeScale(x, start, end, 90, 255);
          let g = _helpers.rangeScale(y, start, end, 0, 255);
          let b = _helpers.rangeScale(z, start, end, 0, 255);
          let posx = x * this.margin - this.centeroid() * 0.5;
          let posy = y * this.margin - this.centeroid() * 0.5;
          let posz = z * this.margin - this.centeroid() * 0.5;
          let pos = new Vec(posx, posy, posz);
          this.verData.push({
            pos,
            color: `rgba(${r},${g},${b},1)`
          });
        }
      }
    }
  }
  centeroid() {
    return (this.verCount - 1) * this.margin;
  }
  draw() {
    let projVer = this.project(this.verData);
    CTX.imageSmoothingEnabled = false;
    if (enableBlur) {
      CTX.shadowBlur = blurIntensity;
    }
    if (enableTrans) {
      CTX.globalCompositeOperation = "lighter";
    }
    CTX.translate(_HALFW, _HALF_H);
    for (let v of projVer) {
      CTX.shadowColor = v.color;
      let { x, y } = v.pos;
      CTX.fillStyle = v.color;
      CTX.fillRect(x, y, this.rad, this.rad);
    }
    CTX.translate(-_HALFW, -_HALF_H);
    CTX.globalCompositeOperation = "source-over";
    CTX.shadowBlur = 0;
  }
  project(vertices) {
    let projVer = [];
    for (let v of vertices) {
      let { x, y, z } = v.pos;
      let px = x * (this.FOCAL_LENGTH / (z - _HALFW));
      let py = y * (this.FOCAL_LENGTH / (z - _HALF_H));
      projVer.push({
        pos: new Vec(px, py),
        color: v.color
      });
    }
    return projVer;
  }
  rotateX(angle) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    for (let v of this.verData) {
      v = v.pos;
      let y = v.y * cos - v.z * sin;
      let z = v.y * sin + v.z * cos;
      v.y = y;
      v.z = z;
    }
  }
  rotateY(angle) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    for (let v of this.verData) {
      v = v.pos;
      let x = v.z * sin + v.x * cos;
      let z = v.z * cos - v.x * sin;
      v.x = x;
      v.z = z;
    }
  }
  rotateZ(angle) {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    for (let v of this.verData) {
      v = v.pos;
      let x = v.x * cos - v.y * sin;
      let y = v.x * sin + v.y * cos;
      v.x = x;
      v.y = y;
    }
  }
}
let _meter = {
  fps: undefined,
  desiredFPS: 60,
  timeNow: performance.now(),
  startTime: undefined,
  data: [],
  calc() {
    this.timeNow = performance.now();
    let diff = this.timeNow - this.startTime;
    this.data.push(diff);
    this.dt = diff / 1000;
    this.startTime = this.timeNow;
  },
  tick() {
    this.calc();
    if (this.data.length > 60) {
      const dtsum = this.data.reduce((a, c) => a + c);
      let fpsFormula = Math.round(1000 / (dtsum / this.desiredFPS));
      this.fps = isNaN(fpsFormula) ? "00" : fpsFormula;
      this.data.length = 0;
      let fpsDom = document.querySelector("#fps");
      fpsDom.innerHTML = `${this.fps}FPS`;
    }
  }
};

const loop = (time) => {
  CTX.clearRect(0, 0, W, _H);
  cube.draw();
  cube.rotateX(rotX);
  cube.rotateY(rotY);
  cube.rotateZ(rotZ);
  _meter.tick();
};

function init() {
  cube = new Cube();
  setInterval(loop, 1000 / 60);
}

init();
