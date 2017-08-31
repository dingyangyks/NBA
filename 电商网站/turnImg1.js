// 轮播图部分
window.addEventListener('load', function () {
    createImgBox();
})
var moveEnd = true;
var index = 1;
var timer = null;

function createImgBox() {
    var imgBox = document.getElementById('img_ul');
    var aLi = imgBox.getElementsByTagName('li');
    imgBox.style.width = aLi[0].offsetWidth * aLi.length + 'px';
    imgBox.style.left = - aLi[0].offsetWidth + 'px';
    // 获取按键
    var imgLeftBtn = document.getElementById('turnImg_left_btn');
    var imgRightBtn = document.getElementById('turnImg_right_btn');
    imgLeftBtn.addEventListener('click', function () {
        imgMove(-1);
    });
    imgRightBtn.addEventListener('click', function () { 
        imgMove(1);
    });
    autoImg();
    pointEvent();
    stopTimer();
}

// 判断移动是否完成
function imgMove(moveNum, moveImgTime, interval) {
    if (!moveEnd) return;
    var imgBox = document.getElementById('img_ul');
    var aLi = imgBox.getElementsByTagName('li');
    var distacnce = - aLi[0].offsetWidth * moveNum;
    index  = index + moveNum;
    PointColor();
    // var distacnce = direction == 'left' ? -aLi[0].offsetWidth : aLi[0].offsetWidth;
    var moveAim = imgBox.offsetLeft + distacnce;
    var speed = distacnce / (moveImgTime || 100 / interval || 10);
    moveEnd = false;
    function ImgGo() {
        // 向左滑 left减小
        if (speed < 0 && imgBox.offsetLeft > moveAim || speed > 0 && imgBox.offsetLeft < moveAim) { //正在移动
            imgBox.style.left = imgBox.offsetLeft + speed + 'px';
            setTimeout(ImgGo, 50);
            return;
        }
        relocation();
    }
    function relocation() {
        moveEnd = true;
        imgBox.style.left = moveAim + 'px';
        // 设置倒数第1张和第1张的位置
        // console.log(moveEnd)
        if (index == 6) {
            imgBox.style.left = - aLi[0].offsetWidth + 'px';
            index = 1;
        } else if (index == 0) {
            imgBox.style.left = - aLi[0].offsetWidth * (aLi.length - 2) + 'px';
            index = 5;
        }
    }
    ImgGo();
}

// 自动滑动
function autoImg() {
    timer = setInterval(function () {
        imgMove(1);
    }, 5000)
}

// 鼠标放上去停止自动滑动
function stopTimer() {
    var turnImg = document.getElementById('turnImg');
    turnImg.addEventListener('mouseover', function () {
        clearInterval(timer);
    })
    turnImg.addEventListener('mouseout', function () {
        autoImg(1);
    })
}

// 滑动点
function PointColor() {
    var pointsParent = document.querySelector('.imgPoint');
    pointsParent.querySelector('i.select').classList.remove('select');
    var newIndex = index == 0 ? 4 : (index == 6 ? 0 : index - 1);
    pointsParent.querySelectorAll('i')[newIndex].classList.add('select');
}

// 滑动点事件
function pointEvent () {
    document.querySelector('.imgPoint').addEventListener('click',function(e){
        e.target.tagName === 'I' && imgMove(+e.target.dataset.index - index);
    })
}

