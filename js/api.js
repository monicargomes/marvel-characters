function listCharacters() {
  return characters
}

function readFeaturedCharacter() {
  let index = Math.floor(Math.random() * characters.length);
  return characters[index]
}
