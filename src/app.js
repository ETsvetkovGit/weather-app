const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// ------------------------------
const app = express()
// for heroku
const port = process.env.PORT || 3000

// dEfine paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// define handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Emil T'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        msg: 'This is a help page!',
        name: 'ET'
    })
})

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Emo'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address) {
        return res.send({
            error:'Please provide an address to search'
        })
    }

    // res.send({
    //     forecfast: 'Vienna',
    //     location: 'test',
    //     address: req.query.address
    // })
    geocode(req.query.address ,(error, {latitude, longitude, location} = {}) => {
        if(error){
            // return console.log(error)
            res.send({
                errors: error
             })
        }
        // console.log('error',error)
        // console.log('Data',data)
        forecast(latitude,longitude,(error, forecastData) => {
            if(error){
                // return console.log(error)
                return res.send({
                    errors: error
                 })
            }
    
            // console.log(data.location)
            // console.log(forecastData)
            res.send({
                location: location,
                forecast: forecastData ,
                address: req.query.address
             })

            })
    })


})

app.get('/products',(req, res)=>{
    if(!req.query.search) {
        return res.send({
            error:'No search term'
        })
    }
    console.log(req.query.search)
        res.send({
            products: []
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        errorMessage: 'Help page not found',
        name: 'Emo'
      
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'Emo'    
    })

})
//  start the server
app.listen(port, () => {
    console.log('Server is up on port ' +port)
})