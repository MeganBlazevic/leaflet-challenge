// create map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 12,
});

// Create the base layers.
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);
 
// Store our API endpoint inside our query URL
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Function to size the circle by magnitude
function size(magnitude) {
    return magnitude * 4;
};

// Function to color the circle by depth
function color(depth) {
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
    // var cluster_group = L.markerClusterGroup();
    var features = data.features;
    var depth_array = [];

    // Loop through data
    for (var i = 0; i < features.length; i++) {
        // Define variables from earthquake data
        var coordinates = features[i].geometry.coordinates;
        var latitude = coordinates[1];
        var longitude = coordinates[0];

        // Define depth & push to an array
        var depth = coordinates[2];
        depth_array.push(depth);

        var properties = features[i].properties;

        // Define place & magnitude
        var place = properties.place;
        var magnitude = properties.mag;

        // Current time
        var time = moment(properties.time);


        // Cluster Group Version
        // cluster_group.addLayer((L.marker([coordinates[1], coordinates[0]]))
        //     .bindPopup(`<h3>${place}</h3><br/>Magnitude: ${magnitude}`));

        // Create markers
        circles = L.circleMarker([latitude, longitude], {
            color: "black",
            weight: 1,
            fillColor: colorCircle(depth),
            opactiy: 1,
            fillOpacity: 1,
            radius: sizeCircle(magnitude)
        }).bindPopup(`<h3>${place}</h3><br/>Magnitude: ${magnitude}<br/>Depth: ${depth} km<br>Time: ${time}`).addTo(myMap);

        // console.log(coordinates);

    };

    // Create info title
    var info = L.control({position: "topright"});

    // Define function when info is added
    info.onAdd = function() {
        var div = L.DomUtil.create("div", "info");
        var title = "<h1>Earthquakes in the Last 7 Days</h1>"
        div.innerHTML = title;
        return div
    };

    // Create Legend
    var legend = L.control({ position: "bottomright" });

    // Define function when legend is added
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        var limits = [-10, 10, 30, 50, 70, 90];
        var title = "<h2>Depth in km</h2>"

        // Add title to div
        div.innerHTML = title;

        // Loop through limits, and create a new legend line
        for (var i = 0; i < limits.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colorCircle(limits[i] + 1) + '"></i> ' +
                limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
        };
        return div;
    };

    // Add the legend & the info title to the map
    legend.addTo(myMap);
    info.addTo(myMap);

});