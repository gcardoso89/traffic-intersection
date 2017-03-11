export default class TrafficLight {

	constructor() {
		this._currentState = null;
	}

	changeState( newState ) {
		this._currentState = newState;
		return this._currentState
	}

	getCurrentState() {
		return this._currentState;
	}
}