$(document).ready(function() {
            //FORMATO PARA EL DATEPICKERT
            var dateFormat = "mm/dd/yy",
            from = $("#input_from").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1
            }).on( "change", function() {
                to.datepicker( "option", "minDate", getDate( this ) );
            }),
            to = $("#input_to").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1
            }).on( "change", function() {
                from.datepicker( "option", "maxDate", getDate( this ) );
            });
            function getDate( element ) {
                var date;
                try {
                    date = $.datepicker.parseDate( dateFormat, element.value );
                } catch( error ) {
                    date = null;
                }
                return date;
            }
            //MOSTRAR Y OCULTAR MAS INFORMACIÓN
            $(".show_more").click(function() {
                var id = $(this).attr('data-item');
                $("#"+id).toggleClass('active');
            });
            //LEER EL COMENTARIO O ESCRIBIR
            $(".read").click(function() {
              var comment = $(this).attr('data-comment');
              //$("#"+comment).slideDown(350);

              var $this = $(this);
              if ($this.hasClass('active')) {
                $("#"+comment).slideUp(350);
                $this.removeClass('active');
              } else {
                $("#"+comment).slideDown(350);
                $this.addClass('active');
              }
            });
            //CANCELAR LA REDACCIÓN DEL COMMENTARIO
            $(".cancel_cm").click(function() {
                $(this).parent().parent().slideUp(350);
                $(this).parents('.info_detail').find(".read").removeClass('active');
            });
            //ANIMACIÓN PARA CAMBIAR LOS COLORES DEL DROPDOWN
            $(".read_m .dropdown-menu a").click(function() {
                var color = $(this).attr('class');
                var texto = $(this).text();
                $(this).parent().parent().parent().find('.btn').empty().html(texto).removeClass().addClass(color+' btn btn-default dropdown-toggle');
            });
			
			$('.show_info').click(function(e) {
			  e.preventDefault();
			  var $this = $(this);
			  $('.show_info').removeClass('active');
			  $this.addClass('active');
			  if ($this.next().hasClass('showing')) {
				$this.next().removeClass('showing');
				$this.next().slideUp(350);
				$this.removeClass('active');
			  } else {
				$this.parent().parent().find('.body-tab').removeClass('showing');
				$this.parent().parent().find('.body-tab').slideUp(350);
				$this.next().toggleClass('showing');
				$this.next().slideToggle(350);
			  }
			});

    });