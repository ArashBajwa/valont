(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.valont = factory());
}(this, (function () { 'use strict';

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
	Color.DARK_GREY = Color.DARK_GRAY = Color.DARKGREY = Color.DARKGRAY = new Color(64, 64, 64);
	Color.GREY = Color.GRAY = new Color(128, 128, 128);
	Color.LIGHT_GREY = Color.LIGHT_GRAY = Color.LIGHTGREY = Color.LIGHTGRAY = new Color(192, 192, 192);
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

	class Vector2 {
		constructor(_x=0, _y=0) {
			if (!(typeof(_x) == "number" && typeof(_y) == "number"))
				throw "Vector2 can be only constructed with numbers!"

			let _magnitudeSquared = _x**2 + _y**2;
			let _magnitude = Math.sqrt(_magnitudeSquared);

			let _normalizedX = _x/_magnitude;
			let _normalizedY = 1-_normalizedX;

			this.getX = function(){
				return _x;
			};
			
			this.getY = function(){
				return _y;
			};

			this.add = function (x, y) {
				if (x instanceof Vector2)
					return new Vector2(_x+x.getX(), _y+x.getY());
				else if(typeof(x) == "number" && typeof(y) == "number")
					return new Vector2(_x+x, _y+y);
				else
					throw("Vector2 adding expected vector or x and y number values");
			};
		
			this.sub = function (x, y) {
				if (x instanceof Vector2)
					return new Vector2(_x-x.getX(), _y-x.getY());
				else if(typeof(x) == "number" && typeof(y) == "number")
					return new Vector2(_x-x, _y-y);
				else
					throw("Vector2 subtracting expected vector or x and y number values");
			};
		
			this.mul = function (x, y) {
				if (x instanceof Vector2)
					return new Vector2(_x*x.getX(), _y*x.getY());
				else if(typeof(x) == "number" && typeof(y) == "number")
					return new Vector2(_x*x, _y*y);
				else if (typeof(x) == "number") //vector.mul(2)
					return new Vector2(_x*x, _y*x);
				else
					throw("Vector2 multiplying expected vector or x and y number values");
			};
			
			this.div = function (x, y) {
				if (x instanceof Vector2)
					return new Vector2(_x/x.getX(), _y/x.getY());
				else if(typeof(x) == "number" && typeof(y) == "number")
					return new Vector2(_x/x, _y/y);
				else if (typeof(x) == "number") //vector.div(2)
					return new Vector2(_x/x, _y/x);
				else
					throw("Vector2 dividing expected vector or x and y number values");
			};
		
			this.getMagnitude = function() {
				return _magnitude;
			};
		
			this.getMagnitudeSquared = function() {
				return _magnitudeSquared;
			};
		
			this.getNormalized = function() {
				return new Vector2(_normalizedX, _normalizedY);
			};
		}
	}

	class Component {
		constructor() {
			this._parent = null;
			this._absolutePosition = new Vector2(0, 0);
			this._absoluteSize = new Vector2(1, 1);
			this.size = new Vector2(1, 1);
			this.position = new Vector2(0, 0);
			this.name = "component";
		}

	}

	class Entity {
		constructor(name="") {
			let componentAddedEventListeners = [];
			let componentRemovedEventListeners = [];
			let components = [];


			let size = new Vector2();
			let position = new Vector2();

			this.name = name;

			this.setPosition = function(newPosition) {
				position = newPosition;
				components.forEach(component => {
					component._absolutePosition = newPosition.add(component.position);
				});
			};

			this.getPosition = function() {
				return position;
			};

			this.setSize = function(newSize) {
				size = newSize;
				components.forEach(component => {
					component._absoluteSize = newSize.mul(component.size);
				});
			};

			this.getSize = function() {
				return size;
			};

			this.getComponents = function() {
				return components;
			};

			this.FindFirstComponentByName = function(name) {
				for (let index = 0; index < components.length; index++) {
					if (components[index].name == name)
						return components[index];
				}
			};

			this.onComponentAdded = function(e) {
				if (typeof(e) !== "function") {
					throw "OnComponentedAdded Argument 1 expected a function"
				}

				componentAddedEventListeners.push(e);
			};

			this.onComponentRemoved = function(e) {
				if (typeof(e) !== "function") {
					throw "OnComponentedRemoved Argument 1 expected a function"
				}

				componentRemovedEventListeners.push(e);
			};


			this.addComponent = function(component) {
				if (component instanceof Component) {
					component._parent = this;
					component._absolutePosition = position;
					component._absoluteSize = size;
					components.push(component);
					componentAddedEventListeners.forEach(ev => ev(component));
				}
			};

			this.removeComponent = function(component) {
				if (component instanceof Component) {
					let length = components.length;
					components = components.filter(component !== component);
					if (length > components.length)
						componentRemovedEventListeners.forEach(ev => ev(component));
				}
			};

			this.removeAllComponents = function() {
				if (components.length > 0)
					components.forEach(component => componentRemovedEventListeners.forEach(ev => ev(component)));

				components = [];
			};

		}




	}

	//import Vector2 from "../Math/Vector2.js"	


	/*
	let DRAWABLE_COMPONENT_DEFAULT_SIZE = new Vector2(1, 1)
	let DRAWABLE_COMPONENT_DEFAULT_POSITION = new Vector2(0, 0)
	*/

	class DrawableComponent extends Component {

		constructor() {
			super();
		}

		load = function() {
			
		}

		draw = function () {

		}



	}

	//import CollisionBox from "./CollisionBox.js" Future versions

	class KinematicBodyComponent extends Component {
		constructor() {
			super();
	//		let area = new CollisionBox();
			this.name = "KinematicBody";
			this.mass = 1;
			this.gravity = KinematicBodyComponent.GRAVITY;
			this.force = new Vector2();
			this.canCollide = true;
			this.isKinematic = true;

		}

		onCollision = function(hit) {

		}

		update = function(deltaTime) {
			this.force = this.force.add(this.gravity.mul(deltaTime));
			this._parent.setPosition(this._parent.getPosition().add(this.force.mul(deltaTime)));
		}

		updateCollision = function(other) {
			if (!this.canCollide)
				return false;
			if (
				this._absolutePosition.getX() <= other._absolutePosition.getX() + other._absoluteSize.getX() &&
				this._absolutePosition.getX() + this._absoluteSize.getX() >= other._absolutePosition.getX() &&

				this._absolutePosition.getY() <= other._absolutePosition.getY() + other._absoluteSize.getY() &&
				this._absolutePosition.getY() + this._absoluteSize.getY() >= other._absolutePosition.getY()
			)
			{
				if (this.isKinematic) ;
				this.onCollision(other._parent);
			}
		}
	}

	KinematicBodyComponent.GRAVITY = new Vector2(0, 10);

	//import CollisionBox from "./CollisionBox.js" Future versions

	class StaticBodyComponent extends Component {
		constructor() {
			super();
	//		let area = new CollisionBox();
			this.mass = 1;
			
			this.force = new Vector2();
		}

		updateCollision = function(other) {

		}


	}

	class EntityManager {
		constructor() {
			let entities = [];
			let drawableComponents = [];
			let kinematicBodyComponents = [];
			let staticBodyComponents = [];


			function onComponentAdded(addedComponent) {
				if (addedComponent instanceof DrawableComponent) 
					drawableComponents.push(addedComponent);
				else if (addedComponent instanceof KinematicBodyComponent) 
					kinematicBodyComponents.push(addedComponent);
				else if (addedComponent instanceof StaticBodyComponent) 
					staticBodyComponents.push(addedComponent);
			}
			
			function onComponentRemoved(removedComponent) {
				if (removedComponent instanceof DrawableComponent)
					drawableComponents = drawableComponents.filter(component => component !== removedComponent);
				else if (removedComponent instanceof KinematicBodyComponent) 
					kinematicBodyComponents = kinematicBodyComponents.filter(component => component !== removedComponent);
				else if (removedComponent instanceof StaticBodyComponent) 
					staticBodyComponents = staticBodyComponents.filter(component => component !== removedComponent);
			}

			this.getKinematicBodyComponents = function() {
				return kinematicBodyComponents;
			};

			this.getStaticBodyComponents = function() {
				return staticBodyComponents;
			};

			this.getDrawableComponents = function() {
				return drawableComponents;
			};

			this.addEntity = function(addedEntity) {
				if (addedEntity instanceof Entity && typeof(addedEntity.onComponentAdded) === "function" && typeof(addedEntity.onComponentRemoved) === "function") {
					for (let index = 0; index < entities.length; index++) {
						if (entities[index] === addedEntity) {
							return false; //Entity was already added
						}
					}

					addedEntity.getComponents().forEach(component => onComponentAdded(component));
					addedEntity.onComponentAdded(onComponentAdded);
					addedEntity.onComponentRemoved(onComponentRemoved);
					entities.push(addedEntity);
				}
			};

			this.removeEntity = function(removedEntity) {
				let length = entities.length;
				entities = entities.filter(entity => entity !== removedEntity);
				if (length > entities.length)
					removedEntity.removeAllComponents();
			};
		}

	}

	class Game {
		/**
		 * @param {HTMLCanvasElement} a canvas for 2d context drawing
	 	*/
		constructor(canvas) {
			if (canvas instanceof HTMLCanvasElement == false)
				throw("Game constructor expects canvas as first argument.");

			let context = canvas.getContext("2d");
			if (context == null)
				throw("Failed to get '2d' context from canvas!")

			this.canvas = canvas;
			this.context = context;
			
			let entityManager = new EntityManager();

			this.addEntity = function(entity) {
				entityManager.addEntity(entity);
			};

			this.removeEntity = function(entity) {
				entityManager.removeEntity(entity);
			};

			this.clear = function( color=Game.DEFAULT_CLEAR_COLOR ) {
				context.fillStyle = color.getRGBAString();
				context.fillRect(0, 0, canvas.width, canvas.height);
			};
		

			this.update = function(deltaTime) {
				entityManager.getKinematicBodyComponents().forEach(component => {
					entityManager.getKinematicBodyComponents().forEach(other => {
						if (component !== other)
							component.updateCollision(other);
					});
					component.update(deltaTime);

					entityManager.getStaticBodyComponents().forEach(other => {
						component.updateCollision(other);
					});
				});
				entityManager.getDrawableComponents().forEach(component => {component.draw(context, deltaTime);});
			};
		}



	}

	Game.DEFAULT_CLEAR_COLOR = Color.BLACK;


	/*
	import Color from "./graphics/color.js"	

	class Game {

		 constructor(canvas) {
			if (canvas instanceof HTMLCanvasElement == false)
				throw("Game constructor expects canvas as first argument.");

			let entities = [];
				
			let context = canvas.getContext("2d");
			
			if (context == null)
				throw("Failed to get '2d' context from canvas!")

			this.canvas = canvas;
			this.context = context;


			this.clear = function( color=Game.DEFAULT_CLEAR_COLOR ) {
				context.fillStyle = color.getRGBAString();
				context.fillRect(0, 0, canvas.width, canvas.height);
			}
			
			this.update = function() {

			}
		}


		
	}

	Game.DEFAULT_CLEAR_COLOR = Color.BLACK;

	export default Game;
	*/

	let STORED_IMAGES = {}; //To serve as cache for images with same source
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

	class RectangleComponent extends DrawableComponent {

		constructor(position=new Vector2(), size=new Vector2(1, 1)) {
			super();
			if (!(position instanceof Vector2 && size instanceof Vector2))
				throw "RectangleComponent constructor initialized incorrectly, accepts none or two vector arguments.";

			this.name = "RectangleComponent";
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

	class CircleComponent extends DrawableComponent {

		constructor(position=new Vector2(), size=new Vector2(1, 1)) {
			super();
			if (!(position instanceof Vector2 && size instanceof Vector2))
				throw "CircleComponent constructor initialized incorrectly, accepts none or two vector arguments.";

			this.name = "CircleComponent";
			this.position = position;
			this.size = size;
			this.color = Color.BLACK;
		}

		load = function() {
			
		}

		draw = function (context) {
			context.fillStyle = this.color.getRGBAString();
			context.ellipse(this._absolutePosition.getX(), this._absolutePosition.getY(), this._absoluteSize.getX(), this._absoluteSize.getY());
		}



	}

	class TextComponent extends DrawableComponent {

		constructor(text="", textColor=TextComponent.DEFAULT_TEXT_COLOR) {
			super();
			if (!(typeof(text === "string") && textColor instanceof Color))
				throw "TextComponent constructor initialized incorrectly, accepts none or #1 string argument and/or Color argument.";

			this.name = "TextComponent";
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

	var valont = {
		Game: Game,
		Entity: Entity,
		Color: Color,
		Vector2: Vector2,

		Component: Component,
		KinematicBodyComponent: KinematicBodyComponent,
		StaticBodyComponent: StaticBodyComponent,
		DrawableComponent: DrawableComponent,
		ImageComponent: ImageComponent,
		RectangleComponent: RectangleComponent,
		CircleComponent: CircleComponent,

		TextComponent: TextComponent
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
