mapboxgl.accessToken ='pk.eyJ1IjoiamFjb2JoYXJ0IiwiYSI6ImNrb3EwdmsxeDA4bHUycm5sMWkxMzN4c2gifQ.q87x3zutNoUuUuUkXUrLqQ'

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
  });

  // const busStops = [
  //   [-71.092761, 42.357575],
  //   [-71.093729, 42.359244],
  //   [-71.094915, 42.360175],
  //   [-71.095800, 42.360698],
  //   [-71.099558, 42.362953],
  //   [-71.103476, 42.365248],
  //   [-71.106067, 42.366806],
  //   [-71.108717, 42.368355],
  //   [-71.110799, 42.369192],
  //   [-71.113095, 42.370218],
  //   [-71.115476, 42.372085],
  //   [-71.117585, 42.373016],
  //   [-71.118625, 42.374863]
  // ];

  // busStops.forEach(coordinate => {
  //   var busStop = new mapboxgl.Marker()
  //   .setLngLat(coordinate)
  //   .addTo(map);

  // })


  var currentMarkers=[];

  async function run(){
    let busLocations = []
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
  locations.forEach(location => {
     busLocations.push([location.attributes.longitude, location.attributes.latitude])
  })
  console.log(busLocations)


  // markers saved here


  // remove markers 
  if (currentMarkers!==null) {
    for (var i = currentMarkers.length - 1; i >= 0; i--) {
      currentMarkers[i].remove();
    }
}

  // tmp marker
  busLocations.forEach((busLocation, index) => { 
      var oneMarker =  new mapboxgl.Marker()
      .setLngLat(busLocation)
      .addTo(map);

      // save tmp marker into currentMarkers
      currentMarkers.push(oneMarker);
  })

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();