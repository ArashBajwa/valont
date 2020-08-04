class Color {
	/**
	 * @param {number} RED, 0-255
	 * @param {number} BLUE 0-255
	 * @param {number} GREEN 0-255
	 * @param {number} ALPHA 0-1, 1 being completely visible 
 	*/
	constructor(r=0, g=0, b=0, a=1) {
		if (!(typeof(r) == "number" && typeof(g) == "number" && typeof(b) == "number" && typeof(a) == "number"))
			throw("Color can only be constructed with at least 4 number argument types.");
		
		
		
		let rgbaString = `rgba(${r},${g},${b},${a})`//for canvas fill color


		//In order to simulate private members, these getters are public methods, that get "private" members
		this.getR = function() {
			return r;
		}

		this.getG = function() {
			return g;
		}

		this.getB = function() {
			return b;
		}

		this.getA = function() {
			return a;
		}

		this.getRGBAString = function() {
			return rgbaString;
		}
	}

}


// Color constants
Color.BLACK = new Color();
Color.DARK_GREY = Color.DARK_GRAY = Color.DARKGREY = Color.DARKGRAY = new Color(64, 64, 64);
Color.GREY = Color.GRAY = new Color(128, 128, 128);
Color.LIGHT_GREY = Color.LIGHT_GRAY = Color.LIGHTGREY = Color.LIGHTGRAY = new Color(192, 192, 192);
Color.WHITE = new Color(255, 255, 255);


//Based on basic color wheel (12 colors, 3 primary, 3 secondary, 6 tertiarty)

Color.RED = new Color(255);
Color.RED_ORANGE = Color.ORANGE_RED = Color.REDORANGE = Color.ORANGERED = new Color(255, 64, 0);
Color.ORANGE = new Color(255, 192, 0);
Color.ORANGE_YELLOW  = Color.YELLOW_ORANGE = Color.ORANGEYELLOW = Color.YELLOWORANGE = new Color(255, 128, 0);
Color.YELLOW = new Color(255, 255, 0)
Color.YELLOW_GREEN = Color.GREEN_YELLOW = Color.YELLOWGREEN = Color.GREENYELLOW = new Color(128, 255, 0);
Color.GREEN = new Color(0, 255, 0);
Color.GREEN_BLUE = Color.BLUE_GREEN = Color.GREENBLUE = Color.BLUEGREEN = new Color(128, 255, 0);
Color.BLUE = new Color(0, 0, 255);
Color.BLUE_PURPLE = Color.PURPLE_BLUE = Color.BLUEPURPLE = Color.PURPLEBLUE = new Color(64, 0, 192);
Color.PURPLE = new Color(128, 0, 128);
Color.PURPLE_RED = Color.RED_PURPLE = Color.PURPLERED = Color.REDPURPLE  = new Color(192, 0, 64);

export default Color;