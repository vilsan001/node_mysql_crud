const express = require('express')
const app = express()
const conn = require('./config')
app.set('view engine', 'hbs')


app.get('/',(req,resp)=>{

    let qry = 'select * from tab2'

    conn.query(qry,(err,result)=>{

        if(err) throw err
        else{
            resp.render('index',{data:result})
        }
        
    })

})

app.get('/add',(req,resp)=>{

    resp.render('add')

})

app.get('/search',(req,resp)=>{

    resp.render('search')

})


app.get('/update',(req,resp)=>{

    resp.render('update')

})


app.get('/delete',(req,resp)=>{

    resp.render('delete')

})


app.get('/view',(req,resp)=>{

    let qry = 'select * from tab2'

    conn.query(qry,(err,result)=>{

        if(err) throw err
        else{
            resp.render('view',{data:result})
        }
        
    })

})


app.get('/adddata',(req,resp)=>{

   /*  resp.send(req.query)    to get all data in jason form   */  

   const name = req.query.name 
   const classs = req.query.class   // easy way  =  const {name,classs,address} = req.query     'class' is already an keyword in node.js
   const address = req.query.address

   let qrr = "select * from tab2 where name=?"
   conn.query(qrr,[name,classs,address],(err,result)=>{

    if(err) throw err
    else {
        if(result.length > 0){
            resp.render('add',{isalready:true})
        }

        else{
            let qrr2 = "insert into tab2 values(?,?,?)"

           conn.query(qrr2,[name,classs,address],(err,result)=>{
             
            if(result.affectedRows>0){
                resp.render('add',{isinserted:true})
            }
            

           })  
        }
    }

   })


})




app.get('/searchdata',(req,resp)=>{

    

 let address = req.query.search

 // resp.send(address)

 let qry = 'select * from tab2 where address=?'

  conn.query(qry,address,(err,result)=>{

    if(err) throw err

    else{
        if(result.length>0){
            resp.render('search', {msg1:true,data:result})
        }

        else{
            resp.render('search',{msg2:true})
        }
    }

 })  

})


app.get('/updatesearch',(req,resp)=>{

     let address = req.query.updatesearch


     // resp.send(address)


      let qry = 'select * from tab2 where address=?'

      conn.query(qry,address,(err,result)=>{

       if(err) throw err
       else{
        if(result.length>0){
            resp.render('update',{msg1:true, data:result})
        }

        else{
            resp.render('update',{msg2:true})
        }
       }

      })
})



app.get('/updatedataa',(req,resp)=>{


    const {name,classs,address}= req.query

  // resp.send(classs)

  let qrrr = 'update tab2 set name=?,classs=?,address=? where address=?'


  conn.query(qrrr,[name,classs,address,address],(err,result)=>{


    if(err) throw err
    else{
        if(result.affectedRows>0){
            resp.render('update',{umsg:true})
        }

        else{
            resp.render('update',{umsg2:false})
        }
    }

  })

})


app.get('/deletedate',(req,resp)=>{

const {address} = req.query


let qry2 = 'delete  from tab2 where address=?'

      conn.query(qry2,[address],(err,result)=>{

       if(err) throw err
       else{
        if(result.affectedRows>0){
            resp.render('delete',{msg1:true})
        }

        else{
            resp.render('delete',{msg2:true})
        }
       }

      })
})



app.listen(4500)