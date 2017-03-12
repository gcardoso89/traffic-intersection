import { INTERSECTION_STATES_NAMES, LIGHT_NAMES } from "../config";

/**
 * Traffic Controller View class
 * This class is responsible to controller all the traffic app view
 */
export default class TrafficControllerView {
	constructor( controller ) {
		this._controller = controller;
		this._durationVal = null;
		this._currentHistoryLength = 0;
		this._selectors = {
			startButton: $( '#button-start' ),
			stopButton: $( '#button-stop' ),
			durationInput: $( '#input-duration' ),
			table: $( '#table-body' )
		};

		this._selectors.startButton.click( this._onStartButtonClick.bind( this ) );
		this._selectors.stopButton.click( this._onStopButtonClick.bind( this ) );
		this._selectors.durationInput.change( this._onDurationInputChange.bind( this ) );
	}

	/**
	 * IMPORTANT NOTE: Please be aware that this is not the best optimized solution to generate the view
	 * The DOM operations are hugely heavy so we should consider an optimized templating solution
	 * for this rendering in the future.
	 */
	update() {

		let currentHistory = this._controller.getHistory();
		let detail;

		if ( currentHistory.length === 0 ) {
			this._selectors.table.html( '' );
			this._currentHistoryLength = 0;
			return;
		} else if ( this._currentHistoryLength === currentHistory.length ) {
			return;
		}

		detail = currentHistory[ currentHistory.length - 1 ];

		let streets = {};

		for ( let street in detail.intersection ) {
			if ( detail.intersection.hasOwnProperty( street ) ) {
				streets[ street ] = detail.intersection[ street ].map( ( trafficLight ) => {
					return `<b>${trafficLight.getId()}</b>: ${LIGHT_NAMES[ trafficLight.getCurrentState() ]}`;
				} );
			}
		}

		this._selectors.table.append( `<tr>
			<td>${detail.date}</td>
			<td>${INTERSECTION_STATES_NAMES[ detail.state ]}</td>
			<td>${streets[ "A" ].join( " - " )}</td>
			<td>${streets[ "B" ].join( " - " )}</td>
		</tr>` );

		this._currentHistoryLength++;
	}

	_onStartButtonClick( e ) {
		e.preventDefault();
		if ( !this._controller.isRunning() ) {
			this._controller.start( this._durationVal );
		}
	}

	_onStopButtonClick( e ) {
		e.preventDefault();
		if ( this._controller.isRunning() ) {
			this._controller.stop();
		}
	}

	_onDurationInputChange() {
		let value = parseInt( this._selectors.durationInput.val(), 10 );
		if ( !isNaN( value ) ) {
			this._durationVal = value;
		} else {
			this._durationVal = null;
		}
	}
}
