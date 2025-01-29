let myMap = L.map("map", {
    center: [38.7946, -106.5348],
    zoom: 5
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Fetch the earthquake data
  let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  d3.json(url).then(function(response) {
  
    features = response.features;

    let marker_limit = features.length;

    // Loop through the features
    for (let i = 0; i < marker_limit; i++) {

      let feature = features[i];
      let location = feature.geometry;

      // Determine which color to use
      if(location){

        let colorVal = '#a3f600'; // green
        let depth = location.coordinates[2];

        if (depth < 30) {
          colorVal = '#dcf400'; // yellow green
        } else if (depth < 50) {
          colorVal = '#f7db11'; // yellow
        } else if (depth < 70) {
          colorVal = '#fdb72a'; // yellow orange
        } else if (depth < 90) {
          colorVal = '#fca35d'; // orange
        } else if (depth >= 90) {
          colorVal = '#ff5f65'; // red
        }

        L.circle([location.coordinates[1], location.coordinates[0]], {
          color: '#000',
          fillColor: colorVal,
          fillOpacity: 1,
          weight: 1,
          radius: (feature.properties.mag * 15000) // Set the radius based on the magnitude
        }).bindPopup(feature.properties.title).addTo(myMap);
      }
  
    }
  
  });