import {
    getBatches,
    getAllBatches
} from "../js/api.js";

let showAllBatches = false;

export async function renderBatchesPage() {
    // Keep the request and its labels tied to the same mode, even if the
    // toggle changes while the request is in flight.
    const showingAll = showAllBatches;

    const data = showingAll
        ? await getAllBatches()
        : await getBatches();

    let rows = "";

    const toggleText = showingAll
        ? "Showing All Batches"
        : "Showing Active Batches";

    for (const job of data.batches) {
        const isActive = ["pending", "running"].includes(job.status);
        const startTime = isActive ? job.estimated_start : job.started_at;
        const completionTime = isActive
            ? job.estimated_completion_time
            : job.finished_at;

        rows += `
        <tr>
            <td>${job.batch_id}</td>
            <td>${job.jobs}</td>
            <td>${job.status}</td>
            <td>${job.created_at}</td>
            <td>${startTime ?? ""}</td>
            <td>${completionTime ?? ""}</td>
        </tr>
        `;
    }

    const startHeading = showingAll
        ? "Started At"
        : "Estimated Start";
    const completionHeading = showingAll
        ? "Finished At"
        : "Estimated Completion";

    return `
        <button id="batch-toggle">
            ${toggleText}
        </button>

        <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Job IDs</th>
                <th>Status</th>
                <th>Created</th>
                <th>${startHeading}</th>
                <th>${completionHeading}</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
    `;
}
export async function attachBatchToggle() {

    const button =
        document.getElementById("batch-toggle");

    if (!button) {
        return;
    }

    button.onclick = () => {

        showAllBatches =
            !showAllBatches;

        window.dispatchEvent(
            new HashChangeEvent("hashchange")
        );
    };
}
