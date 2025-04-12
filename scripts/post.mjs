const displayContent = document.querySelector("#normalData");

export function post() {
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

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Post";

    div.appendChild(name);
    div.appendChild(btn);

    form.appendChild(div)
    displayContent.innerHTML = "";
    displayContent.appendChild(form)

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (name.value) {
            postData(name.value);
            return
        }
        alert("Please fill the fields!!!");
    });
}

async function postData(name) {
    try {
        let image = "https://avatars.githubusercontent.com/u/85844724";
        let rawBody = JSON.stringify({
            "name": name,
            "avatar": image
        });

        const newUser = await fetch("https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: rawBody
        });
        console.log(await newUser.json());
        alert("Posted Successfully!!");
    } catch (error) {
        console.log(error);
    }
}