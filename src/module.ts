import { createExtension } from "@cognigy/extension-tools";

/* import all nodes */
import { simpleTest } from "./nodes/simpleTest";
import { sayTest } from "./nodes/sayTest";
import { cxoneRichRaw, cxoneRichRawDefault, cxoneRichRawNotCxone } from "./nodes/cxoneRichRaw";

export default createExtension({
	nodes: [
		simpleTest,
		sayTest,
		cxoneRichRaw,
		cxoneRichRawDefault,
		cxoneRichRawNotCxone
	],

	connections: [],

	options: {
		label: "CXone Rich Content"
	}
});
