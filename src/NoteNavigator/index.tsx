import moment from "moment";
import { App } from "obsidian";
import React from "react";

const NoteNavigator = ({ app }: NoteNavigatorProps) => {
	const openFile = app.workspace.getActiveFile();

	if (!openFile?.basename)
		return (
			<div className="NoteNavigator_Container">
				<strong>No open file found</strong>
			</div>
		);

	const previousDay = moment(openFile.basename)
		.subtract(1, "days")
		.format("YYYY-MM-DD");
	const nextDay = moment(openFile.basename)
		.add(1, "days")
		.format("YYYY-MM-DD");

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
			<a href={`obsidian://open?file=${previousDay}`}>⬅️ {previousDay}</a>
			<strong>{openFile.basename}</strong>
			<a href={`obsidian://open?file=${nextDay}`}>{nextDay} ➡️</a>
		</div>
	);
};

interface NoteNavigatorProps {
	app: App;
}

export interface NoteNavigatorSettings {
	type: "navigator";
}

export default NoteNavigator;
