import React from "react";
import { ALL_WIDGETS } from "../util/constants";
import { IWidgetConfigPersistedState } from "src/WidgetView";
import { WidgetType } from "src/types/WidgetTypes";
import { QuoteSettings } from "src/Quote";

const Config = ({ setState, state }: IConfigProps) => {
	return (
		<div>
			<h1>Widget View Config</h1>
			<label>Select the Widget Type</label>
			<br />
			<select
				value={state.type}
				onChange={(ev) => {
					const type = ev.target.value as WidgetType;

					setState({
						...state,
						type,
					});
				}}
			>
				{ALL_WIDGETS.map((widget) => (
					<option key={widget.slug} value={widget.slug}>
						{widget.title}
					</option>
				))}
			</select>

			<hr />

			{state?.type === "quote" && (
				<div>
					<label>Quote</label>
					<br />
					<input
						type="text"
						value={(state as QuoteSettings).quote}
						onChange={(ev) => {
							const quote = ev.target.value;

							setState({
								...state,
								quote,
							});
						}}
					/>
					<br />
					<label>Author</label>
					<input
						type="text"
						value={(state as QuoteSettings).author}
						onChange={(ev) => {
							const author = ev.target.value;

							setState({
								...state,
								author,
							});
						}}
					/>
				</div>
			)}

			<pre>{JSON.stringify(state, null, 2)}</pre>
		</div>
	);
};

export default Config;

interface IConfigProps {
	setState: (state: IWidgetConfigPersistedState) => void;
	state: IWidgetConfigPersistedState;
}
