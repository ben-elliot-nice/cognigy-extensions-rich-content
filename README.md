# CXone Rich Content Extension

A Cognigy.AI extension for CXone rich content functionality.

## Nodes

### Simple Test Node
A simple test node that takes a text input and writes it to the context.

**Fields:**
- **Input Text**: Text to store in the context (supports CognigyScript)

**Output:**
Writes to `context.simpleTestOutput` with:
- `text`: The input text
- `timestamp`: ISO timestamp of execution
