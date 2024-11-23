let map, marker, selectedLocation = null;

// Initialize the map
function initMap() {
  const defaultLocation = { lat: 12.9716, lng: 77.5946 }; // Default location (New York City)

  // Create the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 10,
  });

  // Add click listener to the map
  map.addListener("click", (event) => {
    const clickedLocation = event.latLng;

    // Update selected location
    selectedLocation = {
      lat: clickedLocation.lat(),
      lng: clickedLocation.lng(),
    };

    // Add or update marker
    if (marker) {
      marker.setPosition(clickedLocation);
    } else {
      marker = new google.maps.Marker({
        position: clickedLocation,
        map: map,
      });
    }

    // Display the selected location to the user
    updateLocationDetails(selectedLocation);
  });
}

// Function to update the location details on the page
function updateLocationDetails(location) {
  document.getElementById("display-lat").innerHTML = `Latitude: <span class="highlight">${location.lat.toFixed(6)}</span>`;
  document.getElementById("display-lng").innerHTML = `Longitude: <span class="highlight">${location.lng.toFixed(6)}</span>`;
}
