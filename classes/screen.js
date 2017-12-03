class Screen {
	static width()  { return window.innerWidth; }
	static height() { return window.innerHeight; }
	static center() { return {x:Screen.width()/2, y:Screen.height()/2}; }
 }

 export default Screen;