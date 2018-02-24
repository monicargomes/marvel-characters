function loadFeaturedCharacter(featuredCharacter) {
  let image = featuredCharacter.thumbnail.path+"/standard_fantastic."+featuredCharacter.thumbnail.extension;
  let name = featuredCharacter.name;
  let description = featuredCharacter.description;
  let comics = featuredCharacter.comics.items;
  let links = featuredCharacter.urls;

  if (description == '') {
    description = 'Sorry, there is no description for this character.'
  }

  $('.large-img').attr('src', image);
  $('.character-name').text(name);
  $('.character-description').text(description);
  $('.character-comics').empty();
  $('.character-links').empty();

  listComics(comics);
  listLinks(links);
}

function listComics(comics) {

  if (comics.length == 0) {
    return $('<li>').text('Sorry, there is no list of comics for this character.').appendTo('.character-comics')
  }

  comics.forEach((comic) =>{
    let url = comic.resourceURI;

    $.getJSON(url+'?'+getHash())
    .done((response) => {
      let item = response.data.results[0];
      let image = item.thumbnail.path+'.'+item.thumbnail.extension;

      $('<img>').attr('src', image).addClass('character-comic-img').appendTo($('<li>')).appendTo('.character-comics');
    })
    .fail((err) => {
      console.log(err);
    });
  })

}

function listLinks(links) {

  links.forEach((link) =>{
    let title = link.type;
    let path = link.url;
    $('<a>').text(title).attr('href', path).appendTo($('<li>')).appendTo('.character-links')
  })

}
