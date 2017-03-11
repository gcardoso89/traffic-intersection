import TrafficLight from "./TrafficLight";
import { STATES } from "../config";

var expect = require( 'chai' ).expect;

describe( "TrafficLight", function () {

	it( 'should return the new state', function () {
		let trafficLight = new TrafficLight();

		expect( trafficLight.changeState( STATES.RED_GREEN ) ).to.equal( STATES.RED_GREEN );
	} );

	it( 'should set the currentState property with the new state', function () {
		let trafficLight = new TrafficLight();
		trafficLight.changeState( STATES.RED_GREEN );
		
		expect( trafficLight.getCurrentState() ).to.equal( STATES.RED_GREEN );
	} );
} );