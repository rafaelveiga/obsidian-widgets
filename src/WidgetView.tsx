import { ItemView, ViewStateResult, WorkspaceLeaf } from "obsidian";
import React from "react";
import { createRoot } from "react-dom/client";
import WidgetConfig from "src/WidgetConfig";
import { HelperFunctions } from "./types/HelperFunctions";
import { ClockSettings } from "./Clock";
import { QuoteSettings } from "./Quote";
import { CounterSettings } from "./Counter";
import { CountdownSettings } from "./Countdown";

export const VIEW_TYPE = "widgets";

export type IWidgetConfigPersistedState =
	| ClockSettings
	| QuoteSettings
	| CounterSettings
	| CountdownSettings;

export class WidgetView extends ItemView {
	helperFunctions: HelperFunctions;

	widgetConfig: IWidgetConfigPersistedState = {
		type: "clock",
		format: "24hr",
	};

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
			<WidgetConfig
				setConfig={this.setConfig.bind(this)}
				getState={this.getState.bind(this)}
				helperFunctions={this.helperFunctions}
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
