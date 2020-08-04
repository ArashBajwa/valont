import DrawableComponent from "./DrawableComponent.js"	


let STORED_IMAGES = {} //To serve as cache for images with same source
STORED_IMAGES[""] = new Image(); //Empty image

class ImageComponent extends DrawableComponent {
	constructor (src="") {
		super();
		if (!(typeof(src) == "string"))
			throw("Image cannot be contructed with given argument (string or undefined/null).");

		this.src = src;
		this._jsImage = STORED_IMAGES[""];

		if (this.src != "")
			this.load(src);
	}

	load = function(src="") {
		if (!(typeof(src) == "string"))
			throw("Image cannot be loaded with given argument.");

		if (STORED_IMAGES[src] instanceof Image)
			this._jsImage = STORED_IMAGES[src];
		else {
			this._jsImage = new Image(this._absoluteSize.x, this._absoluteSize.y);
			this._jsImage.src = src;
			STORED_IMAGES[src] = this._jsImage;
		}

		this._jsImage.src = src;
	}


	draw = function(context, deltaTime) {
		context.drawImage(this._jsImage, this._absolutePosition.getX(), this._absolutePosition.getY(), this._absoluteSize.getX(), this._absoluteSize.getY());
	}

}

export default ImageComponent;