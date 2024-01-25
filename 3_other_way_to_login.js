// var
const telephoneObject = document.getElementById("phone_number_7")
const passwordObject = document.getElementById("password_input_7")
// const password = passwordObject.value
const loginButton = document.getElementById("button_to_click_4")
let signedIn = {
    exist: null,
    nickname: null,
    hasPassword: null,
    avatarUrl: null,
    hasSnsBinded: null,
    countryCode: null,
    cellphone: null,
    code: null
}
let correctPassword = {
    code: null
}
let isLegalNumber = false
main()

// function
function main() {
    loginButton.onclick = function () {
        // const telephoneNumber = telephoneObject.value
        console.log(`telephone number = ${telephoneObject.value}`)
        setTimeout(() => {
            isLegalNumber = isLegal(telephoneObject.value)
            if (isLegalNumber) {
                setTimeout(() => {
                    fetches()
                    setTimeout(() => {
                        if (!isRightPassword()) {
                            alert("账号或密码错误！")
                        } else {
                            window.location.url = "1_start.html"
                        }
                    }, 101)
                })
            }
        }, 200)
    }
}

function fetches() {
    fetch(`http://localhost:3000/login/cellphone?phone=${telephoneObject.value}&password=${passwordObject.value}&t=${new Date().getTime()}`)
        .then(r => {
            r.json().then(r => correctPassword = r)
            console.log(r.status)
        })
}

function isLegal(tel) {
    if (1 < (Number(tel) / 10000000000) && (Number(tel) / 10000000000) < 2) {
        alert("请输入正确的手机号")
        return false
    }
    fetch(`http://localhost:3000/cellphone/existence/check?phone=${tel}&t=${new Date().getTime()}`).then(r => {
        r.json().then(r => signedIn = r)
        console.log(r.status);
    })
    setTimeout(() => {
        if (signedIn.exist === -1) {
            alert("手机号未注册")
            return false
        }
        return true
    }, 100)


}

function isRightPassword() {
    console.log(correctPassword.code)
    return correctPassword.code === 200;
}