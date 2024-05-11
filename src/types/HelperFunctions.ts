import { TFile } from "obsidian";

export interface HelperFunctions {
	writeToDataJson: (data: any) => void;
	readFromDataJson: () => any;
	getCurrentOpenFile: () => TFile;
}
