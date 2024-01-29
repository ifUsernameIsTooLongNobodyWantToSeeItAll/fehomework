// var
// import {userInformation} from "./0_login_status";
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
                category: null,
                usedCount: null,
                type: null,
                position: null,
                createTime: null,
                highQuality: null,
                highQualityPos: null,
                officialPos: null
            },
            activity: null,
            createTime: null,
            usedCount: null,
            hot: null,
            position: null,
            category: null,
            name: null,
            id: null,
            type: null
        }
    ],
    code: null
}
let geDanInformation = {
    playlists: [
        {
            name: null,
            id: null,
            trackNumberUpdateTime: null,
            status: null,
            userId: null,
            createTime: null,
            updateTime: null,
            subscribedCount: null,
            trackCount: null,
            cloudTrackCount: null,
            coverImgUrl: null,
            iconImgUrl: null,
            coverImgId: null,
            description: null,
            tags: null,
            playCount: null,
            trackUpdateTime: null,
            specialType: null,
            totalDuration: null,
            creator: {
                defaultAvatar: null,
                province: null,
                authStatus: null,
                followed: null,
                avatarUrl: null,
                accountStatus: null,
                gender: null,
                city: null,
                birthday: null,
                userId: null,
                userType: null,
                nickname: null,
                signature: null,
                description: null,
                detailDescription: null,
                avatarImgId: null,
                backgroundImgId: null,
                backgroundUrl: null,
                authority: null,
                mutual: null,
                expertTags: null,
                experts: null,
                djStatus: null,
                vipType: null,
                remarkName: null,
                authenticationTypes: null,
                avatarDetail: null,
                avatarImgIdStr: null,
                backgroundImgIdStr: null,
                anchor: null
            },
            tracks: null,
            subscribers: [
                {
                    defaultAvatar: null,
                    province: null,
                    authStatus: null,
                    followed: null,
                    avatarUrl: null,
                    accountStatus: null,
                    gender: null,
                    city: null,
                    birthday: null,
                    userId: null,
                    userType: null,
                    nickname: null,
                    signature: null,
                    description: null,
                    detailDescription: null,
                    avatarImgId: null,
                    backgroundImgId: null,
                    backgroundUrl: null,
                    authority: null,
                    mutual: null,
                    expertTags: null,
                    experts: null,
                    djStatus: null,
                    vipType: null,
                    remarkName: null,
                    authenticationTypes: null,
                    avatarDetail: null,
                    avatarImgIdStr: null,
                    backgroundImgIdStr: null,
                    anchor: null
                }
            ],
            subscribed: null,
            commentThreadId: null,
            newImported: null,
            adType: null,
            highQuality: null,
            privacy: null,
            ordered: null,
            anonimous: null,
            coverStatus: null,
            recommendInfo: null,
            socialPlaylistCover: null,
            recommendText: null,
            coverText: null,
            relateResType: null,
            relateResId: null,
            shareCount: null,
            alg: null,
            commentCount: null
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