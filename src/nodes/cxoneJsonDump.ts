import { createNodeDescriptor, INodeFunctionBaseParams } from "@cognigy/extension-tools";

/**
 * CXone JSON Dump Node
 *
 * Allows power users to send raw CXone-compatible rich content JSON directly.
 * Automatically detects channel type and routes to appropriate output path.
 *
 * - CXone channel: Sends rich content via cxone output path
 * - Other channels: Routes to fallback output path with fallback text in context
 */

export interface ICxoneJsonDumpParams extends INodeFunctionBaseParams {
	config: {
		jsonSchema: any;
		fallbackText: string;
	};
}

export const cxoneJsonDump = createNodeDescriptor({
	type: "cxoneJsonDump",
	defaultLabel: "CXone JSON Dump",

	fields: [
		{
			key: "jsonSchema",
			label: "CXone Message JSON",
			type: "json",
			description: "Raw CXone message schema (paste from documentation)",
			defaultValue: {
				"type": "TEXT",
				"fallbackText": "Text sent if rich message not available",
				"payload": {
					"text": "Your message here",
					"mimeType": "text/plain"
				}
			}
		},
		{
			key: "fallbackText",
			label: "Fallback Text",
			type: "cognigyText",
			description: "Plain text sent to non-CXone channels",
			defaultValue: "Message content not available on this channel"
		}
	],

	dependencies: {
		children: ["cxoneJsonDumpCxone", "cxoneJsonDumpFallback"]
	},

	function: async ({ cognigy, config, childConfigs }: ICxoneJsonDumpParams) => {
		const { api, input } = cognigy;
		const { jsonSchema, fallbackText } = config;

		// Detect if current channel is CXone
		const isCXone = input.endpointType === "niceCXOne";

		if (isCXone) {
			// Build CXone output structure
			const outputData = {
				"type": "custom",
				"_cognigy": {
					"_niceCXOne": {
						"json": {
							"text": fallbackText || "",
							"uiComponent": {
								"dfoMessage": {
									"messageContent": jsonSchema
								}
							}
						}
					}
				}
			};

			// Send rich content to CXone
			api.output(null, outputData);

			// Route to CXone output path
			const cxoneChild = childConfigs.find(child => child.type === "cxoneJsonDumpCxone");
			if (!cxoneChild) {
				throw new Error("Unable to find 'cxoneJsonDumpCxone' child. Seems it's not attached.");
			}
			api.setNextNode(cxoneChild.id);

		} else {
			// Route to fallback output path (transparent pass-through)
			const fallbackChild = childConfigs.find(child => child.type === "cxoneJsonDumpFallback");
			if (!fallbackChild) {
				throw new Error("Unable to find 'cxoneJsonDumpFallback' child. Seems it's not attached.");
			}
			api.setNextNode(fallbackChild.id);
		}
	}
});

/* Child node definitions for output paths */

export const cxoneJsonDumpCxone = createNodeDescriptor({
	type: "cxoneJsonDumpCxone",
	parentType: "cxoneJsonDump",
	defaultLabel: "CXone Channel",

	appearance: {
		color: '#2ecc71',
		textColor: 'white',
		variant: 'mini'
	},

	constraints: {
		editable: false,
		deletable: true,
		collapsable: true,
		creatable: true,
		movable: false,
		placement: {
			predecessor: {
				whitelist: []
			}
		}
	}
});

export const cxoneJsonDumpFallback = createNodeDescriptor({
	type: "cxoneJsonDumpFallback",
	parentType: "cxoneJsonDump",
	defaultLabel: "Other Channel",

	appearance: {
		color: '#e74c3c',
		textColor: 'white',
		variant: 'mini'
	},

	constraints: {
		editable: false,
		deletable: true,
		collapsable: true,
		creatable: true,
		movable: false,
		placement: {
			predecessor: {
				whitelist: []
			}
		}
	}
});
