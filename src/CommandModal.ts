import { App, Editor, FuzzySuggestModal, Notice } from "obsidian";

interface Widget {
	title: string;
	markdown: string;
}

const ALL_WIDGETS = [
	{
		title: "Clock",
		markdown: "```widgets\ntype: clock\n```\n",
	},
	{
		title: "Countdown",
		markdown:
			"```widgets\ntype: countdown\ndate: YYYY-MM-DD HH:MM:SS\nto:\n```\n",
	},
	{
		title: "Quote",
		markdown:
			"```widgets\ntype: quote\nquote: Lorem ipsum dolor sit amet\nauthor: Lorem Ipsum\n```\n",
	},
];

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
