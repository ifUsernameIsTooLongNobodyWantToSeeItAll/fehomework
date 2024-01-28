//var


//main
main()

//function
function main() {
    fetches()
    decode()
}

function fetches() {

}

function decode() {
    let playList = decodeURI(document.URL)
    playList = playList.slice(playList.indexOf('=') + 1)
    return Number(playList)
}