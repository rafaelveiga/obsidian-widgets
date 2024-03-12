import * as React from "react";

const Quote = ({ settings: { quote, author } }: QuoteProps) => {
	return (
		<div className="Quote_Container">
			<div className="Quote_Text">"{quote}"</div>
			<div className="Quote_Author">{author}</div>
		</div>
	);
};

export default Quote;

export interface QuoteProps {
	settings: QuoteSettings;
}

export interface QuoteSettings {
	type: "quote";
	quote: string;
	author: string;
}
