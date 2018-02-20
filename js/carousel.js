function loadCarousel(items, container) {

  items.forEach((item) => {
    let image = item.thumbnail.path+"/landscape_amazing."+item.thumbnail.extension;
    let text = item.name;

    createItem(image, text).appendTo($(container)).click(() => {
      loadFeaturedCharacter(item);
      $('html').animate({ scrollTop: 0 }, 'slow');
    });

  });

}

function createItem(image, text){
  let item = $('<div>').addClass('carousel-item');
  let itemImgContainer = $('<div>').addClass('carousel-item-img-container').appendTo(item);
  let itemImg = $('<img>').addClass('carousel-item-img').attr('src', image).appendTo(itemImgContainer);
  let itemDetails = $('<div>').addClass('carousel-item-details').appendTo(item);
  let itemTitle = $('<div>').addClass('carousel-item-title').text(text).appendTo(itemDetails);

  return item;
}

function animateScrollButtons(container, iconRight, iconLeft) {
  $(iconRight).click(() => {
    $(container).stop().animate({
      scrollLeft: "+=400px"
    }, "slow");
  });

  $(iconLeft).click(() => {
    $(container).stop().animate({
      scrollLeft: "-=400px"
    }, "slow");
  });
}
