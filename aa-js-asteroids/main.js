/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n/* harmony import */ var _moving_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moving-object.js */ \"./src/moving-object.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\n\n\n\n\nclass Asteroid extends _moving_object_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  constructor(options = {}) {\n    options.color = Asteroid.COLOR;\n    options.pos = options.pos || options.game.randomPosition();\n    options.radius = Asteroid.RADIUS;\n    options.vel = options.vel || _util_js__WEBPACK_IMPORTED_MODULE_0__.randomVec(Asteroid.SPEED);\n    super(options);\n  }\n\n  static COLOR = \"#505050\";\n  static RADIUS = 25;\n  static SPEED = 4;\n\n  collideWith(otherObject) {\n    if (otherObject instanceof _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      otherObject.relocate();\n      return true;\n    } else if (otherObject instanceof _bullet_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]) {\n      this.remove();\n      otherObject.remove();\n      return true;\n    }\n\n    return false;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Asteroid);\n\n\n//# sourceURL=webpack://asteroids-long-practice/./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _moving_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving-object.js */ \"./src/moving-object.js\");\n\n\nclass Bullet extends _moving_object_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(options) {\n    options.radius = Bullet.RADIUS;\n    super(options);\n    this.isWrappable = false;\n  }\n\n  static RADIUS = 2;\n  static SPEED = 15;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bullet);\n\n\n//# sourceURL=webpack://asteroids-long-practice/./src/bullet.js?");

/***/ }),

/***/ "./src/game-view.js":
/*!**************************!*\
  !*** ./src/game-view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass GameView {\n  constructor(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    this.ship = this.game.addShip();\n  }\n\n  static MOVES = {\n    w: [0, -1],\n    a: [-1, 0],\n    s: [0, 1],\n    d: [1, 0],\n  };\n  \n  bindKeyHandlers() {\n    const ship = this.ship;\n\n    Object.keys(GameView.MOVES).forEach((k) => {\n      const move = GameView.MOVES[k];\n      key(k, () => { ship.power(move); });\n    });\n\n    key(\"space\", () => { ship.fireBullet(); });\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.lastTime = 0;\n    // start the animation\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    const timeDelta = time - this.lastTime;\n\n    this.game.step(timeDelta);\n    this.game.draw(this.ctx);\n    this.lastTime = time;\n\n    // every call to animate requests causes another call to animate\n    requestAnimationFrame(this.animate.bind(this));\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameView);\n\n\n//# sourceURL=webpack://asteroids-long-practice/./src/game-view.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _asteroid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\n\n\n\nclass Game {\n  constructor() {\n    this.asteroids = [];\n    this.bullets = [];\n    this.ships = [];\n\n    this.addAsteroids();\n  }\n\n  static BG_COLOR = \"#000000\";\n  static DIM_X = 1000;\n  static DIM_Y = 600;\n  static FPS = 32;\n  static NUM_ASTEROIDS = 10;\n\n  add(object) {\n    if (object instanceof _asteroid_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      this.asteroids.push(object);\n    } else if (object instanceof _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n      this.bullets.push(object);\n    } else if (object instanceof _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      this.ships.push(object);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  addAsteroids() {\n    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n      this.add(new _asteroid_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ game: this }));\n    }\n  }\n\n  addShip() {\n    const ship = new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      pos: this.randomPosition(),\n      game: this\n    });\n\n    this.add(ship);\n\n    return ship;\n  }\n\n  allObjects() {\n    return [].concat(this.ships, this.asteroids, this.bullets);\n  }\n\n  checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n      for (let j = 0; j < allObjects.length; j++) {\n        const obj1 = allObjects[i];\n        const obj2 = allObjects[j];\n\n        if (obj1.isCollidedWith(obj2)) {\n          const collision = obj1.collideWith(obj2);\n          if (collision) return;\n        }\n      }\n    }\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n    this.allObjects().forEach((object) => {\n      object.draw(ctx);\n    });\n  }\n\n  isOutOfBounds(pos) {\n    return (pos[0] < 0) || (pos[1] < 0) ||\n      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n  }\n\n  moveObjects(delta) {\n    this.allObjects().forEach((object) => {\n      object.move(delta);\n    });\n  }\n\n  randomPosition() {\n    return [\n      Game.DIM_X * Math.random(),\n      Game.DIM_Y * Math.random()\n    ];\n  }\n\n  remove(object) {\n    if (object instanceof _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n      this.bullets.splice(this.bullets.indexOf(object), 1);\n    } else if (object instanceof _asteroid_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n      this.asteroids.splice(this.asteroids.indexOf(object), 1);\n    } else if (object instanceof _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n      this.ships.splice(this.ships.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  step(delta) {\n    this.moveObjects(delta);\n    this.checkCollisions();\n  }\n\n  wrap(pos) {\n    return [\n      _util_js__WEBPACK_IMPORTED_MODULE_3__.wrap(pos[0], Game.DIM_X), _util_js__WEBPACK_IMPORTED_MODULE_3__.wrap(pos[1], Game.DIM_Y)\n    ];\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://asteroids-long-practice/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-view.js */ \"./src/game-view.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementById(\"game-canvas\");\n  canvasEl.width = _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DIM_X;\n  canvasEl.height = _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].DIM_Y;\n  \n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  new _game_view_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](game, ctx).start();\n});\n\n\n//# sourceURL=webpack://asteroids-long-practice/./src/index.js?");

/***/ }),

/***/ "./src/moving-object.js":
/*!******************************!*\
  !*** ./src/moving-object.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\n\nclass MovingObject {\n  constructor(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n    this.isWrappable = true;\n  }\n\n  collideWith(otherObject) {\n    // default do nothing\n  }\n\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  }\n\n  isCollidedWith(otherObject) {\n    const centerDist = _util_js__WEBPACK_IMPORTED_MODULE_0__.dist(this.pos, otherObject.pos);\n    return centerDist < (this.radius + otherObject.radius);\n  }\n\n  move(timeDelta) {\n    // timeDelta is number of milliseconds since last move\n    // if the computer is busy the time delta will be larger\n    // in this case the MovingObject should move farther in this frame\n    // velocity of object is how far it should move in 1/60th of a second\n    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n        offsetX = this.vel[0] * velocityScale,\n        offsetY = this.vel[1] * velocityScale;\n\n    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n\n    if (this.game.isOutOfBounds(this.pos)) {\n      if (this.isWrappable) {\n        this.pos = this.game.wrap(this.pos);\n      } else {\n        this.remove();\n      }\n    }\n  }\n\n  remove() {\n    this.game.remove(this);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovingObject);\n\n\n//# sourceURL=webpack://asteroids-long-practice/./src/moving-object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _moving_object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving-object.js */ \"./src/moving-object.js\");\n/* harmony import */ var _bullet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\n\n\nfunction randomColor() {\n  const hexDigits = \"0123456789ABCDEF\";\n\n  let color = \"#\";\n  for (let i = 0; i < 3; i++) {\n    color += hexDigits[Math.floor((Math.random() * 16))];\n  }\n\n  return color;\n}\n\nclass Ship extends _moving_object_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(options) {\n    options.radius = Ship.RADIUS;\n    options.vel = options.vel || [0, 0];\n    options.color = options.color || randomColor();\n    super(options);\n  }\n\n  static RADIUS = 15;\n\n  fireBullet() {\n    const norm = _util_js__WEBPACK_IMPORTED_MODULE_2__.norm(this.vel);\n\n    if (norm === 0) {\n      // Can't fire unless moving.\n      return;\n    }\n\n    const relVel = _util_js__WEBPACK_IMPORTED_MODULE_2__.scale(\n      _util_js__WEBPACK_IMPORTED_MODULE_2__.dir(this.vel),\n      _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SPEED\n    );\n\n    const bulletVel = [\n      relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n    ];\n\n    const bullet = new _bullet_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      pos: this.pos,\n      vel: bulletVel,\n      color: this.color,\n      game: this.game\n    });\n\n    this.game.add(bullet);\n  }\n\n  power(impulse) {\n    this.vel[0] += impulse[0];\n    this.vel[1] += impulse[1];\n  }\n\n  relocate() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0, 0];\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://asteroids-long-practice/./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dir\": () => (/* binding */ dir),\n/* harmony export */   \"dist\": () => (/* binding */ dist),\n/* harmony export */   \"norm\": () => (/* binding */ norm),\n/* harmony export */   \"randomVec\": () => (/* binding */ randomVec),\n/* harmony export */   \"scale\": () => (/* binding */ scale),\n/* harmony export */   \"wrap\": () => (/* binding */ wrap)\n/* harmony export */ });\n// Normalize the length of the vector to 1, maintaining direction.\nfunction dir (vec) {\n  const magnitude = norm(vec);\n  return scale(vec, 1 / magnitude);\n}\n\n// Find distance between two points.\nfunction dist(pos1, pos2) {\n  return Math.sqrt(\n    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n  );\n}\n\n// Find the length of the vector.\nfunction norm(vec) {\n  return dist([0, 0], vec);\n}\n\n// Return a randomly oriented vector with the given length.\nfunction randomVec(length) {\n  const deg = 2 * Math.PI * Math.random();\n  return scale([Math.sin(deg), Math.cos(deg)], length);\n}\n\n// Scale the length of a vector by the given amount.\nfunction scale(vec, m) {\n  return [vec[0] * m, vec[1] * m];\n}\n\nfunction wrap(coord, max) {\n  if (coord < 0) {\n    return max - (coord % max);\n  } else if (coord > max) {\n    return coord % max;\n  } else {\n    return coord;\n  }\n}\n\n\n//# sourceURL=webpack://asteroids-long-practice/./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;