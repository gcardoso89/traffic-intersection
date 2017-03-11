import TrafficLight from "./TrafficLight";
import { INTERSECTION_LAYOUT } from "../config";

/**
 * This class is responsible to create the (N,S) and (W,E) traffic light pairs, creating STREETS for that purpose.
 * Having this, when the street state is changed, each traffic light pair is changed immediately too.
 */
export default class TrafficIntersection {
	constructor() {
		this._intersection = {};

		this._createTrafficLights();
	}

	getLayout() {
		return this._intersection;
	}

	changeStreetState( streetId, newState ) {
		let street = this._intersection[ streetId ];

		if ( street ){
			street.map( ( trafficLight ) => trafficLight.changeState( newState ) );
			return true;
		} else {
			return false;
		}
	}

	_createTrafficLights() {
		for ( let street in INTERSECTION_LAYOUT ) {
			if ( INTERSECTION_LAYOUT.hasOwnProperty( street ) ) {
				this._intersection[ street ] = INTERSECTION_LAYOUT[ street ].map( ( trafficLightId ) => new TrafficLight( trafficLightId ) );
			}
		}
	}
}