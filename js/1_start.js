// cd E:\fehomework\NeteaseCloudMusicApi-master\NeteaseCloudMusicApi-4.14.1
// var
// import {userInformation} from "./0_login_status"
window.page = 1
// import {songId} from "./0_3_play_music"
let arrayOfSliderPicturesInHtml = document.getElementsByClassName("pictures_6")
const geDanRecommendations = document.getElementsByClassName("pic_7")
const geDanDescription = document.getElementsByClassName("description_7")
const boFangShu = document.getElementsByClassName("number_7")
const boFangShu2 = document.getElementsByClassName("number_2_7")
const userGeDan = document.getElementsByClassName("not_favorite_3")
const divUsedForButton = document.getElementsByClassName("link_6")

let sliderPicture = {
    banners: [
        {
            imageUrl: null,
        }
    ]
}

let informationOfGeDan = {
    result: [
        {
            id: null,
            name: null,
            picUrl: null,
            playCount: null,
            trackCount: null,
        }
    ]
}

let geDanListByUser = {
    version: null,
    more: null,
    playlist: [
        {
            coverImgUrl: null,
            name: null,
            id: null
        }
    ],
    code: null
}

main()

// function
function main() {
    fetch("http://localhost:3000/banner")
        .then((response) => {
            response.json().then(r => sliderPicture = r)
            console.log(response.status)
        }).then(() => {
        fetch("http://localhost:3000/personalized?limit=10").then(r => {
            r.json().then(json => informationOfGeDan = json)
            console.log(r.status)
        })
    })

    fetch("http://localhost:3000/banner")
        .then(r => r.json())
        .then(r => sliderPicture = r)
        .then(() => {
            fetch("http://localhost:3000/personalized?limit=10")
                .then(r => r.json())
                .then(json => informationOfGeDan = json)
                .then(() => {
                    getGeDanRecommendations()
                    getUserGeDanList()
                    getSliderPictures()
                    changeLink()
                    directToGeDan()
                })
        })
    // in main
}



function getSliderPictures() {
    if (arrayOfSliderPicturesInHtml.length < sliderPicture.banners.length) {
        for (let i = arrayOfSliderPicturesInHtml.length; i < sliderPicture.banners.length; i++) {
            let addElement = "<a href=\"#\" class=\"slider_5\">\n    <img src=\"#\" alt=\"" + i + "\" class=\"pictures_6\">\n</a>"
            // let ul = document.getElementsByClassName("slider_4")[0]
            // ul.innerHTML += addElement
            // ul.insertAdjacentHTML("beforeend", addElement)
            let add = document.createElement("li")
            add.innerHTML = addElement
            let slider_4 = document.getElementsByClassName("slider_4")[0]
            slider_4.appendChild(add)
        }
    }
    for (let i = 0; i < arrayOfSliderPicturesInHtml.length; i++) {
        arrayOfSliderPicturesInHtml[i].setAttribute("src", sliderPicture.banners[i].imageUrl)
    }
    // arrayOfSliderPicturesInHtml[arrayOfSliderPicturesInHtml.length].setAttribute("src", sliderPicture.banners[0].imageUrl)
    slide()
}


function slide() {
    //      轮播图html js代码参考这篇文章 https://blog.csdn.net/Victoriasxy/article/details/113575662
    let point
    let key
    let i
    const slider = document.getElementById("slider_2")
    const ul = slider.children[0].children[0]
    const liInUl = ul.children
    
    ul.appendChild(liInUl[0].cloneNode(true))
    
    const ol = document.createElement("ol")
    slider.appendChild(ol)
    for (i = 0; i < liInUl.length - 1; i++) {
        const li = document.createElement("li")
        li.innerHTML = (i + 1).toString()
        ol.appendChild(li)
    }
    ol.children[0].setAttribute("class", "current")
    
    const liInOl = ol.children
    for (i = 0; i < liInOl.length; i++) {
        liInOl[i].index = i

        liInOl[i].onmouseover = function () {
            for (let j = 0; j < liInOl.length; j++) {
                liInOl[j].removeAttribute("class")
            }
            liInOl[this.index].setAttribute("class", "current")
            animate(ul, -this.index * liInUl[0].offsetWidth)

            key = point = this.index
        }
    }
    let leader = 0
    function animate(obj, target) {
        clearInterval(obj.timer)
        obj.timer = setInterval(function () {
            leader = leader + (target - leader) / 10
            obj.style.left = leader + "px"
        }, 10)
    }

    let timer = null
    timer = setInterval(autoplay, 5000)
    key = 0
    point = 0
    function autoplay() {
        key++
        if (key > liInUl.length - 1) {
            leader = 0
            key = 1
        }
        animate(ul, -key * liInUl[0].offsetWidth)

        point++
        if (point > liInOl.length - 1) {
            point = 0
        }
        for (let i = 0; i < liInOl.length; i++) {
            liInOl[i].removeAttribute("class")
        }
        liInOl[point].setAttribute("class", "current")
    }
    
    slider.onmouseover = function () {
        clearInterval(timer)
    }
    slider.onmouseout = function () {
        timer = setInterval(autoplay, 3000)
    }
}


function getGeDanRecommendations() {
    for (let i = 0; i < 10; i++) {
        geDanRecommendations[i].setAttribute("src", informationOfGeDan.result[i].picUrl)
        geDanDescription[i].innerHTML = informationOfGeDan.result[i].name
    }
}

function getUserGeDanList() {
    if (isLoggedIn) {
        if (geDanListByUser.playlist.length > 1) {
            for (let i = 0; i < geDanListByUser.playlist.length; i++) {
                let addElement = "<a class=\"not_clicked_or_not_in_3 not_favorite_3\" href=\"../html/5_ge_dan_detail.html\">\n</a>"
                let add = document.createElement("div")
                add.innerHTML = addElement
                let total = document.getElementById("left_side_1")
                total.appendChild(add)
            }
            for (let i = 0; i < geDanListByUser; i++) {
                userGeDan[i].innerHTML = geDanListByUser.playlist[i].name
            }
        } else
            userGeDan[0].innerHTML = geDanListByUser.playlist[0].name
    } else {
        userGeDan[0].innerText = ""
    }
}

function changeLink() {
    if (isLoggedIn) {
        username.setAttribute("href", "https://music.163.com")
    }
}

function directToGeDan() {
    for (let i = 0; i < divUsedForButton.length; i++) {
        divUsedForButton[i].onclick = function () {
            window.open(encodeURI("./5_ge_dan_detail.html?" + "listId=" + informationOfGeDan.result[i].id))
        }
    }
}