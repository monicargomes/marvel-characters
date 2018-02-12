$(document).ready(loadFeaturedCharacter())

function loadFeaturedCharacter() {
    let featuredCharacter = readFeaturedCharacter();
    $('.large-img').attr('src', featuredCharacter.largeImg);
    $('.character-name').text(featuredCharacter.name);
    $('.character-description').text(featuredCharacter.description);
}
