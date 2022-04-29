const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const current = require('./utils/current')

const port = process.env.PORT || 3000

const app = express()

//app.com
//app.com/help
//app.com//about

//define paths for express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//setup handlebars engine and views location
app.set('views' , viewsPath)
app.set('view engine' , 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' ,(req , res)=>{
  res.render('index', {
    title:'Weather',
    name:'bharat wadhwa'
  })
})

app.get('/about' , (req , res)=>{
  res.render('about' , {
    title:'About Me',
    name:'bharat wadhwa'
  })
})

app.get('/help' , (req , res)=>{
  res.render('help' , {
    title:'Help',
    helpText:'weatherAppByBharat.com',
    name:'bharat wadhwa'
  })
})


app.get('/weather' , (req , res)=>{
  if(!req.query.address){
    return res.send({
      error:'address neccassary'
    })
  }
  geocode(req.query.address , (error,data)=>{
    if(error){
      return res.send({error})
    }
    
    current(data.latitude , data.longitude , (error,currentData)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        location: data.location,
        currentData: currentData
      })

    })
  })


  // res.send(
  //   {
  //     location:'gurugram' , 
  //     temperature:50
  //   }
  //   )
})

app.get('/products' , (req,res)=>{
  if(!req.query.search){
    return res.send('search query neccessary')
  }
  console.log(req.query)
  res.send({
    products:[]
  })
})

app.get('/help/*' , (req,res)=>{
  res.render('404page',{
    title:'404',
    about:'article not found',
    name:'bharat wadhwa'
  })
})

app.get('*' , (req,res)=>{
  res.render('404page' ,{
    title:'404',
    about:'page not found',
    name:'bharat wadhwa'
  } )
})

app.listen(port , ()=>{
  console.log('server in up on port '+port)
})