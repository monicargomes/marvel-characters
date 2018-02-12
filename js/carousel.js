$(document).ready(loadItems());

function loadItems() {
  var characters = listCharacters();

  characters.forEach((character) => {
    createItem(character.smallImg, character.name).click(() => {
      $('.large-img').attr('src', character.largeImg);
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



// const ITEM_PARENT='.netflix-carousel-inner-container'
// const TEMPLATE = `
//   <div class="netflix-carousel-item">
//     <div class="netflix-carousel-item-img-container">
//       <img class="netflix-carousel-item-img" src="IMAGE" />
//     </div>
//
//     <div class="netflix-carousel-item-details">
//       <div class="netflix-carousel-item-title">TITLE</div>
//     </div>
//   </div>
// `
//
// function loadItems() {
//   let characters = listCharacters();
//   characters.forEach((character) => {
//     let currentCharacter = TEMPLATE.replace('IMAGE', character.smallImg)
//     currentCharacter = currentCharacter.replace('TITLE', character.name)
//     $(ITEM_PARENT).append(currentCharacter)
//   })
// }
