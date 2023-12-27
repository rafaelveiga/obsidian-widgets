import { Editor, MarkdownView, Plugin } from "obsidian";
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

		this.registerMarkdownCodeBlockProcessor(
			"widgets",
			(source, el, ctx) => {
				const options = {
					basePath: this.app.vault.adapter?.basePath,
					configDir: this.app.vault.adapter?.configDir,
				};

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
	async onunload() {
		// Release any resources configured by the plugin.
	}
}
