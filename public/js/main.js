var map, myLat, myLong;


function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7608, lng: -111.8910},
        zoom: 11
        }); }





$(document).ready(function(){

//submit button function, get's user input
$("#button").click(function(){
   var city=$("#cityName").val();
  

//Google Json Request
  var url="https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyA5BlJo30YYd9DFQboFKdCX5iBn6GKPHyM";
    $.getJSON(url, function(json){
        // console.log(json.results[0].geometry.location);
        var myLat = json.results[0].geometry.location.lat;
        var myLong = json.results[0].geometry.location.lng;

        var userLocation = new google.maps.LatLng(myLat, myLong);
        var map = new google.maps.Map($('#map')[0], {
                  center: userLocation,
                  zoom: 12,


  });

  // console.log(json.results[0]);
  var myLat = json.results[0].geometry.location.lat;
  var myLong = json.results[0].geometry.location.lng;



//FourSquare API Request
  var fourSquareUrl = "https://api.foursquare.com/v2/venues/search?intent=browse&near="+myLat+","+myLong+"&radius=5000&categoryId=4d4b7105d754a06374d81259&query=Coffee&client_id=ITCEQQH3TV4ARRVUCNLK1P4TW1XOM3S1RKIZVPHFY452HFQO&client_secret=SOHNSC0TT4XBM31HVZR4FT13M5JLUONTWWSXE3INES5Y3LUO&v=20130307";

$.getJSON(fourSquareUrl, function(data){
        $.each(data.response.venues, function(i,venues){


           content =
                 '<article class="card shopInfo">' + 
                  // '<div class="card-block>'+

                   '<h4 class= " card-title shopName">' + venues.name+ 
                   '</h4>'  +venues.location.formattedAddress+ 
                       '</br>'+ venues.url+ 
                       '</br>' + venues.contact.formattedPhone+ 
                       '</br>'+   
                       '<p class="checkins">'  + "Checkins Counted = "+ venues.stats.checkinsCount+
                 '</p>'+ 
                 // '</div>' +
                 '</article>';


            $(content).appendTo("#names");
     
         var infowindow = new google.maps.InfoWindow({ });
            
            var i;
            for (i = 0; i < 20; i++) {
                     var coffeeShopCoords = data.response.venues[i].location;
                     var venueName = data.response.venues[i].name;
                     var latLng = new google.maps.LatLng(coffeeShopCoords);
                     var marker = new google.maps.Marker({
                       name:   data.response.venues[i].name,
                       position: latLng,
                       map: map
                     });
                     console.log(venueName);
                     google.maps.event.addListener(marker, 'mouseover', function(){
                        infowindow.setContent(this.name);
                        infowindow.open(map, this);
                    });
                     google.maps.event.addListener(marker,  'mouseout', function(){
                        infowindow.close(map, this);
                    });
                     
                    }
     //end brackets
            });
    });  });
}); });