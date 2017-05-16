var map, myLat, myLong;


function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 64.8377778, lng: -147.71638889999997},
        zoom: 11
        }); }





$(document).ready(function(){

//submit button function, get's user input
$("#button").click(function(){
    var city=$("#cityName").val();

//Google Json Request
  var url="https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyA5BlJo30YYd9DFQboFKdCX5iBn6GKPHyM";
    $.getJSON(url, function(json){
        console.log(json.results[0].geometry.location);
        var myLat = json.results[0].geometry.location.lat;
        var myLong = json.results[0].geometry.location.lng;

        console.log(myLat);
        console.log(myLong)


        var userLocation = new google.maps.LatLng(myLat, myLong);
        var map = new google.maps.Map($('#map')[0], {
                  center: userLocation,
                  zoom: 12,


  });

  console.log(json.results[0]);
  var myLat = json.results[0].geometry.location.lat;
  var myLong = json.results[0].geometry.location.lng;



//FourSquare API Request
  var fourSquareUrl = "https://api.foursquare.com/v2/venues/search?intent=browse&near="+myLat+","+myLong+"&radius=5000&categoryId=4d4b7105d754a06374d81259&query=Coffee&client_id=ITCEQQH3TV4ARRVUCNLK1P4TW1XOM3S1RKIZVPHFY452HFQO&client_secret=SOHNSC0TT4XBM31HVZR4FT13M5JLUONTWWSXE3INES5Y3LUO&v=20130307";

$.getJSON(fourSquareUrl, function(data){
        $.each(data.response.venues, function(i,venues){


             content = '<p class="shopInfo">' + venues.name +'</br>'+venues.location.formattedAddress+ '</br>'+
             venues.url+ '</br>' + venues.contact.formattedPhone+ '</br>'+ "Checkins Counted= "+ venues.stats.checkinsCount+  '</p>';
            $(content).appendTo("#names");
          //  console.log(data.response);


            var i;
            for (i = 0; i < 20; i++) {
                     var coffeeShopCoords = data.response.venues[i].location;
                     var latLng = new google.maps.LatLng(coffeeShopCoords);
                     var marker = new google.maps.Marker({
                       position: latLng,
                       map: map
                     });
                   }

        console.log(coffeeShopCoords);

            //coffeeShop= json.results[0].geometry.location;
            //console.log(coffeeShop);
            });
    });  });
}); });
