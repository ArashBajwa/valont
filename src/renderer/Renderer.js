import Color from "./Color.js"	

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

	draw = function(entity) {
				
	}

	__drawLoop = function() {
		
	}
}

Renderer.DEFAULT_CLEAR_COLOR = Color.BLACK;

export default Renderer;