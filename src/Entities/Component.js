import Vector2 from "../Math/Vector2"

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

export default Component;