// js/UI.js
export function updateOpenCountDisplay(count) {
    const el = document.getElementById('open-count');
    if (el) el.innerText = count;
}

export function updateClock(text) {
    const el = document.getElementById('clock');
    if (el) el.innerText = text;
}

export function showWarning(msg, durationMs = 3000) {
    const el = document.getElementById('warning-msg');
    if (el) {
        el.innerText = msg;
        el.style.display = 'block';
        setTimeout(() => el.style.display = 'none', durationMs);
    }
}

export function showGameOver(reason) {
    const screen = document.getElementById('lose-screen');
    const text = document.getElementById('death-reason');
    if (screen) screen.style.display = 'flex';
    if (text) text.innerText = reason;
}

export function hideLoading() {
    const el = document.getElementById('loading');
    if (el) el.style.display = 'none';
}

export function toggleStartMessage(show, text = "") {
    const el = document.getElementById('start-msg');
    if (el) {
        el.style.display = show ? 'block' : 'none';
        if (text) el.innerText = text;
    }
}