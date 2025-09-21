import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import maplibregl from 'maplibre-gl';
import { loadData } from './getData';
import './style.css';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
    container: 'map',
    // style: 'https://tiles.openfreemap.org/styles/liberty',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json',
    center: [0.45, 51.47],
    zoom: 4,
    bearing: 0,
    pitch: 30,
});

const data = await loadData();
console.log(data);

const hexagonPlot = new HexagonLayer({
    id: 'HexagonLayer',
    // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json',
    data,
    gpuAggregation: true,
    extruded: true,
    getPosition: (d) => {
        return [5+ 0.125 * Math.random(), 5+ 0.125 * Math.random()];
    },
    colorRange: [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78],
    ],
    getColorWeight: (d) => d.temperature,
    getElevationWeight: (d) => d.temperature,
    elevationScale: 4,
    radius: 200,
    pickable: true,
});

// const deckOverlay = new DeckOverlay({
//     interleaved: true,
//     layers: [hexagonPlot],
// });

map.on('load', () => {
    const deckOverlay = new DeckOverlay({
        getTooltip: ({ object }) => object && `Count: ${object.elevationValue}`,
        layers: [hexagonPlot],
        interleaved: true,
    });
    map.addControl(deckOverlay);
    // deckOverlay.setMap(map); // ← this is the key
    map.addControl(new maplibregl.NavigationControl());
    map.flyTo({
        center: [5+ 0.125 * Math.random(), 5+ 0.125 * Math.random()],
        zoom: 10,
    });
});
// map.addControl(deckOverlay);
// map.addControl(new maplibregl.NavigationControl());
