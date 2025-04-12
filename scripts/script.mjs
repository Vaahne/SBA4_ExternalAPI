// import * as grid from "./grid.mjs";
import * as page from "./pagination.mjs";
import { setData } from "./crud.mjs";
import {post} from "./post.mjs";
import { toBeDeleted } from "./delete.mjs";
import { update } from "./update.mjs";

const request = document.getElementById("request");
// const displayContent = document.querySelector("#normalData");
const requestBtn = document.querySelector("#requestBtn");

document.addEventListener("DOMContentLoaded",getData);


requestBtn.addEventListener('click', (e) => {
    e.preventDefault();
    page.clear();
    const value = request.value;
    if (value == "get") 
        getData();
    else if (value == "post") 
        post();
    else if (value == "delete") 
        toBeDeleted();
    else if (value == "put") 
        update();   
});

export let data = []


async function getData() {
    try{
        const response = await axios("https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users");
        data = response.data;
        
        setData(data);
        page.setData(data);
        page.displayPage(1);        // 2 steps to display in paginated data
        page.setupPagination();
        // grid.createGrid(3,data);     // to display in grid
    }catch(err){
        console.log(err);
    }
}

// function update() {
//     const div = document.createElement("div");
//     div.classList.add("postDiv");

//     const id = document.createElement("input");
//     id.type = "text";
//     id.placeholder = "Enter Id to update"

//     const btn = document.createElement("input");
//     btn.type = "submit";
//     btn.value = "Update";

//     div.appendChild(id);
//     div.appendChild(btn);

//     displayContent.innerHTML = "";
//     page.clear();
//     displayContent.appendChild(div);

//     btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         if (id.value) {
//             updateData(id.value);
//         }
//     });
// }

// function updateData(id) {
//     let toUpdate = data.find(d => d.id == id);
//     if (!toUpdate) {
//         alert(`No data found with ID: ${id}`);
//         throw new Error(`No data found with ID: ${id}`);
//     }
//     displayFetchedData(toUpdate);
// }

// function displayFetchedData(toUpdate) {
//     const div = document.createElement("div");
//     div.classList.add("postDiv");

//     const name = document.createElement("input");
//     name.type = "text";
//     name.value = toUpdate.name;

//     const btn = document.createElement("input");
//     btn.type = "submit";
//     btn.value = "Update";

//     div.appendChild(name);
//     div.appendChild(btn);
//     displayContent.innerHTML = "";
//     page.clear();
//     displayContent.appendChild(div);

//     btn.addEventListener('click', async (e) => {
//         if (!name.value) {
//             alert("Please enter a valid name !!!");
//             throw new Error("Please enter a valid name !!!");
//         }
//         try{
//             let updatedName = { name: name.value };

//             await axios.put(`https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users/${toUpdate.id}`,
//                          updatedName).then(r => {
//                             console.log(r.data);
//                          })
//         }catch(err){
//             console.log(err);
//         }
//     });

// }
