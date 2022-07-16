
// sliders

$('.slider').slick({
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
  arrows: false 
});


$('.slider-2').slick({
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 300,
  arrows: false,
  responsive: [
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      }
    }
  ]  
});

$('.slider-3').slick({
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 300,
  arrows: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
      }
    }
  ]  
});

// the-end-of-sliders



// gallery

flashGallery('#gallery', {
  autoplay: false,
  speed: "fast",
  dots: true,
  infinite: false,
  lengthPerList: 9
});

// the-end-of-gallery