// Standart View of Map
var map = L.map('map', {
    zoomControl: false
}).setView([44.657874, -63.567605], 13);

// Place zoom to the right
L.control.zoom({
    position: 'topright'
}).addTo(map);

// Function for rounded map changers at the bottom
function mapChange(link, attribution) {
    document.getElementById('copyright').innerHTML = `
    Maps by: ${attribution}
    `
    L.tileLayer(link, {
        // attribution: 'Maps by ' + attribution
    }).addTo(map);
}

// Markers style
var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [30, 30],
        shadowSize: [50, 64],
        iconAnchor: [15, 30],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -35]
    }
});
var defaultIcon = new LeafIcon({
    iconUrl: './img/marker.svg',
    // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
})

// Orange Marker Style
var orangeIcon = new LeafIcon({
    iconUrl: './img/marker2.svg',
    // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
})