// js/SomGame.js
import * as THREE from 'three';

class SomGame {
    constructor() {
        this.listener = null;
        this.somFundo = null;
        this.somPassos = null;
        this.somInteragir = null; // ACRESCENTADO
        this.somMorte = null;     // ACRESCENTADO
    }

    init(camera) {
        try {
            this.listener = new THREE.AudioListener();
            camera.add(this.listener);
            const loader = new THREE.AudioLoader();

            this.somFundo = new THREE.Audio(this.listener);
            loader.load('./fundo.mp3', (buffer) => {
                this.somFundo.setBuffer(buffer);
                this.somFundo.setLoop(true);
                this.somFundo.setVolume(1.0);
            });

            this.somPassos = new THREE.Audio(this.listener);
            loader.load('./passos.mp3', (buffer) => {
                this.somPassos.setBuffer(buffer);
                this.somPassos.setLoop(true);
                this.somPassos.setVolume(1.5);
                this.somPassos.setPlaybackRate(2.0); 
            });

            // SOM DE ABRIR/FECHAR
            this.somInteragir = new THREE.Audio(this.listener);
            loader.load('./abrirObjeto.mp3', (buffer) => {
                this.somInteragir.setBuffer(buffer);
                this.somInteragir.setVolume(0.5);
            });

            // SOM DE MORTE
            this.somMorte = new THREE.Audio(this.listener);
            loader.load('./morte.mp3', (buffer) => {
                this.somMorte.setBuffer(buffer);
                this.somMorte.setVolume(0.8);
            });

        } catch (e) { console.error(e); }
    }

    tocarFundo() {
        if (this.somFundo && !this.somFundo.isPlaying) this.somFundo.play();
    }

    setPassos(movendo) {
        if (!this.somPassos || !this.somPassos.buffer) return;
        if (movendo && !this.somPassos.isPlaying) this.somPassos.play();
        if (!movendo && this.somPassos.isPlaying) this.somPassos.pause();
    }

    // NOVAS FUNÇÕES PARA DISPARAR OS SONS
    tocarInteracao() {
        if (this.somInteragir && this.somInteragir.buffer) {
            if (this.somInteragir.isPlaying) this.somInteragir.stop();
            this.somInteragir.play();
        }
    }

    tocarMorte() {
        if (this.somMorte && this.somMorte.buffer) {
            this.somMorte.play();
        }
    }
}
export const somGame = new SomGame();