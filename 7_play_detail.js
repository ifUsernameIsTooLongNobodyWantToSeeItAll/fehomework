// var
let lyric
let informationObject
let informationLyrics
let informationConvertToLyrics = []
let finalLyrics = []
const placePutLyrics = document.getElementById("lyrics_5")
const everyLyrics = document.querySelector("#lyrics_5 ul")
const albumPictureInPlayPage = document.getElementById("left_album_picture_3")

// let doms = {
//     audio: window.audioOfSong,
//     box: document.getElementById("lyrics_5"),
//     ul: document.querySelector("#lyrics_5 ul")
// }
let boxClientHeight
let liHeight
let maxOffset
let lyricsObject = {
    lrc: {
        lyric: null
    }
}
// main
main()

// function
function main() {
    fetch(`http://localhost:3000/lyric/new?id=${window.songId}`)
        .then(r => r.json())
        .then(r => lyricsObject = r)
        .then(() => {
            lyric = lyricsObject.lrc.lyric
            albumPictureInPlayPage.setAttribute("src", songOtherInformation.songs.al.picUrl)
            getLyricListInformation(lyric)
            gatherInformationToLyrics()
            makeItTogether()
            createElement()
            getValue()
            makeLyricsMove()
        })
}

function getValue() {
    boxClientHeight = placePutLyrics.clientHeight
    liHeight = everyLyrics.children[0].clientHeight
    console.log(`box = ${boxClientHeight}`)
    console.log(`li = ${liHeight}`)
    maxOffset = everyLyrics.clientHeight - boxClientHeight
    console.log(`maxOffset =  ${maxOffset}`)
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
    // console.log("\n\n\n")
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
        time: '',
        lyrics: ''
    }
    for (let i = 0; i < informationObject.data.length * 2; i += 2) {
        newStringObject.time = informationObject.data[i / 2].t
        // newStringObject.lyrics = informationObject.data[i / 2].c.
        for (let j = 0; j < informationObject.data[i / 2].c.length; j++) {
            newStringObject.lyrics += informationObject.data[i / 2].c[j].tx
        }
        informationConvertToLyrics.push(newStringObject)
        newStringObject = {
            time: '',
            lyrics: ''
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
    for (let i = -1; i < finalLyrics.length - 1; i++) {
        if (currentTime < (finalLyrics[i + 1].time / 1000) && currentTime >= (finalLyrics[i].time / 1000)) {
            return i
        }
    }
    return finalLyrics.length - 1
}