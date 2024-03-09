// var
page = 4
const head = document.getElementById("head_4")
const username = document.getElementById("username_4")
const buttons = document.getElementsByClassName("categories_5")
const pictures = document.getElementsByClassName("picture_8")
const playedNumber = document.getElementsByClassName("number_9")
const descriptions = document.getElementsByClassName("description_8")
const items = document.getElementsByClassName("every_item_6")
let userInformation
let categories = {
    tags: [
        {
            playlistTag: {
                id: null,
                name: null,
            },
            name: null,
            id: null,
        }
    ],
    code: null
}
let geDanInformation = {
    playlists: [
        {
            name: null,
            playCount: null,
            coverImgUrl: null
        }
    ],
    total: null,
    code: null,
    more: null,
    cat: null
}
// main
main()

// function
function main() {
    fetches()
    setTimeout(() => {
        getCategory()
        getGeDanInformation(0)
        clickButton()
    }, 500)
}

function fetches() {

    fetch(`http://localhost:3000/playlist/hot?t=${new Date().getTime()}`).then(r => {
        r.json().then(r => categories = r)
        console.log(r.status)
    })

    fetch(`http://localhost:3000/top/playlist?t=${new Date().getTime()}`).then(r => {
        r.json().then(r => geDanInformation = r)
        console.log(r.status)
    })
}


function getCategory() {
    for (let i = 0; i < categories.tags.length; i++) {
        buttons[categories.tags.length - i - 1].textContent = categories.tags[i].name
    }
}

function getGeDanInformation(categoryCode = 0) {
    if (categoryCode !== 0) {
        for (let i = 0; i < categories.tags.length; i++) {
            if (categoryCode === categories.tags[i].playlistTag.id) {
                fetch(`http://localhost:3000/top/playlist?cat=${categories.tags[i].name}&t=${new Date().getTime()}`)
                    .then(r => {
                        r.json().then(r => geDanInformation = r)
                        console.log(r.status)
                    })
            }
        }
    }


    setTimeout(() => {
        for (let i = 0; i < items.length; i++) {
            pictures[i].style.cssText += `background: url(${editUrls(geDanInformation.playlists[i].coverImgUrl)})`
            playedNumber[i].innerHTML = geDanInformation.playlists[i].playCount
            descriptions[i].innerHTML = geDanInformation.playlists[i].name
        }
    }, 300)
}

function clickButton() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            getGeDanInformation(categories.tags[buttons.length - i - 1].playlistTag.id)
        })
    }
}

function editUrls(url) {
    let urlNew = ''
    for (let i of url) {
        if (i !== '?') {
            urlNew += i
        } else {
            break
        }
    }
    return urlNew + "?param=215y215"
}