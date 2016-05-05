var ordenador = (function(){
  var dom = {};
  dom.canvas_aleatorios = $('.Canvas-aleatorios');
  dom.input_numero = $('.frm_ingresar').children('.ipt_numero');
  dom.btn_ordenar = $('.btn_ordenar');

  var list_numeros_ingresados = [];

  var init = function(){
    validarCampo();
    ordenarNumeros();
  };

  var validarCampo = function(){
    var frm_ingresar = $('.frm_ingresar');
    frm_ingresar.validate({
      rules: {
        ipt_numero: {
          required: true,
          digits: true,
          maxlength: 3,
          minlength: 1,
        }
      },
      messages: {
        ipt_numero: {
          required: "Ingrese un número.",
          digits: "Sólo números por favor.",
          maxlength: "3 dígitos como máximo."
        }
      },
      submitHandler: function(form){
        var numero = dom.input_numero.val();
        insertarNumero(numero);
        dom.input_numero.val('');

      }
    });
  };

  /*---------------------------------------------------------------------------*
   * Insertar el número en el canvas
  ----------------------------------------------------------------------------*/
  var insertarNumero = function(numero){
    var tpl_numero;
    var list_position;

    // Buscamos si el número ya se ha ingresado
    var number_exists = list_numeros_ingresados.indexOf(numero);
    if (number_exists ===  -1) {
      list_position = list_numeros_ingresados.push(numero) - 1;
      tpl_numero = '<span class="item-numero" data-position="'+list_position+'">'+numero+'</span>';
      dom.canvas_aleatorios.append(tpl_numero);
    }
    console.log(list_numeros_ingresados);
  };

  /*---------------------------------------------------------------------------*
   * Ordenar
  ----------------------------------------------------------------------------*/
  var ordenarNumeros = function(){
    dom.btn_ordenar.on('click', function(){

      // Validamos qe existan suficientes números para proceder a ordenar
      if (list_numeros_ingresados.length < 2) {
        mensaje.show('No existen suficientes números para ordenar.');
        return false;
      }

      // Buscamos el menor número
      var num_items = dom.canvas_aleatorios.find('.item-numero').length;
      for (var i = 0; i < num_items; i++) {

      }

      // Paso 1: Subimos la caja
      $('.item-numero[data-position="0"]').animate({
        'margin-top': '-45px'
      }, 400, function(){
      });

      // Paso 2: Ubicamos su posición

    });
  };

  return {
    start: init
  };

})();

$(function(){
  ordenador.start();
});
