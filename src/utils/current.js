const request = require('postman-request')

const current = (latitude , longitude , callback)=>{
  const url = 'http://api.weatherstack.com/current?access_key=19b4189642f9944f5634a08d62592145&query='+latitude+','+longitude+'&units=m'
  request({url:url , json:true}, (error , response)=>{
    if(error){
      callback('Unable to connect weather service!' , undefined)
    }else if(response.body.error){
      callback('Unable to find location' , undefined)
  
    }else{
      callback(undefined , response.body.current.weather_descriptions[0] + '. It is currently '+response.body.current.temperature+ ' degrees out.')
    }
  })
}

module.exports = current