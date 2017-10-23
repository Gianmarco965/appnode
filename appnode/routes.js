//obtenemos el modelo UserModel con toda la funcionalidad
//creamos el ruteo de la aplicación

var db=require('./queries');

function http()
{
    this.configurar=function(app)
    {

        app.get('/inventario/',function(solicitud,respuesta)
        {
            db.selecionar(respuesta);
        })
        

        app.get('/ofertas/',function(solicitud,respuesta)
        {
            db.seleccionaroferta(respuesta);
        })

        app.get('/inventario/:id/',function(solicitud,respuesta){
            db.seleccionarId(solicitud.params.id,respuesta);
        })
        
        app.post('/pedido/',function(solicitud,respuesta){

            db.seleccionarPedido(solicitud.body,respuesta);
        })
        app.get('/detallepedido/:idpedido/',function(solicitud,respuesta){
            
            db.seleccionardetalledeuda(solicitud.params.idpedido,respuesta);
        })

        app.post('/deuda/',function(solicitud,respuesta){
            db.insertardeuda(solicitud.body,respuesta);
        })
        app.post('/deuda/detalledeuda/',function(solicitud,respuesta){//eliminar soloo de prueba
            db.insertardetalleuda(solicitud.body,respuesta);
        })

         app.get('/deuda/sales/:campo/:valor/',function(solicitud,respuesta){

            if (solicitud.params.campo=="u.usuario")
            {   
                var data={campo:'u.usuario',
                        valor:solicitud.params.valor};
            }
            else if (solicitud.params.campo=="c.nombre")
            {
                var data={campo:'c.nombre',
                        valor:solicitud.params.valor};
            }
            else if (solicitud.params.campo=="c.idcliente")
            {
                var data={campo:'c.idcliente',
                        valor:solicitud.params.valor};
            }
            else if (solicitud.params.campo=="fechasistema")
            {
                
                         var data={campo:'fechasistema',
                        valor:solicitud.params.valor};
                
            }
             db.seleccionardeudasales(data,respuesta);
         })

        app.get('/categoria/reporteclientexdeuda',function(solicitud,respuesta){
        
            db.seleccionarpedidosxcliente(respuesta);

        })


        app.get('/categoria/reportedeseos',function(solicitud,respuesta)
        {
            db.seleccionarcategoriaxstock(respuesta);
        })

         app.get('/categoria/',function(solicitud,respuesta){

            db.seleccionarcategoria(respuesta);
        })
        app.get('/categoria/stock/',function(solicitud,respuesta){
            db.seleccionarcategoriaxstock(respuesta);
        })

        app.get('/categoria/reportemes/',function(solicitud,respuesta){
            db.cantidaddeudaxmes(respuesta);
        })
        

        app.post('/categoria/',function(solicitud,respuesta)
        {
            db.agregarcategoria(solicitud.body,respuesta);
        })
        
        app.post('/usuario/',function(solicitud,respuesta)
        {
            db.seleccionaridusuario(solicitud.body,respuesta);
        })

         app.get('/inventario/categoria/:idcategoria/',function(solicitud,respuesta){

            db.seleccionarproductoxcategoria(solicitud.params.idcategoria,respuesta);
        })

        app.post('/inventario/',function(solicitud,respuesta){

            db.insertar(solicitud.body,respuesta);
        })

        app.put('/inventario/',function(solicitud,respuesta)
        {
            db.actualizar(solicitud.body,respuesta);
        })

        app.post('/deseo/',function(solicitud,respuesta){
            db.agregardeseo(solicitud.body,respuesta);
        })

        app.post('/cliente/',function(solicitud,respuesta){
            db.agregarcliente(solicitud.body,respuesta);
        })
        app.get('/cliente/:campo/:valor/',function(solicitud,respuesta){


            if (solicitud.params.campo=="u.usuario")
            {   
                var data={campo:'u.usuario',
                        valor:solicitud.params.valor};
            }
            else if (solicitud.params.campo=="c.nombre")
            {
                var data={campo:'c.nombre',
                        valor:solicitud.params.valor};
            }
            else if (solicitud.params.campo=="c.idcliente")
            {
                var data={campo:'c.idcliente',
                        valor:solicitud.params.valor};
            }
            else if (solicitud.params.campo=="c.fechasistema")
            {
                
                         var data={campo:'c.fechasistema',
                        valor:solicitud.params.valor};
                
            }

            db.seleccionarclientexid(data,respuesta);
        })

        app.get('/cliente/:campo/:valor1/:valor2/',function(solicitud,respuesta){

                var data={campo:'c.fechasistema',valor1:solicitud.params.valor1,valor2:solicitud.params.valor2};

            db.seleccionarclientexintervalo(data,respuesta);
        })

        app.get('/detallecuota/:idcuota/',function(solicitud,respuesta){

            db.seleccionardetallecuota(solicitud.params.idcuota,respuesta);
        })

        app.put('/cliente/',function(solicitud,respuesta){

            db.bajasubidacliente(solicitud.body,respuesta);
        })

        app.put('/cliente/sales/',function(solicitud,respuesta){

            db.actualizarcliente(solicitud.body,respuesta);
        })

        app.get('/deseo/:idusuario/',function(solicitud,respuesta){
            db.selecionardeseo(solicitud.params.idusuario,respuesta);
        })
        
        app.put('/deseo/',function(solicitud,respuesta)
        {
            db.actualizarDeseo(solicitud.body,respuesta);
        })

        app.delete('/inventario/:id/',function(solicitud,respuesta){
            db.borrar(solicitud.params.id,respuesta);
        })

        app.post('/auth/login/',function(solicitud,respuesta){

            db.login(solicitud.body,respuesta);
        })
        
        app.post('/deuda/pay/',function(solicitud,respuesta){
                
            db.pagarcuota(solicitud.body,respuesta);
        })

      
    }
}

module.exports=new http();
