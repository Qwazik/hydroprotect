$(function() {
	//plugins init
	$('input[name="phone"]').inputmask('+7(999)999-99-99');
	$('.products__footer .btn').click(function(){
		var wrap = $(this).closest('.products__item');
		var name = wrap.find('.product-name').text();
		var price = wrap.find('.products__price .price-val .val').text();
		var col = wrap.find('.products__price .counter .val').text();
		var image = wrap.find('.image img').attr('src');
		if($(this).attr('href') == '#addToCart'){
			addCartPopup(name, image, col, price);
		}
		if($(this).attr('href') == '#addOneClick'){
			oneClick(name,col,price);
		}
		return false;
	});

	(function(){
		var orderFooter = $('.order-table__footer');
		var orderFooterMobile = $('<div class="order-table__footer--mobile"></div>');
		orderFooterMobile.append(orderFooter.find('.sum'));
		orderFooterMobile.insertAfter($('.order-table'));
	}());

	$('.fancy-close').click(function(){
		$.fancybox.close(true);
		return false;
	});	

	$(window).load(function(){
		equalHeight('.row','.js-reviews-column');
		$('.js-reviews-column').addClass('equal');
	});
	$(window).resize(function(){
		equalHeight('.row','.js-reviews-column');
		$('.js-reviews-column').addClass('equal');
	});
	$('.fancybox').fancybox({
		padding: 0,
		afterLoad:function(){
			$('input[name="phone"]').inputmask('+7(999)999-99-99');
		}
	});
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

	(function(){
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth()+1;
		var year = today.getFullYear();
		if(String(day).length == 1) day = '0'+day;
		if(String(month).length == 1) month = '0'+month;
		today = day+'.'+month+'.'+year;
		$('input[name="date"]').each(function(){
			$(this).attr('value', today);

		});
	}())

	$('input[name="date"]').datepicker({
		todayButton: new Date(),
		autoClose: true
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
		var price = $(this).closest('.products__price').find('.price-val .val');
		var priceByOne = $(this).closest('.products__price').find('.price-val .val').data('price-by-one');
		if($(this)[0].className == 'dec' && parseInt($(val).text()) > 1){
			val.text(parseInt(val.text()) - 1);
		}
		if($(this)[0].className == 'inc'){
			val.text(parseInt(val.text()) + 1);
		}
		price.text(parseInt(val.text()) * priceByOne);

	});

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

function addCartPopup(name, image, col, price){
	var e = $('#addToCart');
	e.find('.image img').attr('src', image);
	e.find('.name').text(name);
	e.find('.price .col').text('('+ col + ') ');
	e.find('.price .val').text(price);
	$.fancybox.open({src:'#addToCart'},{afterLoad:function(){$('input[name="phone"]').inputmask('+7(999)999-99-99');}});
	return false;
}

function oneClick(name, col, price){
	var e = $('#addOneClick');
	e.find('input[name="product_name"]').text(name);
	e.find('.product_name').text(' ('+name+')');
	e.find('input[name="product_col"]').text(col);
	e.find('input[name="product_price"]').text(price);
	$.fancybox.open({src:'#addOneClick'},{afterLoad:function(){$('input[name="phone"]').inputmask('+7(999)999-99-99');}});
	return false;
}