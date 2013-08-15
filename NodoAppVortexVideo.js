var NodoAppVortexVideo = function(opt){
    this.o = opt;
    this.start();
};

NodoAppVortexVideo.prototype.start = function(){
    this.ui = $('#plantilla_app_vortex_video').clone();
    this.router = new NodoRouter("app vxv");
    
    var _this = this;
    var vista_login = new VistaLogin({
        callback_usuario: function(un_usuario){
            _this.setUsuarioLogueado(un_usuario);
        }
    });
    
    this.panel_amigos = this.ui.find('#panel_amigos');
    this.txt_nombre_amigo = this.ui.find('#txt_nombre_amigo');
    this.btn_crear_receptor = this.ui.find('#btn_crear_receptor');
};

NodoAppVortexVideo.prototype.setUsuarioLogueado = function(un_usuario){
    this.usuarioLogueado = un_usuario;
    
    this.transmisor = new NodoTransmisorVideo({nombreUsuario: this.usuarioLogueado.nombre});
    this.router.conectarBidireccionalmenteCon(this.transmisor);
    this.transmisor.dibujarEn(this.panel_amigos);
    
    var _this = this;
    
    this.btn_crear_receptor.click(function(){
        _this.crearReceptor();
    });
    
    this.txt_nombre_amigo.keypress(function(e) {
        if(e.which == 13) {
            _this.crearReceptor();
        }
    });    
};

NodoAppVortexVideo.prototype.crearReceptor = function(){
    var un_receptor = new NodoReceptorVideo({nombreUsuarioTransmisor: this.txt_nombre_amigo.val()});      
    this.router.conectarBidireccionalmenteCon(un_receptor);
    un_receptor.dibujarEn(this.panel_amigos);
    this.txt_nombre_amigo.val("");
};

NodoAppVortexVideo.prototype.conectarCon = function(nodo){
    this.router.conectarCon(nodo);
};

NodoAppVortexVideo.prototype.recibirMensaje = function(mensaje){
    this.router.recibirMensaje(mensaje);
};

NodoAppVortexVideo.prototype.dibujarEn = function(panel){
    panel.append(this.ui);
};

