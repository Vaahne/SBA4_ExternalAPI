
let data = []
export function setData(d){
    data = d;
}



export async function deleteData(id){  ///api/users/2

    let raw = {"id":id}

    const response = await fetch("https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users",{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        },
        body: raw
    }); 

    if(response.ok){
        alert("Successfully deleted")
    }
    console.log("Delete Data");
}

export async function postData(name,job,email,street,city,country,form){
    let rawBody = JSON.stringify({
        "name": name,
        "job" : job,
        "email": email,
        "address" : {
            "street": street,
            "city": city,
            "country":country
        }
    });

     const newUser = await fetch("https://67f8a74b2466325443ed4903.mockapi.io/sba4/v1/users",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: rawBody
    }); 
    console.log(await newUser.json());
    // form.reset();
    alert("Posted Successfully!!");
}