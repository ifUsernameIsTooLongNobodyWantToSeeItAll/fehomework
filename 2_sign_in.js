// 变量定义
window.page = 2
let key;
let getKey = {
    data: {
        code: null,
        unikey: null
    },
    code: null
}
let getImg = {
    code: null,
    data: {
        qrurl: null,
        qrimg: null
    }
}
let QRCode = {
    code: null,
    message: null,
    cookie: null
}
const qrcode = document.getElementById("QR_code_3")
// let codes;
main()

// 函数定义
function main() {
    fetches()
}

function fetches() {
    fetch("http://localhost:3000/login/qr/key" + '?timestamp=' + new Date().getTime())
        .then(r => r.json())
        .then(r => getKey = r)
        .then(() => key = getKey.data.unikey)
        .then(() => {
            fetch(`http://localhost:3000/login/qr/create?qrimg=true&key=${key}?timestamp=${new Date().getTime()}`)
                .then(r => r.json())
                .then(r => getImg = r)
                .then(() => qrcode.setAttribute("src", getImg.data.qrimg))
                .then(() => login())
        })
}

function login() {
    let check = setInterval(() => {
        fetch(`http://localhost:3000/login/qr/check?key=${key}&timestamp=${new Date().getTime()}`)
            .then(r => r.json())
            .then(r => QRCode = r)
            .then(() => {
                console.log(QRCode.message)
                if (QRCode.code === 800) {
                    alert(QRCode.message)
                    clearInterval(check)
                }
                if (QRCode.code === 803) {
                    alert(QRCode.message)
                    clearInterval(check)
                }
            })

    }, 3000)
    console.log(QRCode.message)
}
