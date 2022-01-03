import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
    
let camera, scene, renderer;
let loader; // we need to create a variable for a gltf model loader

init();
animate();

function init() 
{
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // we have to enable the renderer for webxr
    container.appendChild(renderer.domElement);

    var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const modelUrl = 'https://raw.githubusercontent.com/immersive-web/webxr-samples/main/media/gltf/space/space.gltf';

    loader = new THREE.GLTFLoader();
    loader.load(modelUrl,function (gltf) 
    {
        scene.add(gltf.scene);
    },
    function (xhr) 
    {
    },

    function (error) 
    {
        console.error(error);
    }
    );

    document.body.appendChild(ARButton.createButton(renderer));

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() 
{
    renderer.setAnimationLoop(render);
}

function render() 
{
    renderer.render(scene, camera);
}