const MAX_RESULTS = 10
const PRIVATE_KEY = "61e7b313d0587f773e79c19a6f45f3bb87faefe4"
const PUBLIC_KEY = "3647aedabf4f5df121b4493d6c689da2"
const API_BASE_URL = 'http://gateway.marvel.com/v1/public/'
const TOP_CHARACTERS_IDS = ['1009220', '1009351', '1009368', '1009189', '1009664', '1009610', '1009718', '1009262', '1009215']

function readCharacter(id, callback) {
  $.getJSON(getReadCharactersURL(id))
    .done(response => callback(response.data.results[0]))
    .fail(error => processRequestError(error))
}

function getReadCharactersURL(id) {
  return API_BASE_URL + 'characters/' + id + '?' + getHash()
}

function readCharacterByName(name, callback) {
  $.getJSON(getReadCharacterByNameURL(name))
    .done(response => callback(response.data.results[0]))
    .fail(error => processRequestError(error))
}

function getReadCharacterByNameURL(name) {
  return API_BASE_URL + 'characters?name=' + name + '&' + getHash()
}

function listCharacters(offset, callback) {
  $.getJSON(getListCharactersURL(), {
    limit: MAX_RESULTS,
    offset: offset
  }).done(response => callback(response.data.results))
    .fail(error => processRequestError(error))
}

function getListCharactersURL() {
  return API_BASE_URL + 'characters?' + getHash()
}

function listTopCharacters(callback) {
  let characters = []
  TOP_CHARACTERS_IDS.forEach((id) => {
    readCharacter(id, (character) => {
      characters.push(character)
      // We call the callback only when all top chars finished reading
      if (characters.length == TOP_CHARACTERS_IDS.length) {
        callback(characters)
      }
    })
  })
}

function readRandomCharacter(callback) {
  let offset = Math.floor(Math.random() * 1000)
  listCharacters(offset, (characters) => {
    let index = Math.floor(Math.random() * characters.length)
    callback(characters[index])
  })
}

function listComicsImage(comic, callback) {
  $.getJSON(readComicURL(comic))
    .done((response) => {
      let item = response.data.results[0]
      callback({
        item: item,
        image: item.thumbnail.path + '.' + item.thumbnail.extension
      })
    })
    .fail(error => processRequestError(error))
}

function readComicURL(comic) {
  return comic.resourceURI + '?' + getHash()
}

function processRequestError(error) {
  console.log(error)
}

function getHash() {
  let timestamp = new Date().getTime()
  let md5 = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString()
  return "ts=" + timestamp + "&apikey=" + PUBLIC_KEY + "&hash=" + md5
}
