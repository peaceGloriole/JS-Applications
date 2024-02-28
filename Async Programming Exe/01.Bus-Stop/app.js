async function getInfo() {
  const stopIdRef = document.getElementById(`stopId`);
  const stopId = stopIdRef.value;
  const stopNameRef = document.getElementById(`stopName`);
  const busesRef = document.getElementById(`buses`);

  const url = 'http://localhost:3030/jsonstore/bus/businfo/' + stopId;

  try {
    const request = await fetch(url);
    const data = await request.json();

    busesRef.innerHTML = ``;

    stopNameRef.textContent = data.name;
    appendChild(Object.entries(data.buses));
  } catch (error) {
      stopNameRef.textContent = 'Error';
      busesRef.innerHTML = ``;
  }

  function appendChild(data) {
    for ([bus, time] of data) {
      let li = document.createElement('li');
      li.textContent = `Bus ${bus} arrives in ${time} minutes`;
      busesRef.appendChild(li);
    }
  }
}