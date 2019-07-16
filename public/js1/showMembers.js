const inputValue = document.querySelector(".searchvalue");
const searchButton = document.querySelector(".searchButton");
const display = document.querySelector(".display");

//template
const template=document.querySelector('#template').innerHTML


// const client_id='Iv1.fcc63cf521eb4cb9'
// const client_secret='87d64a299d5b04a50655499ecc1dc265dc8af031'

const access_token='f84c22ab7e9b8e30cd2173fe6dcd315cf65561aa'

const getUsers=async (org)=>{
    console.log(org)
    const api=await fetch(`https://api.github.com/orgs/${org}/members?access_token=${access_token}&per_page=100`)
    const data=await api.json()
    return {data}
    
}
var send
const showData=async ()=>{
    getUsers(inputValue.value).then((res)=>{

        console.log(res)
        send=res.data
        send.forEach((element) => {
            var html=Mustache.render(template,{
                list:element.login,
                url:element.html_url
        })
        display.insertAdjacentHTML('beforeend',html)
        
    })  
        inputValue.value=''
    })
}

searchButton.addEventListener('click',(e)=>{
    e.preventDefault()
    display.innerHTML=''
    showData()

})


