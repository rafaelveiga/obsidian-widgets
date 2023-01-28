import * as React from "react";
import styled from "styled-components";

const Quote = ({ settings: { quote, author } }) => {
	return (
		<QuoteContainer>
			<QuoteText>"{quote}"</QuoteText>
			<Author>{author}</Author>
		</QuoteContainer>
	);
};

const QuoteContainer = styled.div`
	padding: 30px;
	text-align: center;

	background: var(--color-base-10);
	border: 1px solid var(--color-accent-1);
	border-radius: 15px;
`;

const QuoteText = styled.div`
	font-size: 20px;
	font-family: serif;

	font-style: italic !important; // overwriting obsidian default style
`;

const Author = styled.div`
	font-size: 12px;
	color: var(--text-muted);
`;

export default Quote;
