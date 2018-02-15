function readFeaturedCharacter(characters) {
  let index = Math.floor(Math.random() * characters.length);
  return characters[index]
}

function loadFeaturedCharacter(featuredCharacter) {
    $('.large-img').attr('src', featuredCharacter.thumbnail.path+"/detail."+featuredCharacter.thumbnail.extension);
    $('.character-name').text(featuredCharacter.name);
    $('.character-description').text(featuredCharacter.description);
}
