//var
page = 5
// let songId
let geDanDetailInformation = {
    code: null,
    relatedVideos: null,
    playlist: {
        id: null,
        name: null,
        coverImgId: null,
        coverImgUrl: null,
        userId: null,
        createTime: null,
        trackCount: null,
        playCount: null,
        description: null,
        creator: {
            avatarUrl: null,
            nickname: null,
        },
        trackIds: [
            {
                id: null,
                v: null,
                t: null,
                at: null,
                uid: null
            }
        ],
        score: null,
        algTags: null,
        trialMode: null
    },
    urls: null
}
let geDanSongsInformation = {
    songs: [
        {
            name: null,  // 歌曲名
            id: null,  // 歌曲id
            t: null,
            ar: [
                {
                    id: null, // artist id
                    name: null, // artist name
                    tns: null,
                    alias: []
                }
            ],
            alia: null,  // bie ming
            al: {
                id: null,  // album id
                name: null,  // album name
                picUrl: null, // album picture
                tns: null,
                pic_str: null,
                pic: null
            },
            dt: null
        }
    ],
    privileges: null,  // list
    code: null
}
let getID
const geDanPicture = document.getElementById("pictures_5")
const geDanName = document.getElementById("list_name_6")
const geDanDescription = document.getElementById("description_6")
const geDanCreatorHead = document.getElementById("head_7")
const geDanCreatorName = document.getElementById("creator_name_7")
const geDanCreateTimes = document.getElementById("create_time_7")
const geDanSongsAddPls = document.getElementById("song_list_4")
const geDanSongsNumber = document.getElementById("song_number_7")
const geDanCommentNumber = document.getElementById("comment_number_7")
let songCountInList = document.getElementsByClassName("songs_in_play_list_5")
let numbersInList = document.getElementsByClassName("number_in_list_6")
let albumPictureInList = document.getElementsByClassName("album_picture_6")
let albumNameInList = document.getElementsByClassName("album_name_6")
let songTotalTimeInList = document.getElementsByClassName("time_6")
let songTitleInList = document.getElementsByClassName("title_7")
let singerInList = document.getElementsByClassName("singer_7")
//main
main()

//function
function main() {
    refreshStatus()
    getID = decode()
    setTimeout(() => {
        fetches()
    }, 50)
}

function fetches() {
    fetch(`http://localhost:3000/playlist/detail?id=${getID}&t=${new Date().getTime()}`)
        .then(r => r.json())
        .then(r => geDanDetailInformation = r)

    fetch(`http://localhost:3000/playlist/track/all?id=${getID}&t=${new Date().getTime()}`)
        .then(r => r.json())
        .then(r => geDanSongsInformation = r)
        .then(() => addElement())
        .then(() => {
            directToSongs()
            getGeDanUpInformation()
            getGeDanSongs()
        })
}

function decode() {
    let playList = decodeURI(document.URL)
    playList = playList.slice(playList.indexOf('=') + 1)
    return Number(playList)
}

function getGeDanUpInformation() {
    geDanPicture.style.cssText += `background: url("${geDanDetailInformation.playlist.coverImgUrl + "?param=203y203"}")`
    geDanName.innerText = geDanDetailInformation.playlist.name
    geDanDescription.innerText = geDanDetailInformation.playlist.description
    geDanCreatorHead.setAttribute("src", geDanDetailInformation.playlist.creator.avatarUrl)
    geDanCreatorName.innerText = geDanDetailInformation.playlist.creator.nickname
    geDanCreateTimes.innerText = formatDate(geDanDetailInformation.playlist.createTime)
    geDanSongsNumber.innerText = geDanDetailInformation.playlist.trackCount
    geDanCommentNumber.innerText = geDanDetailInformation.playlist.commentCount
}

function formatDate(dateNumber) {
    let dateString = ''
    let date = new Date(dateNumber)
    dateString += `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()} 创建`
    return dateString
}

function addElement() {
    if (songCountInList.length < geDanSongsInformation.songs.length) {
        for (let i = 1; i <= geDanSongsInformation.songs.length; i++) {
            let addElement = "<div class=\"number_in_list_6\">01</div>\n<div class=\"album_picture_6\"></div>\n<div class=\"singer_title_6\">\n<div class=\"title_7\">title</div>\n<div class=\"singer_7\">singer</div>\n</div>\n<div class=\"album_name_6\">album</div>\n<div class=\"time_6\">00:00</div>\n"
            let add = document.createElement("div")
            add.innerHTML = addElement
            add.setAttribute("class", "songs_in_play_list_5")
            geDanSongsAddPls.appendChild(add)

        }
    }
}

function getGeDanSongs() {
    for (let i = 0; i < geDanSongsInformation.songs.length; i++) {
        numbersInList[i].innerHTML = (i + 1).toString()
        albumPictureInList[i].style.cssText += `background: url(${geDanSongsInformation.songs[i].al.picUrl + "?param=51y51"})`
        albumNameInList[i].innerHTML = geDanSongsInformation.songs[i].al.name
        songTotalTimeInList[i].innerHTML = convertTime(geDanSongsInformation.songs[i].dt)
        songTitleInList[i].innerHTML = getSongName(i)
        singerInList[i].innerHTML = getSingerName(i)
    }
}

function convertTime(time) {
    let seconds = time / 1000
    let minutes = Math.floor(seconds / 60)
    seconds %= 60
    seconds = Math.round(seconds)
    if (seconds < 10) {
        seconds = `0${seconds}`
    } else {
        seconds = seconds.toString()
    }
    return `${minutes}:${seconds}`
}

function getSingerName(index) {
    let start = ''
    start += geDanSongsInformation.songs[index].ar[0].name
    if (geDanSongsInformation.songs[index].ar.length > 1) {
        for (let i = 1; i < geDanSongsInformation.songs[index].ar.length; i++) {
            start += `/${geDanSongsInformation.songs[index].ar[i].name}`
        }
    }

    return start
}

function getSongName(index) {
    let start = ''
    start += geDanSongsInformation.songs[index].name
    if (geDanSongsInformation.songs[index].alia.length !== 0) {
        for (let i = 0; i < geDanSongsInformation.songs[index].alia.length; i++) {
            start += ` (${geDanSongsInformation.songs[index].alia[i]})`
        }
    }
    return start
}

function directToSongs() {
    for (let i = 0; i < songCountInList.length; i++) {
        songCountInList[i].onclick = function () {
            songId = geDanSongsInformation.songs[i].id
            playAll(songId)
        }
    }
}