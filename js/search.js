$('.search-input').hide();

$('.icon-search').click(() => {
  $('.search-input').fadeToggle().focus();
});

$('.search-input').keypress((event) => {
  if(event.which == 13){
    var name = $('.search-input').val().trim();

    $('.search-input').val('');
    $('.spinner-icon').fadeIn();
    $('.featured-character').fadeOut();

    $.getJSON('http://gateway.marvel.com/v1/public/characters?name='+name+'&'+getUrl())
    .done((response) => {
      let character = response.data.results[0];

      if (character) {
        loadFeaturedCharacter(character);
        $('.spinner-icon').fadeOut();
        $('.featured-character').fadeIn();
        $('.error').hide();
      } else {
        $('.spinner-icon').fadeOut();
        $('.error').text('Sorry, '+name+' not found!').show();
      }

    })
    .fail((err) => {
      console.log(err);
    });
  }

})
