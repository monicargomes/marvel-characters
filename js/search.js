function addSearchIconListener() {
  $('.icon-search').click(() => {
    $('.search-input').toggle(250).focus();
    $('.search-dropdown').slideUp();
  });
}

function addSearchListener() {
  $('.search-input').on('input', () => {
    var name = $('.search-input').val().trim()
    showLoading();
    $('.search-dropdown').slideDown();

    readCharacterByName(name, characters => {
      $('.search-dropdown>li').remove();
      characters.forEach(character => createDropdownItem(character));
    }, error => {
      $('.search-dropdown>li').remove();
      $('.search-dropdown').hide();
    })
  })

}

function createDropdownItem(character) {
  $('<li>').text(character.name).appendTo('.search-dropdown').click(() =>{
    $('.search-input').val('');
    loadFeaturedCharacter(character);
    $('.search-dropdown').slideUp();
  });
}

function showLoading(){
  $('<li>').addClass('loading').append($('<img>').attr('src', 'img/spinner-icon.gif').addClass('loading-icon')).appendTo('.search-dropdown');
}
