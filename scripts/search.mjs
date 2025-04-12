import { BASEURL } from "./script.mjs";

const displayContent = document.querySelector("#normalData");

export async function search(id){

    await axios.get(`${BASEURL}/${id}`).then(res => {
        console.log(res);
        res = res.data;
        console.log(res);

        const div = document.createElement("div");
        div.classList.add("searchDiv");
        
        const id = document.createElement("p");
        id.textContent = "ID: "+res.id;
        
        const name = document.createElement("p");
        name.textContent = res.name;

        const image = document.createElement("img");
        image.setAttribute("src",res.avatar);
        image.setAttribute("alt",res.name);
        image.classList.add("pageImage");
    
        div.appendChild(id);
        div.appendChild(name);
        div.appendChild(image);
        
        displayContent.innerHTML = "";
        displayContent.appendChild(div);
    }).catch((err)=>{
        alert(`${id} not found`);
        throw new Error(`Not found ${err}`)
    });
}