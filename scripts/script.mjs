// import * as grid from "./grid.mjs";
import * as page from "./pagination.mjs";
import { setData } from "./crud.mjs";
import {post} from "./post.mjs";
import { toBeDeleted } from "./delete.mjs";
import { update } from "./update.mjs";

const request = document.getElementById("request");
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