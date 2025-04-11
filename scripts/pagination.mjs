  // import * as grid from "./grid.mjs";
  const itemsPerPage = 3;
  let currentPage = 1;

  const container = document.getElementById("paginationData") ;
  const pagination = document.getElementById("pagination") 

  let originalStyle = pagination.style.display ;

  pagination.style.display = "none";
  
  let myData = [];

  export function setData(data){
      myData = data || [];
  }

  // Display items for the current page
  export function displayPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = myData.slice(start, end);

    container.textContent = "";
    
      paginatedItems.forEach(ele =>{
        const div = document.createElement("div");
        div.classList.add("paginatedDiv");
        const name = document.createElement("p");
        name.textContent = ele.name;
        const image = document.createElement("img");
        image.setAttribute("src",ele.avatar);
        image.setAttribute("alt",ele.name);
        image.classList.add("pageImage");
        

        div.appendChild(name);
        div.appendChild(image);
        container.appendChild(div);
        pagination.style.display = originalStyle;
    })
    // grid.createGrid(2,paginatedItems);
  }

  // Generate pagination buttons
  export function setupPagination() {
    const pageCount = Math.ceil(myData.length / itemsPerPage);
    pagination.style.display = originalStyle;

    pagination.innerHTML = `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
      </li>
    `;

    for (let i = 1; i <= pageCount; i++) {
      pagination.innerHTML += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    pagination.innerHTML += `
      <li class="page-item ${currentPage === pageCount ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
      </li>
    `;

    // Add event listeners to each link
    document.querySelectorAll(".page-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = Number(link.getAttribute("data-page"));
        if (page >= 1 && page <= pageCount) {
          currentPage = page;
          displayPage(currentPage);
          setupPagination();
        }
      });
    });
  }
