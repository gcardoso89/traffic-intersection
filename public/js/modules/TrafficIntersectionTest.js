import TrafficLight from "./TrafficLight";
import { LIGHT_STATES } from "../config";

var chai = require( 'chai' );
var expect = chai.expect;
var should = chai.should();

describe( "TrafficLight", function () {

	it( 'should be initialized in RED light state', () => {
		let trafficLight = new TrafficLight();

		expect( trafficLight.getCurrentState() ).to.equal( LIGHT_STATES.RED );
	} );

	it( 'should return the new light state when its current state is changed', () => {
		let trafficLight = new TrafficLight();

		expect( trafficLight.changeState( LIGHT_STATES.GREEN ) ).to.equal( LIGHT_STATES.GREEN );
	} );

	it( 'should set the current light state with the new state after its state is changed', () => {
		let trafficLight = new TrafficLight();
		trafficLight.changeState( LIGHT_STATES.GREEN );

		expect( trafficLight.getCurrentState() ).to.equal( LIGHT_STATES.GREEN );
	} );

	it( 'should throw an error when the RED state is changed to a YELLOW state', () => {
		let trafficLight = new TrafficLight();
		
		expect( trafficLight.getCurrentState() ).to.equal( LIGHT_STATES.RED );
		expect( TrafficLight.prototype.changeState.bind( trafficLight, LIGHT_STATES.YELLOW ) ).to.throw( Error );
	} );

	it( 'should throw an error when the YELLOW state is changed to a GREEN state', () => {
		let trafficLight = new TrafficLight();

		expect( trafficLight.changeState( LIGHT_STATES.GREEN ) ).to.equal( LIGHT_STATES.GREEN );
		expect( trafficLight.changeState( LIGHT_STATES.YELLOW ) ).to.equal( LIGHT_STATES.YELLOW );
		expect( TrafficLight.prototype.changeState.bind( trafficLight, LIGHT_STATES.GREEN ) ).to.throw( Error );
	} );

	it( 'should throw an error when the GREEN state is changed to a RED state', () => {
		let trafficLight = new TrafficLight();

		expect( trafficLight.changeState( LIGHT_STATES.GREEN ) ).to.equal( LIGHT_STATES.GREEN );
		expect( TrafficLight.prototype.changeState.bind( trafficLight, LIGHT_STATES.RED ) ).to.throw( Error );
	} );

} );