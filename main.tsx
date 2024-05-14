import { Editor, MarkdownView, Notice, Plugin, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Widget } from "./src/Widget";
import ObsidianWidgetsCommandModal from "src/CommandModal";
import { DataJson } from "src/Counter";
import { VIEW_TYPE, WidgetView } from "src/WidgetView";

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

		this.addCommand({
			id: "activate-view",
			name: "Activate view",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.activateView();
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

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE);

		if (leaves.length > 0) {
			// A leaf with our view already exists, use that
			leaf = leaves[0];
		} else {
			// Our view could not be found in the workspace, create a new leaf
			// in the right sidebar for it
			leaf = workspace.getLeftLeaf(true);
			await leaf.setViewState({ type: VIEW_TYPE, active: true });
		}

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
