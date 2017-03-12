import TrafficController from "./TrafficController";
import TrafficIntersection from "./TrafficIntersection";
import { INTERSECTION_STATES } from "../config";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import jsdom from "mocha-jsdom";

chai.use( chaiAsPromised );
var expect = chai.expect,
	should = chai.should();

let mockTimings = {
	1: 10,
	2: 10,
	3: 10,
	4: 10
};

describe( "Traffic Controller", function () {

	var $;
	jsdom();

	before( () => {
		$ = require( 'jquery' );
		global.$ = $;
	} );

	it( "should initialize a Traffic Intersection on its constructor", function () {
		let controller = new TrafficController();

		expect( controller._intersection ).to.be.instanceOf( TrafficIntersection );
	} );

	it( "should return a promise for each state change", function () {
		let controller = new TrafficController();

		expect( controller._changeState( INTERSECTION_STATES.RED_GREEN ) ).to.be.a( 'promise' );
		expect( controller._changeState( INTERSECTION_STATES.RED_YELLOW ) ).to.be.a( 'promise' );
		expect( controller._changeState( INTERSECTION_STATES.GREEN_RED ) ).to.be.a( 'promise' );
		expect( controller._changeState( INTERSECTION_STATES.YELLOW_RED ) ).to.be.a( 'promise' );
	} );

	it( "should not return a promise if the controller is asked to be stopped", function ( ) {
		let controller = new TrafficController();
		controller._shouldStopStateMachine = true;
		expect( controller._changeState( INTERSECTION_STATES.RED_GREEN ) ).to.equal( null );
	} );

	it( "should go from RED_GREEN to GREEN_RED during the state machine", async function () {
		this.timeout( 0 );

		let controller = new TrafficController( mockTimings );

		await controller._changeState( INTERSECTION_STATES.RED_GREEN );
		expect( controller._currentState ).to.equal( INTERSECTION_STATES.RED_GREEN );

		await controller._changeState( INTERSECTION_STATES.RED_YELLOW );
		expect( controller._currentState ).to.equal( INTERSECTION_STATES.RED_YELLOW );

		await controller._changeState( INTERSECTION_STATES.GREEN_RED );
		expect( controller._currentState ).to.equal( INTERSECTION_STATES.GREEN_RED );

		await controller._changeState( INTERSECTION_STATES.YELLOW_RED );
		expect( controller._currentState ).to.equal( INTERSECTION_STATES.YELLOW_RED );
	} );

	it( 'should set the currentState as null after stopping the traffic controller', function ( done ) {
		this.timeout( 700 );

		let controller = new TrafficController( mockTimings );
		controller.start( 1000 );

		setTimeout( () => {
			controller.stop();
			should.not.exist( controller._currentState );
			done();
		}, 500 );
	} );

} );