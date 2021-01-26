$(document).ready(function() {
	
	/* MOSTRAR Y OCULTAR MENU */
	$("#mainMene").click(function() {
		$("html").addClass('active_menu');
	});
	$("#closeMenu").click(function() {
		$("html").removeClass('active_menu');
	});
	$("#rs-screen-overlay").click(function() {
		$("html").removeClass('active_menu');
	});

	/*MOSTRAR EL SUB MENU*/
	$("#subMenu").click(function() {
		$("#list_nav").toggleClass('active');
		$(".search_nav").toggleClass('active');
	});
	$("#userAvatar").click(function() {
		$(this).toggleClass('active');
		$("#userList").toggleClass('active');
	});

	/*MOSTRAR Y OCULTAR SUB-ITEMS DEL MENU LATERAL*/
	$('.item_nav').click(function(e) {
		e.preventDefault();
		var $this = $(this);
			$('.item_nav').removeClass('active');
			$this.addClass('active');
		if ($this.next().hasClass('visible_x')) {
			$this.next().removeClass('visible_x');
			$this.next().slideUp(350);
			$this.removeClass('active');
		} else {
			$this.parent().parent().find('.sub_item_nav').removeClass('visible_x');
			$this.parent().parent().find('.sub_item_nav').slideUp(350);
			$this.next().toggleClass('visible_x');
			$this.next().slideToggle(350);
		}
	});
	
	/*MOSTRAR Y OCULTRA TABLA FILTROS*/
	$(".filterMore").click(function() {
		var id = $(this).attr('data-item');
		$("#"+id).toggleClass('actived');
	});
	
	/*SELECTS CON SELECT2*/
	var $selector = $("select");
    if(typeof($selector) != 'undefined'){
		
		$selector.each(function(){
			var $placeholder = $(this).attr('placeholder');
			$(this).select2({
			  placeholder: $placeholder,
			});
		});
	}
	var $selectorTag = $(".tagselect");
    if(typeof($selectorTag) != 'undefined'){
		
		$selectorTag.each(function(){
			var $placeholder = $(this).attr('placeholder');
			$(this).select2({
			  placeholder: $placeholder,
			  tags: true,
			  tokenSeparators: [','],
			});
		});
	}

	$(".nav-tabs").click(function() {
		$(this).toggleClass('expand');
	});


	/** FUNCION PARA EL TUTORIAL **/
	$(".idx-tutorial-active .idx-btn-content .btn-dgt-def").click(function() {
		var $stepActive = $(this).attr('data-step');
		$("body").removeClass().addClass($stepActive);
		$(".idx-text-intro").removeClass('idx-active-step');
		$("#"+$stepActive).addClass('idx-active-step');
	});


	/*** FUNCION PARA MOSTRAR EL MODAL ****/
  $(document).on('click', '.idx-show-modal', function() {
    $('body').addClass('idx-active-modal');
  });

  /*** FUNCION PARA CERRAR EL MODAL ****/
  $(document).on('click', '.idx-close-modal', function() {
    $('body').removeClass('idx-active-modal');
  });

});