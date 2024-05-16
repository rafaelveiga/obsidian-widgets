import React from "react";
import { ALL_WIDGETS } from "../util/constants";
import { IWidgetConfigPersistedState } from "src/WidgetView";
import { WidgetType } from "src/types/WidgetTypes";
import { QuoteSettings } from "src/Quote";
import { CounterSettings } from "src/Counter";
import { ClockSettings } from "src/Clock";
import { CountdownSettings } from "src/Countdown";

const Config = ({ setState, state }: IConfigProps) => {
	return (
		<div>
			<h1>Widget View Config</h1>
			<label>Select the Widget Type</label>
			<div className="WidgetConfig__input-group">
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
			</div>

			{state?.type === "quote" && (
				<>
					<div className="WidgetConfig__input-group">
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
					</div>
					<div className="WidgetConfig__input-group">
						<label>Author</label>
						<br />
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
				</>
			)}

			{state.type === "counter" && (
				<div className="WidgetConfig__input-group">
					<label>Counter Label</label>
					<br />
					<input
						type="text"
						value={(state as CounterSettings).text}
						onChange={(ev) => {
							const text = ev.target.value;

							setState({
								...state,
								text,
							});
						}}
					/>
				</div>
			)}

			{state.type === "clock" && (
				<div className="WidgetConfig__input-group">
					<label>Time Format</label>
					<br />
					<select
						value={(state as ClockSettings).format}
						onChange={(ev) => {
							const format = ev.target.value as "12hr" | "24hr";

							setState({
								...state,
								format,
							});
						}}
					>
						<option value="12hr">12 Hour</option>
						<option value="24hr">24 Hour</option>
					</select>
				</div>
			)}

			{state.type === "countdown" && (
				<>
					<div className="WidgetConfig__input-group">
						<label>Date</label>
						<br />
						<input
							type="datetime-local"
							value={(state as CountdownSettings).date}
							onChange={(ev) => {
								const date = ev.target.value;

								setState({
									...state,
									date,
								});
							}}
						/>
					</div>

					<div className="WidgetConfig__input-group">
						<label>To</label>
						<br />
						<input
							type="text"
							value={(state as CountdownSettings).to}
							onChange={(ev) => {
								const to = ev.target.value;

								setState({
									...state,
									to,
								});
							}}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default Config;

interface IConfigProps {
	setState: (state: IWidgetConfigPersistedState) => void;
	state: IWidgetConfigPersistedState;
}
