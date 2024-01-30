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

main()

function main() {
    fetches()
    setTimeout(() => {
        getLoginHead()
    }, 500)
}

function fetches() {
    fetch(`http://localhost:3000/user/account?t=${new Date().getTime()}`)
        .then((response) => {
            response.json().then(json => userInformation = json)
            console.log(`account status = ${response.status}`)
        }, () => {
            alert("No!")
        })

    fetch(`http://localhost:3000/login/refresh?t=${new Date().getTime()}`).then((r) => {
        console.log(`login refresh status = ${r.status}`)
    })

}


function getLoginHead() {
    if (userInformation.account.id === 9119289842) {
        isLoggedIn = false;
        fetch("http://localhost:3000/logout").then(r => {
            isLoggedIn = false
            console.log(r.status)
        })
    } else
        isLoggedIn = (userInformation.account.id != null)
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
