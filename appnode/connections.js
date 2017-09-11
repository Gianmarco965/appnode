var mysql=require('mysql');
function Conexion()
{
    this.pool=null;
    this.inicia=function()
    {
            this.pool=mysql.createPool({
                     connectionLimit: 10,
                     host:  'Localhost',
                     user: 'root',
                     password:'',
                     database:'bdtierrasac'
            })

    }
    this.obtener=function(callback)
    {
        this.pool.getConnection(function(error,connection)
        {
            callback(error,connection);
        })

    }

}
module.exports=new Conexion();
