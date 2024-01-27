// cd E:\fehomework\NeteaseCloudMusicApi-master\NeteaseCloudMusicApi-4.14.1


let arrayOfSliderPicturesInHtml = document.getElementsByClassName("pictures_6")
let isLoggedIn = false;
const head = document.getElementById("head_4")
const username = document.getElementById("username_4")
const geDanRecommendations = document.getElementsByClassName("pic_7")
const geDanDescription = document.getElementsByClassName("description_7")
const boFangShu = document.getElementsByClassName("number_7")
const boFangShu2 = document.getElementsByClassName("number_2_7")
const userGeDan = document.getElementsByClassName("not_favorite_3")

let sliderPicture = {
    banners: [
        {
            imageUrl: null,
            targetId: null,
            adid: null,
            targetType: null,
            titleColor: null,
            typeTitle: null,
            url: null,
            exclusive: null,
            monitorImpress: null,
            monitorClick: null,
            monitorType: null,
            monitorImpressList: null,
            monitorClickList: null,
            monitorBlackList: null,
            extMonitor: null,
            extMonitorInfo: null,
            adSource: null,
            adLocation: null,
            adDispatchJson: null,
            encodeId: null,
            program: null,
            event: null,
            video: null,
            song: null,
            scm: null,
            bannerBizType: null
        }
    ]
};

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
let informationOfGeDan = {
    hasTaste: null,
    code: null,
    category: null,
    result: [
        {
            id: null,
            type: null,
            name: null,
            copywriter: null,
            picUrl: null,
            canDislike: null,
            trackNumberUpdateTime: null,
            playCount: null,
            trackCount: null,
            highQuality: null,
            alg: null
        }
    ]
}

let geDanListByUser = {
    version: null,
    more: null,
    playlist: [
        {
            coverImgUrl: null,
            name: null,
            id: null
        }
    ],
    code: null
}

main()

function fetches() {
    fetch("http://localhost:3000/banner")
        .then((response) => {
            response.json().then(r => sliderPicture = r)
            console.log(response.status)
        })

    fetch("http://localhost:3000/personalized?limit=10").then(r => {
        r.json().then(json => informationOfGeDan = json)
        console.log(r.status)
    })

    fetch(`http://localhost:3000/user/account?t=${new Date().getTime()}`)
        .then((response) => {
            response.json().then(json => userInformation = json)
            console.log(response.status)
        }, () => {
            alert("No!")
        })

    if (userInformation.account.id !== null) {
        setTimeout(() => {
            fetch(`http://localhost:3000/user/playlist?uid=${userInformation.account.id}`).then((r) => r.json)
                .then((json) => geDanListByUser = json)
        }, 200)
    }

    fetch(`http://localhost:3000/login/refresh?t=${new Date().getTime()}`)
        .then(r => console.log(r.status))
}

function getSliderPictures() {
    if (arrayOfSliderPicturesInHtml.length < sliderPicture.banners.length) {
        for (let i = arrayOfSliderPicturesInHtml.length; i < sliderPicture.banners.length; i++) {
            let addElement = "<a href=\"#\" class=\"slider_5\">\n    <img src=\"#\" alt=\"" + i + "\" class=\"pictures_6\">\n</a>"
            // let ul = document.getElementsByClassName("slider_4")[0]
            // ul.innerHTML += addElement
            // ul.insertAdjacentHTML("beforeend", addElement);
            let add = document.createElement("li")
            add.innerHTML = addElement
            let slider_4 = document.getElementsByClassName("slider_4")[0]
            slider_4.appendChild(add)
        }
    }
    for (let i = 0; i < arrayOfSliderPicturesInHtml.length; i++) {
        arrayOfSliderPicturesInHtml[i].setAttribute("src", sliderPicture.banners[i].imageUrl)
    }
    // arrayOfSliderPicturesInHtml[arrayOfSliderPicturesInHtml.length].setAttribute("src", sliderPicture.banners[0].imageUrl)
    slide()
}


function slide() {
    // 控制播放张数
    let point;
    let key;
    let i;
    const slider = document.getElementById("slider_2");
    const ul = slider.children[0].children[0];
    const ullis = ul.children;

// 1、动态复制最后一张图
    ul.appendChild(ullis[0].cloneNode(true));

// 2、动态生成小圆点
    const ol = document.createElement("ol");
    slider.appendChild(ol);
    for (i = 0; i < ullis.length - 1; i++) {
        const li = document.createElement("li");
        li.innerHTML = (i + 1).toString();
        ol.appendChild(li);
    }
    ol.children[0].setAttribute("class", "current");

// 3、鼠标经过小圆点  圆点事件
    const ollis = ol.children;
    for (i = 0; i < ollis.length; i++) {
        ollis[i].index = i; // 自定义属性

        ollis[i].onmouseover = function () {
            for (let j = 0; j < ollis.length; j++) { // 去掉所有小圆点的class
                ollis[j].removeAttribute("class");
            }
            ollis[this.index].setAttribute("class", "current"); // 保留当前小圆点的class
            // ollis[i].setAttribute("borderRadius", "20px")
            // 图片动画
            animate(ul, -this.index * ullis[0].offsetWidth);

            key = point = this.index; // 从当前开始动画
        }
    }
// 缓动动画函数
    let leader = 0;//缓动动画变量
    function animate(obj, target) {
        clearInterval(obj.timer); // 清除定时器
        /*定时任务，缓动轮播 30毫秒到target位置*/
        obj.timer = setInterval(function () {
            leader = leader + (target - leader) / 10;//缓动动画公式
            obj.style.left = leader + "px";
        }, 10);
    }

// 4、轮播图定时器
    let timer = null;
    timer = setInterval(autoplay, 5000);
    key = 0;
    point = 0; // 控制小圆点
    function autoplay() {
        // 播放张数
        key++;
        if (key > ullis.length - 1) { // 判断是否播放完
            leader = 0; // 迅速跳回
            key = 1; // 下次播放第二张
        }
        animate(ul, -key * ullis[0].offsetWidth);

        // 小圆点
        point++;
        if (point > ollis.length - 1) {
            point = 0;
        }
        for (let i = 0; i < ollis.length; i++) { // 先清除所有的
            ollis[i].removeAttribute("class");
        }
        ollis[point].setAttribute("class", "current") // 再保留现在的
    }

// 5、鼠标经过事件
    slider.onmouseover = function () {
        clearInterval(timer);
    }
    slider.onmouseout = function () {
        timer = setInterval(autoplay, 3000);
    }
}

/*获取歌单*/

function getLoginHead() {
    if (userInformation.account.id === 9119289842) {
        isLoggedIn = false;
        fetch("http://localhost:3000/logout").then(r => isLoggedIn = false)
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

function getGeDanRecommendations() {
    for (let i = 0; i < 10; i++) {
        geDanRecommendations[i].setAttribute("src", informationOfGeDan.result[i].picUrl)
        geDanDescription[i].innerHTML = informationOfGeDan.result[i].name
    }
}

function getUserGeDanList() {
    if (isLoggedIn) {
        if (geDanListByUser.playlist.length > 1) {
            for (let i = 0; i < geDanListByUser.playlist.length; i++) {
                let addElement = "<a class=\"not_clicked_or_not_in_3 not_favorite_3\" href=\"./5_ge_dan_detail.html\">\n</a>"
                let add = document.createElement("div")
                add.innerHTML = addElement
                let total = document.getElementById("left_side_1")
                total.appendChild(add)
            }
            for (let i = 0; i < geDanListByUser; i++) {
                userGeDan[i].innerHTML = geDanListByUser.playlist[i].name
            }
        } else
            userGeDan[0].innerHTML = geDanListByUser.playlist[0].name
    } else {
        userGeDan[0].innerText = ""
    }
}

function changeLink() {
    if (isLoggedIn) {
        username.setAttribute("href", "https://music.163.com")
    }
}

function main() {
    fetches()
    setTimeout(() => {
        getGeDanRecommendations()
        getUserGeDanList()
        getSliderPictures()
        getLoginHead()
        changeLink()
    }, 500) // in main
}