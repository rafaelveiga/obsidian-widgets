import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./src/Widget";
import ObsidianWidgetsCommandModal from "src/CommandModal";
import { DataJson } from "src/Counter";

export default class ObsidianWidgets extends Plugin {
	async onload() {
		this.addCommand({
			id: "add-widget",
			name: "Add widget",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				new ObsidianWidgetsCommandModal(this.app, editor).open();
			},
		});

		this.addRibbonIcon("cuboid", "Add widget", () => {
			const editor =
				this.app.workspace.getActiveViewOfType(MarkdownView)?.editor;

			if (editor) {
				new ObsidianWidgetsCommandModal(this.app, editor).open();
			} else {
				new Notice(
					"Widgets: No cursor placement found. Please place your cursor in your note where you like the widget to be inserted."
				);
			}
		});

		this.registerMarkdownCodeBlockProcessor(
			"widgets",
			(source, el, ctx) => {
				// @ts-ignore
				const options = {} as any;

				source
					.split("\n")
					.map((option: string) =>
						option.split(/:(.*)/).map((option) => option.trim())
					)
					.forEach((optionSet) => {
						// @ts-ignore
						options[optionSet[0]] = optionSet[1];
					});

				const root = createRoot(el);

				// @ts-ignore
				root.render(
					<Widget
						settings={options}
						helperFunctions={{
							writeToDataJson: this.writeToDataJson.bind(this),
							readFromDataJson: this.readFromDataJson.bind(this),
							getCurrentOpenFile:
								this.getCurrentOpenFile.bind(this),
						}}
					/>
				);
			}
		);
	}

	async onunload() {}

	writeToDataJson(data: DataJson) {
		this.saveData(data);
	}

	readFromDataJson() {
		return this.loadData();
	}

	getCurrentOpenFile() {
		return this.app.workspace.getActiveFile();
	}
}
