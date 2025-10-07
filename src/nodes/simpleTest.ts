import { createNodeDescriptor, INodeFunctionBaseParams } from "@cognigy/extension-tools";

/**
 * Simple test node that takes a text input and writes it to the context
 */

export interface ISimpleTestParams extends INodeFunctionBaseParams {
	config: {
		inputText: string;
	};
}

export const simpleTest = createNodeDescriptor({
	type: "simpleTest",
	defaultLabel: "Simple Test Node",
	fields: [
		{
			key: "inputText",
			label: "Input Text",
			type: "cognigyText",
			defaultValue: "Hello from CXone Rich Content!",
			description: "Enter some text to store in context"
		}
	],
	preview: {
		type: "text",
		key: "inputText"
	},
	function: async ({ cognigy, config }: ISimpleTestParams) => {
		const { api, context } = cognigy;
		const { inputText } = config;

		// Write the input text to context
		context.simpleTestOutput = {
			text: inputText,
			timestamp: new Date().toISOString()
		};

		// Provide feedback
		api.output(`Text stored in context: ${inputText}`);
	}
});
