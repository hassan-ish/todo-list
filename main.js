const add = document.getElementById("add")
const myform = document.getElementById("form")
const submit = document.getElementById("submit")
const close = document.getElementById("close")
// open the form
add.onclick = ()=>{
    myform.style.display = 'block'
}
//closing the form by cliking in X
close.onclick = ()=>{
    event.preventDefault()
    myform.style.display = 'none'
}
//closing the form by clicking outside the form
window.onclick = (e)=>{
    if(e.target.id !== 'add' && e.target.id !== 'inputForm' && e.target.id !== 'title' && e.target.id !== 'body' ) {
        myform.style.display = 'none'
    }
}


// get the data using ajax
let request = new XMLHttpRequest();
request.open('GET',"https://jsonplaceholder.typicode.com/posts")
request.send();
request.onreadystatechange = function () {
    if( this.readyState === 4 && this.status === 200 ){
        let data = JSON.parse(this.responseText);
        for (let i = 0; i < data.length; i++) {
            createCard(data[i].title ,data[i].body )
        }
    }
}


//get the inputs of the form 
const inputTitle = document.getElementById('title');
const inputbody = document.getElementById('body');

// add todos by clicking the submit in form
submit.onclick = ()=> {
    event.preventDefault();
    let myobj = {
        title: inputTitle.value ,
        body: inputbody.value ,
    }
    if(inputTitle.value !== ""){
    fetch("https://jsonplaceholder.typicode.com/posts",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myobj)
    })
    .then(res => res.json())
    .then(data => {
        createCard(data.title , data.body)
        window.scroll(0 , Number.MAX_SAFE_INTEGER);
    });
    inputTitle.value = '';
    inputbody.value = '';
}
}



// get the root
const root = document.getElementById('root');
// function to add a card to the page 
function createCard(title , body){
    let wrapdiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    
    let mytitle = document.createTextNode(title);
    let mybody = document.createTextNode(body);

    h2.appendChild(mytitle);
    p.appendChild(mybody);
    wrapdiv.appendChild(h2);
    wrapdiv.appendChild(p);

    root.appendChild(wrapdiv);
}
