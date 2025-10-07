import { createNodeDescriptor, INodeFunctionBaseParams } from "@cognigy/extension-tools";

/**
 * Test node with a say field that outputs the configured say message
 */

export interface ISayTestParams extends INodeFunctionBaseParams {
	config: {
		sayConfig: any;
	};
}

export const sayTest = createNodeDescriptor({
	type: "sayTest",
	defaultLabel: "Say Test Node",
	fields: [
		{
			key: "sayConfig",
			type: "say",
			label: "Say Configuration",
			description: "Configure the output message using the full Say control"
		}
	],
	function: async ({ cognigy, config }: ISayTestParams) => {
		const { api } = cognigy;
		const { sayConfig } = config;

		// Output the configured say message
		if (sayConfig) {
			api.say(sayConfig);
		}
	}
});
