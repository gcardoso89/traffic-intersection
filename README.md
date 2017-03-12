# Traffic Intersection
This is onr possible implementation of a Traffic Intersection, composed by two streets, each with two Traffic Lights.

### Intersection States
States        | Street A (N,S) | Street B (E,W) | Duration
------------- | ---------------|----------------| ------
_RED_GREEN_   | Red            | Green          | 4,5min
_RED_YELLOW_  | Red            | Yellow         | 30s
_GREEN_RED_   | Green          | Red            | 4,5min
_YELLOW_RED_  | Yellow         | Red            | 30s


## What has been used?
- **Webpack** - to transpile the ES2016 and ES2017 code into ES2015
- **Node-compass** - Use SCSS with compass as CSS preprocessor
-- All the SCSS files were moved into the project's root, to only use the CSS generated file on the public website
- **Express** - Why not?
- **Mocha & Chai** - For the the logic part unit testing. The views don't have test coverage.

## Important notes
- Despite not being included in this exercise, there **should** be a security delay between the _RED_YELLOW_ - _GREEN_RED_ and _YELLOW_RED - RED_GREEN_ states (a state where both streets are _RED_ - _RED_RED_ state).
- I've used `setTimeout` instead of `requestAnimationFrame`, which might affect the time precision. However, if something delays the `setTimeout` timer, all the following intersection states are also delayed because the state's Promise is only resolved when the `setTimeout` ends, which I think is the expected behaviour.
Also, having this, a tick with a huge timeDelta (which might cause a intersection state to end very quickly) is avoided.
- The code is split in LOGIC and VIEW code. The purpose of this exercise is only present on the logic part, so please ignore the view part because it's only there to have something visual. Yes, even so, the design is incredibly amazing, I know that!
- For the state machine, I've used one _async_ function. Each state is controlled by a Promise.


### Output for 30 min
Please find the snapshot for this output in `snapshots/snapshot_Sun_12Mar2017.png`

Date	                                | State			| Street A				| Street B
----------------------------------------|---------------|-----------------------|------------------------
Sun Mar 12 2017 19:42:43 GMT+0000 (WET)	| RED_GREEN	    | N: RED - S: RED		| W: GREEN - E: GREEN
Sun Mar 12 2017 19:47:13 GMT+0000 (WET)	| RED_YELLOW	| N: RED - S: RED		| W: YELLOW - E: YELLOW
Sun Mar 12 2017 19:47:43 GMT+0000 (WET)	| GREEN_RED		| N: GREEN - S: GREEN	| W: RED - E: RED
Sun Mar 12 2017 19:52:13 GMT+0000 (WET)	| YELLOW_RED	| N: YELLOW - S: YELLOW	| W: RED - E: RED
Sun Mar 12 2017 19:52:43 GMT+0000 (WET)	| RED_GREEN		| N: RED - S: RED		| W: GREEN - E: GREEN
Sun Mar 12 2017 19:57:13 GMT+0000 (WET)	| RED_YELLOW	| N: RED - S: RED		| W: YELLOW - E: YELLOW
Sun Mar 12 2017 19:57:44 GMT+0000 (WET)	| GREEN_RED		| N: GREEN - S: GREEN	| W: RED - E: RED
Sun Mar 12 2017 20:02:14 GMT+0000 (WET)	| YELLOW_RED	| N: YELLOW - S: YELLOW	| W: RED - E: RED
Sun Mar 12 2017 20:02:44 GMT+0000 (WET)	| RED_GREEN		| N: RED - S: RED		| W: GREEN - E: GREEN
Sun Mar 12 2017 20:07:14 GMT+0000 (WET)	| RED_YELLOW	| N: RED - S: RED		| W: YELLOW - E: YELLOW
Sun Mar 12 2017 20:07:44 GMT+0000 (WET)	| GREEN_RED		| N: GREEN - S: GREEN	| W: RED - E: RED
Sun Mar 12 2017 20:12:14 GMT+0000 (WET)	| YELLOW_RED	| N: YELLOW - S: YELLOW	| W: RED - E: RED

##Installation

### Requirements
- Node v6.9.1 & NPM v3.10.19

### Instructions
1. Clone this repo
2. Install the dependencies using the `$ npm install` command
3. Run the app using `$ npm start`
4. Access http://localhost:3000


### Running the tests
You can only run the tests on a local/testing environment. I've not included the test dependencies in production.
- After running `$ npm install`, just run `$ npm test`
