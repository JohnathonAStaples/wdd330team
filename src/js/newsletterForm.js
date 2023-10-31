document.addEventListener("DOMContentLoaded", () => {
    document
    .getElementById("newsletterForm")
    .addEventListener("submit", handleForm);
});

async function handleForm(ev) {
    ev.preventDefault(); //stop the page reloading
    //console.dir(ev.target);
    let newsletterForm = ev.target;
    let fd = new FormData(newsletterForm);  //fd is the form data object that will hold everything

    //add more things that were not in the form

    fd.append ("api-key", "myApiKey");

    //look at all the contents
    for (let key of fd.keys()) {
        console.log(key, fd.get(key));
    }

    let json = await convertFD2JSON(fd);

    let url = "http://localhost:5173"; // Make sure this URL is correct
    let h = new Headers();
    h.append("Content-type", "application/json");

    let req = new Request(url, {
        headers: h, 
        body: json,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    fetch(req)
        .then((res) => res.json())
        .then((data) => {
            console.log("Response from server");
            console.log(data);
        })
        .catch(console.warn);
    
}

function convertFD2JSON(newsletterForm) {
    let obj = {};
    for (let key of newsletterForm.keys()) {
        obj[key] = newsletterForm.get(key);
    }
    return JSON.stringify(obj);
}
