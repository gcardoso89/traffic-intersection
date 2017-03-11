import TrafficIntersection from "./TrafficIntersection";
import { TIMINGS, INTERSECTION_STATES, STREETS, LIGHT_STATES } from "../config";

/**
 * This is the main class of the Traffic Intersection.
 * Has a state machine that controls the intersection states.
 */
export default class TrafficController {
	constructor() {
		this._intersection = new TrafficIntersection();
		this._currentState = null;
		this._currentTimer = null;
		this._currentPromiseRunning = null;
		this._isStateMachineRunning = false;
		this._shouldStopStateMachine = false;
	}

	/**
	 * Waits for each state to be completed, until moving to the next one.
	 * When it reaches the end, the state machine is restarted.
	 * @returns {boolean}
	 * @private
	 */
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

	/**
	 * Returns a Promise to block the async function from moving forward, until it reaches the final timing.
	 * When the state delay ends, the Promise is fulfilled and the async function moves the following state.
	 * @param newState
	 * @returns {Promise}
	 * @private
	 */
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

	/**
	 * When the state is changed, the traffic lights of each street should change to the correct lights.
	 * This function guarantees that each street has the correct light state.
	 * @param currentState
	 * @private
	 */
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