$(document).ready(function() { // вся мaгия пoсле зaгрузки стрaницы
	// форма
var errorList;
	$("#form").submit(function(e){
		e.preventDefault();
		console.log('log');
		errorList = 0;
		$('.alert').remove();
		// console.log('send')
		var form = $(this);
		var p = form.serializeArray();
		// console.log(p)
		p.forEach(function (item) {
	      validate(item.name, item.value);
	    });

	    if(errorList){
	    	$("#form").append("<div>Проверте поля</div>")
	    	UIkit.notify("Check the fields!", {status:'danger', pos:'bottom-center'})

	    } else {
	    	$("#form").append("<div>Ваш запрос отправлен</div>")
	    }
	})

	function validate(name, value) {
		console.log('try validate:', name, value);
		if ( name == 'name') {
			if (value != '') {
				var pattern =/[^а-яА-Яa-zA-Z]/;
				var matches = value.match(pattern);
			    if (matches){
			    	errorList++;
			       $("input[name="+name+"]").after("<div>Проверте поля</div>");
			    }

			} else {
				errorList++;
 				$("input[name="+name+"]").after("<div class='alert alert-warning'>Заполните поле Name</div>");
			
			}
		}

		if (name == 'phone'){
			if( value != ''){
				var pattern =/\D/;
			    var result = pattern.test(value);
			    if (result){
			    	errorList++;
			      	$("input[name="+name+"]").after("<div class='alert alert-warning'>Заполните поле phone верно </div>");
			    }
			} else {
				errorList++;
				console.log("Заполните поле Phone");
			}
		}
		if (name == 'email'){
			if( value != ''){
				var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    var result = pattern.test(value);
			    if (!result){
			    	errorList++;
			    	console.log("Заполните поле email верно");

			    }
			} else {
				console.log("Заполните поле email");
				$("input[name="+name+"]").after("<div class='alert alert-warning'>Заполните поле email</div>");
			}
		}

	}


	var example = 'dderw';
	var pattern =/\d/g;

	var testresult = pattern.test(example);
	var matchresult = example.match(pattern);
	var searchresult = example.search(pattern);
	$('a#go').click( function(event){ // лoвим клик пo ссылки с id="go"
		event.preventDefault(); // выключaем стaндaртную рoль элементa
		$('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	function(){ // пoсле выпoлнения предъидущей aнимaции
				$('#modal_form') 
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({opacity: 1}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		});
		
	});
	/* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
	$('#modal_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function(){ // пoсле aнимaции
					$(this).css('display', 'none'); // делaем ему display: none;
					$('#overlay').fadeOut(400); // скрывaем пoдлoжку
				}
			);
	});

	$('.add-item-plus').on('click', function(){
		
		var input = $(this).closest('.add-item').find('.product-plus');
		// console.log(input[0].value);
		console.log(input[0].value);
		var inputValue = parseInt (input[0].value);
		input[0].value=inputValue+1;

		changeSum($(this),inputValue+1);
	})

	$('.add-item-minus').on('click', function(){
		
		var input = $(this).closest('.add-item').find('.product-plus ');
		// console.log(input[0].value);
		console.log(input[0].value);
		var inputValue = parseInt (input[0].value);// делает из строки число
		input[0].value=inputValue-1;

		changeSum($(this),inputValue-1);//вызывает функцию изменить значение суммы если отнимается 1 


	})
     function changeSum(item, value){ //берет значение количества и значение+1
    
     	var priceTotal = item.closest('tr').find('.b-price-num');//сумма=берет строку и ищет в ней тег b-price-num
     	var price = item.closest('tr').find('.cart-price span'); //цена=в строке найти спан с классом cart-price
     	priceTotal[0].innerText = price[0].innerText*value//сумма(innerText-значение общей суммы в консоле)= цена*значение value(пришло+или-)

     }
     
     $('.recount').on('click', function(e){
		e.preventDefault();
		var sum  = 0;
		$.each($('.b-price-num'), function( index, value ) { //перебрать все массив значений
  			console.log( index, value );
  			var inputValue = parseInt (value.innerText);
  			sum = sum+inputValue;
}		);
		 $('.value-order').innerText = sum;

		$('span.value-order').html(sum);
		$('span.value-order').addClass( "myClass yourClass");
	})
	// $('.add-item-plus').on('click', function(){
		
	// 	var price = $(this).closest('tr').find('.cart-price span');
	// 	// console.log(input[0].value);
	// 	console.log(price[0].innerText);
	// 	 var inputValue = parseInt (price[0].value);//сумма
	// 	input[0].value=inputValue+1;
	// })
	
	$('i#close').on('click', function(){
		$('.header-top').css('display', 'none'); //верхний хедер

	})
	

	$('.delete-cart').on('click', function(){
		$( this ).closest('tr').remove( );
	})


	$('.search').on('click', function(){
	if ($('.input-search').is(':visible')) {
    // $element виден
    	$('.input-search').css('display', 'none').removeClass('active');
	}
    	else{
			$('.input-search').css('display', 'block').addClass('active');
		}
		
	})
	
	


	$('.heart').on('click', function(){
	
	if ($(this).is('.active')) {
    // $element виден
    	$(this).css('color', '#111').removeClass('active');
    	var favoritesCount = $('.search-container .favorites').html();//считает количество элементов
    	favoritesCount = parseInt (favoritesCount);
    	$('.search-container .favorites').html(favoritesCount-1);

	}else {
    // $element не виден
    	$(this).css('color', '#e22424').addClass('active');
    	var favoritesCount = $('.search-container .favorites').html();//считает количество элементов
    	favoritesCount = parseInt (favoritesCount);
    	$('.search-container .favorites').html(favoritesCount+1);
	}
	})


	$('.heart-top').on('click', function(){
	
	if ($('.heart').is('.active')) {
    // $element виден
    	$(this).css('color', '#111').removeClass('active');
    	var favoritesCount = $('.search-container .favorites').html();//считает количество элементов
    	favoritesCount = parseInt (favoritesCount);
    	

	}else {
    // $element не виден
    	$(this).css('color', '#e22424').addClass('active');
    	var favoritesCount = $('.search-container .favorites').html();//считает количество элементов
    	favoritesCount = parseInt (favoritesCount);
    	
	}
	})









})