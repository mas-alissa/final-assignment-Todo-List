let inputVal = document.getElementById("inputVal");
let btn = document.getElementById("btn");
let container = document.querySelector(".container")

btn.addEventListener("click", function () {
    let post = async () => {
        let res = await fetch("http://localhost:3000", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ description: inputVal.value, done: false })
        });
        let data = await res.json();
    }
    post();
    container.innerHTML = "";
    inputVal.value = "";
    Get();
})

let Get = async () => {
    let res = await fetch("http://localhost:3000", {
        method: "GET",
        headers: { "content-type": "application/json" },
    });
    let data = await res.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let mainDiv = document.createElement("div");
        mainDiv.style.border = "1px solid black";
        mainDiv.style.margin = "10px";
        mainDiv.style.display = "flex";
        mainDiv.style.width = "500px";
        mainDiv.style.justifyContent = "space-between"
        let nieuwDivLeft = document.createElement("div");

        let newCheckboxItem = document.createElement("input");
        newCheckboxItem.setAttribute("type", "checkbox");
        let niewLabel = document.createElement("label");

        if(data[i].done === true){
         
            newCheckboxItem.checked = true;
            niewLabel.style.textDecoration = "line-through"
        } else {
            newCheckboxItem.checked = false;
        }
        


        niewLabel.innerHTML = data[i].description
        niewLabel.setAttribute("contentEditable", "true");
        niewLabel.id = data[i]._id
        niewLabel.addEventListener("keyup", function (e) {
            putData(this.innerHTML, this.id)

        })

        newCheckboxItem.addEventListener("click", function () {
            if (newCheckboxItem.checked === true) {
                this.nextSibling.style.textDecoration = "line-through"
                done(this.nextElementSibling.id, true);
            } else {
                this.nextSibling.style.textDecoration = "none";
                done(this.nextElementSibling.id, false)
            }
        })
        let delIcon = document.createElement("i");
        delIcon.innerHTML = "delete_sweep";
        delIcon.classList.add("material-icons");
        delIcon.style.cursor = "pointer"
        delIcon.id = data[i]._id;
        delIcon.addEventListener("click", function () {
            deleteFunction(this.id, container);
        })

        nieuwDivLeft.appendChild(newCheckboxItem);
        nieuwDivLeft.appendChild(niewLabel);

        mainDiv.appendChild(nieuwDivLeft);
        mainDiv.appendChild(delIcon);
        container.appendChild(mainDiv);
    }

}
Get();


let putData = async (text, id) => {
    let response = await fetch("http://localhost:3000/" + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ description: text })
    })
    let json = await response.json();
    console.log(json)
}

let done = async (id, value) => {
    let response = await fetch("http://localhost:3000/" + id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ done: value })
    })
    let json = await response.json();
    console.log(json)
}


let deleteFunction = async (id) => {
    let response = await fetch("http://localhost:3000/" + id, {
        method: "DELETE"
    })
    container.innerHTML = "";
    Get();
}