$(document).ready(loadFeaturedCharacter())

function loadFeaturedCharacter() {
    let featuredCharacter = readFeaturedCharacter();
    $('.large-img').attr('src', featuredCharacter.largeImg);
}
