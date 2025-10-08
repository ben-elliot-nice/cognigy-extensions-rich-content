import { createExtension } from "@cognigy/extension-tools";

/* import all nodes */
import { simpleTest } from "./nodes/simpleTest";
import { sayTest } from "./nodes/sayTest";

export default createExtension({
	nodes: [
		simpleTest,
		sayTest
	],

	connections: [],

	options: {
		label: "CXone Rich Content"
	}
});
