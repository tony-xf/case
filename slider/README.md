# jquery轮播特效插件slider

        slider使用

    1,引入javascript/css
    <!-- slider CSS -->
    <link rel="stylesheet" type="text/css" href="/slider/slider.css">

    <!-- jQuery -->
    <script type="text/javascript" charset="utf8" src="/slider/jquery-1.11.3.js"></script>

    <!-- slider -->
    <script type="text/javascript" charset="utf8" src="/slider/sliderScroll.js"></script>

    2,初始化slider
    $(document).ready(function(){
        $('#slide').sliderScroll();
    });

    3,还可以传参数使用不同的切换效果
    $(document).ready(function(){
        $('#slide').sliderScroll({
            mainEle: '#slideList li', //切换的元素
            effect: '', //切换效果，可传left， fadeOut，不传为默认
            speed: 500, //动画运行速度
            time: 3000, //切换速度
            autoPage: true, //是否显示分页
            autoIndex: true, //是否显示分页下标
            autoArrow: true //是否显示左右箭头
        });
    });


