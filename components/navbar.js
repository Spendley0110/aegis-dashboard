// frontend/components/navbar.js

export function renderNavbar() {
    return `
        <nav>
            <a href="#queue">Queue</a>
            <a href="#history">History</a>
            <a href="#batches">Batches</a>
            <a href="#stats">Stats</a>
            <a href="#metrics">Metrics</a>
            <a href="#settings">Settings</a>
        </nav>
    `;
}