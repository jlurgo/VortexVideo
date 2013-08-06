$(function () { 
    var router =  new NodoRouter("principal"); 
            
    //var clienteHTTP = new NodoClienteHTTP('http://localhost:3000', 100);             
    var clienteHTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 100);             
    router.conectarBidireccionalmenteCon(clienteHTTP);
    
    var nodo_app_vxv = new NodoAppVortexVideo();        
    router.conectarBidireccionalmenteCon(nodo_app_vxv);   
    
    nodo_app_vxv.dibujarEn($('#panel_principal'))
});