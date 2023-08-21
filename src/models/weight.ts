export interface NewWeightRecord {
	day: string;
	month: string;
	year: string;
	weight: number;
}

export interface WeightRecord extends NewWeightRecord {
	id: string;
}
