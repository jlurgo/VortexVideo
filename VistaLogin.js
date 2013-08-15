var VistaLogin = function(opt){
    this.o = opt;
    this.start();
};

VistaLogin.prototype.start = function(un_panel){
    var _this = this;    
    this.ui = $('#plantilla_login').clone();    
    this.txt_nombre_usuario = this.ui.find('#txt_nombre_usuario');
    this.txt_nombre_usuario.keypress(function(e) {
        if(e.which == 13) {
            _this.continuar();
        }
    });    
    this.ui.dialog({
        dialogClass: "no-close",
        draggable: false,
        height: 170,
        width: 440,
        modal: true,
        buttons: [ 
            { text: "Ok", 
             click: function() { 
                 _this.continuar();
             } 
            } ]
    }); 
    
    $('.ui-button-text').each(function(i){
        $(this).html($(this).parent().attr('text'))
    })
};

VistaLogin.prototype.continuar = function(){
    if(this.txt_nombre_usuario.val() != ""){
        this.o.callback_usuario(new Usuario(this.txt_nombre_usuario.val()));
        this.ui.dialog( "close" );
     }
};