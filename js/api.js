var PRIV_KEY = "f3dc6bee5afbcf48676136a33cda37a43f7c9d7e";
var PUBLIC_KEY = "ff0a364af171967c9afa65f48246de25";


function getMarvelResponse(type, limit, offset) {
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var url = "http://gateway.marvel.com/v1/public/"+type+"?ts="+ts+"&apikey="+PUBLIC_KEY+"&hash="+hash;


  $.getJSON(url, {
    limit: limit,
    offset: offset
    })
    .done(function(response) {
      var characters = response.data.results.filter((character) =>{
        var expr = /image_not_available/;
        return !expr.test(character.thumbnail.path)
      });

      console.log(characters);

      loadFeaturedCharacter(readFeaturedCharacter(characters));

      loadItems(characters);

    })
    .fail(function(err){
      console.log(err);
    });


};

getMarvelResponse("characters", 50, 0);
