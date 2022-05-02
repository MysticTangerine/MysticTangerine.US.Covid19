mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    zoom: 4, // starting zoom
    center: [-100, 40] // starting center
    }
);

map.on('load', function loadingData() {
    map.addSource('covid', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.geojson'
    });

    map.addLayer({
        'id': 'covid-layer',
        'type': 'fill',
        'source': 'covid',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'],
                '#800026',   // stop_output_0
                10,          // stop_input_0
                '#BD0026',   // stop_output_1
                20,          // stop_input_1
                '#E31A1C',   // stop_output_2
                40,          // stop_input_2
                '#FC4E2A',   // stop_output_3
                60,         // stop_input_3
                '#FD8D3C',   // stop_output_4
                80,         // stop_input_4
                '#FEB24C',   // stop_output_5
                100,         // stop_input_5
                '#FED976',   // stop_output_6
                200,        // stop_input_6
                '#FFEDA0'    // stop_output_7
            ],
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.7,
        }
    });


    map.on('mousemove', ({point}) => {
        const state = map.queryRenderedFeatures(point, {
            layers: ['covid-layer']
        });
        document.getElementById('text-description').innerHTML = state.length ?
            `<h3>${state[0].properties.county}</h3><p><strong><em>${state[0].properties.rates}</strong> cases per death</em></p>` :
            `<p>Hover over a state!</p>`;
    });

});

const layers = [
    '0-9',
    '10-19',
    '20-39',
    '40-59',
    '60-79',
    '80-99',
    '100-199',
    '200 and more'
];
const colors = [
    '#80002670',
    '#BD002670',
    '#E31A1C70',
    '#FC4E2A70',
    '#FD8D3C70',
    '#FEB24C70',
    '#FED97670',
    '#FFEDA070'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>Covid Rates</b><br><br>";

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});