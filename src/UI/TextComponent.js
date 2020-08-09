import Vector2 from "../Math/Vector2.js"	
import DrawableComponent from "../Graphics/DrawableComponent.js"
import Color from "../Graphics/Color.js"

class TextComponent extends DrawableComponent {

	constructor(text="", textColor=TextComponent.DEFAULT_TEXT_COLOR) {
		super();
		if (!(typeof(text === "string") && textColor instanceof Color))
			throw "TextComponent constructor initialized incorrectly, accepts none or #1 string argument and/or Color argument.";

		this.name = "TextComponent"
		this.text = text;
		this.position = new Vector2();
		this.size = new Vector2(1, 1);
		//this.fontWidth = 18;
		this.color = textColor;
	}

	load = function() {
		
	}

	draw = function (context) {
		context.fillStyle = this.color.getRGBAString();
		context.fillText(this.text, this._absolutePosition.getX(), this._absolutePosition.getY());
	}
}

TextComponent.DEFAULT_TEXT_COLOR = Color.WHITE;

export default TextComponent;