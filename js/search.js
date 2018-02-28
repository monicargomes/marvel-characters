
const SEARCH_INPUT = $('.search-input');
const ENTER_KEY_CODE = 13;

addSearchIconListener();
addSearchListener();

function addSearchIconListener() {
  $('.icon-search').click(() => SEARCH_INPUT.toggle(250).focus());
}

function addSearchListener() {
  SEARCH_INPUT.keypress((event) => {
    if (event.which === ENTER_KEY_CODE) {
      var name = SEARCH_INPUT.val().trim();
      SEARCH_INPUT.val('');
      showLoading();
      readCharacterByName(name, character => {
        if (!character) {
          showError(name);
          return;
        }
        loadFeaturedCharacter(character);
        hideLoading();
      })
    }
  })
}

function showError(name) {
  $('.error').text('Sorry, ' + name + ' not found!').fadeIn();
  $('.spinner-icon').fadeOut();
  $('.featured-character').fadeOut()
}

function showLoading() {
  $('.spinner-icon').fadeIn();
  $('.featured-character').fadeOut()
  $('.error').fadeOut();
}

function hideLoading() {
  $('.featured-character').fadeIn();
  $('.spinner-icon').fadeOut();
  $('.error').fadeOut();
}
