var mensaje = (function(){
  var dom = {};
  dom.msg = $('.Mensaje');
  dom.msg_text = $('.Mensaje-content .text');

  var init = function(){
    ocultar();
  };

  var mostrar = function(texto){
    dom.msg_text.text(texto);
    dom.msg.addClass('is-visible');

  };

  var ocultar = function(){
    $('body').on('click', '.Mensaje-overlay', function(){
      dom.msg.removeClass('is-visible');
    });
  };

  init();

  return {
    show: mostrar
  };

})();
