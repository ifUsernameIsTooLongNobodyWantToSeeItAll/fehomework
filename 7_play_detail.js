// var

let lyric
let informationObject
let informationLyrics
let informationConvertToLyrics = []
let finalLyrics = []
const placePutLyrics = document.getElementById("lyrics_5")
const everyLyrics = document.querySelector("#lyrics_5 ul")
const albumPictureInPlayPage = document.getElementById("album_picture_in_7_4")
const goToLastPage = document.getElementById("go_to_last_page_3")
// const allBackground = document.getElementById("all_1")
const albumNameIn7 = document.getElementById("al_content_6")
const singerNameIn7 = document.getElementById("singer_content_6")
const songNameIn7 = document.getElementById("first_5")
let boxClientHeight
let liHeight
let maxOffset
let lyricsObject = {
    lrc: {
        lyric: null
    }
}

let songOtherInformationIn7 = {
    songs: [{
        name: null, ar: [{
            id: null, name: null,
        }], alia: [], al: {
            picUrl: null, name: null,
        }
    }], code: null,
}
// let audioOfSong
// main
main()

// function
function main() {
    songId = decode()
    playAll(songId)
    console.log(songOtherInformation)


    fetch(`http://localhost:3000/lyric/new?id=${songId}`)
        .then(r => r.json())
        .then(r => lyricsObject = r)
        .then(() => {
            fetch(`http://localhost:3000/song/detail?ids=${songId}&timestamp=${new Date().getTime()}`)
                .then(r => r.json())
                .then(r => songOtherInformationIn7 = r)
                .then(() => {
                    lyric = lyricsObject.lrc.lyric
                    albumPictureInPlayPage.setAttribute("src" , songOtherInformationIn7.songs[0].al.picUrl)//style.background = songOtherInformationIn7.songs[0].al.picUrl + '?param=405y405'
                }).then(() => {
                getLyricListInformation(lyric)
                gatherInformationToLyrics()
                makeItTogether()
                createElement()
                setClick()
                getValue()
                makeLyricsMove()
                // getBackgroundColors()
            })
        })
}

function getValue() {
    boxClientHeight = placePutLyrics.clientHeight
    liHeight = everyLyrics.children[0].clientHeight
    console.log(`box = ${boxClientHeight}`)
    console.log(`li = ${liHeight}`)
    maxOffset = everyLyrics.clientHeight - boxClientHeight
    console.log(`maxOffset =  ${maxOffset}`)
    songNameIn7.textContent = songOtherInformationIn7.songs[0].name
    albumNameIn7.textContent = songOtherInformationIn7.songs[0].al.name
    singerNameIn7.textContent = ''
    for (let i = 0; i < songOtherInformationIn7.songs[0].ar.length; i++) {
        if(i !== 0) {
            singerNameIn7.textContent += '/'
        }
        singerNameIn7.textContent += songOtherInformationIn7.songs[0].ar[i].name
    }
}

function makeLyricsMove() {
    document.getElementById("music_to_play_4").addEventListener("timeupdate", function () {
        let index = getNowLyrics()
        let offset = liHeight * index + liHeight / 2 - 210
        if (offset < 0) {
            offset = 0
        } else if (offset > maxOffset) {
            offset = maxOffset
        }
        everyLyrics.style.transform = `translateY(-${offset}px)`

        let chosen = everyLyrics.querySelector('.now')
        if (chosen != null) {
            chosen.classList.remove('now')
        }

        chosen = everyLyrics.children[index]
        if (chosen != null) {
            chosen.classList.add('now')
        }
    })
}

function getLyricListInformation(lyrics) {
    let startLeft = 0
    let startRight = 0
    let place
    let arrayNumber
    for (let i = 0; i < lyrics.length; i++) {
        const element = lyrics[i]
        if (element === '{') {
            startLeft++
        } else if (element === '}') {
            startRight++
        }

        if ((startLeft === startRight) && (startLeft !== 0) && (lyrics[i + 2] !== '{') && (lyrics[i] !== '\n')) {
            place = i
            arrayNumber = startLeft
            break
        }
    }
    // console.log(place)
    let information = lyrics.slice(0, place + 1)
    let newLyrics = lyrics.slice(place + 2)
    // console.log(information)
    // console.log(newLyrics)
    informationObject = getJsonFromLyricsInformation(information, arrayNumber)
    informationLyrics = changeTime(getLyrics(newLyrics))
    // console.log(informationObject)
    // console.log(informationLyrics)
}

function getJsonFromLyricsInformation(information, arrayLength) {
    let newJson = `{ "data":[`
    let count = 0
    for (let i = 0; i < information.length; i++) {
        const element = information[i]
        if (element !== '\n') {
            newJson += element
        } else {
            count++
            if (count < arrayLength) {
                newJson += ','
            }
        }
    }
    newJson += ']}'
    newJson = JSON.parse(newJson)

    return newJson
}


function getLyrics(lyrics) {
    let lyricsArray = []
    let startTime = 0
    let endTime
    let startLyrics = 0
    let endLyrics
    let newLyricsObject = {
        time: '', lyrics: ''
    }
    for (let i = 0; i < lyrics.length; i++) {
        const element = lyrics[i]
        if (element === '[') {
            startTime = i
        } else if (element === ']') {
            endTime = i
            // newTime =
            newLyricsObject.time = lyrics.slice(startTime + 1, endTime)
            startLyrics = i + 1
        } else if (element === '\n') {
            endLyrics = i
            newLyricsObject.lyrics = lyrics.slice(startLyrics, endLyrics)
            lyricsArray.push(newLyricsObject)
            newLyricsObject = {
                time: '', lyrics: ''
            }
        }

    }

    return lyricsArray
}

function convertTimeToNumber(lyricsTime) {
    let change
    let min = 0
    let s = 0
    let ms
    for (let i = 0; i < lyricsTime.length; i++) {
        const element = lyricsTime[i]
        if (element === ':') {
            min = Number(lyricsTime.slice(0, i))
            change = i
        } else if (element === '.') {
            s = Number(lyricsTime.slice(change + 1, i))
            change = i
            break
        }
    }
    ms = lyricsTime.slice(change + 1)
    if (ms.length === 3) {
        return min * 60000 + s * 1000 + Number(ms)
    } else {
        return min * 60000 + s * 1000 + Number(ms) * 10
    }
}

// console.log(convertTimeToNumber("03:10.30"))
function changeTime(lyricsArray) {
    for (const lyricsArrayElement of lyricsArray) {
        lyricsArrayElement.time = convertTimeToNumber(lyricsArrayElement.time)
    }

    return lyricsArray
}

function gatherInformationToLyrics() {
    let newStringObject = {
        time: '', lyrics: ''
    }
    for (let i = 0; i < informationObject.data.length * 2; i += 2) {
        newStringObject.time = informationObject.data[i / 2].t
        // newStringObject.lyrics = informationObject.data[i / 2].c.
        for (let j = 0; j < informationObject.data[i / 2].c.length; j++) {
            newStringObject.lyrics += informationObject.data[i / 2].c[j].tx
        }
        informationConvertToLyrics.push(newStringObject)
        newStringObject = {
            time: '', lyrics: ''
        }
    }
}


function makeItTogether() {
    finalLyrics = [...informationConvertToLyrics, ...informationLyrics]
    console.log(finalLyrics)
}

function createElement() {
    const frag = document.createDocumentFragment()
    for (let i = 0; i < finalLyrics.length; i++) {
        let everyLineLyrics = document.createElement("li")
        everyLineLyrics.textContent = finalLyrics[i].lyrics
        frag.appendChild(everyLineLyrics)
    }
    everyLyrics.appendChild(frag)
}

function getNowLyrics() {
    let currentTime = audioOfSong.currentTime
    for (let i = 0; i < finalLyrics.length - 1; i++) {
        if (currentTime < (finalLyrics[i].time / 1000)) {
            return ((i - 1) > 0 ? (i - 1) : 0)
        }
    }
    return finalLyrics.length - 1
}

function setClick() {
    goToLastPage.onclick = function () {
        window.history.go(-1)
    }
}
//
// function getBackgroundColors() {
//     // Adapted from https://kuangyx.cn/docs/%E6%96%87%E7%AB%A0/%E5%89%8D%E7%AB%AF/%E6%8F%90%E5%8F%96%E5%9B%BE%E7%89%87%E4%B8%BB%E9%A2%98%E8%89%B2.html#%E4%B8%80%E3%80%81%E8%8E%B7%E5%8F%96%E5%9B%BE%E7%89%87%E5%B9%B6%E7%BB%98%E5%88%B6%E5%9C%A8-canvas-%E4%B8%8A
//     const pictureWidth = albumPictureInPlayPage.width
//     const pictureHeight = albumPictureInPlayPage.height
//     const canvas = document.createElement('canvas')
//     canvas.width = pictureWidth
//     canvas.height = pictureHeight
//     const context = canvas.getContext('2d')
//     context.drawImage(this, 0, 0)
//     let dataOfImg = context.getImageData(0, 0, pictureWidth, pictureHeight).data
//     dataOfImg = Array.from(dataOfImg)
//     const colorList = {}
//     let i = 0
//     while (i < dataOfImg.length) {
//         const r = dataOfImg[i]
//         const g = dataOfImg[i + 1]
//         const b = dataOfImg[i + 2]
//         const a = dataOfImg[i + 3]
//         i += 4
//         const key = [r, g, b, a]
//         key in colorList ? ++colorList[key] : (colorList[key] = 1)
//     }
//     let arrayOfColor = []
//     for (let key in colorList) {
//         arrayOfColor.push({
//             rgba: key, num: colorList[key]
//         })
//     }
//     arrayOfColor = arrayOfColor.sort((a, b) => b.num - a.num)
//     // console.log(arrayOfColor)
//     const arrFirst = arrayOfColor[0].rgba
//     // console.log(arrFirst)
//     let numbers = []
//     let start = 0, end = 0, count = 0
//     for (let i = 0; i < arrFirst.length; i++) {
//         if (arrFirst[i] === ',') {
//             end = i
//             numbers.push(Number(arrFirst.slice(start, end)))
//             start = i + 1
//
//             count++
//         }
//         if (count === 3) {
//             numbers.push(Number(arrFirst.slice(start)))
//             break
//         }
//     }
//     allBackground.style.background = `linear-gradient(rgba(${numbers[0]}, ${numbers[1]}, ${numbers[2]}, ${numbers[3]}), rgba(${Math.floor(numbers[0] * 0.4)}, ${Math.floor(numbers[1] * 0.4)}, ${Math.floor(numbers[2] * 0.4)}, ${numbers[3]}))`
// }
