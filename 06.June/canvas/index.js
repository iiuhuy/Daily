/**
* Util lib depend on <<animation HTML5>>
*
* @version 0.0.1
* @author niko<nikolikegirl@gmail.com>
* @data 2014-01-07
*/
var utils = {};

//requestAnimationFrame
(function() {
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			});
	}
	if ( !window.cancelAnimationFrame ) {
		window.cancelAnimationFrame = window.webkitCancelRequestAnimationFrame ||
			window.clearTimeout;
	}
})();

utils.isMobile = function() {
	return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
}

//mouse
utils.captureMouse = function( element ) {
	var mouse = {x:0, y:0};
	var touch = {};
	element.addEventListener('mousemove', function(event) {
		event.preventDefault();
		var x, y;
		if ( event.pageX || event.pageY ) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}
		x -= element.offsetLeft;
		y -= element.offsetTop;

		mouse.x = x;
		mouse.y = y;

	}, false);

	touch = utils.captureTouch(element);

	if ( utils.isMobile() ) {
		return touch;	
	} else {
		return mouse;
	}
	return mouse;
}

utils.captureTouch = function( element ) {
	var touch = {x:null, y:null, isPressed:false};

	element.addEventListener('touchstart', function(event) {
		touch.isPressed = true;
	}, false);

	element.addEventListener('touchend', function(event) {
		touch.isPressed = false;
		touch.x = null;
		touch.y = null;
	}, false);

	element.addEventListener('touchmove', function(event) {
		var x, y;
		var touchEvent = event.touches[0];

		if ( touchEvent.pageX || touchEvent.pageY ) {
			x = touchEvent.pageX;
			y = touchEvent.pageY;
		} else {
			x = touchEvent.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = touchEvent.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}
		x -= element.offsetLeft;
		y -= element.offsetTop;

		touch.x = x;
		touch.y = y;
	}, false);
	return touch;
}

//color
utils.colorToRGB = function(color, alpha) {
	if ( typeof color == 'string' && color[0] == '#' ) {
		color = window.parseInt(color.slice(1), 16);
	}
	alpha = alpha || 1;

	var r = color >> 16 && 0xff,
		g = color >> 8 && 0xff,
		b = color & 0xff,
		a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 :alpha);	

	if ( a == 1 ) {
		return "rgb("+r+","+g+","+b+")";
	} else {
		return "rgba("+r+","+g+","+b+","+a+")";
	}
}

utils.parseColor = function ( color, toNumber ) {
	if ( toNumber == true ) {
		if ( typeof color == 'number' ) {
			return (color | 0);
		}
		if ( typeof color == 'string' && color[0] == '#') {
			color = color.slice(1);
		}
		return window.parseInt(color, 16);
	} else {
		if ( typeof color == 'number') {
			color = '#' + ('00000' + (color|0).toString(16)).substr(-6);
		}		
		return color;
	}
}

utils.containsPointRect = function(rect, x, y) {
	return !( x < rect.x || x > rect.x+rect.width || y < rect.y || y > rect.y+rect.height);
}
utils.containsPointCircle = function(circle, x, y) {
	return !!(Math.sqrt((x-circle.x)*(x-circle.x)+(y-circle.y)*(y-circle.y))<=circle.radius);
}
utils.random = function(min, max) {
	return Math.floor(Math.random()*(max+1-min))+min;
}
utils.intersects = function(rect1, rect2) {
	return !(rect1.x + rect1.width < rect2.x ||
		rect2.x + rect2.width < rect1.x ||
		rect1.y + rect1.height < rect2.y ||
		rect2.y + rect2.height < rect1.y);
}
