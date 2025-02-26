require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], (
  Map,
  MapView,
  FeatureLayer
) => {
  const layer = new FeatureLayer({
    portalItem: {
      id: "3df3d3be5c3f4831b16416fe309525ee",
    },
  });

  layer.renderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: "#98FB98",
    },
  };

  const map = new Map({
    basemap: "dark-gray-vector",
    layers: [layer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 5,
    center: [-94.65, 45.65],
  });

  // Get the screen point from the view's click event
  view.on("click", function (event) {
    var screenPoint = {
      x: event.x,
      y: event.y,
    };

    // Search for graphics at the clicked location
    view.hitTest(screenPoint).then(function (response) {
      if (response.results.length) {
        var graphic = response.results.filter(function (result) {
          // check if the graphic belongs to the layer of interest
          return result.graphic.layer === layer;
        })[0].graphic;
        // do something with the result graphic
        console.log(graphic.attributes);
      }
    });
  });

  var button = document.querySelector("#bufferButton");

  let count = 0;

  button.addEventListener("click", function () {
    console.log(layer);
    count++;
    if (count % 2 == 0) {
      layer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "#c7ceea",
          outline: {
            color: "#c7ceea",
            width: 1 + count,
          },
        },
      };
    } else {
      layer.renderer = {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "#98FB98",
          outline: {
            color: "#98FB98",
            width: 1 + count,
          },
        },
      };
    }
  });
});
