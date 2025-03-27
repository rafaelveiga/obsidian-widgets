import { ItemView, ViewStateResult, WorkspaceLeaf } from "obsidian";
import React from "react";
import { createRoot } from "react-dom/client";
import WidgetConfig from "src/WidgetConfig";
import { HelperFunctions } from "./types/HelperFunctions";
import { WidgetSettings } from "./types/Widgets";

export const VIEW_TYPE = "widgets";

export type IWidgetConfigPersistedState = WidgetSettings & {
	isEditing: boolean;
};

export class WidgetView extends ItemView {
	helperFunctions: HelperFunctions;
	leaf: WorkspaceLeaf;

	widgetConfig: IWidgetConfigPersistedState = {
		type: "clock",
		author: "",
		date: "",
		format: "24hr",
		quote: "",
		text: "",
		to: "",
		isEditing: true,
		hideSeconds: null,
		increment: "1",
		startValue: "0",
	};

	constructor(leaf: WorkspaceLeaf, helperFunctions: HelperFunctions) {
		super(leaf);

		this.leaf = leaf;
		this.helperFunctions = helperFunctions;
	}

	getViewType(): string {
		return VIEW_TYPE;
	}

	getDisplayText(): string {
		return "Widget View";
	}

	async onOpen(): Promise<void> {
		this.render();
	}

	render(): void {
		const container = this.containerEl.children[1];

		const root = createRoot(container);

		root.render(
			<WidgetConfig
				setConfig={this.setConfig.bind(this)}
				getState={this.getState.bind(this)}
				helperFunctions={this.helperFunctions}
				leaf={this.leaf}
			/>
		);
	}

	async onClose(): Promise<void> {
		// Clean up view before closing
	}

	async setState(
		state: IWidgetConfigPersistedState,
		result: ViewStateResult
	): Promise<void> {
		this.widgetConfig = state;

		return super.setState(state, result);
	}

	getState(): IWidgetConfigPersistedState {
		return this.widgetConfig;
	}

	setConfig(config: IWidgetConfigPersistedState) {
		this.widgetConfig = config;

		this.app.workspace.requestSaveLayout();
	}
}
