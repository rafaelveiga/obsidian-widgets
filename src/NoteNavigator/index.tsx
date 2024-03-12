import { App } from "obsidian";
import React from "react";

const NoteNavigator = ({ app }: NoteNavigatorProps) => {
	console.log(app.workspace.getActiveFile());
	const { basename } = app.workspace.getActiveFile();

	return (
		<div className="NoteNavigator_Container">
			<a href="#">⬅️ 2023-01-09</a>
			<strong>{basename}</strong>
			<a href="#">2023-01-11 ➡️</a>
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
