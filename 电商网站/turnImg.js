// 轮播图部分
window.addEventListener('load', function () {
    //轮播图
    createTurnImg();
    // 选项卡
    detailsSelect();
    // 侧边栏
    sideSlide();
})

var SINGLE_WIDTH;
var BACK_WIDTH;
var moveEnd = true;
var index = 1;
var timer = null;

function createTurnImg() {
    // 初始化位置
    var img_ul = document.getElementById('img_ul');
    var aLi = img_ul.getElementsByTagName('li');

    SINGLE_WIDTH = aLi[0].offsetWidth;
    BACK_WIDTH = aLi[0].offsetWidth * (aLi.length - 2);

    img_ul.style.width = aLi[0].offsetWidth * aLi.length + 'px';
    img_ul.style.left = -SINGLE_WIDTH + 'px';
    // 给左右按键绑定事件
    var turnImg_left_btn = document.getElementById('turnImg_left_btn');
    var turnImg_right_btn = document.getElementById('turnImg_right_btn');
    turnImg_left_btn.addEventListener('click', function () {
        imgMove(1);
    })
    turnImg_right_btn.addEventListener('click', function () {
        imgMove(-1);
    })

    pointEvent();
    autoImg();
    stopTimer();
}

// 滚动移动事件
function imgMove(moveNum, interval, moveTime) {
    if (!moveEnd) return;

    index = index - moveNum;//第几幅图片,从0开始,初始为第一张

    var img_ul = document.getElementById('img_ul');
    distance = SINGLE_WIDTH * moveNum;//一共要移动的距离
    moveAim = img_ul.offsetLeft + distance;//要移动到的终点位置
    speed = distance / (interval || 100 / moveTime || 10);//移动速度

    moveEnd = false;
    // 执行移动动画
    function go() {
        if ((speed > 0 && img_ul.offsetLeft < moveAim) || (speed < 0 && img_ul.offsetLeft > moveAim)) {
            img_ul.style.left = img_ul.offsetLeft + speed + 'px';
            setTimeout(go, 50);
            return;
        }
        // 到两头拉回图片
        resetLocation();
    }
    // 改变焦点的颜色
    changePointColor();
    // 移动完成,判断位置
    function resetLocation() {
        moveEnd = true;
        img_ul.style.left = moveAim + 'px';
        if (index === 6) {
            index = 1;
            img_ul.style.left = -SINGLE_WIDTH + 'px';
        } else if (index === 0) {
            index = 5;
            img_ul.style.left = - BACK_WIDTH + 'px';
        }
    }
    go();
}

function changePointColor() {
    var pointsParent = document.querySelector('.imgPoint');
    pointsParent.querySelector('i.select').classList.remove('select');
    var newIndex = index == 0 ? 4 : (index == 6 ? 0 : index - 1);
    pointsParent.querySelectorAll('i')[newIndex].classList.add('select');

}

// 焦点点击事件
function pointEvent() {
    // 利用事件委托
    var pointsParent = document.querySelector('.imgPoint');
    pointsParent.addEventListener('click', function (event) {
        var target = event.target;
        if (target.tagName === 'I') {
            imgMove(index - (+target.dataset.index));
        }
    })
}

// 自动滑动
function autoImg() {
    timer = setInterval(function () {
        imgMove(-1);
    }, 5000)
}

// 鼠标放上去停止自动滑动
function stopTimer() {
    var turnImg = document.getElementById('turnImg');
    turnImg.addEventListener('mouseover', function () {
        clearInterval(timer);
    })
    turnImg.addEventListener('mouseout', function () {
        autoImg(-1);
    })
}

// 分类选项卡
function detailsSelect() {
    var firstTittle = document.getElementsByClassName('firstTittle');
    var details = document.getElementsByClassName('details');
    for (var i = 0, len = firstTittle.length; i < len; i++) {
        firstTittle[i].index = i;
        firstTittle[i].addEventListener('mouseover', function () {
            for (var j = 0, Dlen = details.length; j < Dlen; j++) {
                details[j].style.display = 'none';
            }
            details[this.index].style.display = 'block';
        })
        firstTittle[i].addEventListener('mouseout', function () {
            for (var j = 0, Dlen = details.length; j < Dlen; j++) {
                details[j].style.display = 'none';
            }
        })
    }
}

// 侧边栏
var newScro;
var opa;
// var showTimer = null;
function sideSlide() {
    var sideBox = document.getElementById('sideBox');
    window.addEventListener('scroll', function () {
        newScro = document.body.scrollTop;
        if (newScro > 30) {
            sideBox.style.display = 'block';
        } else {
            sideBox.style.display = 'none';
        }
    })
}



// function slowShow() {
//     if (newScro > 30) {
//         opa = window.getComputedStyle(sideBox)['opacity']
//         sideBox.style.opacity = opa + 0.5;
//         setTimeout(slowShow,300);
//         console.log(newScro, opa);
//     } else {
//         // sideBox.style.display = 'none'
//     }
// }
// slowShow();
// clearTimeout(showTimer);
// newScro = document.body.scrollTop;
// opa = window.getComputedStyle(sideBox)['opacity'];
// if (opa >= 1) {
//     return;
// } else {
//     slowShow();
// }
// function slowShow() {
//     if (newScro > 30 && opa < 1) {
//         console.log(opa);
//         sideBox.style.opacity = opa + 0.5;
//         opa = window.getComputedStyle(sideBox)['opacity'];
//         showTimer = setTimeout(slowShow, 300);
//         return;
//     }
//     if (newScro <= 30 && opa > 1) {
//         clearTimeout(showTimer);
//         return;
//     }