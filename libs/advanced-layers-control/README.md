# Leaflet Advanced Layers Control Library

## Control Options
- `position` (string): Leaflet control position (e.g. `topright`).
- `collapsible` (boolean): Enable collapsing/expanding of the control.
- `collapsed` (boolean): Start the control collapsed when `true`.
- `title` (string): Optional control title.
- `color` (string): Accent color used by control buttons (any valid CSS color, e.g. `#d35400`, `rgb(0,120,200)`, `teal`).

## Layer Configuration
Each layer can now include a `visibleByDefault` property:
- `name` (string): Name of the layer.
- `layer` (Layer): The Leaflet layer instance.
- `opacityControl` (boolean): Enable an opacity slider for this layer.
- `removeBackgroundControl` (boolean): Enable a color picker to remove the background color.
- `visibleByDefault` (boolean): Set whether the layer should be added to the map by default.

## Example Usage

### Layer Initialization
```javascript
const layers = {
    "Base Layers": [
        { name: "Street Map", layer: L.tileLayer('url1'), visibleByDefault: true },
        { name: "Satellite Map", layer: L.tileLayer('url2'), visibleByDefault: false, opacityControl: true }
    ],
    "Overlays": [
        { name: "Heatmap", layer: L.imageOverlay('url3'), removeBackgroundControl: true, visibleByDefault: true }
    ]
};

const control = L.control.advancedLayers(layers, {
    collapsible: true,
    collapsed: true,
    position: 'topright',
    color: '#2f6f95',
}).addTo(map);
```