// code for changing the banner image
const images = [
    'assets/home1.png',
    'assets/home2.png',
    'assets/home3.png',
    'assets/home4.png'
  ];
  
 let current = 0; // Index of current image
  const headerImage = document.getElementById('header-image');
  
   function changeHeaderImage() {
    // Change the `src` attribute dynamically
    headerImage.src = images[current]; 
    current = (current + 1) % images.length; // Loop through images
  } 
  
  // Start with the first image
  changeHeaderImage();
  
  // Change image every 5 seconds
  setInterval(changeHeaderImage, 3000);



  // code for changing the star pattern
  const imageIndicator = [
    'assets/star-pattern-1.png',
    'assets/star-pattern-2.png',
    'assets/star-pattern-3.png',
    'assets/star-pattern-4.png'
  ]

  let counter = 0; // Index of current image
  const headerImageIndicator = document.getElementById('header-image-indicator');
  
  function changeHeaderImageIndicator() {
    // Change the `src` attribute dynamically
    headerImageIndicator.src = imageIndicator[current]; 
    counter = (counter + 1) % imageIndicator.length; // Loop through images
  } 
  
  // Start with the first image
  changeHeaderImageIndicator();
  
  // Change image every 5 seconds

  setInterval(changeHeaderImageIndicator, 3000);





