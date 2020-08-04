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
		}
		
		this.getY = function(){
			return _y;
		}

		this.add = function (x, y) {
			if (x instanceof Vector2)
				return new Vector2(_x+x.getX(), _y+x.getY());
			else if(typeof(x) == "number" && typeof(y) == "number")
				return new Vector2(_x+x, _y+y);
			else
				throw("Vector2 adding expected vector or x and y number values");
		}
	
		this.sub = function (x, y) {
			if (x instanceof Vector2)
				return new Vector2(_x-x.getX(), _y-x.getY());
			else if(typeof(x) == "number" && typeof(y) == "number")
				return new Vector2(_x-x, _y-y);
			else
				throw("Vector2 subtracting expected vector or x and y number values");
		}
	
		this.mul = function (x, y) {
			if (x instanceof Vector2)
				return new Vector2(_x*x.getX(), _y*x.getY());
			else if(typeof(x) == "number" && typeof(y) == "number")
				return new Vector2(_x*x, _y*y);
			else if (typeof(x) == "number") //vector.mul(2)
				return new Vector2(_x*x, _y*x);
			else
				throw("Vector2 multiplying expected vector or x and y number values");
		}
		
		this.div = function (x, y) {
			if (x instanceof Vector2)
				return new Vector2(_x/x.getX(), _y/x.getY());
			else if(typeof(x) == "number" && typeof(y) == "number")
				return new Vector2(_x/x, _y/y);
			else if (typeof(x) == "number") //vector.div(2)
				return new Vector2(_x/x, _y/x);
			else
				throw("Vector2 dividing expected vector or x and y number values");
		}
	
		this.magnitude = function() {
			return _magnitude;
		}
	
		this.magnitudeSquared = function() {
			return _magnitudeSquared;
		}
	
		this.normalize = function() {
			return new Vector2(_normalizedX, _normalizedY);
		}
	}
}

export default Vector2;