$('.small-img').click(function(){
  var imageName = $(this).attr('src').slice(9);

  $('.large-img').attr('src', 'img/large' + imageName);
})
