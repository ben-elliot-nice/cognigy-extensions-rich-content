import { createExtension } from "@cognigy/extension-tools";

/* import all nodes */
import { cxoneRichRaw, cxoneRichRawDefault, cxoneRichRawNotCxone } from "./nodes/cxoneRichRaw";

export default createExtension({
	nodes: [
		cxoneRichRaw,
		cxoneRichRawDefault,
		cxoneRichRawNotCxone
	],

	connections: [],

	options: {
		label: "CXone Rich Content"
	}
});
