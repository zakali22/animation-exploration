import {slickCarousel} from "./carousel.js"
console.log(slickCarousel)

let map;

const data = {
    london: {
        location: "London, UK",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        image:
            "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
        lat: 51.513034,
        long: -0.138531,
        zoom: 6.7
    },
    dubai: {
        location: "Dubai, UAE",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        image:
            "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
        lat: 23.678835,
        long: 54.250205,
        zoom: 6.7
    },
    shanghai: {
        location: "Shanghai, China",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        image:
            "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
        lat: 31.206786,
        long: 121.772546,
        zoom: 6
    },
    paris: {
        location: "Paris, France",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        image:
            "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
        lat: 48.852170,
        long: 2.330039,
        zoom: 6.7
    },
    newyork: {
        location: "New York, USA",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        image:
            "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
        lat: 40.718566,
        long: -74.003987,
        zoom: 5
    },
    sydney: {
        location: "Sydney, Australia",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
        image:
            "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
        lat: -33.950198,
        long: 151.259302,
        zoom: 5
    },
};

function generateStyling(location) {
    return `
            <div class="location-info">
                <div class="location-info__title"><h2>${data[location].location}</h2></div>
                <div class="location-info__content">
                <div class="location-info__text">
                    <p>${data[location].description}</p>
                </div>
                
                <div class="location-info__image">
                    <img src="${data[location].image}" alt="profile" />
                </div>
                </div>
            </div>`;
}

function getLocation(location){
    return [generateStyling(location), data[location].lat, data[location].long, data[location].zoom]
}

function getLatLong(location){
    return [data[location].lat, data[location].long]
}

function initMap() {
    console.log("Loading")
    var locations = [
        [...getLocation("london")],
        [...getLocation("dubai")],
        [...getLocation("shanghai")],
        [...getLocation("paris")],
        [...getLocation("newyork")],
        [...getLocation("sydney")],
    ];

    map = new google.maps.Map(document.getElementById("map"), {
        mapId: "5d2d528a7de1b74d",
        // center: { lat: 35.505257, lng: -8.205837 },
        center: {lat: 23.678835, lng: 54.250205},
        // zoom: 2.5,
        zoom: 6.7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        minZoom: 2.5,
        maxZoom: 15,
    });

    document.querySelectorAll('.location-buttons button').forEach(button => {
        google.maps.event.addDomListener(button, 'click', function () {
            map.setZoom(data[button.getAttribute('id')].zoom);
            map.panTo(new google.maps.LatLng(...getLatLong(button.getAttribute('id'))));
        });    
    })


    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    const parser = new DOMParser();

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: `data:image/svg+xml,%3Csvg width='30px' height='30px' viewBox='0 0 1500 1500' id='Layer_1' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.st0%7Bfill:%23ffda6b%7D.st1%7Bfill:%23262c38%7D.st2%7Bfill:none;stroke:%23262c38;stroke-width:60;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10%7D%3C/style%3E%3Ccircle class='st0' cx='750' cy='750' r='750'/%3E%3Cellipse class='st1' cx='748.3' cy='1046.3' rx='220.6' ry='297.2'/%3E%3Cellipse transform='rotate(-81.396 402.197 564.888)' class='st1' cx='402.2' cy='564.9' rx='155.6' ry='109.2'/%3E%3Cellipse transform='rotate(-8.604 1093.463 564.999)' class='st1' cx='1093.2' cy='564.9' rx='109.2' ry='155.6'/%3E%3Cpath class='st2' d='M320.9 223s69.7-96.7 174-28.6M1177.5 223s-69.7-96.7-174-28.6'/%3E%3C/svg%3E`,
        });

        google.maps.event.addListener(marker, "click", (function (marker, i) {
            return function () {
                // infowindow.setContent(locations[i][0]);
                // infowindow.open(map, marker);

                map.setZoom(6.7);
                map.panTo(marker.getPosition());
            };
        })(marker, i));
    }
}

export function changeMapLocation(location){
    map.panTo(new google.maps.LatLng(...getLatLong(location)));
}

window.initMap = initMap