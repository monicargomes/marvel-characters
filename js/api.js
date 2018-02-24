
let offset = 0;
let limit = 10;

getMarvelTopCharacters();
getMarvelCharacters(limit, offset);

function getMarvelCharacters(limit, offset){

  $.getJSON('http://gateway.marvel.com/v1/public/characters?'+ getUrl(), {
    limit: limit,
    offset: offset
  })
  .done((response) => {
    let characters = response.data.results.filter((character) =>{
      let expr = /image_not_available/;
      return !expr.test(character.thumbnail.path)
    });

    console.log(characters);

    if (offset == 0) {
      var moreCharactersCarousel = createCarousel('More Characters');
      loadFeaturedCharacter(getRandomFeaturedCharacter(characters));
      $('.spinner-icon').fadeOut();
      $('.container').fadeIn('slow');
    }

    loadCarousel(characters, moreCharactersCarousel);

  })
  .fail((err) => {
    console.log(err);
  })
}

function getMarvelTopCharacters(){
  let topCharactersCarousel = createCarousel('Top Characters');
  let topCharactersId = ['1009220', '1009351', '1009368', '1009189', '1009664', '1009610', '1009718', '1009262', '1009215'];

  topCharactersId.forEach((topCharacterId) =>{

    $.getJSON('http://gateway.marvel.com/v1/public/characters/'+topCharacterId+'?'+getUrl())
    .done((response) => {
      let topCharacter = response.data.results;

      loadCarousel(topCharacter, topCharactersCarousel);
    })
    .fail((err) => {
      console.log(err);
    });
  })
}
