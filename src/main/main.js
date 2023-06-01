import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";
console.log(dat);
// 11几何体
const scene = new THREE.Scene();
// 创建相机-透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);
// 添加物体
// 创建几何体
const cubeGeomety = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "skyblue" });
// 创建物体
const cube = new THREE.Mesh(cubeGeomety, cubeMaterial);
// 物体缩放
// cube.scale.set(5, 2, 1);
// 物体旋转
cube.rotation.set(Math.PI / 4, 0, 0);

// 将物体添加到场景中
scene.add(cube);
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webGL渲染的canvas添加到body上
document.body.appendChild(renderer.domElement);
// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera);
// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(15);
scene.add(axesHelper);
const speed = 2;
const clock = new THREE.Clock();
// const gsap = new Gsap();
// let animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   repeat: -1,
//   delay: 2,
//   yoyo: true,
//   ease: "power1.in",
//   onStart: () => {
//     console.log("动画开始");
//   },
//   onComplete: () => {
//     console.log("动画结束");
//     // gsap.to(cube.rotation, { x: 0, duration: 5, ease: "power1.in" });
//   },
// });
// // gsap.to(cube.position, { x: 0, duration: 5, ease: "power1.in" });
// let animate2 = gsap.to(cube.rotation, {
//   x: 2 * Math.PI,
//   yoyo: true,
//   repeat: -1,
//   duration: 5,
//   ease: "power1.in",
//   // repeat: 2,
// });
// window.addEventListener("click", () => {
//   if (animate1.isActive()) {
//     animate1.pause();
//     animate2.pause();
//   } else {
//     animate1.resume();
//     animate2.resume();
//   }
// });
// window.addEventListener("dblclick", () => {
//   const fullscreenElement = document.fullscreenElement;
//   if (fullscreenElement) {
//     document.exitFullscreen();
//   } else {
//     renderer.domElement.requestFullscreen();
//   }
// });
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix();
  // 跟新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
// gsap.to(cube.position, { y: 5, duration: 5 });
function render(time) {
  // console.log(time);
  // let clockTime = clock.getElapsedTime();
  // let clockDelaTime = clock.getDelta();
  // console.log("时钟运行总时长", clockTime);
  // console.log("两贞的时间差", clockDelaTime);
  // if (cube.position.x >= 5 && direction === 1) {
  //   direction = -1;
  // }
  // if (cube.position.x <= 0 && direction === -1) {
  //   direction = 1;
  // }
  // // 修改物体位置
  // cube.position.x += direction * 0.01;
  // cube.rotation.x += 0.01;
  // let t = clockTime % 5;
  // cube.position.x = t * speed;
  // cube.rotation.x = t * speed;
  controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧的时候触发
  requestAnimationFrame(render);
}
render();

const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(12)
  .step(0.01)
  .name("x轴变化")
  .onFinishChange((value) => {
    console.log("完全停下的值：", value);
  });
const params = {
  color: "#fff",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 5, yoyo: true, repeat: -1 });
  },
};
gui.addColor(params, "color").onChange((value) => {
  console.log(value);
  cube.material.color.set(value);
});
gui.add(cube, "visible").name("是否显示");
gui.add(params, "fn").name("点击立方体开始运动");
const folder = gui.addFolder("文件夹1");
folder.add(cube.material, "wireframe");
