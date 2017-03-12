const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

export const INTERSECTION_STATES = {
	RED_GREEN: 1,
	RED_YELLOW: 2,
	GREEN_RED: 3,
	YELLOW_RED: 4
};

export const LIGHT_STATES = {
	RED: 0,
	YELLOW: 1,
	GREEN: 2
};

export const LIGHT_NAMES = {
	0: 'RED',
	1: 'YELLOW',
	2: 'GREEN'
};

export const TRAFFIC_LIGHT_IDS = {
	"N": "North",
	"S": "South",
	"W": "West",
	"E": "East"
};

export const INTERSECTION_LAYOUT = {
	A: [ "N", "S" ],
	B: [ "W", "E" ]
};

export const STREETS = {
	A: "A",
	B: "B"
};

export let TIMINGS = {
	1: 0.1 * ONE_MINUTE,
	2: 10 * ONE_SECOND,
	3: 0.1 * ONE_MINUTE,
	4: 10 * ONE_SECOND
};