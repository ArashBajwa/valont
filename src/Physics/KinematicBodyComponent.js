import Component from "../Entities/Component.js"
import Vector2 from "../Math/Vector2.js"	
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

	}


	update = function(deltaTime) {
		this.force = this.force.add(this.gravity.mul(deltaTime));
		this._parent.setPosition(this._parent.getPosition().add(this.force.mul(deltaTime)));
	}

	updateCollision = function(other) {
		if (!this.canCollide)
			return false;
		//if (this.position.x < other.position.x + other. )
	}
}

KinematicBodyComponent.GRAVITY = new Vector2(0, 0.001);

export default KinematicBodyComponent;