// var
window.page = 3
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
let isLegalNumber = true
main()

// function
function main() {
    document.addEventListener("DOMContentLoaded", () => {
        loginButton.onclick = function () {
            // const telephoneNumber = telephoneObject.value
            console.log(`telephone number = ${telephoneObject.value}`)
            isLegalNumber = isLegal(telephoneObject.value)
            if (isLegalNumber !== false) {
                fetch(`http://localhost:3000/login/cellphone?phone=${telephoneObject.value}&password=${passwordObject.value}&timestamp=${new Date().getTime()}`)
                    .then(r => r.json())
                    .then(r => correctPassword = r)
                    .then(() => {
                        if (!isRightPassword()) {
                            alert("账号或密码错误！")
                        } else {
                            // window.location.url = "1_start.html"
                            // window.navigate("1_start.html").then(r => console.log(r.status));//
                            window.location.replace("1_start.html")
                        }
                    })
            }
        }
    })
}

function isLegal(tel) {
    // if (!(1 < (Number(tel) / 10000000000) && (Number(tel) / 10000000000) < 2)) {
    if(Math.floor(Number(tel) / 10000000000) !== 1) {
        alert("请输入正确的手机号")
        return false
    }
    fetch(`http://localhost:3000/cellphone/existence/check?phone=${tel}&timestamp=${new Date().getTime()}`, {
        method: "POST"
    }).then(r => r.json())
        .then(r => signedIn = r)
        .then(() => {
            if (signedIn.exist === -1) {
                alert("手机号未注册")
                return false
            }
            return true
        })
    return true

}

function isRightPassword() {
    console.log(`correctPassword.code = ${correctPassword.code}`)
    return correctPassword.code === 200;
}

