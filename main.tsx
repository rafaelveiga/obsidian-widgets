import { App, Plugin } from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./src/Widget";

export default class ObsidianWidgets extends Plugin {
	async onload() {
		console.log(this.app);
		// Configure resources needed by the plugin.
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
