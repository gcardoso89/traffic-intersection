import TrafficIntersection from "./TrafficIntersection";
import { TIMINGS, INTERSECTION_STATES, STREETS, LIGHT_STATES } from "../config";

export default class TrafficController {
	constructor() {
		this._intersection = new TrafficIntersection();
		this._currentState = null;
		this._currentTimer = null;
		this._currentPromiseRunning = null;
		this._isStateMachineRunning = false;
		this._shouldStopStateMachine = false;
	}

	async _intersectionStateMachine() {

		await this._changeState( INTERSECTION_STATES.RED_GREEN );
		
		await this._changeState( INTERSECTION_STATES.RED_YELLOW );

		await this._changeState( INTERSECTION_STATES.GREEN_RED );

		await this._changeState( INTERSECTION_STATES.YELLOW_RED );

		if ( !this._shouldStopStateMachine ) {
			this._intersectionStateMachine();
		} else {
			this._isStateMachineRunning = false;
			return true;
		}
	}

	isRunning() {
		return this._isStateMachineRunning;
	}

	start() {
		this._isStateMachineRunning = true;
		this._shouldStopStateMachine = false;
		this._intersectionStateMachine();
	}

	stop() {
		this._shouldStopStateMachine = true;
		this._clearCurrentTimer();
		if ( this._currentPromiseRunning ) {
			this._currentPromiseRunning();
		}
	}

	_changeState( newState ) {
		this._currentPromiseRunning = null;

		return new Promise( ( resolve, reject ) => {
			if ( this._shouldStopStateMachine ) {
				reject();
				this._currentState = null;
			}

			this._currentState = newState;
			this._changeIntersectionState( this._currentState );

			this._clearCurrentTimer();
			this._currentTimer = setTimeout( resolve, TIMINGS[ this._currentState ] );

			this._currentPromiseRunning = reject;
		} );
	}

	_changeIntersectionState( currentState ){
		switch ( currentState ){
			case INTERSECTION_STATES.RED_GREEN:
				this._intersection.changeStreetState( STREETS.A, LIGHT_STATES.RED );
				this._intersection.changeStreetState( STREETS.B, LIGHT_STATES.GREEN );
				break;
			case INTERSECTION_STATES.RED_YELLOW:
				this._intersection.changeStreetState( STREETS.A, LIGHT_STATES.RED );
				this._intersection.changeStreetState( STREETS.B, LIGHT_STATES.YELLOW );
				break;
			case INTERSECTION_STATES.GREEN_RED:
				this._intersection.changeStreetState( STREETS.A, LIGHT_STATES.GREEN );
				this._intersection.changeStreetState( STREETS.B, LIGHT_STATES.RED );
				break;
			case INTERSECTION_STATES.YELLOW_RED:
				this._intersection.changeStreetState( STREETS.A, LIGHT_STATES.YELLOW );
				this._intersection.changeStreetState( STREETS.B, LIGHT_STATES.RED );
				break;
		}
	}

	_clearCurrentTimer() {
		if ( this._currentTimer ) {
			clearTimeout( this._currentTimer );
		}
		this._currentTimer = null;
	}
}