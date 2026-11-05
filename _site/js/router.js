// frontend/js/router.js

import { renderNavbar } from "../components/navbar.js";
import { startRefresh, updateLastRefresh } from "./refresh.js";
import { renderQueuePage } from "../pages/queue.js";
import { renderHistoryPage } from "../pages/history.js";
import { renderBatchesPage, attachBatchToggle } from "../pages/batches.js";
import { renderStatsPage } from "../pages/stats.js";
import { renderMetricsPage } from "../pages/metrics.js";
import { renderSettingsPage } from "./settings.js";

document.getElementById("navbar").innerHTML =
    renderNavbar();

let latestRouteId = 0;

async function route() {
    const routeId = ++latestRouteId;

    const page =
        location.hash.replace("#", "") ||
        "queue";

    let html;
    try {
        if (page === "queue") {
            html = await renderQueuePage();
        } else if (page === "history") {
            html = await renderHistoryPage();
        } else if (page === "batches") {
            html = await renderBatchesPage();
        } else if (page === "stats") {
            html = await renderStatsPage();
        } else if (page === "metrics") {
            html = await renderMetricsPage();
        } else if (page === "settings") {
            html = renderSettingsPage();
        } else {
            html = `<h2>${page}</h2>`;
        } 
    } catch (error) {
        console.error("Dashboard route failed:", error);

        html = `
            <section class="dashboard-error" role="alert">
                <h2>Unable to load dashboard data</h2>
                <p>
                    The backend API may be unavailable.
                    Please check your connection and try again.
                </p>
            </section>
        `;
    }

    // Ignore a slower render if a newer route or refresh has started.
    if (routeId !== latestRouteId) return;

    document.getElementById("content").innerHTML = html;

    if (page === "batches") {
        await attachBatchToggle();
        if (routeId !== latestRouteId) return;
    }

    updateLastRefresh();
}

window.addEventListener("hashchange", route);

startRefresh(route, 10000);
