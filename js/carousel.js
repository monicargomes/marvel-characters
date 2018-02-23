function loadCarousel(items, carousel) {

  items.forEach((item) => {
    let image = item.thumbnail.path+"/landscape_amazing."+item.thumbnail.extension;
    let text = item.name;

    createItem(image, text).click(() => {
      loadFeaturedCharacter(item);
      $('html').animate({ scrollTop: 0 }, 'slow');
    }).appendTo(carousel);

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

function animateScrollIcons(container, iconRight, iconLeft) {
  iconRight.click(() => {
    container.stop().animate({
      scrollLeft: "+=400px"
    }, "slow");
  });

  iconLeft.click(() => {
    container.stop().animate({
      scrollLeft: "-=400px"
    }, "slow");
  });
}

function createCarousel(title){
  let carouselTitle = $('<h2>').addClass('carousel-title').text(title).appendTo('.container');
  let carousel = $('<div>').addClass('carousel').appendTo('.container');
  let iconLeft = $('<i>').addClass('large material-icons icon-left').text('chevron_left').prependTo(carousel);
  let outerContainer = $('<div>').addClass('carousel-outer-container').appendTo(carousel);
  let innerContainer = $('<div>').addClass('carousel-inner-container').appendTo(outerContainer);
  let iconRight = $('<i>').addClass('large material-icons icon-right').text('chevron_right').appendTo(carousel);

  animateScrollIcons(outerContainer, iconRight, iconLeft);
  loadMoreItems(outerContainer);

  return innerContainer;
}

function loadMoreItems(container){
  container.scroll(() => {
    var width = container.outerWidth()
    var scrollWidth = container[0].scrollWidth;
    var scrollLeft = container.scrollLeft();

    if (scrollWidth - width === scrollLeft) {
      offset = offset + 10;
      getMarvelCharacters(limit, offset);
    }
    if (scrollLeft === 0) {
      console.log('left end');
    }
  })

}
