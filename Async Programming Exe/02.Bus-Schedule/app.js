function solve() {
    const departBtn = document.querySelector(`#depart`);
    const arriveBtn = document.querySelector(`#arrive`);
    const spanInfo = document.querySelector(`span`);

    const departUrl = `http://localhost:3030/jsonstore/bus/schedule/`;
    const stop = {
        currentStop: ``,
        nextStop: `depot`
    };

    async function depart() {
        const request = await fetch(departUrl + stop.nextStop);
        const data = await request.json();

        stop.currentStop = data.name;
        stop.nextStop = data.next;

        spanInfo.textContent = `Next stop ${stop.currentStop}`;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        spanInfo.textContent = `Arriving at ${stop.currentStop}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();