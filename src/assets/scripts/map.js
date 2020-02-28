/**
 * Project  : Capteur ACMP
 * Date     : 25/05/2020
 * Autor    : CARDINAL Florian
 * Nom      : map.js
 * Location : /assets/scripts/
 */

function displayEV(myPos) {
	let params = {
		"apiKey": "lG-dglQqPSvK5L_lgda9UxRO22TXvc43aHm6H09Qy84",
		"in": `${myPos.lat},${myPos.lng};r=1000`, // en mètre
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

			for(i=0; i < response.results.items.length; i++) { // création du marqueur
				newPos = ({
					lat: response.results.items[i].position[0],
					lng: response.results.items[i].position[1]
				});
				respData = response.results.items[i].title;

				addMarker(newPos, respData);
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
		var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), { // Lecture des données
			content: evt.target.getData()
		});

		ui.addBubble(bubble); // Création d'une info bulle
	}, false);
}

function drawCircle(map, pos, style) {
	var circle = new H.map.Circle(pos, 7000, { style: style });
	map.addObject(circle);
}

function mapInit() {
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

	// Ajout du marker au centre de la map
	map.addObject(posMarker);

	displayEV(myPos);
	addInfoBubble(map);

	var customStyle = {
		strokeColor: 'dark green',
		fillColor: 'rgba(0, 255, 100, 0.2)',
		lineWidth: 1,
	};

	drawCircle(map, myPos, customStyle);

	var myLoc = `${myPos.lat},${myPos.lng}`;
	var routingParams = {
		'mode': 'fastest;car;',
		'start': myLoc,
		'range': '600',
		'rangetype': 'time'
	};

	// Création d'une instance routing de service
	var router = platform.getRoutingService();

	// Appel de l'api pour calcul des marqueurs
	router.calculateIsoline(
		routingParams,
		(result) => {
			var center = new H.geo.Point(
				result.response.center.latitude,
				result.response.center.longitude
			),
			isolineCoords = result.response.isoline[0].component[0].shape,
			linestring = new H.geo.LineString(),
			isolinePolygon,
			isolineCenter;

			isolineCoords.forEach((coords) => linestring.pushLatLngAlt.apply(linestring, coords.split(',')))

			// Création d'un polygon pour la représentation du marqueur
			isolinePolygon = new H.map.Polygon(linestring);
			isolineCenter = new H.map.Marker(center)

			// Ajout du marqueur sur la map
			map.addObject(isolinePolygon);
			map.getViewModel().setLookAtData({ bounds: isolinePolygon.getBoundingBox() });
		},
		(error) => {
			alert(error.message);
		}
	);
}

/**
 * END
 */
