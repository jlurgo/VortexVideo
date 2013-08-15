var NodoTransmisorVideo = function(opt){
    this.o = opt;
    this.start();
};

NodoTransmisorVideo.prototype.start = function(){
    this.ui = $('#plantilla_transmisor_video').clone();
    this.portal = new NodoPortalBidi("transmisor");
    
    this.lbl_nombre_usuario = this.ui.find("#lbl_nombre_usuario");
    this.lbl_nombre_usuario.text(this.o.nombreUsuario);
    
    this.video = $('<video id="video" width="320px" height="240px" autoplay></video>')[0];
    var errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};

    var _this = this;
	// Put video listeners into place
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(
            { "video": true }, 
            function(stream) {
			_this.video.src = stream;
			_this.video.play();
            setInterval(function(){
                _this.muestrearVideo();
            },100);
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(
            { "video": true }, 
            function(stream){
			_this.video.src = window.webkitURL.createObjectURL(stream);
			_this.video.play();
            setInterval(function(){
                _this.muestrearVideo();
            },100);
		}, errBack);
    }        
    
    this.ui.find("#btn_camara").click(function(){
        _this.enviarFrame();
    });    
    
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.video.pedidoDeFrame"),
                                             new FiltroXClaveValor("usuarioTransmisor", this.o.nombreUsuario)]),
                                            this.pedidoDeFrameRecibido.bind(this));
    
    this.canvas = this.ui.find("#canvas_transmisor");
    this.canvas[0].width  = 320;
    this.canvas[0].height = 240;
    this.canvas.context = this.canvas[0].getContext('2d');
    
    this.canvas.context.beginPath();
    this.canvas.context.fillStyle = 'orange';
    this.canvas.context.fillRect(0, 0, 320, 240);

    this.canvas_dibujo = this.ui.find('#canvas_dibujo');
    this.canvas_dibujo[0].width  = 320;
    this.canvas_dibujo[0].height = 240;
    this.canvas_dibujo.context = this.canvas_dibujo[0].getContext('2d');
    
    this.canvas_dibujo.mousedown(function(e){		
        _this.canvas_dibujo.context.fillRect(e.offsetX-1,e.offsetY-1,2,2);	
        _this.canvas_dibujo.context.moveTo(e.offsetX, e.offsetY);
		_this.canvas_dibujo.context.beginPath();        
		_this.mouseDown = true;
    });
    this.canvas_dibujo.mousemove(function(e){
		if(_this.mouseDown){			
			_this.canvas_dibujo.context.lineTo(e.offsetX, e.offsetY);
			_this.canvas_dibujo.context.stroke();	
		}
    });
    this.canvas_dibujo.mouseup(function(e){
		_this.mouseDown = false;
    });
};

NodoTransmisorVideo.prototype.muestrearVideo = function(){
    this.canvas.context.drawImage(this.video, 0, 0, 320, 240);
};

NodoTransmisorVideo.prototype.enviarFrame = function(){
    var canvas = $('<canvas>')[0];
    canvas.width  = 320;
    canvas.height = 240;
    var ctx = canvas.getContext('2d');
    
    ctx.drawImage(this.canvas[0], 0, 0);
    ctx.drawImage(this.canvas_dibujo[0], 0, 0);
    
    var imagen_serializada = canvas.toDataURL('image/jpeg');
    this.portal.enviarMensaje({
        tipoDeMensaje: "vortex.video.frame",
        usuarioTransmisor: this.o.nombreUsuario,
        frame: imagen_serializada
    });
};

NodoTransmisorVideo.prototype.pedidoDeFrameRecibido = function(mensaje){
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