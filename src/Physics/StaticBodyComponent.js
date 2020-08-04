import Component from "../Entities/Component.js"
import Vector2 from "../Math/Vector2.js"	

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


};

export default StaticBodyComponent;