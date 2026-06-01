# BPMN Editor Implementation

This document describes how the BPMN (Business Process Model and Notation) Editor is implemented using `@visuallyjs/browser-ui-react`, `@visuallyjs/browser-ui`, and `@visuallyjs/bpmn`.

## Components

The application is built using several core components from `@visuallyjs/browser-ui-react`:

### Core Layout
- **`DiagramProvider`**: Wraps the entire application to provide context and manage the state of the BPMN diagram.
- **`DiagramPaletteComponent`**: Displays a palette of BPMN elements (Tasks, Gateways, Events, Pools, Lanes, etc.) that users can drag onto the canvas.
- **`DiagramComponent`**: The main canvas area where the BPMN diagram is rendered.

### Canvas Enhancements
- **`ControlsComponent`**: Provides standard zoom and pan controls.
- **`ExportControlsComponent`**: Handles exporting the diagram to images.
- **`MiniviewComponent`**: Provides a navigation map of the entire diagram.

### Property Editor
- **`BpmnInspector`**: A custom inspector component (using `InspectorComponent` internally) for editing BPMN-specific properties like flow types and element labels.

## Configuration Options

### Diagram Options
The `DiagramComponent` is configured with a rich `diagramOptions` object:

- **`shapes`**: Uses `BPMN2_SHAPES` from `@visuallyjs/bpmn` to provide standard-compliant BPMN symbols.
- **`edges`**:
    - `connector`: `Orthogonal` with a small `cornerRadius` for standard BPMN flow lines.
    - `propertyMappings`: Uses `getBPMNFlowTypes()` for BPMN-specific edge behaviors.
- **`mediator`**: Contains extensive logic to handle BPMN-specific interactions:
    - **Pools and Lanes**: Custom logic for resizing, dropping elements into lanes, and managing lane hierarchy within pools.
    - **Constraints**: Restricts certain operations like rotation on BPMN elements and ensures valid parent-child relationships (e.g., elements must be dropped into Lanes or Groups).
- **`snapLines`**: Enabled for precise alignment of BPMN elements.

### Model Options
- **`beforeConnect`**: Prevents connections to/from structural elements like Pools and Lanes, ensuring edges only connect to functional BPMN elements.

## CSS Integration
- **VisuallyJS Core**: The core styles are included in `src/index.css` via `@import "@visuallyjs/browser-ui/css/visuallyjs.css";`.
- **App Styles**: Custom styles for the BPMN editor layout (palette, canvas, and inspector positioning) are imported from `bpmn.css`.
