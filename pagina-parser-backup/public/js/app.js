$(function(){
	    $('.scrollspy').scrollSpy();

		Dropzone.autoDiscover = false;

		$('#dropzoneFileUpload').on('drop', function() {
			console.log('drop');
			$("#dropzoneFileUpload").removeClass('ondrag');
		});

		$('#dropzoneFileUpload').on('dragenter', function() {
			console.log('dragenter');
			$("#dropzoneFileUpload").addClass('ondrag');
		
		});



		Dropzone.options.dropzoneFileUpload = {
		    url: "/upload",
		    paramName: "file",
		    maxFilesize: 2,
		    acceptedFiles: ".txt, .nc",
		    init: function() {
		        this.on("success", function(file, response) {
		        	if(file.name){
						Materialize.toast("Archivo generado" , 4000);   
		        		window.location.href = "/download?file=" + response;	
		        	}
		        });

				this.on('error', function(file, response){
					console.log(response.errors);
					if(response.errors){
						for(var i = 0; i < response.errors.length; i++){
							Materialize.toast(response.errors[i].name + " no esta lista" , 4000);   
						}
					}
				});
				
		    }
		}

		$('#dropzoneFileUpload').dropzone();

		$('select').material_select();

    $('.save').on("click", function(evt){
      var items = $('.item');
      var data = [];
      for(var i = 0; i < items.length; i++)
      {
        
        var item = {
          id: $(items[i]).attr('id'),
          pocket: $(items[i]).find('.pocket option:selected').val(),
          name: $(items[i]).find('.name').val(),
          status: $(items[i]).find('.status option:selected').val(),
          length: $(items[i]).find('.length').val(),
          offset: $(items[i]).find('.offset').val(),
          diameter: $(items[i]).find('.diameter').val(),
          
        }
        data.push(item);
      }

      if(data){
        
        $.ajax({
          url: '/update',
          type: 'POST',
          data: {data: data},
        })
        .done(function(result) {
          
          if(result.error){
            Materialize.toast('No puede tener dos Herramientas en el mismo pocket', 4000);   
            
          }
          else
          {
            
            Materialize.toast('Cambios guardados', 4000);  
          }
          
        })
        .fail(function() {
          console.log("error");
          Materialize.toast('Ocurrio un error al guardar', 4000);
        });
        
      }
      
    });


        jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
        jQuery('.quantity').each(function() {
          var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

          btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
              var newVal = oldValue;
            } else {
              var newVal = oldValue + 0.1;
            }
            console.log(newVal);
            spinner.find("input").val(newVal.toPrecision(2));
            spinner.find("input").trigger("change");
          });

          btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
              var newVal = oldValue;
            } else {
              var newVal = oldValue - 0.1;
            }
            console.log(newVal);
            spinner.find("input").val(newVal.toPrecision(2));
            spinner.find("input").trigger("change");
          });

        });
	});