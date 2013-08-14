$(function () { 
    var router =  new NodoRouter("principal"); 
            
    ///*
    //var clienteHTTP = new NodoClienteHTTP('http://localhost:3000', 100);             
    var clienteHTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 100);             
    router.conectarBidireccionalmenteCon(clienteHTTP);
    //*/
    /*
    //var socket = io.connect('http://localhost:3000');    
    var socket = io.connect('http://router-vortex.herokuapp.com');
    var conector_socket = new NodoConectorSocket(socket);    
    router.conectarBidireccionalmenteCon(conector_socket);
    //*/
    
    var nodo_app_vxv = new NodoAppVortexVideo();        
    router.conectarBidireccionalmenteCon(nodo_app_vxv);   
    
    nodo_app_vxv.dibujarEn($('#panel_principal'))
});