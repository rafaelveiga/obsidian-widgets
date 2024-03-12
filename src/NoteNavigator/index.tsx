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

	const openFileDate = moment(openFile.basename).format("YYYY-MM-DD");
	const previousDay = moment(openFile.basename)
		.subtract(1, "days")
		.format("YYYY-MM-DD");
	const nextDay = moment(openFile.basename)
		.add(1, "days")
		.format("YYYY-MM-DD");

	console.log(openFileDate, previousDay, nextDay);

	return (
		<div className="NoteNavigator_Container">
			<a href="obsidian://open?file=file">⬅️ {previousDay}</a>
			<strong>{openFile.basename}</strong>
			<a href="#">{nextDay} ➡️</a>
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
