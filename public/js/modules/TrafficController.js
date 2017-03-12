import TrafficIntersection from "./TrafficIntersection";
import TrafficControllerView from "../views/TrafficControllerView";
import { TIMINGS, INTERSECTION_STATES, STREETS, LIGHT_STATES } from "../config";

/**
 * This is the main class of the Traffic Intersection.
 * Has a state machine that controls the intersection states.
 */
export default class TrafficController {
	constructor( timings ) {
		this._intersection = new TrafficIntersection();
		this._view = new TrafficControllerView( this );
		this._timings = timings || TIMINGS;
		this._currentState = null;
		this._currentTimer = null;
		this._shouldStopStateMachine = false;
		this._isStateMachineRunning = false;
		this._intersectionHistory = [];
	}

	start( duration ) {
		if ( this._isStateMachineRunning ){
			return;
		}
		if ( duration ){
			setTimeout( () => this.stop(), duration );
		}
		this._isStateMachineRunning = true;
		this._shouldStopStateMachine = false;
		this._intersectionHistory.length = 0;
		this._view.update();
		this._intersectionStateMachine();
	}

	stop() {
		this._shouldStopStateMachine = true;
		this._intersection.changeStreetState( STREETS.A, LIGHT_STATES.OFF );
		this._intersection.changeStreetState( STREETS.B, LIGHT_STATES.OFF );
		this._currentState = null;
		this._isStateMachineRunning = false;
	}
	
	isRunning() {
		return this._isStateMachineRunning;
	}
	
	getHistory() {
		return this._intersectionHistory;
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
			return true;
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
		if ( this._shouldStopStateMachine ) {
			return null;
		}
		
		return new Promise( ( resolve ) => {
			this._changeIntersectionState( newState );
			this._currentState = newState;

			this._clearCurrentTimer();
			this._currentTimer = setTimeout( resolve, this._timings[ this._currentState ] );
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
		this._intersectionHistory.push({
			date: new Date(),
			state: currentState,
			intersection : $.extend( {}, this._intersection.getLayout() )
		});
		this._view.update();
	}

	_clearCurrentTimer() {
		if ( this._currentTimer ) {
			clearTimeout( this._currentTimer );
		}
		this._currentTimer = null;
	}
}