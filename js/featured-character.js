function getRandomFeaturedCharacter(characters) {
  let index = Math.floor(Math.random() * characters.length);
  return characters[index]
}

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
    let title = comic.name;
    $('<li>').text(title).appendTo('.character-comics')
  })

}

function listLinks(urls) {

  urls.forEach((url) =>{
    let title = url.type;
    let path = url.url;
    $('<a>').text(title).attr('href', path).appendTo('.character-links')
  })

}
