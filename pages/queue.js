import { getQueue } from "../js/api.js";

export async function renderQueuePage() {

    const data = await getQueue();

    let rows = "";

    for (const job of data.items) {

        rows += `
        <tr>
            <td>${job.job_id}</td>
            <td>${job.repo}</td>
            <td>${job.status}</td>
            <td>${job.created_at}</td>
            <td>${job.job_type}</td>
            <td>${job.estimated_wait_time}</td>
            <td>${job.estimated_completion_time}</td>
        </tr>
        `;
    }

    return `
    <table border = 1>
        <thead>
            <tr>
                <th>Job ID</th>
                <th>Repo</th>
                <th>Status</th>
                <th>Created</th>
                <th>Type</th>
                <th>Est. Wait (s)</th>
                <th>Completion</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>
    `;
}