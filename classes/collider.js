class Collider {

	static collides(objA) {
		return (objB) => {
			return Collider.areColliding(objA, objB);
		}
	}
	
	static areColliding(objA, objB) {
		if ((typeof objA.angle == 'undefined') || (typeof objB.angle == 'undefined'))
			return false;

		if ((objA.angle != 0) || (objB.angle != 0)) {
			console.log('[ERROR] Collisions with rotated elements not suported yet.');
		}

		var collisionType = objA.boundingBox + '-' + objB.boundingBox;
		
		switch (collisionType) {
			case 'RECTANGLE-RECTANGLE':
				return Collider.checkCollisionBetweenRectangles(objA, objB);
				break;
			case 'RECTANGLE-CIRCLE':
				return Collider.checkCollisionBetweenCircleAndRectangle(objB, objA);
				break;
			case 'CIRCLE-RECTANGLE':
				return Collider.checkCollisionBetweenCircleAndRectangle(objA, objB);
				break;
			case 'CIRCLE-CIRCLE':
				return Collider.checkCollisionBetweenCircles(objA, objB);
				break;
			default:
				console.log('bounding box not suported');
				return false;
		}
	};
	
	static checkCollisionBetweenRectangles(rectangleObjA, rectangleObjB) {
		if (rectangleObjA.x < rectangleObjB.x + rectangleObjB.width &&
		   rectangleObjA.x + rectangleObjA.width > rectangleObjB.x &&
		   rectangleObjA.y < rectangleObjB.y + rectangleObjB.height &&
		   rectangleObjA.height + rectangleObjA.y > rectangleObjB.y) {
    		return true;
		}

		return false;
	}
	
	static checkCollisionBetweenCircles(circleObjA, circleObjB) {
	}
	
	
	static checkCollisionBetweenCircleAndRectangle(circleObj, rectangleObj) {
	}

	static getCollisionVector(objA, objB) {
		return {x:objA.center().x-objB.center().x, y:objA.center().y-objB.center().y};
	}
}

export default Collider;