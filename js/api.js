function listCharacters() {
  var PRIV_KEY = "f3dc6bee5afbcf48676136a33cda37a43f7c9d7e";
  var PUBLIC_KEY = "ff0a364af171967c9afa65f48246de25";
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var url = "http://gateway.marvel.com/v1/public/characters?ts="+ts+"&apikey="+PUBLIC_KEY+"&hash="+hash;

  console.log(hash);

  var xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.addEventListener("load", function(){
    var received = JSON.parse(this.responseText);

    var characters = received.data.results
    console.log(received);



    loadFeaturedCharacter(readFeaturedCharacter(characters));

    loadItems(characters);
  });

  xhr.send();


}

listCharacters();
