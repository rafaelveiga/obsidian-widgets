import * as React from "react";
import { WidgetType } from "src/types/WidgetTypes";

const Quote = ({ settings: { quote, author } }: QuoteProps) => {
	return (
		<div className="Quote_Container">
			<div className="Quote_Text">"{quote}"</div>
			<div className="Quote_Author">{author}</div>
		</div>
	);
};

export default Quote;

export interface QuoteSettings {
	type: WidgetType;
	quote: string;
	author: string;
}

interface QuoteProps {
	settings: QuoteSettings;
}
