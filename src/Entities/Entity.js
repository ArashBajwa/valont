import Component from "./Component.js"
import Vector2 from "../Math/Vector2.js"

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
			})
		}

		this.getPosition = function() {
			return position;
		}

		this.setSize = function(newSize) {
			size = newSize;
			components.forEach(component => {
				component._absoluteSize = newSize.mul(component.size);
			});
		}

		this.getComponents = function() {
			return components;
		}

		this.FindFirstComponentByName = function(name) {
			for (let index = 0; index < components.length; index++) {
				if (components[index].name == name)
					return components[index];
			}
		}

		this.onComponentAdded = function(e) {
			if (typeof(e) !== "function") {
				throw "OnComponentedAdded Argument 1 expected a function"
			}

			componentAddedEventListeners.push(e);
		}

		this.onComponentRemoved = function(e) {
			if (typeof(e) !== "function") {
				throw "OnComponentedRemoved Argument 1 expected a function"
			}

			componentRemovedEventListeners.push(e);
		}


		this.addComponent = function(component) {
			if (component instanceof Component) {
				component._parent = this;
				component._absolutePosition = position;
				component._absoluteSize = size;
				components.push(component);
				componentAddedEventListeners.forEach(ev => ev(component));
			}
		}

		this.removeComponent = function(component) {
			if (component instanceof Component) {
				let length = components.length
				components = components.filter(component !== component);
				if (length > components.length)
					componentRemovedEventListeners.forEach(ev => ev(component));
			}
		}

		this.removeAllComponents = function() {
			if (components.length > 0)
				components.forEach(component => componentRemovedEventListeners.forEach(ev => ev(component)));

			components = [];
		}

	}




}

export default Entity;