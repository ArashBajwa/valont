import Color from "./Graphics/Color.js"	
import EntityManager from "./Entities/EntityManager.js"

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
		}

		this.removeEntity = function(entity) {
			entityManager.removeEntity(entity);
		}

		this.clear = function( color=Game.DEFAULT_CLEAR_COLOR ) {
			context.fillStyle = color.getRGBAString();
			context.fillRect(0, 0, canvas.width, canvas.height);
		}
	

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
			entityManager.getDrawableComponents().forEach(component => {component.draw(context, deltaTime)});
		}
	}



}

Game.DEFAULT_CLEAR_COLOR = Color.BLACK;

export default Game;


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