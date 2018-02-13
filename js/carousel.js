$(document).ready(loadItems());

function loadItems() {
  var characters = listCharacters();

  characters.forEach((character) => {
    createItem(character.smallImg, character.name).click(() => {
      $('.large-img').attr('src', character.largeImg);
      $('.character-name').text(character.name);
      $('.character-description').text(character.description);
      $('html').animate({ scrollTop: 0 }, 'slow');
    });
  });
}

function createItem(image, text){
  var item = $('<div>').addClass('netflix-carousel-item');
  var itemImgContainer = $('<div>').addClass('netflix-carousel-item-img-container').appendTo(item);
  var itemImg = $('<img>').addClass('netflix-carousel-item-img').attr('src', image).appendTo(itemImgContainer);
  var itemDetails = $('<div>').addClass('netflix-carousel-item-details').appendTo(item);
  var itemTitle = $('<div>').addClass('netflix-carousel-item-title').text(text).appendTo(itemDetails);

  return item.appendTo($('.netflix-carousel-inner-container'));
}

$('.icon-right').click(() => {
      $('.netflix-carousel-outer-container').animate({
        scrollLeft: "+=500px"
      }, "slow");
   });

 $('.icon-left').click(() => {
      $('.netflix-carousel-outer-container').animate({
        scrollLeft: "-=500px"
      }, "slow");
 });
