import {data} from "./script.mjs";

const displayContent = document.querySelector("#normalData");

export function update() {
    const div = document.createElement("div");
    div.classList.add("postDiv");

    const id = document.createElement("input");
    id.type = "text";
    id.placeholder = "Enter Id to update"

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Update";

    div.appendChild(id);
    div.appendChild(btn);

    displayContent.innerHTML = "";
    // page.clear();
    displayContent.appendChild(div);

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (id.value) {
            updateData(id.value);
        }
    });
}

function updateData(id) {
    let toUpdate = data.find(d => d.id == id);
    if (!toUpdate) {
        alert(`No data found with ID: ${id}`);
        throw new Error(`No data found with ID: ${id}`);
    }
    displayFetchedData(toUpdate);
}

function displayFetchedData(toUpdate) {
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
    // page.clear();
    displayContent.appendChild(div);

    btn.addEventListener('click', async (e) => {
        if (!name.value) {
            alert("Please enter a valid name !!!");
            throw new Error("Please enter a valid name !!!");
        }
        try{
            let updatedName = { name: name.value };

            await axios.put(`https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users/${toUpdate.id}`,
                         updatedName).then(r => {
                            console.log(r.data);
                            // name.reset();
                            alert("Updated Successfully!!!");
                         })
        }catch(err){
            console.log(err);
        }
    });

}