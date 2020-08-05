import Vector2 from "../Math/Vector2.js"	
import DrawableComponent from "./DrawableComponent.js"
import Color from "./Color.js"

class RectangleComponent extends DrawableComponent {

	constructor(position=new Vector2(), size=new Vector2(1, 1)) {
		super();
		if (!(position instanceof Vector2 && size instanceof Vector2))
			throw "RectangleComponent constructor initialized incorrectly, accepts none or two vector arguments.";

		this.name = "RectangleComponent"
		this.position = position;
		this.size = size;
		this.color = Color.BLACK;
	}

	load = function() {
		
	}

	draw = function (context) {
		context.fillStyle = this.color.getRGBAString();
		context.fillRect(this._absolutePosition.getX(), this._absolutePosition.getY(), this._absoluteSize.getX(), this._absoluteSize.getY());
	}



}

export default RectangleComponent;