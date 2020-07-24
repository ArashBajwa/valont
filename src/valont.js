import Renderer from "./renderer/Renderer.js"	
import Color from "./renderer/Color.js"	


export default {
	Renderer: Renderer,
	Color: Color,
};


/*
init: function(canvas, options) {
		if (canvas instanceof HTMLCanvasElement)
			valont.canvas = canvas;
		else {
			valont = {};
			return false;
		}

		var webGL = false;

		if (typeof(options) == "object") {

			if (options.WebGL === true) {
				console.log("Valont does not support WebGL yet, falling back to canvas 2D context drawing.")
			}				
		}
	}
*/