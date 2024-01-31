// var
let hotList = {
    code: null,
    data: [
        {
            searchWord: null,
            score: null,
            content: null,
            source: null,
            iconType: null,
            iconUrl: null,
            url: null,
            alg: null
        }
    ],
    message: null
}
let keepHot = undefined
let listAddPls = undefined
// let offset = 0
let otherElementIn0 = document.getElementById("under_0")
let otherElementInOther = document.getElementById("under_1")
const clickShow = document.getElementById("search_box_2")
const elementAddPls = document.getElementById("right_side_1")
const clickButton = document.getElementById("button_3")
const inputBox = document.getElementById("input_3")
let itemsInList = document.getElementsByClassName("hot_4")
let numberHot = document.getElementsByClassName("number_in_hot_5")
let nameHot = document.getElementsByClassName("name_5")
// main
main()

// function
function main() {
    fetches()
    setTimeout(() => {
        clickShow.addEventListener("click", function () {
            showIt()
            listAddPls = document.getElementById("show_3")
            // newItem = document.getElementById("new_item_2")
            addElements()
            setRed()
            getHot()
        })

        otherElementIn0.addEventListener("click", function () {
            removeElement()
        })

        otherElementInOther.addEventListener("click", removeElement)
    }, 100)
}

function fetches() {
    fetch("http://localhost:3000/search/hot/detail")
        .then(r => {
            r.json().then(r => hotList = r)
            console.log(`hot status: ${r.status}`)
        })
}

function showIt() {
    let add = "<div id=\"show_3\">\n<div class=\"top_place_4\">\n热搜榜\n</div>\n</div>"
    let addElement = document.createElement("div")
    addElement.innerHTML = add
    addElement.setAttribute("id", "new_item_2")
    elementAddPls.appendChild(addElement)
}

function getHot() {
    for (let i = 0; i < 20; i++) {
        numberHot[i].innerHTML = getNumber(i)
        // debugs("line 83", i)
        nameHot[i].innerHTML = hotList.data[i].searchWord
    }
}

function addElements() {
    for (let i = 0; i < hotList.data.length; i++) {
        let addElement = "<div class=\"number_in_hot_5\"></div>\n<div class=\"name_5\"></div>"
        let add = document.createElement("div")
        add.innerHTML = addElement
        add.setAttribute("class", "hot_4")
        listAddPls.appendChild(add)
    }
}

function setRed() {
    for (let i = 0; i < 3; i++) {
        numberHot[i].setAttribute("class", "number_in_hot_5 very_hot_5")
    }
}

function getNumber(i) {
    return (i + 1).toString()
}

function removeElement() {
    keepHot = hotList
    let llDelete = document.getElementsByClassName("number_in_hot_5")
    let llmDelete = document.getElementsByClassName("name_5")
    let littleDelete = document.getElementsByClassName("hot_4")
    // setTimeout(() => {
    for (const littleDeleteElement of littleDelete) {
        littleDeleteElement.remove()
    }

    for (const llDeleteElement of llDelete) {
        llDeleteElement.remove()
    }
    for (const llm of llmDelete) {
        llm.remove()
    }
    let deleteElement = document.getElementById("new_item_2")
    deleteElement.remove()
    // }, 3000)

    // debugs("line 102")
}

function directToSearchPage() {
    clickButton.onclick = function () {
        window.open(encodeURI("./6_search.html?" + "keyWord=" + inputBox.value))
    }
}

// function debugs(message = "", i = 0) {
//     if (hotList.data[i] === undefined || hotList.data[i] == null) {
//         console.log(`${message}: hot list data is null! (i = ${i})`)
//     }
//     if (keepHot == null) {
//         console.log(`${message}: keep hot is null!`)
//     }
//     if (message === "line 74")
//         console.log(
//             `${message}
//         hotList.data.length = ${hotList.data.length}
//         numberHot.length = ${numberHot.length}
//         itemsInList.length = ${itemsInList.length}`
//         )
//     if (i === -1) {
//         for (let i = 0; i < numberHot.length; i++) {
//             console.log(`i = ${i}: ${nameHot[i].innerHTML}`)
//         }
//     }
// }
//
