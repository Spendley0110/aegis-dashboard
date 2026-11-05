import { getHistory } from "../js/api.js";

export async function renderHistoryPage() {

    const data = await getHistory();

    let rows = "";

    for (const job of data.items) {

        rows += `
        <tr>
            <td>${job.job_id}</td>
            <td>${job.repo}</td>
            <td>${job.status}</td>
            <td>${job.created_at}</td>
            <td>${job.started_at ?? ""}</td>
            <td>${job.finished_at ?? ""}</td>
            <td>${job.actual_total_time ?? ""}</td>
        </tr>
        `;
    }

    return `
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Repo</th>
                <th>Status</th>
                <th>Created</th>
                <th>Started</th>
                <th>Finished</th>
                <th>Total Time</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
    `;
}