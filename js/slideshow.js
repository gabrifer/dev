var currentSlide

function generateSlide() {
  $("#slide1").hide()
  $("#slide0").fadeIn('slow');
  currentSlide = 0
  console.log('oi');
  setInterval(slide,3000)
}


function slide() {
  $("#slide" + currentSlide).fadeOut('slow')
  currentSlide++;
  currentSlide %= 2
  $("#slide" + currentSlide).fadeIn('slow')
}
