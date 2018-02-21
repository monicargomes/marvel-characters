const PRIV_KEY = "f3dc6bee5afbcf48676136a33cda37a43f7c9d7e";
const PUBLIC_KEY = "ff0a364af171967c9afa65f48246de25";

function getUrl() {
  let ts = new Date().getTime();
  let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  let url = "?ts="+ts+"&apikey="+PUBLIC_KEY+"&hash="+hash;

  return url;
};

function getMarvelCharacters(limit, offset){
  let moreCharactersCarousel = createCarousel('More Characters');

  $.getJSON('http://gateway.marvel.com/v1/public/characters'+ getUrl(), {
    limit: limit,
    offset: offset
  })
  .done((response) => {
    let characters = response.data.results.filter((character) =>{
      let expr = /image_not_available/;
      return !expr.test(character.thumbnail.path)
    });

    console.log(characters);

    loadFeaturedCharacter(getRandomFeaturedCharacter(characters));
    loadCarousel(characters, moreCharactersCarousel);

    $('.spinner-icon').fadeOut();
    $('.container').fadeIn('slow');
  })
  .fail((err) => {
    console.log(err);
  })
}

function getMarvelTopCharacters(){
  let topCharactersCarousel = createCarousel('Top Characters');
  let topCharactersId = ['1009220', '1009351', '1009368', '1009189', '1009664', '1009610', '1009718', '1009262', '1009215'];

  topCharactersId.forEach((topCharacterId) =>{

    $.getJSON('http://gateway.marvel.com/v1/public/characters/'+topCharacterId+getUrl())
    .done((response) => {
      let topCharacter = response.data.results;

      loadCarousel(topCharacter, topCharactersCarousel);
    })
    .fail((err) => {
      console.log(err);
    });
  })
}

getMarvelTopCharacters();
getMarvelCharacters(10, 0);
