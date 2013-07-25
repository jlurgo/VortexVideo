$(function () { 
    var router =  new NodoRouter("principal"); 
            
    var clienteHTTP = new NodoClienteHTTP('http://kfgodel.info:62626/vortex', 1000);             
    router.conectarBidireccionalmenteCon(clienteHTTP);
    
    var nodo_app_vxv = new NodoAppVortexVideo();        
    router.conectarBidireccionalmenteCon(nodo_app_vxv);   
    
    nodo_app_vxv.dibujarEn($('#panel_principal'))
});