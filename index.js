// Show All function
function showAll(x, y) {
    map.flyTo([x, y], 11)
}

// Fly to the coordinates
function fly(x, y, zoom) {
    map.flyTo([x, y], zoom);
}

// Object with id's of markers
let markersId = {};


// Show places on the map
function showPlaces() {

    let newDiv = '';

    for (let i = 0; i < markers.objects.length; i++) {

        markersId[i] = L.marker([markers.objects[i].x, markers.objects[i].y], {
            icon: defaultIcon
        }).addTo(map).bindPopup(`
        ${markers.objects[i].image ? '<div class="bubble-1"><img src="' + markers.objects[i].image + '"/></div>' : ''}
        <div class="bubble-2">${markers.objects[i].name}</div>
        <div class="bubble-adress">${markers.objects[i].adress}</div>
        <div class="bubble-3">${markers.objects[i].text}</div>
        ${markers.objects[i].link ? '<div class="bubble-link"><a href="' + markers.objects[i].link + '" target="_blank">' + markers.objects[i].link + '</a></div>' : ''}
        `);

        newDiv = document.createElement('div');
        newDiv.className = 'el';
        newDiv.id = markers.objects[i].id

        if (window.location.hash === '#' + markers.objects[i].id) {
            newDiv.classList.add('elSelected');
            fly(markers.objects[i].x, markers.objects[i].y, 16);
            markersId[i].openPopup();
            clearBackgrounds();
            document.getElementsByClassName('left')[0].classList.toggle('noMobile');
        }

        document.getElementById('places').appendChild(newDiv);

        newDiv.innerHTML = `
        <div class="listLeft">
        ${markers.objects[i].new ? '<div class="newDot" title="Новинка!"></div>' : ''} <b>${markers.objects[i].name}</b> ${markers.objects[i].percent}
            <div class="elHidden" style="display: none">${markers.objects[i].synonyms}</div>
        </div>
        <div class="listLeft-2">
        ${markers.objects[i].adress}
        </div>
        <div class="arrow"><img src="/img/arrow-point-to-right.svg" height="15" width="15"/></div>
        `;
    }
}

let el = document.getElementsByClassName('el');
let elHidden = document.getElementsByClassName('elHidden');
let tagsEl = document.getElementsByClassName('tags-el');

// Sort places
function sortPlaces(what) {
    hideAllPlaces(true)
    hideAllTags(true)
    for (let i = 0; i < el.length; i++) {
        if (elHidden[i].innerText.includes(what) || el[i].innerText.includes(what)) {
            el[i].style.display = 'block';
        }
    }

    if (document.getElementById('search').value !== '') {
        document.getElementById('clearSearch').style.display = 'block'
        document.getElementById('tags-0').classList.remove('tags-el-active');
    } else {
        document.getElementById('clearSearch').style.display = 'none'
        document.getElementById('tags-0').classList.add('tags-el-active');
    }
}

// Hide all places
function hideAllPlaces(hide) {
    for (let i = 0; i < el.length; i++) {
        if (hide) {
            el[i].style.display = 'none';
        } else {
            el[i].style.display = 'block';
        }
    }
}

// Hide all tags
function hideAllTags(hide) {
    for (let i = 0; i < tagsEl.length; i++) {
        if (hide) {
            tagsEl[i].classList.remove('tags-el-active');
        }
    }
}

// Sort and Select
function sortAndSelect(thisEl) {
    document.getElementById('search').value = thisEl.textContent.toLowerCase();
    sortPlaces(thisEl.textContent.toLowerCase());
    hideAllTags(true);
    thisEl.classList.add('tags-el-active');
}

// Add action for clicks on the menu
function addEventsToPlaces() {
    for (let i = 0; i < markers.objects.length; i++) {
        document.getElementsByClassName('el')[i].onclick = function () {
            fly(markers.objects[i].x, markers.objects[i].y, 16);
            markersId[i].openPopup();
            clearBackgrounds();
            document.getElementsByClassName('left')[0].classList.toggle('noMobile');
        }
    }
}

// Modal window
function littleModal() {
    const tagsElHidden = document.getElementsByClassName('tags-el-hidden');
    for (let i = 0; i < tagsElHidden.length; i++) {
        tagsElHidden[i].style.display = 'inline-block';
    }
    document.getElementById('tags-plus').style.display = 'none';
    document.getElementById('leftCenter').style.top = '205px';
}

// Clean background of all elements in the menu. If popup is open, then show background of it
function clearBackgrounds() {
    for (let i = 0; i < el.length; i++) {
        if (markersId[i].isPopupOpen()) {
            el[i].classList.add('elSelected');
        } else {
            el[i].classList.remove('elSelected');
        }
    }
}
// With any action on the map, we cause the background of the elements in the menu-list to be cleared
document.getElementById('map').onclick = function () {
    clearBackgrounds();
};

// Where I Am?

// Counting the number of clicks on Where I am btn
let whereIamCount = 0;
// Here we put the coordinates of the user's location
let whereIamLatLng;

function whereIAm() {
    document.getElementsByClassName('left')[0].classList.toggle('noMobile');
    if (whereIamCount === 0) {
        map.locate({
            setView: true,
            maxZoom: 16
        });

        function onLocationFound(e) {
            var radius = e.accuracy;

            whereIamLatLng = e.latlng;

            L.marker(e.latlng, {
                icon: orangeIcon
            }).addTo(map).bindPopup("You are no further than " + radius + " meters from this point").openPopup();

            // L.circle(e.latlng, radius).addTo(map);

            whereIamCount = whereIamCount + 1;
        }

        function onLocationError(e) {
            alert('Sorry, we could not find you.');
        }
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
    } else {
        fly(whereIamLatLng.lat, whereIamLatLng.lng, 12);
    }
}

// Show window
function showWindow(show) {
    const window = document.getElementById('showWindow');
    if (show) {
        window.innerHTML = `
        <div class="showWindow">
            <div class="showWindow-0" onclick="showWindow(false)">
            </div>
            <div class="showWindowClose" onclick="showWindow(false)">
            &times;
            </div>
            <div class="showWindow-1">
                <div class="showWindow-1-0">
                <h2>How to get a discount</h2>
                <p>You can post here the process of how employees of your company can get discounts.</p>
                <button class="btn" onclick="showWindow(false)">Got it!</button>
                </div>
            </div>
        </div>
        `
    } else {
        window.innerHTML = ''
    }

}