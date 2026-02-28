import * as THREE from 'three';

export const interactables = [];

export function setupInteractive(obj, axis, angle, startsOpen) {

    // --- CRIA PIVÔ SEGURO ---
    const pivot = new THREE.Object3D();

    if (obj.parent) {
        obj.parent.add(pivot);
    }

    pivot.position.copy(obj.position);

    obj.position.set(0, 0, 0);
    pivot.add(obj);

    interactables.push(pivot);

    // 👉 Agora: todo objeto interativo conta como objetivo
    const isObjective = true;

    // A ROTACÃO ESTÁ CORRETA AQUI CONFORME SEU MAIN.JS
    if (startsOpen) pivot.rotation[axis] += angle;

    pivot.userData = {
        axis: axis,
        startRot: startsOpen ? pivot.rotation[axis] - angle : pivot.rotation[axis],
        targetRot: startsOpen ? pivot.rotation[axis] : pivot.rotation[axis] + angle,
        
        // ESTADO LOGICO: Inicia com o valor do Main.js
        isOpen: startsOpen, 
        
        // --- ADICIONAMOS ESTA LINHA ---
        // Aqui salvamos o que o Main.js disse que é a posição "Aberta" 
        // para comparar depois.
        openReference: startsOpen, 
        
        isObjective: isObjective,
        isBed: false
    };
}

export function updateAnimations(dt, lerpFactor) {
    interactables.forEach(obj => {
        const data = obj.userData;
        if (!data || data.isBed) return;

        const axis = data.axis;
        // A animação inverte o estado logicamente
        const target = data.isOpen ? data.targetRot : data.startRot;

        obj.rotation[axis] = THREE.MathUtils.lerp(
            obj.rotation[axis],
            target,
            lerpFactor * dt
        );
    });
}

export function getOpenObjectivesCount() {
    let openCount = 0;

    interactables.forEach(obj => {
        const data = obj.userData;
        if (data && data.isObjective && !data.isBed) {
            
            // --- A MUDANÇA ESTÁ AQUI ---
            // Se o booleano atual for IGUAL à referência, significa que está na 
            // posição que você definiu como aberta no Main.js.
            if (data.isOpen === data.openReference) {
                openCount++;
            }
        }
    });

    return openCount;
}