// Remove this dummy data
// const buses = [ ... ];

// Function to fetch real bus data
function fetchBusData() {
  fetch('pk.eyJ1IjoiNDA0YnJhaW5ub3Rmb3VuZCIsImEiOiJjbXBtMWlscnAxYjh3MnJzN2Z4bWIyY2I3In0.4EgboTXtPSZgAu5fOwelSA') // <-- Replace with your real API URL
    .then(res => res.json())
    .then(data => {
      // Data should be an array of bus objects: { id, lat, lon, delay }
      data.forEach(bus => {
        if (busMarkers[bus.id]) {
          busMarkers[bus.id].setLatLng([bus.lat, bus.lon]);
        } else {
          const marker = L.marker([bus.lat, bus.lon])
            .addTo(map)
            .bindPopup(`<b>${bus.id}</b><br/>Delay: ${bus.delay} min`);
          busMarkers[bus.id] = marker;
        }
      });
    })
    .catch(err => console.error('Error fetching bus data:', err));
}

// Call fetchBusData() periodically
setInterval(() => {
  fetchBusData();
}, 15000); // every 15 seconds

// Initial fetch
fetchBusData();
