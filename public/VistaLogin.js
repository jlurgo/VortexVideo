var VistaLogin = function(opt){
    this.o = opt;
    this.start();
};

VistaLogin.prototype.start = function(un_panel){
    this.ui = $('#plantilla_login').clone();
    this.txt_nombre_usuario = this.ui.find('#txt_nombre_usuario');
    var _this = this;
    
    this.ui.dialog({
        dialogClass: "no-close",
        draggable: false,
        height: 170,
        width: 440,
        modal: true,
        buttons: [ 
            { text: "Ok", 
             click: function() { 
                 if(_this.txt_nombre_usuario.val() != ""){
                    _this.o.callback_usuario(new Usuario(_this.txt_nombre_usuario.val()));
                    _this.ui.dialog( "close" );
                 }
             } 
            } ]
    }); 
    
    $('.ui-button-text').each(function(i){
        $(this).html($(this).parent().attr('text'))
    })
};
