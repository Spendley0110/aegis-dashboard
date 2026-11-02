// frontend/js/refresh.js

export function startRefresh(
    callback,
    interval = 10000
) {

    callback();

    return setInterval(
        callback,
        interval
    );
}
export function updateLastRefresh() {

    document.getElementById(
        "statusbar"
    ).innerHTML =
        `Last refresh: ${new Date().toLocaleTimeString()}`;
}