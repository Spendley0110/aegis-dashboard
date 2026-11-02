import { getMetrics } from "../js/api.js";

export async function renderMetricsPage() {

    const metrics = await getMetrics();

    let durationRows = "";

    for (const [jobType, average] of Object.entries(
        metrics.avg_run_time_by_type
    )) {

        durationRows += `
        <tr>
            <td>${jobType}</td>
            <td>${average}</td>
        </tr>
        `;
    }

    let countRows = "";

    for (const [jobType, count] of Object.entries(
        metrics.job_type_counts
    )) {

        countRows += `
        <tr>
            <td>${jobType}</td>
            <td>${count}</td>
        </tr>
        `;
    }

    return `
        <h2>Metrics</h2>

        <p><strong>Total Completed:</strong>
        ${metrics.total_completed}</p>

        <p><strong>Average Run Time:</strong>
        ${metrics.avg_run_time ?? "N/A"}</p>

        <p><strong>Median Run Time:</strong>
        ${metrics.median_run_time ?? "N/A"}</p>

        <p><strong>Minimum Run Time:</strong>
        ${metrics.min_run_time ?? "N/A"}</p>

        <p><strong>Maximum Run Time:</strong>
        ${metrics.max_run_time ?? "N/A"}</p>

        <p><strong>Average Wait Time:</strong>
        ${metrics.avg_wait_time ?? "N/A"}</p>

        <p><strong>Median Wait Time:</strong>
        ${metrics.median_wait_time ?? "N/A"}</p>

        <p><strong>Maximum Wait Time:</strong>
        ${metrics.max_wait_time ?? "N/A"}</p>

        <p><strong>Batch Count:</strong>
        ${metrics.batch_count}</p>

        <p><strong>Average Batch Duration:</strong>
        ${metrics.avg_batch_duration ?? "N/A"}</p>

        <p><strong>Median Batch Duration:</strong>
        ${metrics.median_batch_duration ?? "N/A"}</p>

        <h3>Average Run Time By Type</h3>

        <table border="1">
            <thead>
                <tr>
                    <th>Job Type</th>
                    <th>Average Time</th>
                </tr>
            </thead>
            <tbody>
                ${durationRows}
            </tbody>
        </table>

        <h3>Job Type Counts</h3>

        <table border="1">
            <thead>
                <tr>
                    <th>Job Type</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                ${countRows}
            </tbody>
        </table>
    `;
}