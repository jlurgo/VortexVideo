var NodoReceptorVideo = function(opt){
    this.o = opt;
    this.start();
};

NodoReceptorVideo.prototype.start = function(){
    this.ui = $('#plantilla_receptor_video').clone();
    this.portal = new NodoPortalBidi("receptor de " + this.o.nombreUsuarioTransmisor);
    this.img = this.ui.find("#img");
    this.lbl_nombre_usuario = this.ui.find("#lbl_nombre_usuario");
    this.lbl_nombre_usuario.text(this.o.nombreUsuarioTransmisor);
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.video.frame"),
                                             new FiltroXClaveValor("usuarioTransmisor", this.o.nombreUsuarioTransmisor)]),
                                            this.frameRecibido.bind(this));
    var _this = this;
    this.ui.click(function(){
        _this.portal.enviarMensaje({
            tipoDeMensaje: "vortex.video.pedidoDeFrame",
            usuarioTransimisor: _this.o.nombreUsuarioTransmisor
        });
    });
};

NodoReceptorVideo.prototype.frameRecibido = function(mensaje){
    this.img.attr('src', mensaje.frame);
};

NodoReceptorVideo.prototype.conectarCon = function(nodo){
    this.portal.conectarCon(nodo);
};

NodoReceptorVideo.prototype.recibirMensaje = function(mensaje){
    this.portal.recibirMensaje(mensaje);
};

NodoReceptorVideo.prototype.dibujarEn = function(panel){
    panel.append(this.ui);
};