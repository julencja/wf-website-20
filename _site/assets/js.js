	// braSizes holds 
	var braSizes = [
					{
						bandEU: 55,
						bandUS: 26,
						cupStart: 6,
						cups: 	['DD', 'DDD', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
					},
					{
						bandEU: 60,
						bandUS: 28,
						cupStart: 1,
						cups: 	['D', 'DD', 'DDD', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
					},
					{
						bandEU: 65,
						bandUS: 30,
						cupStart: 1,
						cups: 	['C', 'D', 'DD', 'DDD', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
					},
					{
						bandEU: 70,
						bandUS: 32,
						cupStart: 1,
						cups: 	['B', 'C', 'D', 'DD', 'DDD', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
					},
					{
						bandEU: 75,
						bandUS: 34,
						cupStart: 2,
						cups: 	['B', 'C', 'D', 'DD', 'DDD', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
					},
					{
						bandEU: 80,						
						bandUS: 36,
						cupStart: 3,
						cups: 	['B', 'C', 'D', 'DD', 'DDD', 'G', 'H', 'I', 'J', 'K', 'L']
					},
					{
						bandEU: 85,
						bandUS: 38,
						cupStart: 4,
						cups: 	['B', 'C', 'D', 'DD', 'DDD', 'G', 'H', 'I', 'J', 'K']
					},
					{
						bandEU: 90,
						bandUS: 40,
						cupStart: 5,
						cups: 	['B', 'C', 'D', 'DD', 'DDD', 'G', 'H', 'I', 'J']
					},
					{
						bandEU: 95,
						bandUS: 42,
						cupStart: 6,
						cups: 	['B', 'C', 'D', 'DD', 'DDD', 'G', 'H', 'I']
					},
					{
						bandEU: 100,
						bandUS: 44,
						cupStart: 7,
						cups: 	['B', 'C', 'D', 'DD', 'DDD', 'G', 'H']
					},
					{
						bandEU: 105,
						bandUS: 46,
						cupStart: 8,
						cups: 	['B', 'C', 'D', 'DD', 'DDD', 'G']
					},
					{
						bandEU: 110,
						bandUS: 48,
						cupStart: 9,
						cups: 	['B', 'C', 'D', 'DD', 'DDD']
					},
					{
						bandEU: 115,
						bandUS: 50,
						cupStop: 6,
						cups: 	['B', 'C', 'D', 'DD']
					},
				];

	var cups = ['A', 'B', 'C', 'D', 'DD', 'DDD', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

	//assert underbust, overbust type of number; unit in ["cm","in"]
	function calculateCup(underbust, overbust, unit){
			if (unit === "in") {
				var difference = Math.round(overbust - underbust);
				if (difference < 1) {return "noCup"} else{return cups[difference-1]};
			};
			if (unit === "cm") {
				var difference = overbust - underbust;
				if (difference < 2.54) {return "noCup"} else{
					// 1 in = 2.54 cm
					var cupIndex =  Math.round(difference/2.54)
					return cups[cupIndex-1];
			};
		};		
	};
	
	function calculateCup2(underbust, overbust, unit){
			if (unit === "in") {
				//convert in to cm, 1 in = 2.54 cm
				var underbust = underbust * 2.54;
				var overbust = overbust * 2.54;
			};
			var difference = Math.round(overbust - underbust);
			//assuming cup A starts at 6cm difference
			if (difference < 6) {return "noCup"} else{
				var cupIndex =  Math.floor((difference-6)/2)
				return cups[cupIndex];
		};		
	};
	//assert underbust type of number, unit in ["cm","in"]
	function calculateBand(underbust, unit){
		if (unit === "in") {
			//round the underbust down
			underbust = Math.ceil(underbust);
			if (underbust % 2 === 0) {return underbust+1} else {
				//round down odd underbust measurement to the nearest band
				return (underbust+3);
			};			
		};
		if (unit === "cm") {
			//round the underbust to integer
			underbust = Math.round(underbust);
			if (underbust%5 < 3) 
				//round to the nearest multiple of 5
				{var bandEU = (underbust - underbust%5)}
			else
				{var bandEU = (underbust - underbust%5 + 5)};
			//convert EU band to US band
			return (Math.ceil(bandEU/2.54))
		};
	};

	//check if we have this size, 
	//assert typeOf(bandSize) == integer, typeOf(cupSize) == string
	//make sure there are now identical bandUS and bandEU in the braSizes object
	function sizeAvailable(bandSize,cupSize){
		for (var i = 0; i < braSizes.length; i++) {
				var band = braSizes[i];
				if (bandSize === band.bandUS || bandSize === band.bandEU) {
					for (var j = 0; j < band.cups.length; j++) {
						var cup = band.cups[j];
						if (cup === cupSize) {return true}
					};
				}; 				
		};
		return false;
	};

	//calculate size from measurements
	//unit in ["cm","in"]
	function calculateSize(underbust, overbust, unit){
		var bandSize = calculateBand(underbust,unit);
		var cupSize =  calculateCup2(underbust, overbust, unit);
		//check if the size belongs to the universum of braSizes
		if (sizeAvailable(bandSize, cupSize)) {return ([bandSize,cupSize])} else{return false};
	};

	//find a sister size which feels loser
	//assert typeOf(braSize) == array
	function sisterLoose(braSize) {
		var sisterBand = braSize[0]+2;
		var cupSize = braSize[1];
		var cupIndex = cups.indexOf(cupSize)-1;
		var sisterCup = cups[cupIndex];
		//check if the size in braSizes
		if (sizeAvailable(sisterBand,sisterCup)) {return([sisterBand,sisterCup])} else{return false};
	};

	//find a sister size which feels more snug
	//assert typeOf(braSize) == array
	function sisterSnug(braSize) {
		var sisterBand = braSize[0]-2;
		var cupSize = braSize[1];
		var cupIndex = cups.indexOf(cupSize)+1;
		var sisterCup = cups[cupIndex];
		//check if the size in braSizes
		if (sizeAvailable(sisterBand,sisterCup)) {return([sisterBand,sisterCup])} else{return false};
	};

	//convert size from US to EU
	function convert2EU(braSize){
		var bandUS2convert = braSize[0];
		for (var i = 0; i < braSizes.length; i++) {
			if (braSizes[i].bandUS === bandUS2convert) {
				var bandEU = braSizes[i].bandEU; 
				return([bandEU,braSize[1]]);
			};
		};
	};
	//determine unit from #units
	function whatUnit(){
		if ($('#in').is(':checked')) {return "in"} else { return "cm"};
	};

	//Switch UI between units cm<>in
	function switchUI(fromUnit,toUnit){
		//switch from inches to centimeters
		if (fromUnit === "in") {
			var newUnder = Math.round($('#underbustSlider').val()*2.54);
			var newOver = Math.round($('#overbustSlider').val()*2.54);
			var newUnderMin = Math.round($('#underbustSlider').attr('min')*2.54);
			var newOverMin = Math.round($('#overbustSlider').attr('min')*2.54);
			var newUnderMax = Math.round($('#underbustSlider').attr('max')*2.54);
			var newOverMax = Math.round($('#overbustSlider').attr('max')*2.54);
			//convert slider values to cm
			$('#underbustSlider').val(newUnder);
			$('#overbustSlider').val(newOver);
			//convert slider min
			$('#underbustSlider').attr('min',newUnderMin);
			$('#overbustSlider').attr('min',newOverMin);
			//convert sider max
			$('#underbustSlider').attr('max',newUnderMax);
			$('#overbustSlider').attr('max',newOverMax);
		};
		if (fromUnit === "cm") {
			var newUnder = Math.round($('#underbustSlider').val()/2.54);
			var newOver = Math.round($('#overbustSlider').val()/2.54);
			var newUnderMin = Math.round($('#underbustSlider').attr('min')/2.54);
			var newOverMin = Math.round($('#overbustSlider').attr('min')/2.54);
			var newUnderMax = Math.round($('#underbustSlider').attr('max')/2.54);
			var newOverMax = Math.round($('#overbustSlider').attr('max')/2.54);
			//convert slider values to cm
			$('#underbustSlider').val(newUnder);
			$('#overbustSlider').val(newOver);
			//convert slider min
			$('#underbustSlider').attr('min',newUnderMin);
			$('#overbustSlider').attr('min',newOverMin);
			//convert sider max
			$('#underbustSlider').attr('max',newUnderMax);
			$('#overbustSlider').attr('max',newOverMax);
		};
	};

	$( document ).ready(function() {
	//Calculate size from input    	 		
    	$('#calculateSize').click(function(){
    		var under = parseInt($('#underbustSlider').val()); 
    		var over = parseInt($('#overbustSlider').val());
    		var unit = whatUnit();
    		var yourSizeUS = calculateSize(under,over,unit);
    		var snugSisterSizeUS = sisterSnug(yourSizeUS);
    		//Set Comfy text 
    		if (yourSizeUS) {
    			$("#comfy span").text(yourSizeUS[0]+yourSizeUS[1]);	
    		} else{
    			$("#comfy span").text("sorry");
    		};
    		//Set Snug text
    		if (snugSisterSizeUS) {
    			$("#snug span").text(snugSisterSizeUS[0]+snugSisterSizeUS[1]);
    		} else{
    			$("#snug span").text("sorry");
    		};
    		//Remove inactive class from size recommendations
    		$(".result").removeClass('inactive');
    	}); 		

		//Set slider min and max
		$("#underbustSlider").attr("min",braSizes[0].bandUS-1);	
		$("#underbustSlider").attr("max",braSizes[braSizes.length-1].bandUS+.5);
		$("#overbustSlider").attr("min",braSizes[0].bandUS + braSizes[0].cupStart);
		$("#overbustSlider").attr("max",braSizes[braSizes.length-1].bandUS + braSizes[braSizes.length-1].cupStop);
	
		//Grey-out size recommendations when sliders change
		$( "#underbustSlider, #overbustSlider" ).bind( "change", function(event, ui) {
			//grey out size recommendations
  			$('.result').addClass('inactive');
		});

		//Switch UI between in/cm
		$("#in").click(function(){
			//if in switched off
			if ($(this).val() === "off") {
				//switch off cm
				$("#cm").val('off');
				//switch on in
				$(this).val('on');
				//switch ui
				switchUI("cm","in");
			} 
			//else do nothing
			else{return};
		});
		$("#cm").click(function(){
			//if cm switched off
			if ($(this).val() === "off") {
				//switch off in
				$("#in").val('off');
				//switch on in
				$(this).val('on');
				//switch ui
				switchUI("in","cm");
			} 
			//else do nothing
			else{return};
		});

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
// Size calculator

});
