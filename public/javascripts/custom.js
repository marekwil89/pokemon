$(document).ready(function(){


	
	
	var slide = 0

	function changeSlide(){
		slide = slide - 100;
		if(slide === -300){
			slide = 0;
		}
		$(".slides-box").css("margin-left", slide + '%');
	}

	setInterval(changeSlide, 5000);


	$(window).scroll(function(){

		if(window.location.href.indexOf("main") > -1) {
			var wScroll = $(this).scrollTop();

			if(wScroll > $('.profesor-box').offset().top - ($(window).height()/20)){
				$('.bubble').addClass('bloom')
				$('.oak-img').addClass('appear')
				$('.quote').addClass('type')
			}


			if(wScroll > $('.about-box').offset().top - ($(window).height()/10)){
				$('.info-box').addClass('appear')

			}
		}
	})



})
