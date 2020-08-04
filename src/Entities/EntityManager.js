import Entity from "../Entities/Entity.js"
import DrawableComponent from "../Graphics/DrawableComponent.js"
import KinematicBodyComponent from "../Physics/KinematicBodyComponent.js"
import StaticBodyComponent from "../Physics/StaticBodyComponent.js"



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
		}

		this.getStaticBodyComponents = function() {
			return staticBodyComponents;
		}

		this.getDrawableComponents = function() {
			return drawableComponents;
		}

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
		}

		this.removeEntity = function(removedEntity) {
			let length = entities.length;
			entities = entities.filter(entity => entity !== removedEntity);
			if (length > entities.length)
				removedEntity.removeAllComponents();
		}
	}

}

export default EntityManager;