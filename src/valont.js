import Game from "./Game.js"
import Entity from "./Entities/Entity.js"
import Color from "./Graphics/Color.js"	
import Vector2 from "./Math/Vector2.js"

import Component from "./Entities/Component.js"

import KinematicBodyComponent from "./Physics/KinematicBodyComponent.js"
import StaticBodyComponent from "./Physics/StaticBodyComponent.js"

import DrawableComponent from "./Graphics/DrawableComponent.js"
import ImageComponent from "./Graphics/ImageComponent.js"
import RectangleComponent from "./Graphics/RectangleComponent.js"
import CircleComponent from "./Graphics/CircleComponent.js"

import TextComponent from "./UI/TextComponent.js"


export default {
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