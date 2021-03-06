// console.log('Client side java script is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()
        const location = search.value

        messageOne.textContent='Loading ...'
        messageTwo.textContent=''

        // console.log(location)
        // for heroku remove http://localhost:3000  from the fetch
        fetch('/weather?address='+location).then((responce)=>{
        responce.json().then((data)=>{
                if(data.error){
                    // console.log(data.error)
                  return   messageOne.textContent=data.error
                }else {
                    // console.log(data.location)
                    // console.log(data.forecast)
                    messageOne.textContent=data.location
                    messageTwo.textContent=data.forecast
                }
        })
    })

})
