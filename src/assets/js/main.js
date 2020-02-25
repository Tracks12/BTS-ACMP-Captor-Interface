$(document).ready(() => {
	var platform = new H.service.Platform({
		apikey: "MrQdjSM58WPTG8w0Blb7-CiGBPquXZLKfpwVNzI6zcQ"
	});

	// Définition de la zone à afficher sur la map
	var defaultLayers = platform.createDefaultLayers();
	var myPos = {
		lat: 43.60226,
		lng: 1.44548
	};

	var map = new H.Map( // Affichage de la map
		$('#map')[0],
		defaultLayers.vector.normal.map,
		{
			zoom: 1,
			center: myPos
		}
	);

	var ui = H.ui.UI.createDefault(map, defaultLayers);
	var mapEvents = new H.mapevents.MapEvents(map);
	var behavior = new H.mapevents.Behavior(mapEvents);

	// Création d'un marqueur
	var icon = new H.map.Icon('img/home_logo.png');
	var posMarker = new H.map.Marker(myPos, { icon: icon });

	// Add the marker to the map and center the map at the location of the marker:
	map.addObject(posMarker);

	function displayEV() {
		let params = {
			"apiKey": "lG-dglQqPSvK5L_lgda9UxRO22TXvc43aHm6H09Qy84",
			"in": `${myPos.lat},${myPos.lng};r=1000`, // meters
			"cat": "EV-charging-station",
			"size": "500"
		};

		let query = Object.keys(params)
			.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
			.join('&');

		let url = `https://places.ls.hereapi.com/places/v1/browse?${query}`;

		fetch(url, { "method": "GET" })
			.then(response => response.json())
			.then(response => {
				console.log(response);

				for(i=0; i < response.results.items.length; i++) { // create a marker object
					newPos = ({
						lat: response.results.items[i].position[0],
						lng: response.results.items[i].position[1]
					});
					respData = response.results.items[i].title;

					addMarker(newPos, respData);
					// printInfo()
				}
			});
	}

	function addMarker(newPos, respData) {
		var evIcon = new H.map.Icon('img/EV.png');
		evMarker = new H.map.Marker(newPos,{ icon: evIcon });
		evMarker.setData(respData);
		map.addObject(evMarker);
	}

	function addInfoBubble(map) {
		map.addEventListener('tap', function(evt) {
			var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), { // read custom data
				content: evt.target.getData()
			});

			// show info bubble
			ui.addBubble(bubble);
		}, false);
	}

	displayEV();
	addInfoBubble(map);

	var customStyle = {
		strokeColor: 'dark green',
		fillColor: 'rgba(0, 255, 100, 0.2)',
		lineWidth: 1,
	};

	function drawCircle(){
		var circle = new H.map.Circle(myPos, 7000, { style: customStyle });
		map.addObject(circle);
	};

	drawCircle();

	var myLoc = `${myPos.lat},${myPos.lng}`;
	var routingParams = {
		'mode': 'fastest;car;',
		'start': myLoc,
		'range': '600', // 10 (10x60secs) minutes of driving
		'rangetype': 'time'
	};

	// Define a callback function to process the isoline response.
	var onResult = function(result) {
		var center = new H.geo.Point(
			result.response.center.latitude,
			result.response.center.longitude
		),
		isolineCoords = result.response.isoline[0].component[0].shape,
		linestring = new H.geo.LineString(),
		isolinePolygon,
		isolineCenter;

		// Add the returned isoline coordinates to a linestring:
		isolineCoords.forEach(function(coords) {
			linestring.pushLatLngAlt.apply(linestring, coords.split(','));
		})

		// Create a polygon and a marker representing the isoline:
		isolinePolygon = new H.map.Polygon(linestring);
		//   isolineCenter = new H.map.Marker(center)

		// Add the polygon and marker to the map:
		map.addObject(isolinePolygon);

		// Center and zoom the map so that the whole isoline polygon is
		// in the viewport:
		map.getViewModel().setLookAtData({ bounds: isolinePolygon.getBoundingBox() });
	}

	// Get an instance of the routing service:
	var router = platform.getRoutingService();

	// Call the Routing API to calculate an isoline:
	router.calculateIsoline(
		routingParams,
		onResult,
		function(error) {
			alert(error.message);
		}
	);
});
