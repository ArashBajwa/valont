(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.valont = factory());
}(this, (function () { 'use strict';

	class Color {
		constructor(r=0, g=0, b=0, a=1) {
			if (!(typeof(r) == "number" && typeof(g) == "number" && typeof(b) == "number" && typeof(a) == "number"))
				throw("Color can only be constructed with at least 4 number argument types.");
			
			
			
			let rgbaString = `rgba(${r},${g},${b},${a})`;//for canvas fill color


			//In order to simulate private members, these getters are public methods, that get "private" members
			this.getR = function() {
				return r;
			};

			this.getG = function() {
				return g;
			};

			this.getB = function() {
				return b;
			};

			this.getA = function() {
				return a;
			};

			this.getRGBAString = function() {
				return rgbaString;
			};
		}

	}


	// Color constants
	Color.BLACK = new Color();
	Color.DARKGREY = Color.DARKGRAY = new Color(64, 64, 64);
	Color.GREY = Color.GRAY = new Color(128, 128, 128);
	Color.LIGHTGREY = Color.LIGHTGRAY = new Color(192, 192, 192);
	Color.WHITE = new Color(255, 255, 255);


	//Based on basic color wheel (12 colors, 3 primary, 3 secondary, 6 tertiarty)

	Color.RED = new Color(255);
	Color.RED_ORANGE = Color.ORANGE_RED = Color.REDORANGE = Color.ORANGERED = new Color(255, 64, 0);
	Color.ORANGE = new Color(255, 192, 0);
	Color.ORANGE_YELLOW  = Color.YELLOW_ORANGE = Color.ORANGEYELLOW = Color.YELLOWORANGE = new Color(255, 128, 0);
	Color.YELLOW = new Color(255, 255, 0);
	Color.YELLOW_GREEN = Color.GREEN_YELLOW = Color.YELLOWGREEN = Color.GREENYELLOW = new Color(128, 255, 0);
	Color.GREEN = new Color(0, 255, 0);
	Color.GREEN_BLUE = Color.BLUE_GREEN = Color.GREENBLUE = Color.BLUEGREEN = new Color(128, 255, 0);
	Color.BLUE = new Color(0, 0, 255);
	Color.BLUE_PURPLE = Color.PURPLE_BLUE = Color.BLUEPURPLE = Color.PURPLEBLUE = new Color(64, 0, 192);
	Color.PURPLE = new Color(128, 0, 128);
	Color.PURPLE_RED = Color.RED_PURPLE = Color.PURPLERED = Color.REDPURPLE  = new Color(192, 0, 64);

	class Renderer {
		constructor(canvas) {
			if (canvas instanceof HTMLCanvasElement == false)
				throw("Renderer constructor expects canvas as first argument.");

			this.canvas = canvas;
			this.context = canvas.getContext("2d");
			if (this.context == null)
				throw("Failed to get '2d' context from canvas!")
		}

		clear = function( color=Renderer.DEFAULT_CLEAR_COLOR ) {
			this.context.fillStyle = color.getRGBAString();
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}

		__drawLoop = function() {
			
		}
	}

	Renderer.DEFAULT_CLEAR_COLOR = Color.BLACK;

	var valont = {
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

	return valont;

})));
