import { createExtension } from "@cognigy/extension-tools";

/* import all nodes */
import { simpleTest } from "./nodes/simpleTest";
import { sayTest } from "./nodes/sayTest";
import { cxoneJsonDump, cxoneJsonDumpCxone, cxoneJsonDumpFallback } from "./nodes/cxoneJsonDump";

export default createExtension({
	nodes: [
		simpleTest,
		sayTest,
		cxoneJsonDump,
		cxoneJsonDumpCxone,
		cxoneJsonDumpFallback
	],

	connections: [],

	options: {
		label: "CXone Rich Content"
	}
});
