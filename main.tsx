import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./src/Widget";
import ObsidianWidgetsCommandModal from "src/CommandModal";

export default class ObsidianWidgets extends Plugin {
	async onload() {
		this.addCommand({
			id: "obsidian-widgets-add-widget",
			name: "Add Widget",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				new ObsidianWidgetsCommandModal(this.app, editor).open();
			},
		});

		this.addRibbonIcon("cuboid", "Add Widget", () => {
			const editor =
				this.app.workspace.getActiveViewOfType(MarkdownView)?.editor;

			if (editor) {
				new ObsidianWidgetsCommandModal(this.app, editor).open();
			} else {
				new Notice(
					"Obsidian Widgets: No cursor placement found. Please place your cursor in your note where you like the widget to be inserted."
				);
			}
		});

		this.registerMarkdownCodeBlockProcessor(
			"widgets",
			(source, el, ctx) => {
				const options = {};

				source
					.split("\n")
					.map((option: string) =>
						option.split(":").map((option) => option.trim())
					)
					.forEach((optionSet) => {
						options[optionSet[0]] = optionSet[1];
					});

				const root = createRoot(el);

				root.render(<Widget settings={options} />);
			}
		);
	}
	async onunload() {}
}
