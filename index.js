import * as THREE from 'three';

const scene = new THREE.Scene();

// Добавляем свет для MeshPhongMaterial
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100,
);

camera.position.z = 8;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Textures - загружаем текстуру
const texture = new THREE.TextureLoader().load('img/Textures.jpg');

// Создаем материал с текстурой для куба и плоскости
const textureMaterial = new THREE.MeshBasicMaterial({
	map: texture, // применяем текстуру
});

// Создаем куб
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, textureMaterial);
cube.position.set(-3, 0, 0);
scene.add(cube);

// Создаем сферу
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({
	color: 'blue',
	emissive: 'black', // emissive: 'white' делало сферу слишком светлой
	shininess: 100,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 0, 0);
scene.add(sphere);

// Создаем тор
const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.7, 0.2, 16, 100),
	new THREE.MeshBasicMaterial({
		color: 'blue',
	}),
);
torus.position.set(2, 2, 1);
scene.add(torus);

// Создаем плоскость с той же текстурой
const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(2, 2),
	textureMaterial, // используем тот же материал с текстурой
);
plane.position.set(-2, 2, 0);
scene.add(plane);

// Анимация
function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;

	renderer.render(scene, camera);
}

animate();
