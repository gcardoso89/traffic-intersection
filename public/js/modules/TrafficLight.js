import { LIGHT_STATES } from "../config";

export default class TrafficLight {
	constructor() {
		this._currentState = LIGHT_STATES.RED;
	}

	changeState( newState ) {
		//Don't let a traffic light to be changed from RED to YELLOW
		if ( this._currentState === LIGHT_STATES.RED && newState === LIGHT_STATES.YELLOW ){
			throw new Error( "A traffic light cannot be changed from RED to YELLOW" );
		} //Don't let a traffic light to be changed from YELLOW to GREEN
		else if ( this._currentState === LIGHT_STATES.YELLOW && newState === LIGHT_STATES.GREEN ){
			throw new Error( "A traffic light cannot be changed from YELLOW to GREEN" );
		} //Don't let a traffic light to be changed from GREEN to RED
		else if ( this._currentState === LIGHT_STATES.GREEN && newState === LIGHT_STATES.RED ){
			throw new Error( "A traffic light cannot be changed from GREEN to RED" );
		}

		this._currentState = newState;
		
		return this._currentState;
	}

	getCurrentState() {
		return this._currentState;
	}
}