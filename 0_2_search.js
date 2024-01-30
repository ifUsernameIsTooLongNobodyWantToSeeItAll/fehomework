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
let listAddPls = undefined
const clickShow = document.getElementById("search_box_2")
const elementAddPls = document.getElementById("right_side_1")
let itemsInList = document.getElementsByClassName("hot_4")
let numberHot = document.getElementsByClassName("number_in_hot_5")
let nameHot = document.getElementsByClassName("name_5")
// main
main()

// function
function main() {
    fetches()
    setTimeout(() => {
        clickShow.onmouseover = function () {
            showIt()
            listAddPls = document.getElementById("show_3")
            addElements()
            setRed()
            getHot()
        }
        clickShow.onmouseout = function () {
            removeElement()
        }
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
    for (let i = 0; i < itemsInList.length; i++) {
        numberHot[i].innerHTML = getNumber(i)
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
    let deleteElement = document.getElementById("new_item_2")
    deleteElement.remove()
}