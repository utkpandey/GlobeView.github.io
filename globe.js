require(["esri/Map", "esri/views/SceneView", "esri/views/MapView",
"esri/Graphic","esri/layers/GraphicsLayer","esri/layers/FeatureLayer"], function(Map, SceneView, MapView , Graphic, GraphicsLayer,FeatureLayer) {
    var map = new Map({
      basemap: "streets",
      ground: "world-elevation"
    });
    var view = new SceneView({
      container: "viewDiv", // Reference to the scene div created in step 5
      map: map, // Reference to the map object created before the scene
      scale: 50000000, // Sets the initial scale to 1:50,000,000
      center: [-101.17, 21.78] // Sets the center point of view with lon/lat
    });
    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer); 
   
    var point = {
      type: "point",
      longitude: -95.358421,
      latitude: 29.749907
    };

    var simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    };

    //*** ADD ***//
    // Create attributes
    var attributes = {
      Name: "My point",  // The name of the
      Location: " Point Dume State Beach",  // The owner of the
    };
            // Add this action to the popup so it is always available in this view
            var measureThisAction = {
              title: "Navigate",
              id: "measure-this",
              // image:
              //   "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
            };
   // Create popup template
    var popupTemplate = {
      title: "Location",
      content: "Houston",
      // "<br /><strong>Location : </strong><a target='_self'  top.window.location.href='//localhost:8080/p/myPage'>Click Here to Nagivate</a>" ,
      actions: [measureThisAction]
     
    };
    
    featureLayer = new FeatureLayer({
      url:
        "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/TrailRuns/FeatureServer/0",
      outFields: ["*"],
      popupTemplate: popupTemplate
    });
    map.add(featureLayer);
  
    

     // Execute each time the "Measure Length" is clicked
     function measureThis() {
      // var geom = view.popup.selectedFeature.geometry;
      // var distance = geometryEngine.geodesicLength(geom, "miles");
      // distance = parseFloat(Math.round(distance * 100) / 100).toFixed(2);
      // view.popup.content =
      //   view.popup.selectedFeature.attributes.name +
      //   "<div style='background-color:DarkGray;color:white'>" +
      //   distance +
      //   " miles.</div>";
      top.window.location.href ='/p/redirect';
//       var str = top.window.location.href;
//   var n = str.includes("http://localhost:8080");
//   if(n){
//     top.window.location.href = '//localhost:8080/p/redirect'
//   }
//   else{
//     top.window.location.href = '//deldev1-connectedfactoryms-deldev1.eu1.mindsphere.io/p/redirect'
//     console.log('other link here')
//   }
    }

     // Event handler that fires each time an action is clicked.
     view.popup.on("trigger-action", function (event) {
      // Execute the measureThis() function if the measure-this action is clicked
      if (event.action.id === "measure-this") {
        measureThis();
      }
    });

    var pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol,
      //*** ADD ***//
      attributes: attributes,
      popupTemplate: popupTemplate
    });

    graphicsLayer.add(pointGraphic);


    

  });
  // function myFunction(evt) {
  //   top.window.location.href ='//localhost:8080/p/myPage';
  // }
