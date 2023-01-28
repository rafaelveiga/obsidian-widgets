import { Plugin } from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./src/Widget";

export default class ObsidianWidgets extends Plugin {
	async onload() {
		// Configure resources needed by the plugin.
		this.registerMarkdownCodeBlockProcessor(
			"widgets",
			(source, el, ctx) => {
				console.log(source, el, ctx);

				const root = createRoot(el);

				root.render(<Widget type="source" />);
			}
		);
	}
	async onunload() {
		// Release any resources configured by the plugin.
	}
}
