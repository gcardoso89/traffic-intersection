import TrafficController from "./TrafficController";
import TrafficIntersection from "./TrafficIntersection";
import { TIMINGS, INTERSECTION_STATES } from "../config";

var chai = require( 'chai' );
var chaiAsPromised = require( "chai-as-promised" );
chai.use( chaiAsPromised );
var expect = chai.expect;
var should = chai.should();

describe( "Traffic Controller", function () {

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

		promise.should.be.rejected.and.notify(done);
	});

	for ( var state in INTERSECTION_STATES ) {

		if ( INTERSECTION_STATES.hasOwnProperty( state ) ) {

			it( `should take ${ TIMINGS[ INTERSECTION_STATES[ state ] ] }ms on ${ state } state`, (function ( state ) {
				return function( done ){
					let controller = new TrafficController();
					let promise = controller._changeState( INTERSECTION_STATES[ state ] );
					let timing = TIMINGS[ INTERSECTION_STATES[ state ] ];
					
					this.timeout( 0 );
					
					setTimeout( () => { promise.should.be.fulfilled.and.notify(done) }, timing );
				}
			})( state ) );

		}

	}
} );