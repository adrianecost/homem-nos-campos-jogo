// Main.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import * as UI from './js/UI.js';
import * as ObjectManager from './js/ObjectManager.js';
import * as Player from './js/PlayerController.js';
import * as Interaction from './js/InteractionSystem.js';
import { somGame } from './js/SomGame.js'; // ACRESCENTADO

const CONFIG = {
    fileName: 'casajogo.glb',
    speed: 8.0,
    sprintSpeed: 15.0,
    animationLerp: 10
};

let scene, camera, renderer, clock;
let gameActive = true;
let ritualStarted = false; 
let timeLeft = 60; 

function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020202);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.7, 8); 
    camera.lookAt(0, 1.7, 0);

    somGame.init(camera); // ACRESCENTADO

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffaa00, 0.05);
    scene.add(ambient);

    const controls = Player.initPlayer(camera, document.body);

    // --- CONCERTO DA TECLA E (ACRESCENTADO) ---
    window.addEventListener('playerInteract', () => {
        if (gameActive && ritualStarted) {
            Interaction.interact();
        }
    });
    // ------------------------------------------

    controls.addEventListener('lock', () => {
        ritualStarted = true;
        UI.toggleStartMessage(false);
        somGame.tocarFundo(); // ACRESCENTADO
    });

    const loader = new GLTFLoader();
    loader.load(CONFIG.fileName, (gltf) => {
        scene.add(gltf.scene);
        
        gltf.scene.traverse((child) => {

            // 1. Porta Principal
            if (child.name === "Porta" || child.name === "Porta.002") {
                ObjectManager.setupInteractive(child, 'z', Math.PI / -3, false);
            }

            // 2. Tampa do Baú
            if (child.name === "Tampa") {
                ObjectManager.setupInteractive(child, 'z', Math.PI / 3, true);
            }

            // 3. Porta do Armário
            if (child.name === "PortaArmario" || child.name === "Malha.003") {
                ObjectManager.setupInteractive(child, 'z', Math.PI / 3, false);
            }

            // 4. Cama
            if (child.name === "Cama") {
                child.userData.isBed = true;
                ObjectManager.interactables.push(child);
            }
        });

        UI.hideLoading();
        UI.toggleStartMessage(true, "ENTRE NA CASA E FECHE TUDO ANTES DA MEIA-NOITE");
        UI.updateOpenCountDisplay(ObjectManager.getOpenObjectivesCount());
    });

    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function animate() {
    if (!gameActive) {
        somGame.setPassos(false); // ACRESCENTADO
        return;
    }

    requestAnimationFrame(animate);
    const dt = clock.getDelta();

    Player.updateMovement(dt, CONFIG);
    ObjectManager.updateAnimations(dt, CONFIG.animationLerp);
    
    if (ritualStarted) {
        Interaction.updateInteraction(camera);

        // LÓGICA DE PASSOS ACRESCENTADA
        const estaMovendo = (Player.move.fwd || Player.move.bwd || Player.move.left || Player.move.right);
        somGame.setPassos(estaMovendo);

        timeLeft -= dt;
        UI.updateClock(formatTime(timeLeft));

        if (timeLeft <= 0) gameOver("O TEMPO ESGOTOU. ELE ENTROU.");

        const viewDir = new THREE.Vector3();
        camera.getWorldDirection(viewDir);

        if (camera.position.z < 4.5 && viewDir.z > 0.8) { 
            gameOver("VOCÊ OLHOU PARA O QUINTAL. ELE VIU VOCÊ.");
        }
    }

    renderer.render(scene, camera);
}

function formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    return `23:${s < 10 ? '0' + s : s}`;
}

function gameOver(reason) {
    gameActive = false;
    Player.setDead(true);
    UI.showGameOver(reason);
    document.exitPointerLock();
    
    somGame.tocarMorte(); // ACRESCENTADO
    somGame.setPassos(false); // Garante que passos param na morte
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();