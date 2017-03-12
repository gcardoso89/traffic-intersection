import TrafficController from "./TrafficController";
import TrafficIntersection from "./TrafficIntersection";
import { INTERSECTION_STATES } from "../config";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import jsdom from "mocha-jsdom";

chai.use( chaiAsPromised );
var expect = chai.expect,
	should = chai.should();

describe( "Traffic Controller", function () {

	var $;
	jsdom();

	before(() => {
		$ = require('jquery');
		global.$ = $;
	});

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

	it( "should reject the change state promise if the controller is asked to be stopped", function ( done ) {
		let controller = new TrafficController();
		controller._shouldStopStateMachine = true;
		let promise = controller._changeState( INTERSECTION_STATES.RED_GREEN );

		promise.should.be.rejected.and.notify( done );
	} );

} );