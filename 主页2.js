
window.addEventListener('load', function () {
    var oCircle = document.getElementById('circle');
    var oFriend = document.getElementsByClassName('friend')[0];

    // 登录弹出
    oCircle.addEventListener('click', function () {
        oFriend.style.display = 'block';
    })

    // 登录关闭
    var oClose = oFriend.getElementsByClassName('close')[0];
    oClose.addEventListener('click', function () {
        oFriend.style.display = 'none';
        user2.style.display = 'none';
        user1.style.display = 'block';
        ali2.style.borderBottomColor = '#aaa';
        ali1.style.borderBottomColor = '#4bacfe';
    })

    // 滑动更换登录方式
    var ali1 = document.getElementById('ali1');
    var ali2 = document.getElementById('ali2');
    var user1 = document.getElementsByClassName('user1')[0];
    var user2 = document.getElementsByClassName('user2')[0];

    ali2.addEventListener('mouseover', function () {
        user1.style.display = 'none';
        user2.style.display = 'block';
        ali1.style.borderBottomColor = '#aaa';
        ali2.style.borderBottomColor = 'green';
    })

    ali1.addEventListener('mouseover', function () {
        user2.style.display = 'none';
        user1.style.display = 'block';
        ali2.style.borderBottomColor = '#aaa';
        ali1.style.borderBottomColor = '#4bacfe';
    })

    //轮播
    //图片
    var turnArea = document.getElementsByClassName('turnArea')[0];
    var oul = document.getElementById('turnUl');
    var ali = oul.getElementsByTagName('li');
    oul.style.width = (ali[0].offsetWidth + 10) * ali.length + 10 + 'px';
    //按钮
    var leftBtn = document.getElementById('leftbox');
    var rightBtn = document.getElementById('rightbox');
    //滑动块
    var square = document.getElementsByClassName('aSli');
    var index = 1;

    var moved = true;//存放动画是否完成，没完成的话点击按钮不起作用 

    function changeColor() {
        for (var i = 0; i < square.length; i++) {
            square[i].style.backgroundColor = '#aaa';
        }
        square[index - 1].style.backgroundColor = '#d84a68';
    }

    function move(distance) {
        var aim = oul.offsetLeft + distance;
        var time = 300;//切换一张图片用的总时间
        var interval = 10;//每隔10ms移动图片一次 
        var speed = distance / (time / interval);//每隔10ms要移动的图片距离

        moved = false;
        function go() {
            //oul.offsetLeft + distance和oul.style.left同步变换的 所以不能放在条件里 否则永远的停不下来
            if ((speed > 0 && oul.offsetLeft < aim) || (speed < 0 && oul.offsetLeft > aim)) {
                oul.style.left = oul.offsetLeft + speed + 'px';
                setTimeout(go, interval);
            } else {
                moved = true;
                oul.style.left = aim + 'px';
                if (aim > -1250) {
                    oul.style.left = -5000 + 'px';
                }
                if (aim < -5000) {
                    oul.style.left = -1250 + 'px';
                }
            }
        }
        go();
    }

    function auto() {
        timer = setInterval(function () {
            if (moved) {
                if (index == 4) {
                    index = 1;
                } else {
                    index += 1;
                }
                changeColor();
                move(-1250);
            }
        }, 3000)//就是每隔多久点击一下左键即可
    }

    function stops() {
        clearInterval(timer);
    }

    leftBtn.addEventListener('click', function () {
        //因为index自加也要同步于动画，防止多次快速点击
        if (moved) {
            if (index == 4) {
                index = 1
            } else {
                index += 1;
            }
            changeColor();
            move(-1250);
        }
    })

    rightBtn.addEventListener('click', function () {
        if (moved) {
            if (index == 1) {
                index = 4
            } else {
                index -= 1;
            }
            changeColor();
            move(1250);
        }
    })

    for (var i = 0; i < square.length; i++) {
        square[i].index = i;
        square[i].addEventListener('mouseover', function () {
            for (var j = 0; j < square.length; j++) {
                square[j].style.backgroundColor = '#aaa';
            }
            this.style.backgroundColor = '#d84a68';
            var newIndex = this.index + 1;
            var distance = -1250 * (newIndex - index);
            // 把newIndex复制给旧的index，否则inde初始值始终停留在1
            index = newIndex;
            if (moved) {
                move(distance);
            }
        })
    }

    //自动播放
    auto();
    turnArea.addEventListener('mouseover', function () {
        stops();
    })
    turnArea.addEventListener('mouseout', function () {
        auto();
    })


    // 内容选项卡
    var sub = document.getElementById('subject');
    var conLi = sub.getElementsByTagName('li');
    var words = document.getElementsByClassName('words');
    
    for (var i = 0; i < conLi.length; i++){
        conLi[i].index = i;
        conLi[i].addEventListener('mouseover',function(){
            for(var j = 0;j < conLi.length;j++){
                conLi[j].style.backgroundColor = '#014576';
            }
            this.style.backgroundColor = '#0c71e4';    
            for(var j = 0;j < words.length;j++){
                words[j].classList.remove('show');
            }
            words[this.index].classList.add('show');
        })
    }

    //侧边栏置顶
    var backBtn = document.getElementById('backTop');
    var backtime = null;
    var scroTime = 200;//2s之内回到顶部
    // var scro = document.body.scrollTop;
    // var scroSpeed = scro/scroTime
    backBtn.addEventListener('click',function(){
        clearTimeout(backtime);
        backtime=setInterval(function(){
            var newScro = document.body.scrollTop;
            console.log(document.body.scrollTop);
            if(document.body.scrollTop <= 0){
                clearTimeout(backtime);
            }else{
                document.body.scrollTop = newScro - 20;
            }
         },5)
    })

})