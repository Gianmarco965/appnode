var conexion=require('./connections');
var jwt=require('jsonwebtoken');


function MetodosDB()
{
    this.selecionar=function(respuesta)
    {
        conexion.obtener(function(er,cn)
        {
                cn.query("select * from producto",function(error,resultado){

                            cn.release();
                            if (error)
                            {
                                respuesta.send({estado:'Error'});

                            }
                            else
                            {
                                respuesta.send(resultado);
                            }
                });
        })
    }

this.seleccionarcategoria=function(respuesta)
    {
        conexion.obtener(function(er,cn)
        {
                cn.query("select * from categoria",function(error,resultado){

                            cn.release();
                            if (error)
                            {
                                respuesta.send({estado:'Error'});

                            }
                            else
                            {
                                respuesta.send(resultado);
                            }
                });
        })
    }
    this.seleccionarpedidosxcliente=function(respuesta)
    {
        conexion.obtener(function(er,cn)
        {
                cn.query("SELECT c.idusuario,c.nombre,c.apellido,c.empresa,COUNT(d.idusuario) as 'pedidos' FROM `cliente` c inner join usuarios s on s.idusuario=c.idusuario inner join deuda d on d.idusuario=s.idusuario where d.idestado=1 group by d.idusuario ASC",function(error,resultado){

                            cn.release();
                            if (error)
                            {
                                respuesta.send({estado:'Error'});

                            }
                            else
                            {
                                respuesta.send(resultado);
                            }
                });
        })
    }


    this.actualizarVentaStock=function(datos,respuesta)
    {
                conexion.obtener(function(er,cn){


                        cn.query("update producto set stock=stock - "+datos.cantidad+" where idproducto=?",datos.idproducto,function(error,resultado){

                                cn.release();
                                if (error)
                                        {
                                                respuesta.send({estado:'Estado'});
                                        }
                                        else
                                        {
                                                respuesta.send(resultado);
                                        }

                        })

                })

    }
    

this.seleccionarcategoriaxstock=function(respuesta)
{
        conexion.obtener(function(er,cn)
        {
                cn.query("SELECT c.idcategoria,c.nombre,c.imagen,SUM(IF(stock = 0, 1, 0)) totalcero,SUM(IF(stock>0 and stock<5,1,0)) totalmedio,COUNT(stock) totalgeneral FROM categoria c inner join producto p on p.idcategoria=c.idcategoria group BY c.idcategoria",function(error,resultado){
                        cn.release();
                        if (error)
                                {
                                        respuesta.send({estado:'Error'});
                                }
                                else{
                                        respuesta.send(resultado);
                                }

                });
        })

}

this.actualizarstock=function(datos,respuesta)
{
        conexion.obtener(function(er,cn){
                cn.query("update producto set stock=? where idproducto=?",[datos.cantidad,datos.idproducto],function(error,resultado){

                        cn.release();
                        if (error)
                                {

                                        respuesta.send({estado:'Error'});
                                }
                                else 
                                {


                                        respuesta.send(resultado);
                                }

                });



        })



}







this.seleccionareportedeseo=function(respuesta)
{
        conexion.obtener(function(er,cn)
        {
                cn.query("SELECT p.idproducto,p.nombre,COUNT(d.idproducto) as 'numero',c.nombre as 'categoria'  FROM deseo d inner join producto p on p.idproducto=d.idproducto inner join categoria c on c.idcategoria=p.idcategoria where idestado=1 GROUP BY d.idproducto ORDER by numero  DESC",function(error,resultado){
                        console.log(respuesta);
                        cn.release();
                        if (error)
                                {
                                        respuesta.send({estado:'Error'});
                                }
                                else{
                                        respuesta.send(resultado);
                                }

                });
        })

}


this.detallereportedeseo=function(respuesta)
{
                conexion.obtener(function(er,cn)
                {
                        cn.query("SELECT p.idproducto,p.nombre,c.nombre as 'categoria',concat(l.nombre ,' ',l.apellido) as 'nombres',d.fecha FROM deseo d inner join producto p on p.idproducto=d.idproducto inner join categoria c on c.idcategoria=p.idcategoria inner join cliente l on l.idusuario=d.idusuario where d.idestado=1",function(error,resultado){
                                        cn.release();
                                                if (error)
                                                        {
                                                                respuesta.send({estado:'Error'});
                                                        }
                                                else
                                                        {
                                                                respuesta.send(resultado);

                                                        }


                        })

                })


}




    this.seleccionaroferta=function(respuesta)
    {
        conexion.obtener(function(er,cn){
                cn.query("select *from producto where oferta>0",function(error,resultado){
                                cn.release();
                                if (error)
                                {
                                        respuesta.send({estado:'Error'});
                                }
                                else
                                {
                                        respuesta.send(resultado);
                                }
                });
        })
    }

   this.seleccionarproductoxcategoria=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn){
                cn.query("select *from producto where idcategoria=?",datos,function(error,resultado){
                                cn.release();
                                if (error)
                                {
                                        respuesta.send({estado:'Error'});
                                }
                                else
                                {
                                        respuesta.send(resultado);
                                }
                });
        })
    }


    this.seleccionarPedido=function(datos,respuesta)
    {
           conexion.obtener(function(er,cn){
                    cn.query("select d.iddeuda,d.fecha,d.nombre,d.apellido,d.direccion,d.telefono,d.correo,d.documento,d.idusuario,d.idestado,c.cantcuota from deuda d inner join cuota c on c.idcuota=d.idcuota where idestado=? and idusuario=?",[datos.idestado,datos.idusuario],function(error,resultado){
                            cn.release();
                            if (error)
                            {
                                    respuesta.send({estado:'Error'});
                            }
                            else
                            {
                                    respuesta.send(resultado);
                            }
                    })
            });
    }

    this.seleccionardetalledeuda=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn){

                cn.query("SELECT p.idproducto,p.nombre,t.cantidad,t.precio,(t.cantidad*t.precio) as 'total',p.imagen,t.oferta FROM detalledeuda t inner join producto p on p.idproducto=t.idproducto where t.iddeuda=?",datos,function(error,resultado){

                        cn.release();
                        if (error)
                        {
                                respuesta.send({estado:'Error'});

                        }else
                        {
                                respuesta.send(resultado);
                        }


                })
        
        

        });


    }

    this.insertardeuda=function(datos,respuesta)
    {

        conexion.obtener(function(er,cn)
        {
                cn.query("insert into cuota values (?,?)",[datos.idcuota,datos.cantcuota],function(error,resultado){
                        cn.release();
                        if (error)
                        {
                                console.log('error');
                                respuesta.send({estado:'Error'});
                        }
                        else
                        {
                                
                                datos.idcuota=resultado.insertId;


                        for(let y=0;y<datos.cantcuota;y++)

                                {

                                        conexion.obtener(function(er,cn)
                                        {
                                                cn.query("insert into detallecuota values (?,?,?,?,?)",[datos.idcuota,datos.idusuario,y+1,datos.fechaevento,'PENDIENTE'],function(error,resultado){
                                                        cn.release();
                                                        if (error)
                                                                {
                                                                        console.log('Error');

                                                                }     
                                                                else
                                                                        {
                                                                                console.log('Ok');
                                                                        }  

                                                })
                                        })

                        
                                
                                }






                                         conexion.obtener(function(er,cn){

                cn.query("insert into deuda values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[datos.iddeuda,datos.fecha,datos.nombre,datos.apellido,datos.departamento,datos.provincia,datos.distrito,datos.direccion,datos.telefono,datos.correo,datos.documento,datos.idusuario,datos.idestado,datos.idcuota],function(error,resultado){

                        cn.release();
                        if (error)
                        {
                                console.log('error');
                                respuesta.send({estado:'Error'});
                        }
                        else
                        {
                                console.log('ok');
                                datos.iddeuda=resultado.insertId;

                              
                                                      //  respuesta.send({estado:coddeuda});
                                                 
                                                        console.log('nueva conexion');
                                                        for (let x=0;x<datos.listacarro.length;x++)
                                                                { 
                                                         conexion.obtener(function(er,cn){
                                                                       
                                                                cn.query("insert into detalledeuda values (?,?,?,?,?)",[datos.iddeuda,datos.listacarro[x].idproducto,datos.listacarro[x].cantidad,datos.listacarro[x].precio,datos.listacarro[x].oferta],function(error,resultado){
                                                                                                                                                                                
                                                                        console.log(datos.listacarro[x].precio);

                                                                        console.log(resultado);
                                                                        if (error)
                                                                        {
                                                                                console.log('error');
                                                                                                                                        
                                                                        }
                                                                        else
                                                                        {
                                                                               if (x==(datos.listacarro.length-1))
                                                                               {
                                                                                        console.log('ok');
                                                                                respuesta.send({estado:'ok'});
                                                                               }
                                                                                
                                                                                                                                
                                                                        }  

                                                                          cn.release();                                                       
                                                                })
                                                                                                                            
                                                        })  
                                                      } 
                                      
                                                }

                                        })
                                        
                                })


                        }

                })

        })



       

    }





    this.seleccionardetallecuota=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn){

                cn.query("select *from detallecuota where idcuota=?",datos,function(error,resultado){

                        cn.release();
                        if (error)
                                {
                                        respuesta.send({error:'Error'});
                                }
                        else
                        {
                                        let fechaevento;
                                       
                                        resultado.forEach( (resultado) => { 
                                                fechaevento=(`${resultado.fechaevento}`); 
                                                 console.log(fechaevento);
                                                 });        
                                                 
                                                 respuesta.send(resultado);
                                                 

                                }

                })



        })


    }


    this.insertardetalleuda=function(datos,respuesta)//eliminar mas adealnte este metodo
    {
                    
        conexion.obtener(function(er,cn){

        cn.query("insert into detalledeuda values (?,?,?,?)",[datos.iddeuda,datos.idproducto,datos.cantidad,datos.precio],function(error,resultado){
                                                                                                                                     
        cn.release();        
                console.log(resultado);
                if (error)
                {
                        console.log('error');
                                                                                
                }
                else
                {
                        console.log('ok');
                        respuesta.send({estado:'ok'});
                                                                               
                }

                                                                       
                                                                                  
                                                                        
              })
                                                                
        })        
                        
            
    }



    this.seleccionarId=function(id,respuesta)
    {
            conexion.obtener(function(er,cn){
                    cn.query("select * from producto where idproducto=?",id,function(error,resultado){
                            cn.release();
                            if (error)
                            {
                                    respuesta.send({estado:'Error'});
                            }
                            else
                            {
                                    respuesta.send(resultado);
                            }
                    })
            });
    }


    this.insertar=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn){
                cn.query("insert into producto set ?",datos,function(error,resultado){
                        cn.release();
                        if (error)
                        {
                            respuesta.send({estado:'Error'});
                        }
                        else{
                            respuesta.send({estado:'OK'});
                        }
                })

        })

    }

    this.actualizar=function(datos,respuesta)
    {
            conexion.obtener(function(er,cn)
            {
                    cn.query('update producto set ? where id=?',[datos,datos.id],function(error,resultado)
                    {
                            cn.release();
                            if (error)
                            {
                                    respuesta.send({ estado:'Error' });
                            }
                            else
                            {
                                    respuesta.send({estado: 'OK' });
                            }
                    })
            })
    }

    this.borrar=function(id,respuesta)
    {
                conexion.obtener(function(er,cn){
                                cn.query('delete from producto where id= ?',id,function(error,resultado){
                                                cn.release();
                                                if (error)
                                                {
                                                        respuesta.send({estado:'Error'});
                                                }
                                                else
                                                {
                                                        respuesta.send({estado:'OK'});
                                                }

                                })

                })

    }

    this.login=function(datos,respuesta)
    {
                conexion.obtener(function(er,cn){

                                cn.query("select * from usuarios where usuario=? and pass=?",[datos.usuario,datos.pass],function(error,resultado){

                                                cn.release();
                                                if (error)
                                                {
                                                        respuesta.send('error');

                                                }
                                                else
                                                {
                                                        if (resultado.length==0)
                                                        {
                                                                console.log('No se encuentra el usuario');
                                                                respuesta.send('nofound');
                                                        }
                                                        else
                                                        {

                                                                var token=jwt.sign({
                                                                        user:datos.usuario,
                                                                        rol:'admin'
                                                                },'secreto',{expiresIn:'120s'});
                                                                 respuesta.send(token);
                                                                 
                                                 }

                                                       
                                                }


                                })



                })

    }

    this.seleccionaridusuario=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn){
                cn.query("select * from usuarios where usuario=? and pass=?",[datos.usuario,datos.pass],function(error,resultado){
                        cn.release();
                        if (error)
                        {
                                respuesta.send({estado:'Error'});
                        }
                        else
                        {
                                                var idcliente;
                                                resultado.forEach( (resultado) => { 
                                                codcliente=(`${resultado.idusuario}`); 
                                                 console.log(codcliente);
                                                 });        
                               
                                                 if (resultado[0].idrol==1)
                                                 {
                                                        respuesta.send({idcliente:codcliente,estado:'cliente'});
                                                 }
                                                 else
                                                 {
                                                         respuesta.send({idcliente:codcliente,estado:'ventas'})
                                                 }

                                

                        }

                })
        })

    }

 this.selecionardeseo=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn)
        {
                cn.query("select p.idproducto,p.nombre,p.imagen from deseo d  inner join producto p on d.idproducto=p.idproducto where d.idusuario=? and idestado=1",datos,function(error,resultado){

                            cn.release();
                            if (error)
                            {
                                respuesta.send({estado:'Error'});

                            }
                            else
                            {
                                respuesta.send(resultado);
                            }
                });
        })
    }

    this.agregarcliente=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn)
        {
                cn.query("insert into usuarios (idusuario,usuario,pass,idrol) values (?,?,?,?)",[datos.idusuario,datos.dni,datos.contra,datos.idrol],function(error,resultado){
                      
                      
                      cn.release();
                                if (error)
                                {
                                        console.log("error usuario");
                                        respuesta.send({estado:'Error'});
                                }
                                else
                                {
                                        var codusuario;

                                        datos.idusuario=resultado.insertId;
                                        
                                                        if (datos.idusuario>0)
                                                        {
                                                                console.log('ok');
                                                               
                                                                 conexion.obtener(function(er,cn){
                                                                         
                                                                          cn.query("INSERT INTO cliente values (?,?,?,?,?,?,?,?,?,?)",[datos.idcliente,datos.nombre,datos.apellido,datos.email,datos.celular,datos.genero,datos.empresa,datos.idusuario,datos.idestado,datos.fechasistema],function(error,resultado)
                                                                          {console.log(resultado);
                                                                                cn.release();

                                                                                if (error)
                                                                                {
                                                                                        
                                                                                        console.log("error");
                                                                                        respuesta.send({estado:'Error'});

                                                                                }
                                                                                else

                                                                                {
                                                                                        console.log(datos);
                                                                                        console.log("ok");
                                                                                        respuesta.send({estado:'Ok'});
                                                                                }  


                                                                         })
                                                                });  


                                                        }
                                                        
                                                
                                           

                                }



                })

        })

    }




    this.agregardeseo=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn){
        
        cn.query("select COUNT(*) as filas,idestado from deseo where idproducto=? and idusuario=?",[datos.idproducto,datos.idusuario],function(error,resultado){
                        console.log(resultado);
                       cn.release();
                       if (error)
                       {
                                respuesta.send({estado:'Error'});
                                console.log("error");
                       } 

                       else if (resultado[0].filas>=1)
                       {
                               if (resultado[0].idestado=='0')
                               {
                                       conexion.obtener(function(er,cn){

                                               cn.query('update deseo set idestado="1" where idproducto=? and idusuario=?',[datos.idproducto,datos.idusuario],function(error,resultado){
                                                     cn.release();
                                                     console.log(datos);
                                                     if (error)
                                                     {
                                                             respuesta.send({estado:"Error"});
                                                     }
                                                     else
                                                     {
                                                             respuesta.send({estado:'OK'});
                                                     }           

                                               } )
                                       })
                               }
                               else if (resultado[0].idestado=='1')
                               {
                                       console.log("Existe");
                                       respuesta.send({estado:'Existe'});
                               }
                               
                       }
                       else if(resultado[0].filas==0)
                       {

                                        
                                conexion.obtener(function(er,cn){
                                        cn.query("insert into deseo set ?",datos,function(error,resultado){
                                                cn.release();
                                                console.log(datos);
                                                if (error)
                                                {
                                                respuesta.send({estado:'Error'});
                                                }
                                                else{
                                                respuesta.send({estado:'OK'});
                                                }
                                        })
                                })   


                       }

                 })

        })




 

    }

this.actualizarProducto=function(datos,respuesta)
{
        conexion.obtener(function(er,cn){
                console.log(datos);
                cn.query('update producto set nombre=?,descripcion=?,oferta=?,precio=? where idproducto=?',[datos.nombre,datos.descripcion,datos.oferta,datos.precio,datos.idproducto],function(error,resultado){
                               
                        cn.release();
                        if (error)
                                {
                                        respuesta.send({ estado:'Error' });   

                                }
                                else
                                        {
                                                respuesta.send({estado: 'OK' });       
                                        }

                })

        })

}

this.actualizarDeseo=function(datos,respuesta)
    {
            conexion.obtener(function(er,cn)
            {
                    cn.query('update deseo set idestado="0" where idproducto=? and idusuario=?',[datos.idproducto,datos.idusuario],function(error,resultado)
                    {
                            console.log(resultado);
                            cn.release();
                            if (error)
                            {       console.log(datos);
                                    respuesta.send({ estado:'Error' });
                                    console.log("error");
                            }
                            else
                            {
                                    console.log(datos.idproducto);
                                    console.log(datos.idusuario);
                                    respuesta.send({estado: 'OK' });
                                    console.log("ok");
                            }
                    })
            })
    }

    this.agregarcategoria=function(datos,respuesta)
    {
        conexion.obtener(function(er,cn)
        {
                cn.query("insert into categoria set ? ",datos,function(error,resultado)
                {
                        console.log(resultado);
                        cn.release();
                        if (error)
                        {
                                console.log(datos);
                                respuesta.send({estado:'Error'});
                                console.log('Error');
                        }
                        else
                        {
                                console.log('ok');
                                respuesta.send({estado:'ok'});

                        }
                


                })

        })

    }

    this.seleccionarclientexid=function(datos,respuesta)
    { let cadena;
        conexion.obtener(function(er,cn){
               
                if (datos.campo=="u.usuario")
                {
                        cadena="select c.idcliente,c.nombre,c.apellido,c.email,c.celular,c.genero,c.empresa,u.usuario,u.pass,c.idestado,u.idusuario from cliente c inner join usuarios u on u.idusuario=c.idusuario where u.usuario=? and idrol=1 and idestado=3";
                }
                else if (datos.campo=="c.nombre")
                {
                         cadena="select c.idcliente,c.nombre,c.apellido,c.email,c.celular,c.genero,c.empresa,u.usuario,u.pass,c.idestado,u.idusuario from cliente c inner join usuarios u on u.idusuario=c.idusuario where c.nombre like '"+datos.valor+"%' and idrol=1 and idestado=3";
                }
                else if (datos.campo=="c.idcliente")
                {
                        cadena="select c.idcliente,c.nombre,c.apellido,c.email,c.celular,c.genero,c.empresa,u.usuario,u.pass,c.idestado,u.idusuario from cliente c inner join usuarios u on u.idusuario=c.idusuario where c.idcliente=? and idrol=1 and idestado=3";
                }
                else if (datos.campo=="c.fechasistema")
                {
                        if (datos.valor=="CURDATE()")
                        {
                                 cadena="select c.idcliente,c.nombre,c.apellido,c.email,c.celular,c.genero,c.empresa,u.usuario,u.pass,c.idestado,u.idusuario from cliente c inner join usuarios u on u.idusuario=c.idusuario where idrol=1 and idestado=3";
                        }
                       
                
                }
                
               cn.query(cadena,datos.valor,function(error,resultado)
               {
                       console.log(datos);
                        cn.release();
                        if (error)
                        {

                                respuesta.send({estado:'error'});
                        }       
                        else
                        {

                                respuesta.send(resultado);
                        }

               })

        })

    }

    this.seleccionarclientexintervalo=function(datos,respuesta)
    {
            let cadena;
            conexion.obtener(function(er,cn){

                if (datos.campo=="c.fechasistema")
                {
                        cadena="select c.idcliente,c.nombre,c.apellido,c.email,c.celular,c.genero,c.empresa,u.usuario,u.pass,c.idestado from cliente c inner join usuarios u on u.idusuario=c.idusuario where (c.fechasistema between ? and ?) and idrol=1";
                }
                cn.query(cadena,[datos.valor1,datos.valor2],function(error,resultado){
                        
                         console.log(datos);
                        cn.release();
                        if (error)
                        {

                                respuesta.send({estado:'error'});
                        }       
                        else
                        {

                                respuesta.send(resultado);
                        }

                })

            })
    }


    this.bajasubidacliente=function(datos,respuesta)
    {

        conexion.obtener(function(er,cn){

                cn.query("UPDATE cliente set idestado=? where idcliente=?",[datos.idestado,datos.idcliente],function(error,resultado){
                        console.log(datos);
                        cn.release();
                        if (error)
                        {
                                respuesta.send({estado:'error'});
                        }
                        else
                        {
                                respuesta.send({estado:'ok'});
                        }
                })
        })
    }


    this.actualizarcliente=function(datos,respuesta)
    {
            conexion.obtener(function(er,cn)
            {
                        cn.query("UPDATE cliente set nombre=?,apellido=?,email=?,celular=?,empresa=? where idcliente=?",[datos.nombre,datos.apellido,datos.email,datos.celular,datos.empresa,datos.idcliente],function(error,resultado){

                                cn.release();
                                if (error)
                                {
                                        respuesta.send({estado:'error'});
                                }
                                else
                                {

                                       conexion.obtener(function(er,cn){

                                                cn.query("UPDATE usuarios set usuario=? where idusuario=?",[datos.usuario,datos.idusuario],function(error,resultado){

                                                        if (error)
                                                        {
                                                                respuesta.send({estado:'error'});
                                                        }
                                                        else
                                                        {
                                                                respuesta.send({estado:'ok'});
                                                        }
                                
                                                })
                                       }) 
                                        
                                }

                        })
                        

            })
    }




    this.seleccionardeudasales=function(datos,respuesta)
    { let cadena;
             conexion.obtener(function(er,cn){
                
                if (datos.campo=="u.usuario")
                {
                        cadena="SELECT d.iddeuda,d.fecha,c.nombre,c.apellido,d.direccion,c.celular,u.usuario,c.email,d.idusuario,c.idestado as 'clienteestado',d.idestado,c.idcliente,COUNT(c.idcliente) as 'pedido',t.cantcuota,d.departamento,d.provincia,d.distrito,d.direccion,c.celular FROM deuda d inner join cliente c on d.idusuario=c.idusuario inner join usuarios u on u.idusuario=c.idusuario inner join cuota t on t.idcuota=d.idcuota WHERE u.usuario=? and c.idestado=3 and d.idestado=1 GROUP BY c.idcliente ORDER by d.fecha desc";
                }
                else if (datos.campo=="c.nombre")
                {
                        cadena="SELECT d.iddeuda,d.fecha,c.nombre,c.apellido,d.direccion,c.celular,u.usuario,c.email,d.idusuario,c.idestado as 'clienteestado',d.idestado,c.idcliente,COUNT(c.idcliente) as 'pedido',t.cantcuota,d.departamento,d.provincia,d.distrito,d.direccion,c.celular FROM deuda d inner join cliente c on d.idusuario=c.idusuario inner join usuarios u on u.idusuario=c.idusuario inner join cuota t on t.idcuota=d.idcuota  WHERE c.nombre like '%"+datos.valor +"%' and c.idestado=3 and d.idestado=1 GROUP BY c.idcliente ORDER by d.fecha desc";
                }
                else if (datos.campo=="c.idcliente")
                {
                        cadena="select c.idcliente,c.nombre,c.apellido,c.email,c.celular,c.genero,u.usuario,u.pass,c.idestado,u.idusuario from cliente c inner join usuarios u on u.idusuario=c.idusuario where c.idcliente=? and idrol=1 and c.idestado=3 and d.idestado=1";
                }
                else if (datos.campo=="fechasistema")
                {
                        if (datos.valor=="CURDATE()")
                        {
                                 cadena="SELECT d.iddeuda,d.fecha,c.nombre,c.apellido,d.direccion,d.telefono,d.correo,d.documento,d.idusuario,d.idestado,c.idcliente,t.cantcuota,d.departamento,d.provincia,d.distrito,d.direccion,c.celular FROM deuda d inner join cliente c on d.idusuario=c.idusuario inner join cuota t on t.idcuota=d.idcuota WHERE d.idestado=1 and c.idestado=3 ORDER by d.fecha desc";
                        }       
                        else if (datos.valor=="cancelados")
                                {
                                        cadena="SELECT d.iddeuda,d.fecha,c.nombre,c.apellido,d.direccion,d.telefono,d.correo,d.documento,d.idusuario,d.idestado,c.idcliente,t.cantcuota,d.departamento,d.provincia,d.distrito,d.direccion,c.celular FROM deuda d inner join cliente c on d.idusuario=c.idusuario inner join cuota t on t.idcuota=d.idcuota WHERE d.idestado=2 and c.idestado=3 ORDER by d.fecha desc"
                                }
                }

                        cn.query(cadena,datos.valor,function(error,resultado)
                        {
                                console.log(datos.valor)
                                cn.release();
                                if (error)
                                {
                                        console.log('error');
                                        respuesta.send({estado:'Error'});
                                }
                                else
                                {
                                        console.log('ok');
                                        respuesta.send(resultado);
                                }

                        })

            })
    }


    this.pagarcuota=function(datos,respuesta)
    {
        let cadena;
        conexion.obtener(function(er,cn){
console.log(datos);
                cn.query("update detallecuota set eventocuota=?,fechaevento=? where idcuota=? and idcliente=? and nrocuota=?",[datos.eventocuota,datos.fechaevento,datos.idcuota,datos.idcliente,datos.nrocuota],function(error,resultado){
                        cn.release();
                        if (error)
                                {
                                   respuesta.send({estado:'Error'});             
                                }
                        else
                                {
                                   respuesta.send(datos.fechaevento);
                                }


                })
        })

    }

    this.cantidaddeudaxmes=function(respuesta)
    {
        let cadena;
        conexion.obtener(function(er,cn)
        {
                cn.query("select MonthName(fecha) as mes, count(*) as cantidad from deuda where fecha >= makedate(year(curdate()), 1) and fecha < makedate(year(curdate()) + 1, 1) group by MonthName(fecha)",function(error,resultado){
                        cn.release();
                        if (error)
                                {
                                        respuesta.send({estado:'Error'});
                                }
                        else
                                {
                                        respuesta.send(resultado);
                                }



                })
        })


    }

    this.cantidadpedidos=function(respuesta)
    {
        conexion.obtener(function(er,cn){
                cn.query("SELECT SUM(IF(idestado=1,1,0)) as 'deudas', SUM(IF(idestado=2,1,0)) as 'canceladas' FROM `deuda`",function(error,resultado){

                        cn.release();
                        if(error)
                                {
                                        respuesta.send({estado:'Error'});
                                } 
                                else
                                {
                                        respuesta.send(resultado);
                                }
                })

        })

    }




}
module.exports=new MetodosDB();