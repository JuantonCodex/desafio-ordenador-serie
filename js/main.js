var ordenador = (function(){
  var dom = {};
  dom.canvas_aleatorios = $('.Canvas-aleatorios');
  dom.btn_ordenar = $('.btn_ordenar');
  dom.frm_ingreso = $('.frm_ingresar');
  dom.input_numero = dom.frm_ingreso.children('.ipt_numero');

  var list_numeros_ingresados = [];

  var init = function(){
    events.validarCampoNumero();
    suscribeEvents();
  };

  // Eventos que tendran los elementos del DOM
  var suscribeEvents = function(){

    // Botón Ordenar
    dom.btn_ordenar.on('click', function(){

      // Validamos que existan suficientes números para llamar al método ordenarNumeros.
      if (list_numeros_ingresados.length < 2) {
        mensaje.show('No existen suficientes números para ordenar.');
      } else {
        events.ordenarNumeros();
      }
    });
  };

  var events = {};

  /**
   * Validamos el campo que sirve para ingresar los números aleatorios:
   * No se permite textos o signos, sólo se permite números enteros y positivos.
   */
  events.validarCampoNumero = function(){
    dom.frm_ingreso.validate({
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
        events.ingresarNumero(numero);
        dom.input_numero.val('');
      }
    });
  };

  /**
   * Ingresamos números aleatorios no repetidos al canvas
   * @param  {[number]} numero Valor que se ingresó desde el formulario
   */
  events.ingresarNumero = function(numero){
    var tpl_numero;
    var list_position;

    // Buscamos si el número ya se ha ingresado
    var number_exists = list_numeros_ingresados.indexOf(numero);
    if (number_exists ===  -1) {
      list_position = list_numeros_ingresados.push(numero) - 1;
      tpl_numero = '<span class="item-numero" data-value="'+numero+'">'+numero+'</span>';
      dom.canvas_aleatorios.append(tpl_numero);
    }
  };

  /**
   * Ordenamos lo números de forma ascendente, se animarán los bloques
   * en el proceso.
   */
  events.ordenarNumeros = function(){


    // Ordenamos los valores del array y luego lo ordenamos en el DOM
    var lista_ordenada = list_numeros_ingresados.sort(function(a,b){ return a - b; });
    console.log(lista_ordenada);
    var pos_lista_ordenada = 0;

    /**
     * Cambiamos la posición del item, lo colocamos antes de item de mayor valor
     * más inmediato de izquierda a derecha en el canvas.
     * @param  {dom} selected_item Elemento dom con jquery
     * @param  {dom} item_destino Elemento dom con jquery
     * @return {[type]}              [description]
     */
    var changePosition = function (selected_item, item_destino){

      // Retiramos el item de la lista aleatoria
      selected_item.animate({ 'top':'-45px' }, 500, function(){

        // Mantenemos fijo al item activo asignándole la propiedad position con valor absolute
        var pos_left = selected_item.position().left;
        selected_item.addClass('fijo').css('left',pos_left);

        // Hacemos el espacio donde se insertará el item
        item_destino.animate({ 'margin-left':'35px' },500, function(){

          // Insertamos el item en su nueva posición
          var posX_destino = item_destino.index() * 35;
          selected_item
            .animate({'left': posX_destino}, 500)
            .animate({'top': 0}, 500, function(){
              $(this)
                .insertBefore(item_destino)
                .css('left','0')
                .removeClass('fijo');

              item_destino.css('margin-left','0');

              /**
               * Procesamos el siguiente item hasta terminar con todos
               * los elementos de la lista ordenada
               */
              pos_lista_ordenada++;
              procesarItem();
            });

        });

      });
    };

    /**
     * Detecta si el item quese pasa como parámetro debe ser reordenado,
     * de ser el caso se llama a la función 'changePosition'
     * @param  {number} index Valor del índice en el array 'lista_ordenada'
     */
    var procesarItem = function (){
      // Detectamos que se haya recorrido toda la lista
      // console.log('End: ',pos_lista_ordenada, lista_ordenada.length);
      if( pos_lista_ordenada >= (lista_ordenada.length-1)){
        console.log('end');
        pos_lista_ordenada = 0;
        return false;
      }

      var index = pos_lista_ordenada;

      var selected_item = dom.canvas_aleatorios.children('.item-numero[data-value="'+lista_ordenada[index]+'"]');

      var index_selected_item = selected_item.index();
      var val_selected_item = lista_ordenada[index];
      console.log('index->', index_selected_item,' value: ', val_selected_item);

      if (index_selected_item === 0) {
        pos_lista_ordenada++;
        procesarItem();
        return false;
      }
      /**
       * Comparamos con todos los items anteriores de izquierda a derecha a ver si encontramos
       * alguno que sea mayor al item seleccionado. Si lo encontramos paramos la busqueda y
       * es ahi donde vamos a insertarlo (un posición antes).
       */
      for (var i = 0; i < index_selected_item; i++) {
        console.log('for ...');
        var prev_item = dom.canvas_aleatorios.find('.item-numero:eq('+i+')');
        var val_prev_item = prev_item.data('value');

        if (val_prev_item > val_selected_item) {
          changePosition(selected_item, prev_item);
          return false;
        }

        if (i === index_selected_item-1) {
          pos_lista_ordenada++;
          procesarItem();
        }
      }

    };

    procesarItem();
  };

  return {
    start: init
  };

})();

$(function(){
  ordenador.start();
});
