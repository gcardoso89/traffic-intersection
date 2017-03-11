import TrafficLight from "./TrafficLight";
import { LIGHT_STATES, TRAFFIC_LIGHT_IDS } from "../config";

var chai = require( 'chai' );
var expect = chai.expect;
var should = chai.should();

describe( "Traffic Light", function () {

	it( 'should be initialized with one of the available IDs', () => {
		let trafficLight = new TrafficLight( "N" );

		expect( TRAFFIC_LIGHT_IDS ).to.have.property( trafficLight.getId() );
	} );

	it( 'should be initialized in RED light state', () => {
		let trafficLight = new TrafficLight( "N" );

		expect( trafficLight.getCurrentState() ).to.equal( LIGHT_STATES.RED );
	} );

	it( 'should return the new light state when its current state is changed', () => {
		let trafficLight = new TrafficLight( "N" );

		expect( trafficLight.changeState( LIGHT_STATES.GREEN ) ).to.equal( LIGHT_STATES.GREEN );
	} );

	it( 'should set the current light state with the new state after its state is changed', () => {
		let trafficLight = new TrafficLight( "N" );
		trafficLight.changeState( LIGHT_STATES.GREEN );

		expect( trafficLight.getCurrentState() ).to.equal( LIGHT_STATES.GREEN );
	} );

	it( 'should throw an error when the RED state is changed to a YELLOW state', () => {
		let trafficLight = new TrafficLight( "N" );

		expect( trafficLight.getCurrentState() ).to.equal( LIGHT_STATES.RED );
		expect( TrafficLight.prototype.changeState.bind( trafficLight, LIGHT_STATES.YELLOW ) ).to.throw( Error );
	} );

	it( 'should throw an error when the YELLOW state is changed to a GREEN state', () => {
		let trafficLight = new TrafficLight( "N" );

		expect( trafficLight.changeState( LIGHT_STATES.GREEN ) ).to.equal( LIGHT_STATES.GREEN );
		expect( trafficLight.changeState( LIGHT_STATES.YELLOW ) ).to.equal( LIGHT_STATES.YELLOW );
		expect( TrafficLight.prototype.changeState.bind( trafficLight, LIGHT_STATES.GREEN ) ).to.throw( Error );
	} );

	it( 'should throw an error when the GREEN state is changed to a RED state', () => {
		let trafficLight = new TrafficLight( "N" );

		expect( trafficLight.changeState( LIGHT_STATES.GREEN ) ).to.equal( LIGHT_STATES.GREEN );
		expect( TrafficLight.prototype.changeState.bind( trafficLight, LIGHT_STATES.RED ) ).to.throw( Error );
	} );

} );