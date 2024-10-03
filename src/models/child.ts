// EXPLANATION (LTJ): Used https://app.quicktype.io/ and pasted response to generate DTO type
// 	Only used first child, so of course unable to infer all types. Marked each one with // TODO
export interface Child {
	childId:             string;
	institutionId:       string;
	groupId:             string;
	createdTime:         Date;
	name:                ChildName;
	birthday:            Date;
	homeAddress:         null; //TODO
	extraInfo:           string;
	language:            string;
	nationality:         string;
	birthplace:          string;
	gender:              number;
	startDate:           Date;
	endDate:             Date;
	leavingReason:       null; //TODO
	isTestChild:         boolean;
	relations:           null; //TODO
	image:               ChildImage;
	isSleeping:          boolean;
	naps:                any[]; //TODO
	hasVacation:         boolean;
	isSick:              boolean;
	isAbsent:            boolean;
	leaves:              any[]; //TODO
	onBus:               boolean;
	onTrip:              boolean;
	statuses:            any[]; //TODO
	statusRegistrations: any[]; //TODO
	checkins:            any[]; //TODO
	checkedIn:           boolean;
	checkinTime:         Date;
	pickupTime:          Date;
	pickupRelationId:    string;
	pickupName:          string;
}

export interface ChildName {
	fullName:   string;
	firstName:  string;
	middleName: string;
	lastName:   string;
}

export interface ChildImage {
	small:     string;
	large:     string;
	empty:     boolean;
	colorCode: number;
}