console.log("Hello")

//Create the layers.
let streetmap = L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a','b','c']
});

// Create the map object with options.
let myMap = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 3,
  layers: [streetmap]
});
  
// Store our API endpoint inside our query URL
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to size the circle by magnitude
function circleSize(magnitude) {
  return (magnitude * 4) ;
};

// Function to color the circle by depth
function circleColor(depth) {
  if (depth >= 90) {
      color = "180000";
  }
  else if (depth < 90 && depth >= 70) {
      color = "#390000";
  }
  else if (depth < 70 && depth >= 50) {
      color = "#510000";
  }
  else if (depth < 50 && depth >= 30) {
      color = "#920000";
  }
  else if (depth < 30 && depth >= 10) {
      color = "#b00";
  }
  else if (depth < 10 && depth >= -10) {
      color = "ff1616";
  };

  return color;
};

// Access data from link
d3.json(queryUrl).then(data => {
  console.log(data);

  // Create a cluster group
  let features = data.features;
  let depth_array = [];

  // Loop through data
  for (let i = 0; i < 100 ; i++) {
    // Define variables from earthquakel data
    let coordinates = features[i].geometry.coordinates;
    let latitude = coordinates[1];
    let longitude = coordinates[0];

    // Define depth & push to an array
    let depth = coordinates[2];
    depth_array.push(depth);

    let properties = features[i].properties;

    // Define place & magnitude
    let place = properties.place;
    let magnitude = properties.mag;

    // Create markers
    circles = L.circleMarker([latitude, longitude], {
      color: "black",
      weight: 1,
      fillColor: circleColor(depth),
      opactiy: 1,
      fillOpacity: 1,
      radius: circleSize(magnitude)
    }).bindPopup(`<h3>${place}</h3><br/>Magnitude: ${magnitude}<br/>Depth: ${depth}`).addTo(myMap);

    console.log(coordinates);
  };

  // Create info title
  let info = L.control({position: "topright"});

  // Define function when info is added
  info.onAdd = function() {
    let div = L.DomUtil.create("div", "info");
    let title = "<h1>Earthquakes in the Last 7 Days</h1>"
    div.innerHTML = title;
    return div;
  };

  // Create Legend
  let legend = L.control({ position: "bottomright" });

  // Define function when legend is added
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    let limits = [-10, 10, 30, 50, 70, 90];
    let title = "<h2>Depth in km</h2>"

    // Add title to div
    div.innerHTML = title;

    // Loop through limits, and create a new legend line
    for (let i = 0; i < limits.length; i++) {
      div.innerHTML +=
        '<i style="background:' + circleColor(limits[i] + 1) + '"></i> ' +
        limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
    };
    return div;
  };

  //Add the legend & the info title to the map
  legend.addTo(myMap);
  info.addTo(myMap);
});
