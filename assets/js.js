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
	    slideSpeed : 500,
	    paginationSpeed : 800,
	    rewindSpeed : 1000,
	    //Autoplay
	    autoPlay : false,
	    stopOnHover : true,
	  	});

//Navigate to carousel item on thumbnail click on product page
	var productOwl = $("#carousel-product").data('owlCarousel');
	
	$('#thumbs img').click(function(){
		var which = $(this).data().index;
		console.log(which);
		productOwl.goTo(which-1);
	});
});
