$(document).ready(function() {
//Launch carouser on mainfold 
	$("#carousel-home, #carousel-product").owlCarousel({
		items: 1,
    	itemsScaleUp: true,
    	itemsDesktop : [1199,1],
    	itemsDesktopSmall : [980,1],
    	itemsTablet: [768,1],
    	itemsMobile : [479,1],
    	//Basic Speeds
	    slideSpeed : 200,
	    paginationSpeed : 800,
	    rewindSpeed : 1000,
	    //Autoplay
	    autoPlay : 3000,
	    stopOnHover : true,
	  	});
});
