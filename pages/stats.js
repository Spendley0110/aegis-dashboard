import { getStats } from "../js/api.js";

export async function renderStatsPage() {

    const stats = await getStats();

    let averageRows = "";

    for (const [jobType, average] of Object.entries(
        stats.avg_duration_by_type
    )) {

        averageRows += `
        <tr>
            <td>${jobType}</td>
            <td>${average}</td>
        </tr>
        `;
    }

    return `
        <h2>Queue Stats</h2>

        <p><strong>Total Pending:</strong>
        ${stats.total_pending}</p>

        <p><strong>Running:</strong>
        ${stats.running}</p>

        <p><strong>Running Job ID:</strong>
        ${stats.running_job_id ?? "None"}</p>

        <p><strong>Running Job Elapsed:</strong>
        ${stats.running_job_elapsed ?? "None"}</p>

        <p><strong>Oldest Pending:</strong>
        ${stats.oldest_pending ?? "None"}</p>

        <h3>Average Duration By Type</h3>

        <table border="1">
            <thead>
                <tr>
                    <th>Job Type</th>
                    <th>Average Duration</th>
                </tr>
            </thead>
            <tbody>
                ${averageRows}
            </tbody>
        </table>
    `;
}