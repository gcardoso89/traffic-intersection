import { TRAFFIC_LIGHT_IDS, LIGHT_NAMES } from "../config";

/**
 * Traffic Light View class
 * This class is responsible to control the view of each Traffic Light
 */
export default class TrafficLightView {
	constructor( controller ){
		this._controller = controller;
		this._currentState = this._controller.getCurrentState();
		this._selectors = {
			trafficLight: $( '#traffic-light-' + TRAFFIC_LIGHT_IDS[ this._controller.getId() ].toLowerCase() )
		}
	}

	/**
	 * Receives the new state and changes the CSS class accordingly
	 * @param newState
	 */
	update( newState ){
		let previousClass = LIGHT_NAMES[ this._currentState ].toLowerCase();
		let newClass = LIGHT_NAMES[ newState ].toLowerCase();
		this._selectors.trafficLight.removeClass( previousClass );
		this._selectors.trafficLight.addClass( newClass );
		this._currentState = newState;
	}
}
