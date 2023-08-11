const data = JSON.parse(localStorage.getItem("user") || "[]")

let UpdatbleIndex = -1

const inputs = {
    firstName: document.getElementById("firstName").children[0],
    lastName: document.getElementById("lastName").children[0],
    phone: document.getElementById("phone").children[0]
}

const btn = document.getElementById("btn")

const addData = () => {
    const user = {
        firstName: inputs.firstName.value, 
        lastName: inputs.lastName.value,
        phone: inputs.phone.value
    }

    let isExist = data.findIndex((x) => x.phone === user.phone)


    if (isExist > -1) {
        alert("Phone is already Exist")
        return

    }

    data.push(user)
    localStorage.setItem("user", JSON.stringify(data))
    showData()
}

const UpdateData = () => {
    const user = {
        firstName: inputs.firstName.value,
        lastName: inputs.lastName.value,
        phone: inputs.phone.value
    }

    let isExist = data.findIndex((x) => x.phone === user.phone)


    if (isExist > -1 && UpdatbleIndex !== isExist) {
        alert("Phone is already Exist")
        return

    }
    data[UpdatbleIndex] = user
    localStorage.setItem("user", JSON.stringify(data))
    showData()


    inputs.firstName.value = ""
    inputs.lastName.value = ""
    inputs.phone.value = ""
    btn.innerText = "Submit"
    btn.className = "btn btn-success"
    btn.removeEventListener("click", UpdateData)
    btn.addEventListener("click", addData)

}


btn.addEventListener("click", addData)


const showData = () => {
    let tbl = document.getElementById("tbl")
    let i = 0;

    while (i < data.length) {
        let tr = document.getElementById(i + 1)

        if (tr) {
            tr.remove()
        }
        tr = document.createElement("tr")
        tr.id = i + 1

        let firstName = document.createElement("td")
        let lastName = document.createElement("td")
        let phone = document.createElement("td")
        let action = document.createElement("td")


        action.className = "d-flex justify-content-center align-items-center gap-2"


        let remove = document.createElement("button")


        remove.innerText = "Remove"
        remove.className = "btn btn-danger"

        remove.id = `rm_${i + 1}`

        remove.addEventListener("click", (e) => {
            const id = e.target.id.split('_')[1]

            const row = document.getElementById(id)

            if (row) {
                row.remove()
            }
            data.splice(id - 1, 1)

            localStorage.setItem("user", JSON.stringify(data))

            // const currentRow = document.getElementById(id);
            // currentRow.remove();


        })

        let update = document.createElement("button")

        update.className = "btn btn-success"
        update.id = `up_${i + 1}`

        update.innerText = 'Update'

        update.addEventListener("click", (e) => {
            const index = Number(e.target.id.split("_")[1]) - 1
            UpdatbleIndex = index
            inputs.firstName.value = data[index].firstName
            inputs.lastName.value = data[index].lastName
            inputs.phone.value = data[index].phone
            btn.innerText = "Update"
            btn.className = "btn btn-primary"
            btn.removeEventListener("click", addData)
            btn.addEventListener("click", UpdateData)
        })

        action.appendChild(remove)
        action.appendChild(update)

        firstName.innerText = data[i].firstName
        lastName.innerText = data[i].lastName
        phone.innerText = data[i].phone


        tr.appendChild(firstName)
        tr.appendChild(lastName)
        tr.appendChild(phone)
        tr.appendChild(action)
        tbl.appendChild(tr)

        console.log(tr);

        i++;
    }
}

showData()