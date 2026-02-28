import * as THREE from 'three';
import { interactables, getOpenObjectivesCount } from './ObjectManager.js';
import * as UI from './UI.js';
import { somGame } from './SomGame.js'; 

const raycaster = new THREE.Raycaster();
const center = new THREE.Vector2(0, 0);
let cameraRef = null;

export function updateInteraction(camera) {
    cameraRef = camera;
}

export function interact() {
    if (!cameraRef) return;

    raycaster.setFromCamera(center, cameraRef);
    const intersects = raycaster.intersectObjects(interactables, true);

    if (intersects.length === 0) return;

    const obj = findInteractive(intersects[0].object);
    if (!obj) return;

    if (obj.userData.isBed) {
        trySleep();
        return;
    }

    // Inverte o estado
    obj.userData.isOpen = !obj.userData.isOpen;
    
    // Toca o som que você adicionou
    somGame.tocarInteracao(); 

    UI.updateOpenCountDisplay(getOpenObjectivesCount());
}

function findInteractive(obj) {
    while (obj) {
        if (obj.userData && (obj.userData.axis || obj.userData.isBed)) return obj;
        obj = obj.parent;
    }
    return null;
}

function trySleep() {
    const openCount = getOpenObjectivesCount();
    if (openCount > 0) {
        UI.showWarning(`AINDA HÁ ${openCount} COISAS ABERTAS!`);
        return;
    }
    const winScreen = document.getElementById('win-screen');
    if (winScreen) winScreen.style.display = 'flex';
    document.exitPointerLock();
}