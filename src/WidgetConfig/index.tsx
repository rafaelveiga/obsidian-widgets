import React from "react";
import { Widget } from "src/Widget";
import { IWidgetConfigPersistedState } from "src/WidgetView";
import { HelperFunctions } from "src/types/HelperFunctions";
import Config from "./Config";

const WidgetConfig = ({
	setConfig,
	getState,
	helperFunctions,
}: IWidgetConfigProps) => {
	const [state, setState] = React.useState<IWidgetConfigPersistedState>(
		getState()
	);

	return (
		<>
			{state.type && (
				<Widget settings={state} helperFunctions={helperFunctions} />
			)}

			{!state.type && <Config state={state} setState={setState} />}
			<>
				<hr />
				<button
					onClick={() => {
						setConfig(state);
					}}
				>
					Save
				</button>
			</>
		</>
	);
};

interface IWidgetConfigProps {
	setConfig: (state: IWidgetConfigPersistedState) => void;
	getState: () => IWidgetConfigPersistedState;
	helperFunctions: HelperFunctions;
}

export default WidgetConfig;
