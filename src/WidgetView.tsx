import { ItemView, WorkspaceLeaf } from "obsidian";
import React from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./Widget";
import { HelperFunctions } from "./types/HelperFunctions";

export const VIEW_TYPE = "widgets";

export class WidgetView extends ItemView {
	helperFunctions: HelperFunctions;

	constructor(leaf: WorkspaceLeaf, helperFunctions: HelperFunctions) {
		super(leaf);

		this.helperFunctions = helperFunctions;
	}

	getViewType(): string {
		return VIEW_TYPE;
	}

	getDisplayText(): string {
		return "Widget View";
	}

	async onOpen(): Promise<void> {
		const container = this.containerEl.children[1];

		const root = createRoot(container);

		root.render(
			<Widget
				settings={{
					type: "counter",
					text: "Counter",
				}}
				helperFunctions={this.helperFunctions}
			/>
		);

		container.empty();
		container.createEl("h1", { text: "Widget View" });
	}

	async onClose(): Promise<void> {
		// Clean up view before closing
	}
}
