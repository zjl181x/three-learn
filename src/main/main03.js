import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 02添加坐标轴
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

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
function render() {
  renderer.render(scene, camera);
  // 渲染下一帧的时候触发
  requestAnimationFrame(render);
}
render();
