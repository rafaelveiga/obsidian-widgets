import React from "react";
import { Widget } from "src/Widget";
import { IWidgetConfigPersistedState } from "src/WidgetView";
import { HelperFunctions } from "src/types/HelperFunctions";
import Config from "./Config";
import { WorkspaceLeaf } from "obsidian";

const WidgetConfig = ({
	setConfig,
	getState,
	helperFunctions,
	leaf,
}: IWidgetConfigProps) => {
	const [state, setState] = React.useState<IWidgetConfigPersistedState>(
		getState()
	);

	return (
		<div className="WidgetConfig__container">
			{!state.isEditing && (
				<Widget
					settings={state}
					helperFunctions={helperFunctions}
					// @ts-ignore
					leafId={leaf.id}
				/>
			)}

			{state.isEditing && <Config state={state} setState={setState} />}

			<div className="WidgetConfig__actions">
				{state.isEditing && (
					<button
						onClick={() => {
							setConfig({
								...state,
								isEditing: false,
							});

							// This forces a rerender of the widget and gets the newest configs on workspace.json
							setState(getState());
						}}
					>
						Save
					</button>
				)}

				{!state.isEditing && (
					<button
						onClick={() => {
							setConfig({
								...state,
								isEditing: true,
							});

							// This forces a rerender of the widget and gets the newest configs on workspace.json
							setState(getState());
						}}
					>
						Edit
					</button>
				)}
			</div>
		</div>
	);
};

interface IWidgetConfigProps {
	setConfig: (state: IWidgetConfigPersistedState) => void;
	getState: () => IWidgetConfigPersistedState;
	helperFunctions: HelperFunctions;
	leaf: WorkspaceLeaf;
}

export default WidgetConfig;
