//var

// main
main()

// function
function main() {
    fetches()
}

function fetches() {

}

function decode() {
    let decodeStr = decodeURI(document.URL)
    decodeStr = decodeStr.slice(decodeStr.indexOf('=') + 1)
    return decodeStr
}
