// Initialize the map
const map = L.map('map').setView([52.52, 0.1], 12); // London coords for example

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

// Dummy bus data
const buses = [
  { id: 'Bus1', lat: 52.520, lon: 0.1, delay: 2 },
  { id: 'Bus2', lat: 52.515, lon: 0.095, delay: -1 }
];

const busMarkers = {};

// Function to update bus positions
function updateBuses() {
  buses.forEach(bus => {
    if (busMarkers[bus.id]) {
      busMarkers[bus.id].setLatLng([bus.lat, bus.lon]);
    } else {
      const marker = L.marker([bus.lat, bus.lon])
        .addTo(map)
        .bindPopup(`<b>${bus.id}</b><br/>Delay: ${bus.delay} min`);
      busMarkers[bus.id] = marker;
    }
  });
}

// Simulate movement
function simulateMovement() {
  buses.forEach(bus => {
    bus.lat += (Math.random() - 0.5) * 0.001;
    bus.lon += (Math.random() - 0.5) * 0.001;
    // Change delay randomly
    bus.delay += (Math.random() - 0.5);
  });
}

// Update every 5 seconds
setInterval(() => {
  simulateMovement();
  updateBuses();
}, 5000);

// Initial call
updateBuses();
