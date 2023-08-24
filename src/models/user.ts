export interface UserSettings {
	goalWeight?: number;
	lowestAllowedWeight?: number;
}

export interface User {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
	settings?: UserSettings;
}
