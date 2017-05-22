$(function() {
	//plugins init
	$(window).load(function(){
		equalHeight('.row','.js-reviews-column');
		$('.js-reviews-column').addClass('equal');
	});
	$(window).resize(function(){
		equalHeight('.row','.js-reviews-column');
		$('.js-reviews-column').addClass('equal');
	});
	$('.fancybox').fancybox();
	$('#reviews').swiper({
		slidesPerView: 2,
		loopAdditionalSlides: 2,
		slidesPerColumn: 2,
		spaceBetween: 44,
		nextButton: '#navReviews .next',
		prevButton: '#navReviews .prev',
		breakpoints: {
			1015: {
				slidesPerView: 1,
			},
			767: {
				slidesPerView: 1,
				slidesPerColumn: 1
			}
		}

	});
	$('#videoReviews').swiper({
		loopAdditionalSlides: 2,
		slidesPerView: 1,
		slidesPerColumn: 2,
		spaceBetween: 44,
		nextButton: '#navVideoReviews .next',
		prevButton: '#navVideoReviews .prev',
		breakpoints: {
			767: {
				slidesPerColumn: 1
			}
		}

	});
	// lang
	var langSelectedUL = $('.lang__list ul');
	var langSelected = $('.lang-selected');
	$(langSelected).click(function(){
		$(langSelectedUL).show();
	});
	$(langSelectedUL).find('li').click(function(){
		$(langSelected).find('span').text($(this).text());
		$(langSelected).find('img').attr('src', $(this).data("img"));
		$(langSelectedUL).hide();
	});
	//counter	
	$('.counter button').click(function(){
		var val = $(this).siblings('.val');
		if($(this)[0].className == 'dec' && $(val).text() != "0"){
			val.text(parseInt(val.text()) - 1);
		}
		if($(this)[0].className == 'inc'){
			val.text(parseInt(val.text()) + 1);
		}
	});

	//$('.first-screen__image').width(($(window).width() - $('.container').width()) / 2 + $('.first-screen .left').width());
	$(document).click(function(e){
		if(!$(e.target).closest('.lang__list').length){
			$(langSelectedUL).hide();
		}

		
	});

	$('.main-header').on('click', '.mobile-nav-btn', function(){

	
		$(this).toggleClass('active');
		$('.top-menu').toggleClass('open');
	})


	var fixedNav = $('.main-header__center').clone();
	fixedNav.insertAfter($('.main-header__center'));
	fixedNav.addClass('fixed').hide();
	$(window).scroll(function(){
		if($(window).scrollTop() >= $('.main-header__center').offset().top + $('.main-header__center').outerHeight()){
			fixedNav.show();
		}else{
			fixedNav.hide();
		}
	});
});

function equalHeight(wrap, element){
    $(wrap).each(function(){
        var maxHeight = [],
            className = element;
        $(this).find(className).each(function(){
            $(this).height('auto');
        });
        $(this).find(className).each(function(){
            maxHeight.push($(this).height());
        });
        maxHeight = Math.max.apply(null, maxHeight);
        $(this).find(className).each(function(){
            $(this).height(maxHeight);
        });
    });
}