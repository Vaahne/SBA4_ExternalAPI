
// let data = [] ;
export function createGrid(cols,data){
    const gridContainer = document.getElementById("displayGrid");
    gridContainer.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    gridContainer.innerHTML = "";
   
    for(let i in data){
        const gridEl = document.createElement("div");
        gridEl.classList.add("grid-elements");

        const name = document.createElement("p");
        name.textContent = data[i].first_name +" "+data[i].last_name;
        const email = document.createElement("p");
        email.textContent = data[i].email;
        const picture = document.createElement("img");
        picture.setAttribute("src",data[i].avatar);

        gridEl.appendChild(name);
        gridEl.appendChild(email);
        gridEl.appendChild(picture);
        gridContainer.appendChild(gridEl);
    }

}