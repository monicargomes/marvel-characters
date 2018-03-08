const MAX_RESULTS = 10;
const PRIVATE_KEY = "f3dc6bee5afbcf48676136a33cda37a43f7c9d7e";
const PUBLIC_KEY = "ff0a364af171967c9afa65f48246de25";
const API_BASE_URL = 'https://gateway.marvel.com/v1/public/';
const TOP_CHARACTERS_IDS = ['1009220', '1009351', '1009368', '1009189', '1009664', '1009610', '1009718', '1009262', '1009215'];

function readCharacter(id, callback) {
  $.getJSON(getReadCharactersURL(id))
    .done(response => callback(response.data.results[0]))
    .fail(error => processRequestError(error))
}

function getReadCharactersURL(id) {
  return API_BASE_URL + 'characters/' + id + '?' + getHash();
}

function readCharacterByName(name, callback, processError) {
  $.getJSON(getReadCharacterByNameURL(name), {
    limit: MAX_RESULTS
  }).done(response => callback(response.data.results))
    .fail(error => processError(error))
}

function getReadCharacterByNameURL(name) {
  return API_BASE_URL + 'characters?nameStartsWith=' + name + '&' + getHash();
}

function listCharacters(offset, callback) {
  $.getJSON(getListCharactersURL(), {
    limit: MAX_RESULTS,
    offset: offset
  }).done(response => callback(response.data.results))
    .fail(error => processRequestError(error))
}

function getListCharactersURL() {
  return API_BASE_URL + 'characters?' + getHash();
}

function listTopCharacters(callback) {
  let characters = [];
  TOP_CHARACTERS_IDS.forEach(id => {
    readCharacter(id, character => {
      characters.push(character);
      // We call the callback only when all top chars finished reading
      if (characters.length == TOP_CHARACTERS_IDS.length) {
        callback(characters);
      }
    })
  })
}

function readRandomCharacter(callback) {
  let offset = Math.floor(Math.random() * 1000);
  listCharacters(offset, (characters) => {
    let index = Math.floor(Math.random() * characters.length);
    callback(characters[index]);
  })
}

function listComicsImage(comic, callback) {
  $.getJSON(readComicURL(comic))
    .done(response => {
      let item = response.data.results[0];
      callback({
        item: item,
        image: item.thumbnail.path + '.' + item.thumbnail.extension
      })
    })
    .fail(error => processRequestError(error))
}

function readComicURL(comic) {
  let url = comic.resourceURI.replace("http", "https");
  return url + '?' + getHash();
}

function processRequestError(error) {
  console.log(error);
  $('.error-message').fadeIn();
}

function getHash() {
  let timestamp = new Date().getTime();
  let md5 = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();
  return "ts=" + timestamp + "&apikey=" + PUBLIC_KEY + "&hash=" + md5;
}
