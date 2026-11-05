// frontend/js/api.js
import api_base from '../api_base.js';

const API_BASE =
    window.location.hostname === "localhost"
        ? "http://localhost:8000"
        : api_base;

export async function getQueue() {

    const response =
        await fetch(`${API_BASE}/queue`);

    return await response.json();
}

export async function getHistory() {

    const response =
        await fetch(`${API_BASE}/queue/history`);

    return await response.json();
}

export async function getBatches() {

    const response =
        await fetch(`${API_BASE}/queue/batches`);

    return await response.json();
}

export async function getAllBatches() {

    const response =
        await fetch(`${API_BASE}/queue/batches/all`);

    return await response.json();
}
export async function getStats() {

    const response =
        await fetch(`${API_BASE}/queue/stats`);

    return await response.json();
}

export async function getMetrics() {

    const response =
        await fetch(`${API_BASE}/queue/metrics`);

    return await response.json();
}