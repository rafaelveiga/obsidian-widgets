import { Editor, MarkdownView, Notice, Plugin, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./src/Widget";
import ObsidianWidgetsCommandModal from "src/CommandModal";
import { DataJson } from "src/Counter";
import { VIEW_TYPE, WidgetView } from "src/WidgetView";
import { WidgetSettings } from "src/types/Widgets";

export default class ObsidianWidgets extends Plugin {
	async onload() {
		// Adds command
		// =====================
		this.addCommand({
			id: "add-widget",
			name: "Add widget",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				new ObsidianWidgetsCommandModal(this.app, editor).open();
			},
		});

		// Register view
		// =====================
		this.registerView(
			VIEW_TYPE,
			(leaf: WorkspaceLeaf) =>
				new WidgetView(leaf, {
					writeToDataJson: this.writeToDataJson.bind(this),
					readFromDataJson: this.readFromDataJson.bind(this),
					getCurrentOpenFile: this.getCurrentOpenFile.bind(this),
				})
		);

		// Adds sidebar icon
		// =====================
		this.addRibbonIcon("cuboid", "Activate view", () => {
			this.activateView();
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

		// The meat and the potatoes
		// =====================
		this.registerMarkdownCodeBlockProcessor(
			"widgets",
			(source, el, ctx) => {
				// @ts-ignore
				const options = {} as WidgetSettings;

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
						leafId=""
					/>
				);
			}
		);
	}

	async onunload() {}

	async activateView() {
		const { workspace } = this.app;

		const leaf: WorkspaceLeaf | null = workspace.getLeftLeaf(true);

		await leaf.setViewState({ type: VIEW_TYPE, active: true });

		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf);
	}

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
