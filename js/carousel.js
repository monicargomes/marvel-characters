function loadItems(characters) {

  characters.forEach((character) => {
    createItem(character.thumbnail.path+"/landscape_xlarge."+character.thumbnail.extension, character.name).click(() => {
      $('.large-img').attr('src', character.thumbnail.path+"/detail."+character.thumbnail.extension);
      $('.character-name').text(character.name);
      $('.character-description').text(character.description);
      $('html').animate({ scrollTop: 0 }, 'slow');
    });
  });
}

function createItem(image, text){
  var item = $('<div>').addClass('carousel-item');
  var itemImgContainer = $('<div>').addClass('carousel-item-img-container').appendTo(item);
  var itemImg = $('<img>').addClass('carousel-item-img').attr('src', image).appendTo(itemImgContainer);
  var itemDetails = $('<div>').addClass('carousel-item-details').appendTo(item);
  var itemTitle = $('<div>').addClass('carousel-item-title').text(text).appendTo(itemDetails);

  return item.appendTo($('.carousel-inner-container'));
}

$('.icon-right').click(() => {
      $('.carousel-outer-container').animate({
        scrollLeft: "+=400px"
      }, "slow");
   });

 $('.icon-left').click(() => {
      $('.carousel-outer-container').animate({
        scrollLeft: "-=400px"
      }, "slow");
 });
