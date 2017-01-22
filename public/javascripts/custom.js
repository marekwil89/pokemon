$(document).ready(function(){

	var slide = 0

	setInterval(changeSlide, 5000);

	$(window).scroll(function(){

		if(window.location.href.indexOf("main") > -1) {
			var wScroll = $(this).scrollTop();

			if(wScroll > $('.profesor-box').offset().top - ($(window).height()/20)){
				$('.bubble').addClass('bloom')
				$('.oak-img').addClass('appear')
				$('.quote').addClass('type')
			}


			showItems(wScroll, '.arrivals', '.arr-item')
			showItems(wScroll, '.promotions', '.promo-item')
			showItems(wScroll, '.starters', '.start-item')
			showItems(wScroll, '.about-box', '.info-box')

		}
	})

	function changeSlide(){
		slide = slide - 100;
		if(slide === -300){
			slide = 0;
		}
		$(".slides-box").css("margin-left", slide + '%');
	}

	function showItems(wScroll, box, item){
		if(wScroll > $(box).offset().top - ($(window).height()/20)){
			$(item).each(function(i){
				setTimeout(function(){
					$(item).eq(i).addClass('is-showing')
				}, 300 * i)
			})
		}
	}


})




