let characterCarousel
let offset = 0

readRandomCharacter(random => loadFeaturedCharacter(random))
loadTopCharactersCarousel()
loadCharactersCarousel()

function loadCharactersCarousel(offset) {
  listCharacters(offset, (characters) => {
    characterCarousel = createCarousel('More Characters', filterCharacterWithoutImages(characters), 'default', loadMoreItems)
    hideLoading()
  })
}

function loadMoreItems() {
  offset += 10
  console.log('called');
  listCharacters(offset, characters => loadCarousel(filterCharacterWithoutImages(characters), characterCarousel, 'default'))
}

function loadTopCharactersCarousel() {
  listTopCharacters(characters => createCarousel('Top Characters', characters, 'big'))
}

function hideLoading() {
  $('.spinner-icon').fadeOut()
  $('.container').fadeIn('slow')
}

function filterCharacterWithoutImages(characters) {
  return characters.filter((character) => {
    let expr = /image_not_available/
    return !expr.test(character.thumbnail.path)
  })
}
