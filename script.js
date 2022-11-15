

mapboxgl.accessToken = 'pk.eyJ1Ijoic2xvYW5tb29yZTMxIiwiYSI6ImNsYTM1anB5NzAxMmczb3BqcGlpMW9xeTYifQ.YwqRi3XLnVSFNFDmYvg9dw'
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/satellite-v9', // style URL
center: [-103.2502, 29.2498], // starting position [lng, lat]
zoom: 9, // starting zoom
projection: 'globe', //globe projection rather than the default web mercator
//pitch: 85,
//bearing: 80,
});



map.on('load', () => {
  map.addSource('trails', {
      type: 'geojson',
      data: 'Data/Big_Bend_Trails.geojson' // note, you'll have to change this if your data file is not in an enclosing folder named 'data'
  });

  map.addLayer({
    'id': 'trails-layer',
    'type': 'line',
    'source': 'trails',
    'paint': {
        'line-width': 3,
        'line-color': 'red'
    }
  });
});
