import { App, Editor, FuzzySuggestModal, Notice } from "obsidian";
import { ALL_WIDGETS } from "./util/constants";

interface Widget {
	title: string;
	markdown: string;
}

export default class WidgetsCommandModal extends FuzzySuggestModal<Widget> {
	editor: Editor;

	constructor(app: App, editor: Editor) {
		super(app);

		this.editor = editor;
	}

	getItems(): Widget[] {
		return ALL_WIDGETS;
	}

	getItemText(widget: Widget): string {
		return widget.title;
	}

	onChooseItem(widget: Widget, evt: MouseEvent | KeyboardEvent) {
		new Notice(`Added ${widget.title} widget`);

		this.editor.replaceRange(widget.markdown, this.editor.getCursor());
	}
}
