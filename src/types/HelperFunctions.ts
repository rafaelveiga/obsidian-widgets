import { TFile } from "obsidian";

export interface DataJson {
	[path: string]: number;
}

export interface HelperFunctions {
	writeToDataJson: (data: DataJson) => void;
	readFromDataJson: () => Promise<DataJson>;
	getCurrentOpenFile: () => TFile;
}
