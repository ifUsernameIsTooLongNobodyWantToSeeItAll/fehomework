let songId
let songAudioInformation = {
    data: [
        {
            id: null,
            url: null,
        }
    ]
}

let songOtherInformation = {
    songs: [
        {
            name: null,
            ar: [
                {
                    id: null,
                    name: null,
                }
            ],
            alia: [],
            al: {
                picUrl: null,
            }
        }
    ],
    code: null,
}
const albumPicture = document.getElementById("album_picture_4")
const titleName = document.getElementById("title_6")
const singerName = document.getElementById("singer_6")
//main
main()
//function
function main() {
    songId = decode()

}

function decode() {
    let songId = decodeURI(document.URL)
    songId = songId.slice(songId.indexOf('=') + 1)
    return Number(songId)
}

function fetches(id, level = "exhigh") {
    fetch(`http://localhost:3000/song/url/v1?id=${id}&level=${level}`)
        .then(r => r.json())
        .then(r => songAudioInformation = r)
        .then(() => {
            getBasicInformation()
        })

    fetch(`http://localhost:3000/song/detail?ids=${id}`)
        .then(r => r.json())
        .then(r => songOtherInformation = r)
}

function getBasicInformation() {
    albumPicture.style.cssText += `background: url(${songOtherInformation.songs[0].al.picUrl})`
    titleName.innerHTML = songOtherInformation.songs[0].name
    singerName.innerHTML = getSingerName()
}

function getSingerName() {
    let ar = ''
    if(songOtherInformation.songs[0].ar.length === 1) {
        ar += songOtherInformation.songs[0].ar[0]
    } else {
        for(let i = 1; i < songOtherInformation.songs[0].ar.length; i++) {
            ar += `/${songOtherInformation.songs[0].ar[i]}`
        }
    }

    return ar
}