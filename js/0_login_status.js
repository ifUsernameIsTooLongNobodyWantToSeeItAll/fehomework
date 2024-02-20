let userInformation = {
    code: null,
    account: {
        id: null,
        userName: null,
    },
    profile: {
        userId: null,
        nickname: null,
        avatarImgId: null,
        avatarUrl: null,
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

    fetch(`http://localhost:3000/login/refresh?timestamp=${new Date().getTime()}&noCookie=true`)
        .then(r => r.json())
        .then(r => refreshValue = r)
        .then(() => {
            if (refreshValue.code === 301) {
                console.log("not login")
            } else if (refreshValue.code === 200) {
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
        fetch(`http://localhost:3000/user/playlist?uid=${userInformation.account.id}`)
            .then((r) => r.json)
            .then((json) => geDanListByUser = json)
    }
}