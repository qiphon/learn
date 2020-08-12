const { Loader } = require("three");

let container,
    camera,
    scene,
    light,
    render,
    controls;
init()
animate()


function init() {
    container = document.createElement('div')
    document.body.appendChild(container)

    // 容器灌入内容
    // 放置眼睛
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .25, 1000)
    camera.position.set(0, -0.2, -0.2)
    const loader = new THREE.GLTFLoader()
    // loader.load('./sd.gltf').setPath('')
    scene = new THREE.Scene()
    render = new THREE.WebGLRenderer({
        antialias: true,   // 抗锯齿
    })
    // render.setPixelRatio(window.pi)
    // render.setSize()
}

function animate (){
    requestAnimationFrame(animate)
    render.render(scene, camera)
}