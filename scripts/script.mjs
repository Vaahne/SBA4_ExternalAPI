// import * as grid from "./grid.mjs";
import * as page from "./pagination.mjs";
import {setData,deleteData, postData} from "./crud.mjs";

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
    }
});

let data = []
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

    const job =  document.createElement("input");
    job.type = "text";
    job.placeholder = "Enter your job";

    const email =  document.createElement("input");
    email.type = "email";
    email.placeholder = "Enter your email";
    
    const street =  document.createElement("input");
    street.type = "text";
    street.placeholder = "Enter your Street";

    
    const city =  document.createElement("input");
    city.type = "text";
    city.placeholder = "Enter your City";

    
    const country =  document.createElement("input");
    country.type = "text";
    country.placeholder = "Enter your Country";

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Post";

    div.appendChild(name);
    div.appendChild(job);
    div.appendChild(email);
    div.appendChild(street);
    div.appendChild(city);
    div.appendChild(country);
    div.appendChild(btn);

    form.appendChild(div)
    displayContent.innerHTML = "";
    displayContent.appendChild(form)

    btn.addEventListener('click',()=>{
        if(name.value && job.value && email.value && street.value && city.value && country.value){
            postData(name.value,job.value,email.value,street.value,city.value,country.value,form);
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

    const email =  document.createElement("input");
    email.type = "email";
    email.placeholder = "Enter your email";

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Delete";

    div.appendChild(email);
    div.appendChild(btn);
    form.appendChild(div)
    displayContent.innerHTML = "";
    displayContent.appendChild(form)
    
    btn.addEventListener('click',()=>{
        if(email.value ){
            deleteData(email.value);
            return
        }
        alert("Enter a valid email");
    })
}


// getData();
// postData();