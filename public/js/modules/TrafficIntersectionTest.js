import TrafficIntersection from "./TrafficIntersection";
import TrafficLight from "./TrafficLight";
import { INTERSECTION_LAYOUT, STREETS } from "../config";

var chai = require( 'chai' );
var expect = chai.expect;

describe( "Traffic Intersection", function () {

	it( 'should create an intersection with the streets configured', function () {
		let intersection = new TrafficIntersection();

		expect( intersection.getLayout() ).to.have.all.keys( Object.keys( INTERSECTION_LAYOUT ) );
	} );

	it( 'should have all the streets with TrafficLight instances', function () {
		let intersection = new TrafficIntersection().getLayout();
		for ( let street in intersection ) {
			if ( intersection.hasOwnProperty( street ) ) {
				intersection[ street ].forEach(
					( trafficLight ) => expect( trafficLight ).to.be.instanceOf( TrafficLight )
				);
			}
		}
	} );

	it( 'should have only two traffic lights per street', function () {
		let intersection = new TrafficIntersection().getLayout();

		for ( let street in intersection ) {
			if ( intersection.hasOwnProperty( street ) ) {
				expect( intersection[ street ] ).to.have.lengthOf( 2 );
			}
		}
	} );

	it( 'should return false if an invalid street is requested to change its state', function () {
		let intersection = new TrafficIntersection();

		expect( intersection.changeStreetState( "C" ) ).to.equal( false );
	} );

} );