import { createExtension } from "@cognigy/extension-tools";

/* import all nodes */
import { simpleTest } from "./nodes/simpleTest";

export default createExtension({
	nodes: [
		simpleTest
	],

	connections: []
});
