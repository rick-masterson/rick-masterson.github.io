 function generateCard(personInfo) {
     var template = $("#templateDiv").html();
     template = template.replace("@@IMGURL@@", personInfo.profilePhoto);
     template = template.replace("@@LOCATION@@", local);
     return template;
 }

 function testGenerateCard() {
     var sampleData = {
         cityState: local,
         profilePhoto: map,

     };
     var html = generateCard(sampleData);
     $("#cards").append(html);
     initMap();
     console.log(map);
 }





 var local = "";
 var x = 0;
 var y = 0;

 function done(reply) {
     lata = reply.results["0"].geometry.location.lat;
     long = reply.results["0"].geometry.location.lng;
     local = reply.results["0"].formatted_address;
     console.log(local);
     console.log(long);
     console.log(lata);

     x = lata;
     y = long;
     initMap(x, y);
     testGenerateCard(local);
 }


 function lookup() {
     var zip = $("#zip").val();
     var zipcode = ("https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&&key=AIzaSyCNRRK2Bi38Qu18i6J6D0QQ22W533WS7mw")
     var pull = {
         url: (zipcode),
         success: done
     };

     $.ajax(pull);
 };

 function submit() {

     lookup();
     initMap();
 }

 var map;

 function initMap() {

     map = new google.maps.Map(document.getElementById('map'), {
         center: {
             lat: x,
             lng: y
         },
         zoom: 8

     });
     marker = new google.maps.Marker({
         map: map,
         draggable: false,
         animation: google.maps.Animation.DROP,
         position: {
             lat: x,
             lng: y
         }
     });
     map ++;

 }
