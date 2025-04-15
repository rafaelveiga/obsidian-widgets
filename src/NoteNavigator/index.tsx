import moment from "moment";
import { App } from "obsidian";
import React from "react";
import { WidgetType } from "src/types/Widgets";

const NoteNavigator = ({ settings, app }: NoteNavigatorProps) => {
	const openFile = app.workspace.getActiveFile();
	const path = openFile.parent.path + '/';

	if (!openFile?.basename) {
		return (
			<div className="NoteNavigator_Container">
				<strong>No open file found</strong>
			</div>
		)};

	let format = settings.formatNav;

	if (!format) {
		format = "YYYY-MM-DD";
	}

	const previousDay = moment(openFile.basename)
		.subtract(1, "days")
		.format(format);
	const nextDay = moment(openFile.basename)
		.add(1, "days")
		.format(format);

	if (previousDay === "Invalid date" || nextDay === "Invalid date") {
		return (
			<div className="NoteNavigator_Container">
				<strong>
					Invalid file to add navigation to. Please create this widget
					in a daily note
				</strong>
			</div>
		);
	}

	return (
		<div className="NoteNavigator_Container">
			<a href={`obsidian://new?file=${path+previousDay}&append`}>⬅️ {previousDay}</a>
			<strong>{openFile.basename}</strong>
			<a href={`obsidian://new?file=${path+nextDay}&append`}>{nextDay} ➡️</a>
		</div>
	);
};

export default NoteNavigator;

export interface NoteNavigatorSettings {
	type: WidgetType;
	formatNav: string;
}

interface NoteNavigatorProps {
	settings: NoteNavigatorSettings;
	app: App;
}



