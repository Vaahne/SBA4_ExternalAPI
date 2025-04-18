import {BASEURL,data} from "./script.mjs";

const displayContent = document.querySelector("#normalData");

export function toBeDeleted() {
    const form = document.createElement("form");
    form.classList.add("postForm");

    const div = document.createElement("div");
    div.classList.add("postDiv");

    const desc = document.createElement("h6");
    desc.textContent = "Delete Data from API";


    const id = document.createElement("input");
    id.type = "text";
    id.placeholder = "Enter Id to delete";

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Delete";

    div.appendChild(desc);
    div.appendChild(id);
    div.appendChild(btn);
    form.appendChild(div)
    displayContent.innerHTML = "";
    displayContent.appendChild(form)

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let val = id.value;
        if (val) {
            id.value = "";
            deleteData(val);
            return
        }
        alert("Enter a valid Id");
    })
}

async function deleteData(id) {

    let raw = data.find(d => d.id == id);
    if (!raw) {
        alert(`No data found with Id: ${id}`);
        throw new Error(`No data found with Id: ${id}`);
    }

    const response = await fetch(`${BASEURL}/${id}`, {
        method: "DELETE"
    })

    console.log(response.ok);
    if (response.ok) {
        alert("Successfully deleted")
    }
}
