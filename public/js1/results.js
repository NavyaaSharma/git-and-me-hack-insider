const inputValue = document.querySelector(".searchvalue");
const searchButton = document.querySelector(".searchButton");
const name = document.querySelector(".profile-name");
const username = document.querySelector(".profile-username");
const repos = document.querySelector(".profile-repos");
const url = document.querySelector(".profile-url");

const client_id='Iv1.fcc63cf521eb4cb9'
const client_secret='87d64a299d5b04a50655499ecc1dc265dc8af031'

const getUsers=async (user)=>{
    console.log(user)
    const api=await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
    const data=await api.json()
    return {data}
    
}

const showData=async ()=>{
    getUsers(inputValue.value).then((res)=>{

        console.log(res)
        name.innerHTML=`Name: <span>${res.data.name}</span>`
        username.innerHTML=`Username: <span>${res.data.login}</span>`
        repos.innerHTML=`Repositories: <span>${res.data.public_repos}</span>`
        url.innerHTML=`URL: <a href="${res.data.html_url}"><span>${res.data.html_url}</span></a>`
        inputValue.value=''
    })
}

searchButton.addEventListener('click',(e)=>{
    e.preventDefault()
    showData()
    

})


// const inputValue = document.querySelector(".searchvalue");
// const searchButton = document.querySelector(".searchButton");
// const name = document.querySelector(".profile-name");
// const username = document.querySelector(".profile-username");
// const repos = document.querySelector(".profile-repos");
// const url = document.querySelector(".profile-url");

// const client_id='Iv1.fcc63cf521eb4cb9'
// const client_secret='87d64a299d5b04a50655499ecc1dc265dc8af031'

// const getUsers=async (user)=>{
//     console.log(user)
//     const api=await fetch(`https://api.github.com/orgs/${user}/members?client_id=${client_id}&client_secret=${client_secret}`)
//     const data=await api.json()
//     return {data}
    
// }

// const showData=async ()=>{
//     getUsers(inputValue.value).then((res)=>{

//         console.log(res)

//         inputValue.value=''
//     })
// }

// searchButton.addEventListener('click',(e)=>{
//     e.preventDefault()
//     showData()
    

// })
