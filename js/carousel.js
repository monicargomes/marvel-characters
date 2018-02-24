function createCarousel(title, items, loadMoreItems) {
  let carouselTitle = $('<h2>').addClass('carousel-title').text(title).appendTo('.container');
  let carousel = $('<div>').addClass('carousel').appendTo('.container');
  let iconLeft = $('<i>').addClass('large material-icons icon-left').text('chevron_left').prependTo(carousel);
  let outerContainer = $('<div>').addClass('carousel-outer-container').appendTo(carousel);
  let innerContainer = $('<div>').addClass('carousel-inner-container').appendTo(outerContainer);
  let iconRight = $('<i>').addClass('large material-icons icon-right').text('chevron_right').appendTo(carousel);
  loadCarousel(items, innerContainer)
  animateScrollIcons(outerContainer, iconRight, iconLeft);
  addInfiniteScroll(outerContainer, innerContainer, loadMoreItems);
  return innerContainer;
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

function addInfiniteScroll(outerContainer, innerContainer, loadMoreItems) {
  outerContainer.scroll(() => {
    var width = outerContainer.outerWidth()
    var scrollWidth = outerContainer[0].scrollWidth;
    var scrollLeft = outerContainer.scrollLeft();

    if (scrollWidth - width < scrollLeft) {
      loadMoreItems()
    }
  })
}

function loadCarousel(items, carousel) {
  items.forEach((item) => {
    let image = assemblyCharacterURL(item);
    let text = item.name;

    createItem(image, text).click(() => {
      loadFeaturedCharacter(item);
      $('html').animate({ scrollTop: 0 }, 'slow');
    }).appendTo(carousel);
  });
}

function assemblyCharacterURL(character) {
  return character.thumbnail.path + "/landscape_amazing." + character.thumbnail.extension
}

function createItem(image, text) {
  let item = $('<div>').addClass('carousel-item');
  let itemImgContainer = $('<div>').addClass('carousel-item-img-container').appendTo(item);
  let itemImg = $('<img>').addClass('carousel-item-img').attr('src', image).appendTo(itemImgContainer);
  let itemDetails = $('<div>').addClass('carousel-item-details').appendTo(item);
  let itemTitle = $('<div>').addClass('carousel-item-title').text(text).appendTo(itemDetails);
  return item;
}
