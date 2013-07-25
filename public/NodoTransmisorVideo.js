var NodoTransmisorVideo = function(opt){
    this.o = opt;
    this.start();
};

NodoTransmisorVideo.prototype.start = function(){
    this.ui = $('#plantilla_transmisor_video').clone();
    this.portal = new NodoPortalBidi("transmisor");
    
    this.lbl_nombre_usuario = this.ui.find("#lbl_nombre_usuario");
    this.lbl_nombre_usuario.text(this.o.nombreUsuario);
    //    var canvas = document.getElementById("canvas");
//	var	context = canvas.getContext("2d");
    this.video = this.ui.find("#video")[0];
    var videoObj = { "video": true };
    var errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};

    var _this = this;
	// Put video listeners into place
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			_this.video.src = stream;
			_this.video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			_this.video.src = window.webkitURL.createObjectURL(stream);
			_this.video.play();
		}, errBack);
	}
    
    $(this.video).click(function(){
        _this.enviarFrame();
    });
    
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.video.pedidoDeFrame"),
                                             new FiltroXClaveValor("usuarioTransmisor", this.o.nombreUsuario)]),
                                            this.pedidoDeFrameRecibido.bind(this));
};

NodoReceptorVideo.prototype.enviarFrame = function(){
    var canvas = $('<canvas>')[0];
    canvas.width  = _this.video.videoWidth;
    canvas.height = _this.video.videoHeight;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(_this.video, 0, 0);
    var imagen_serializada = canvas.toDataURL('image/jpeg');
    _this.portal.enviarMensaje({
        tipoDeMensaje: "vortex.video.frame",
        usuarioTransmisor: _this.o.nombreUsuario,
        frame: imagen_serializada
    });
};

NodoReceptorVideo.prototype.pedidoDeFrameRecibido = function(mensaje){
    this.enviarFrame();
};

NodoTransmisorVideo.prototype.conectarCon = function(nodo){
    this.portal.conectarCon(nodo);
};

NodoTransmisorVideo.prototype.recibirMensaje = function(mensaje){
    this.portal.recibirMensaje(mensaje);
};

NodoTransmisorVideo.prototype.dibujarEn = function(panel){
    panel.append(this.ui);
};