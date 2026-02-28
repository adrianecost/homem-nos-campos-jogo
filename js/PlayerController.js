import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

let controls;
let cameraRef;
let isDead = false;

// Mantemos o export apenas para o som ler o estado
export const move = { fwd:false, bwd:false, left:false, right:false, sprint:false };

export function initPlayer(camera, domElement) {
    cameraRef = camera;
    controls = new PointerLockControls(camera, domElement);

    domElement.addEventListener('click', () => {
        if (!isDead) controls.lock();
    });

    document.addEventListener('keydown', e => handleKey(e,true));
    document.addEventListener('keyup', e => handleKey(e,false));

    return controls;
}

export function setDead(status){
    isDead = status;
    if(isDead && controls) controls.unlock();
}

function handleKey(e,isDown){
    if(isDead) return;

    if(isDown && e.code === 'KeyE'){
        window.dispatchEvent(new CustomEvent('playerInteract'));
    }

    if(e.code==='KeyW') move.fwd=isDown;
    if(e.code==='KeyS') move.bwd=isDown;
    if(e.code==='KeyA') move.left=isDown;
    if(e.code==='KeyD') move.right=isDown;
    if(e.code==='ShiftLeft') move.sprint=isDown;
}

export function updateMovement(dt,config){
    if(!controls || !controls.isLocked || isDead) return;

    const speed = move.sprint ? config.sprintSpeed : config.speed;

    // VOLTANDO PARA SUA LÓGICA ORIGINAL QUE FUNCIONAVA:
    if(move.fwd) controls.moveForward(speed * dt);
    if(move.bwd) controls.moveForward(-speed * dt);
    if(move.left) controls.moveRight(-speed * dt);
    if(move.right) controls.moveRight(speed * dt);
}