// import * as grid from "./grid.mjs";
import * as page from "./pagination.mjs";
import {post} from "./post.mjs";
import { toBeDeleted } from "./delete.mjs";
import { update } from "./update.mjs";
import { search } from "./search.mjs";

const request = document.getElementById("request");
const searchBtn = document.querySelector("#searchBtn");
const searchId = document.querySelector("#searchId");

export const BASEURL = "https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users";

document.addEventListener("DOMContentLoaded",getData);

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const val  = searchId.value;
    if(!val){
        alert("Enter valid Id");
        return
    }
    page.clear();
    searchId.value = "";
    search(val);
});


request.addEventListener('change', (e) => {
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


export async function getData() {
    try{
        const response = await axios(`${BASEURL}`);
        data = response.data;
        
        page.setData(data);
        page.displayPage(1);        // 2 steps to display in paginated data
        page.setupPagination();
        // grid.createGrid(3,data);     // to display in grid
    }catch(err){
        console.log(err);
    }
}