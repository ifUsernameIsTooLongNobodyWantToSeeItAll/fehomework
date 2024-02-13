let songAudioInformation = {
    data: [{
        id: null, url: null,
    }]
}

let songOtherInformation = {
    songs: [{
        name: null, ar: [{
            id: null, name: null,
        }], alia: [], al: {
            picUrl: null,
        }
    }], code: null,
}
let time = undefined
const albumPictureIn03 = document.getElementById("album_picture_4")
const titleName = document.getElementById("title_6")
const singerName = document.getElementById("singer_6")
let audioOfSong = undefined
const nowTime = document.getElementById("now_time_6")
const totalTime = document.getElementById("total_time_6")
const leftPart = document.getElementById("left_place_7")
const rightPart = document.getElementById("right_place_7")
const progressBar = document.getElementById("progress_bar_6")
const nowThisPlace = document.getElementById("now_7")
let stopButton = document.getElementById("stop_continue_button_6")
const pictureButton = document.getElementById("continue_or_stop_7")
let level = 'exhigh'
// let tempId
// export let songId = 0
// songId = 0
let songId = decode()
function playAll(songId) {
    // document.addEventListener("DOMContentLoaded", function () {
    console.log(54)
    fetch(`http://localhost:3000/song/detail?ids=${songId}&timestamp=${new Date().getTime()}`)
        .then(r => {
            r.json().then(r => songOtherInformation = r)
                .then(() => {
                    albumPictureIn03.style.cssText += `background: url(${songOtherInformation.songs[0].al.picUrl}?param=62y62)`
                    titleName.innerHTML = songOtherInformation.songs[0].name
                    singerName.innerHTML = ''
                    if (songOtherInformation.songs[0].ar.length === 1) {
                        singerName.innerHTML += songOtherInformation.songs[0].ar[0].name
                    } else {
                        for (let i = 1; i < songOtherInformation.songs[0].ar.length; i++) {
                            singerName.innerHTML += `/${songOtherInformation.songs[0].ar[i].name}`
                        }
                    }
                    // debugs(102)
                    // return singerName.innerHTML
                    //
                    // singerName.innerHTML = getSingerName()
                    // debugs(64)
                })
            console.log(`song information status = ${r.status}`)
            // debugs(67)
        })

    fetch(`http://localhost:3000/song/url/v1?id=${songId}&level=${level}&timestamp=${new Date().getTime()}`)
        .then(r => {
            r.json()
                .then(r => songAudioInformation = r)
                .then(() => {
                    audioOfSong = document.getElementById("music_to_play_4")
                    audioOfSong.setAttribute("src", songAudioInformation.data[0].url)
                    // debugs(75)
                }).then(() => {
                clickToJump()
                audioOfSong.play()
                setPlaying()
                // document.addEventListener("DOMContentLoaded", function() {
                // console.log(totalTime.innerHTML)
                // debugs(124)
                stopButton.addEventListener("click", function () {
                    if (!audioOfSong.paused) {
                        audioOfSong.pause()
                        pictureButton.style.cssText = `background: url("./img/continue.svg")`
                        clearInterval(time)
                    } else {
                        audioOfSong.play()
                        setPlaying()
                    }
                })
            })
            console.log(`song status = ${r.status}`)
        })
}

function setPlaying() {
    time = setInterval(function () {
        let audioTime = audioOfSong.duration
        // pictureButton.style.background = `url("./img/stop.svg")`
        let m = Math.floor(audioTime / 60)
        let s = Math.floor(audioTime % 60)
        m = (m < 10) ? `0${m}` : `${m}`
        s = (s < 10) ? `0${s}` : `${s}`
        totalTime.innerHTML = `${m}:${s}`
        // let audioTime = audioOfSong.duration
        let mc = Math.floor(audioOfSong.currentTime / 60)
        let sc = Math.floor(audioOfSong.currentTime % 60)
        mc = (mc < 10 ? `0${mc}` : `${mc}`)
        sc = (sc < 10 ? `0${sc}` : `${sc}`)
        nowTime.innerHTML = `${mc}:${sc}`
        nowThisPlace.style.left = (audioOfSong.currentTime / audioTime) * 100 + '%'
        leftPart.style.width = (audioOfSong.currentTime / audioTime) * 100 + '%'
        rightPart.style.width = (1 - (audioOfSong.currentTime / audioTime)) * 100 + '%'
    }, 1000)

    pictureButton.style.cssText = `background: url("./img/stop.svg")`
    let isOnIt = false
    let isPressedDown = false
    let startPositionX
    let barPositionX
    let result
    progressBar.onmousedown = function (event) {
        isOnIt = true
        isPressedDown = true
        startPositionX = event.clientX
        barPositionX = progressBar.offsetLeft
    }

    document.body.onmousemove = function (event) {
        if (isOnIt) {
            let positionX = event.clientX
            result = barPositionX + positionX - startPositionX
            if (result > progressBar.offsetWidth - nowThisPlace.offsetWidth) {
                result = progressBar.offsetWidth - nowThisPlace.offsetWidth
            }
            if (result < 0) {
                result = 0
            }
            nowThisPlace.style.left = result + 'px'
            // leftPart.style.width = result + 'px'
            // rightPart.style.width = (468 - result) + 'px'
            // add code
        }
    }

    document.body.onmouseup = function () {
        isOnIt = false
        if (isPressedDown) {
            audioOfSong.currentTime = Math.floor((result / progressBar.offsetWidth) * audioOfSong.duration)
        }
        isPressedDown = false
    }
}

function clickToJump() {
    albumPictureIn03.onclick = function () {
        window.open(encodeURI(`./7_play_detail.html?songId=${songId}`))
        // songId =
        // window.location.replace(`./7_play_detail.html?songId=${songId}`)
    }
}

function refreshStatus() {
    if (typeof songId == "undefined" || songId === null) {
        console.log("No music played")
    } else {
        playAll(songId)
        console.log(`songId = ${songId}`)

    }
}

function decode() {
    let id = decodeURI(document.URL)
    id = id.slice(id.indexOf('=') + 1)
    return Number(id)
}