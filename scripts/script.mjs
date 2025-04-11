// import * as grid from "./grid.mjs";
import * as page from "./pagination.mjs";
import {setData} from "./crud.mjs";

const request = document.getElementById("request");
const displayContent = document.querySelector(".displayContent");

request.addEventListener('change',(e)=>{
    e.preventDefault();
    // displayContent.textContent = "";
    const value = e.target.value;
    if(value == "get"){
        getData();
    } else 
    if(value == "post"){
        post();
    } else if(value == "delete"){
        toBeDeleted();
    }else if(value == "put"){
        update();
    }
});

let data = []
getData();
async function getData(){
    const response = await axios("https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users");
    data = response.data;
    console.log(data);
    setData(data);     
    page.setData(data);
    page.displayPage(1);        // 2 steps to display in paginated data
    page.setupPagination();
    // grid.createGrid(3,data);     // to display in grid
}

function post(){
    const form = document.createElement("form");
    form.classList.add("postForm");

    const div = document.createElement("div");
    div.classList.add("postDiv");

    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Enter your name"
    name.required = true;
    name.minLength = 4;
    name.maxLength = 10;

    const image =  document.createElement("input");
    image.type = "text";
    image.placeholder = "Enter your image link";

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Post";

    div.appendChild(name);
    div.appendChild(image);
    div.appendChild(btn);

    form.appendChild(div)
    displayContent.innerHTML = "";
    displayContent.appendChild(form)

    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(name.value && image.value){
            postData(name.value,image.value);
            return
        }
        alert("Please fill the fields!!!");
    });
}



function toBeDeleted(){
    const form = document.createElement("form");
    form.classList.add("postForm");

    const div = document.createElement("div");
    div.classList.add("postDiv");

    const id = document.createElement("input");
    id.type = "text";

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Delete";

    div.appendChild(id);
    div.appendChild(btn);
    form.appendChild(div)
    displayContent.innerHTML = "";
    displayContent.appendChild(form)
    
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(id.value ){
            deleteData(id.value);
            return
        }
        alert("Enter a valid Id");
    })
}

async function postData(name,image){
    
    console.log(data[data.length-1]);
    image = "https://avatars.githubusercontent.com/u/85844724"; 
    let rawBody = JSON.stringify({
        "id": 21,
        "name": name,
        "avatar": image
    });

     const newUser = await fetch("https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: rawBody
    }); 
    console.log(await newUser.json());
    // form.reset();
    alert("Posted Successfully!!");
}

async function deleteData(id){  

    let raw = data.find(d => d.id == id);
    if(!raw){
        alert(`No data found with Id: ${id}`);
        throw new Error (`No data found with Id: ${id}`);
    }

    const response = await fetch(`https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users/${id}`,{
        method:"DELETE"})
        
    console.log(response.ok);
    if(response.ok){
        alert("Successfully deleted")
    }
    // console.log("Delete Data");
}

function update(){
    const div = document.createElement("div");
    div.classList.add("postDiv");

    const id = document.createElement("input");
    id.type = "text";
    id.placeholder = "Enter Id "

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Update"; 
    
    div.appendChild(id);
    div.appendChild(btn);

    displayContent.innerHTML = "";
    displayContent.appendChild(div);
    
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(id.value){
            updateData(id.value);
        }
    });
}

function updateData(id){
    let toUpdate = data.find(d => d.id == id);
    if(!toUpdate){
        alert(`No data found with ID: ${id}`);
        throw new Error(`No data found with ID: ${id}`);
    }
    displayFetchedData(toUpdate);
}

function displayFetchedData(toUpdate){
    const div = document.createElement("div");
    div.classList.add("postDiv");

    const name = document.createElement("input");
    name.type = "text";
    name.value = toUpdate.name;

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Update"; 
    
    div.appendChild(name);
    div.appendChild(btn);
    displayContent.innerHTML = "";
    displayContent.appendChild(div);

    btn.addEventListener('click',async (e)=>{
        if(!name.value){
            alert("Please enter a valid name !!!");
            throw new Error ("Please enter a valid name !!!");
        }
        let updatedName = {name: name.value};
        const res = await axios.put(`https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users/${id}`,updatedName);
        console.log(res.data);
    });

}
