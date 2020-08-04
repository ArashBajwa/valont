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
			this.onCollision(other._parent);
		}
	}
}

KinematicBodyComponent.GRAVITY = new Vector2(0, 10);

export default KinematicBodyComponent;