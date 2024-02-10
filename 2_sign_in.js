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
    setTimeout(() => {
        key = getKey.data.unikey
        qrcode.setAttribute("src", getImg.data.qrimg)
        login()
    }, 1000)
}

function fetches() {
    // fetch("http://localhost:3000/login/qr/key" + '?t=' + Date.now()).then(r => {
    //     r.json().then((json) => getKey = json)
    //     console.log(`getKey status = ${r.status}`)
    //     fetch(`http://localhost:3000/login/qr/create?qrimg=true&key=${key}?t=${new Date().getTime()}`).then(r => {
    //         r.json().then(r => getImg = r)
    //         console.log(`make qrcode status = ${r.status}`)
    //     })
    // })

    fetch("http://localhost:3000/login/qr/key" + '?t=' + Date.now())
        .then(r => r.json())
        .then(() => fetch(`http://localhost:3000/login/qr/create?qrimg=true&key=${key}?t=${new Date().getTime()}`).then(r => r.json()).then(r => getImg = r))
}

function login() {
    let check = setInterval(() => {
        let nowNext = new Date().getTime();
        fetch(`http://localhost:3000/login/qr/check?key=${key}&t=${nowNext}&noCookie=true`).then(r => {
            r.json().then((json) => QRCode = json)
            console.log(r.status)
        })
        setTimeout(() => {
            console.log(QRCode.message, '---')
            if (QRCode.code === 800) {
                alert("QRCode.message")
                clearInterval(check)
            }
            if (QRCode.code === 803) {
                alert("QRCode.message")
                clearInterval(check)
            }
        }, 1000)

    }, 3000)
    console.log(QRCode.message)
}


