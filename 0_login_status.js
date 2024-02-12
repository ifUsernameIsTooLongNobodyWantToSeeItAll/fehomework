let userInformation = {
    code: null,
    account: {
        id: null,
        userName: null,
        type: null,
        status: null,
        whitelistAuthority: null,
        createTime: null,
        tokenVersion: null,
        ban: null,
        baoyueVersion: null,
        donateVersion: null,
        vipType: null,
        anonimousUser: null,
        paidFee: null
    },
    profile: {
        userId: null,
        userType: null,
        nickname: null,
        avatarImgId: null,
        avatarUrl: null,
        backgroundImgId: null,
        backgroundUrl: null,
        signature: null,
        createTime: null,
        userName: null,
        accountType: null,
        shortUserName: null,
        birthday: null,
        authority: null,
        gender: null,
        accountStatus: null,
        province: null,
        city: null,
        authStatus: null,
        description: null,
        detailDescription: null,
        defaultAvatar: null,
        expertTags: null,
        experts: null,
        djStatus: null,
        locationStatus: null,
        vipType: null,
        followed: null,
        mutual: null,
        authenticated: null,
        lastLoginTime: null,
        lastLoginIP: null,
        remarkName: null,
        viptypeVersion: null,
        authenticationTypes: null,
        avatarDetail: null,
        anchor: null
    }
}

let isLoggedIn = false;
const head = document.getElementById("head_4")
const username = document.getElementById("username_4")
let refreshValue = {
    code: null
}

main()

function main() {
    fetches()
    // setTimeout(() => {
    //     console.log("fuck")
    // }, 500)
}

function fetches() {
    fetch(`http://localhost:3000/login/refresh?timestamp=${new Date().getTime()}&noCookie=true`)
        .then(r => r.json())
        .then(r => refreshValue = r)
        .then(() => {
            if(refreshValue.code === 301) {
                console.log("not login")
            } else if(refreshValue.code === 200) {
                console.log("Logged in")
            } else {
                console.log(refreshValue.code)
            }
        })
        .then(() => {
            fetch(`http://localhost:3000/user/account?timestamp=${new Date().getTime()}`)
                .then(r => r.json())
                .then(r => userInformation = r)
                .then(() => {
                    getLoginHead()
                    getAccountInformation()
                })
        })
}

function getLoginHead() {
    isLoggedIn = (userInformation.account != null && userInformation.account.id != null)
    if (isLoggedIn) {
        if (userInformation.profile === null) {
            head.setAttribute("src", "../img/default_head.png")
            username.innerText = userInformation.account.userName
        } else {
            head.setAttribute("src", userInformation.profile.avatarUrl)
            username.innerText = userInformation.profile.nickname.toString()
        }
    }
}

function getAccountInformation() {
    if (userInformation.account.id !== null) {
        // setTimeout(() => {
        fetch(`http://localhost:3000/user/playlist?uid=${userInformation.account.id}`)
            .then((r) => r.json)
            .then((json) => geDanListByUser = json)
        // }, 200)
    }
}