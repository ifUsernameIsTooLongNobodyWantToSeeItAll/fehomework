//var
page = 6
let searchValueSingle = {
    result: {
        searchQcReminder: null,
        songs: [
            {
                name: null,
                id: null,
                ar: [
                    {
                        id: null,
                        name: null,
                        tns: []
                    }
                ],
                alia: [],
                al: {
                    id: null,
                    name: null,
                    picUrl: null
                },
                dt: null
            }
        ],
        songCount: null
    }
}

let searchValuePlayList = {
    result: {
        searchQcReminder: null,
        playlists: [
            {
                id: null,
                name: null,
                coverImgUrl: null,
                creator: {
                    nickname: null,
                    id: null
                },
                trackCount: null,
                recommendText: null,
            }
        ],
        playlistCount: null
    }
}

let keyWord
const searchKeyWord = document.getElementById("search_key_word_6")
const numberSearched = document.getElementById("number_searched_6")
let tableOneRow = document.getElementsByClassName("table_one_row_6")
let addPlace = document.getElementById("table_5")
let numberInSearchResult = document.getElementsByClassName("number_in_search_result_7")
let albumPicture = document.getElementsByClassName("album_picture_7")
let songSearched = document.getElementsByClassName("song_8")
let singerSearched = document.getElementsByClassName("singer_8")
let albumName = document.getElementsByClassName("album_name_7")
let timeInSearchedSongs = document.getElementsByClassName("time_7")

// main
main()
// function
function main() {
    decode()
    refreshStatus()
    keyWord = decode()
    fetches()
}

function fetches() {
    fetch(`http://localhost:3000/cloudsearch?keywords=${keyWord}&limit=100&type=1`)
        .then((r) => r.json())
        .then((r) => searchValueSingle = r)
        .then(() => {
            // console.log("1: " + searchValueSingle.result.songs.length)
            getNewElementOfSongs()
        })
        .then(() => {
            // console.log("2: " + searchValueSingle.result.songs.length)
            getValuesForSingle()
        }).then(() => {
        // console.log("3: " + searchValueSingle.result.songs.length)
        // console.log("3: " + tableOneRow.length)
        getSearchedInformationForSingle()
        clickAndPlay()
    })

    fetch(`http://localhost:3000/cloudsearch?keywords=${keyWord}&limit=100&type=1000`)
        .then(r => {
            r.json().then(r => searchValuePlayList = r)
            console.log(`playlist status: ${r.status}`)
        })
}

function decode() {
    let decodeStr = decodeURI(document.URL)
    decodeStr = decodeStr.slice(decodeStr.indexOf('=') + 1)
    console.log(decodeStr)
    return decodeStr
}

function getNewElementOfSongs() {
    if (searchValueSingle.result == null)
        return
    if (tableOneRow.length < searchValueSingle.result.songs.length) {
        for (let i = tableOneRow.length; i < searchValueSingle.result.songs.length; i++) {
            let addElement = "<div class=\"number_in_search_result_7\"></div>\n" +
                "                            <div class=\"album_picture_7\"></div>\n" +
                "                            <div class=\"song_and_singer_7\">\n" +
                "                                <div class=\"song_8\"></div>\n" +
                "                                <div class=\"singer_8\"></div>\n" +
                "                            </div>\n" +
                "                            <div class=\"album_name_7\"></div>\n" +
                "                            <div class=\"time_7\"></div>"
            let add = document.createElement("div")
            add.innerHTML = addElement
            add.setAttribute("class", "table_one_row_6")
            addPlace.appendChild(add)
        }

    }
}

function getValuesForSingle() {
    searchKeyWord.innerHTML = keyWord
    numberSearched.innerHTML = searchValueSingle.result.songCount
}

function getSearchedInformationForSingle() {
    for (let i = 0; i < tableOneRow.length; i++) {
        numberInSearchResult[i].innerHTML = (i + 1).toString()
        albumPicture[i].style.cssText += `background: url(${searchValueSingle.result.songs[i].al.picUrl + "?param=51y51"})`
        songSearched[i].innerHTML = searchValueSingle.result.songs[i].name
        if (searchValueSingle.result.songs[i].alia.length !== 0) {
            for (const s of searchValueSingle.result.songs[i].alia) {
                songSearched[i].innerHTML += ` (${s})`
            }
        }
        singerSearched[i].innerHTML = getSingerNameOfSongs(i)
        albumName[i].innerHTML = searchValueSingle.result.songs[i].al.name
        timeInSearchedSongs[i].innerHTML = getTime(i)
    }
}

function getSingerNameOfSongs(i) {
    let artist = ''
    artist += searchValueSingle.result.songs[i].ar[0].name
    for (let j = 1; j < searchValueSingle.result.songs[i].ar.length; j++) {
        artist += '/'
        artist += searchValueSingle.result.songs[i].ar[j].name
    }
    return artist
}

function getTime(i) {
    let ms = searchValueSingle.result.songs[i].dt
    let s = Math.floor(ms / 1000)
    let m = Math.floor(s / 60)
    s %= 60
    if (s < 10)
        return `${m}:0${s}`
    return `${m}:${s}`
}

function clickAndPlay() {
    for (let i = 0; i < tableOneRow.length; i++) {
        tableOneRow[i].ondblclick = () => {
            console.log("2")
            songId = searchValueSingle.result.songs[i].id
            // playAll(searchValueSingle.result.songs[i].id)
            console.log(`searchValueSingle.result.songs[i].id = ${searchValueSingle.result.songs[i].id}`)
            console.log(`songId = ${songId}`)
            refreshStatus()
        }
    }
}