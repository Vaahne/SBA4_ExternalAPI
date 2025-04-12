import { BASEURL } from "./script.mjs";

const displayContent = document.querySelector("#normalData");

export function post() {
    const form = document.createElement("form");

    const div = document.createElement("div");
    div.classList.add("postDiv");

    const desc = document.createElement("h6");
    desc.textContent = "Post Data into API";

    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Enter your name"
    name.required = true;
    name.minLength = 4;
    name.maxLength = 20;

    const btn = document.createElement("input");
    btn.type = "submit";
    btn.value = "Post";

    div.appendChild(desc);
    div.appendChild(name);
    div.appendChild(btn);

    form.appendChild(div)
    displayContent.innerHTML = "";
    displayContent.appendChild(form)

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let val = name.value;
        if (val) {
            name.value = "";
            postData(val);
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

        const newUser = await fetch(`${BASEURL}`, {
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