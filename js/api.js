const PRIV_KEY = "f3dc6bee5afbcf48676136a33cda37a43f7c9d7e";
const PUBLIC_KEY = "ff0a364af171967c9afa65f48246de25";


function getMarvelResponse(limit, offset) {
  let ts = new Date().getTime();
  let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  let url = "http://gateway.marvel.com/v1/public/characters?ts="+ts+"&apikey="+PUBLIC_KEY+"&hash="+hash;
  let topCharactersId = ['1009220', '1009351', '1009368', '1009189', '1009664', '1009610', '1009718', '1009262', '1009215'];

  $.getJSON(url, {
    limit: limit,
    offset: offset
  })
  .done((response) => {
    let characters = response.data.results.filter((character) =>{
      let expr = /image_not_available/;
      return !expr.test(character.thumbnail.path)
    });

    loadFeaturedCharacter(getRandomFeaturedCharacter(characters));
    loadCarousel(characters, '#more-inner-container');
    animateScrollButtons('#more-outer-container', '#more-icon-right', '#more-icon-left');

    topCharactersId.forEach((topCharacterId) =>{
      url = "http://gateway.marvel.com/v1/public/characters/"+topCharacterId+"?ts="+ts+"&apikey="+PUBLIC_KEY+"&hash="+hash;

      $.getJSON(url)
      .done((response) => {
        let topCharacter = response.data.results;

        loadCarousel(topCharacter, '#top-inner-container');
        animateScrollButtons('#top-outer-container', '#top-icon-right', '#top-icon-left');

        $('.spinner-icon').fadeOut();
        $('.container').fadeIn('slow');

      })
      .fail((err) => {
        console.log(err);
      });

    })

  })
  .fail((err) => {
    console.log(err);
  });

};

getMarvelResponse(50,0);
