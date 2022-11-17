
mapboxgl.accessToken = 'pk.eyJ1Ijoic2xvYW5tb29yZTMxIiwiYSI6ImNsYTM1anB5NzAxMmczb3BqcGlpMW9xeTYifQ.YwqRi3XLnVSFNFDmYvg9dw'
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/satellite-v9', // style URL
center: [-103.266520, 29.203280], // starting position [lng, lat]
zoom: 11, // starting zoom
projection: 'globe', //globe projection rather than the default web mercator
pitch: 77,
bearing: 90,
});


map.on('load', () => {
  map.addSource('trails', {
    type: 'geojson',
    data: 'data/Big_Bend_Trails.geojson' // note, you'll have to change this if your data file is not in an enclosing folder named 'data'
});

map.addLayer({
  'id': 'trails-layer',
  'type': 'line',
  'source': 'trails',
  'paint': {
      'line-width': 3,
      'line-color': ['match', ['get', 'TRLCLASS'],
      'Class 1: Minimally Developed', 'red',
      'Class 2: Moderately Developed', 'orange',
      'Class 3: Developed', 'yellow',
      /*else,*/ 'blue'
  ]
  }
});

map.addSource('bounds', {
  type: 'geojson',
  data: 'data/BigBendBounds.geojson'// note again, you may need to change this. 
});

map.addLayer({
'id': 'boundary-layer',
'type': 'line',
'source': 'bounds',
'paint': {
    'line-width': 4,
    'line-color': 'black',
    'line-opacity': .6
}
});


map.on('click', 'trails-layer', (a) => {
  const coordinates = a.lngLat;
    let feature = a.features[0].properties
  const description = "<b>Trail Name:</b>" + feature.TRLNAME + "<br><b>Trail Class:</b>" + feature.TRLCLASS +"<br><b>Trail Length: </b>" + feature.Miles.toFixed(2) + "miles";
   

   
  new mapboxgl.Popup()
  .setLngLat(coordinates)
  .setHTML(description)
  .addTo(map);
  });
   
  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'trails-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
    });
   
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'trails-layer', () => {
    map.getCanvas().style.cursor = '';
    });

}); //closing brackets
   

map.on('load', function () {
  map.addSource('mapbox-dem', {
      "type": "raster-dem",
      "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
      'tileSize': 512,
      'maxzoom': 14
  });
   map.setTerrain({"source": "mapbox-dem", "exaggeration": 1.5});

   map.setFog({
    'range': [-1, 2],
    'horizon-blend': 1.9,
    'color': 'white',
    'high-color': '#add8e6',
    'space-color': '#d8f2ff',
    'star-intensity': 0.0
});
});

const navControl = new mapboxgl.NavigationControl({
    visualizePitch: true
});
map.addControl(navControl, 'top-right');


