/**
 * Project  : Capteur ACMP
 * Date     : 25/05/2020
 * Autor    : CARDINAL Florian, MENEGHINI Eric, PHILIPPE Flore
 * Nom      : main.js
 * Location : /assets/scripts/
 */

$(document).ready(() => {
	// Splash Screen Animation
	$('#splash').ready(() => {
		$('#splash h1')
			.delay(5000)
			.fadeOut(1000)
			.parent('div')
			.delay(6000)
			.fadeOut(500);
	});

	// Initialisation de la map
	$('#map').ready(() => mapInit());

	// Fonction d'ouverture/fermeture du menu
	$('#menu-content').ready(() => {
		$('#menu-open').click(() => $('#menu-content').fadeIn());
		$('#menu-close').click(() => $('#menu-content').fadeOut());

		$('.menu-interact-map').click(() => $('aside').css('display', 'none'));
		$('.menu-interact-aside, .menu-interact-telemetry').click(() => $('aside').fadeIn());
	});

	// Affichage de la box si jamais il y a instance
	$('aside').ready(() => {
		let length = $(location).attr('pathname').split('/')[1].length;

		if(length > 0)
			$('aside').fadeIn();

		$('#aside-close').click(() => $('aside').fadeOut());
	});

	$('.menu-interact-telemetry').click(function() {
		$(this).ready(() => graphs());
	});
});

/**
 * END
 */
