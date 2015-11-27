/**
 * jquery轮播效果
 * $author tony@jentian.com
 * $date 2015-11-05
 * */
(function($){
    $.fn.sliderScroll = function(options){
        var index = 1, ele = this, timer,
            defaults = {
                mainEle: '#slideList li', //切换的元素
                effect: '', //切换效果
                speed: 500, //动画运行速度
                time: 3000, //切换速度
                autoPage: true, //是否显示分页
                autoIndex: true, //是否显示分页下标
                autoArrow: true //是否显示左右箭头
            };
            options = $.extend(defaults, options);
        var li = $(options.mainEle);
        var length = li.length;
        var scroll = {
            init:function(){
                if(options.autoPage){
                    scroll.createPage();
                }
                if(options.autoArrow){
                    scroll.createArrow();
                }
                li.eq(0).css({'z-index': 1});
                $('.indexs li').eq(0).addClass('cur');
                scroll.addEvent();
                scroll.start();
            },
            start: function(){
                timer = setTimeout(function(){scroll.go();}, options.time);
            },
            stop: function(){
                clearTimeout(timer);
                timer = null;
            },
            createArrow: function(){ // 创建左右箭头
                var arrow = "<div class='arrowBar'><a id='leftArrow'></a><a id='rightArrow'></a></div>";
                ele.append(arrow);
                $('#leftArrow').on('click', function(){
                    scroll.stop();
                    index = index - 2;
                    scroll.go();
                });
                $('#rightArrow').on('click', function(){
                    scroll.stop();
                    scroll.go();
                });
            },
            addEvent: function(){ //鼠标移入时停止，移出时继续轮播
                li.hover(function(){
                    scroll.stop();
                },function(){
                    scroll.start();
                });
            },
            createPage: function(){ //创建分页栏
                var indexs = $("<ul class='indexs'></ul>");
                if(options.autoIndex){  
                    for(var i=0; i < length; i++){
                        indexs.append('<li>'+(i+1)+'</li>');
                    }
                }else{
                    for(var i=0; i < length; i++){
                        indexs.append('<li></li>');
                    }
                }
                ele.append(indexs);
                $('.indexs li').on('click', function(){
                    scroll.stop();  //轮播停止
                    index = $(this).index();   //获取当前li的下标值，赋值给index
                    scroll.go(); //开始轮播
                });
            },
            go: function(){
                if(index < 0){  //当index小于0，将最后一个元素的下标赋值给index
                    index = length-1;
                }
                if(index > length-1){ //当index大于最后一个元素的下标值时，将index设为0
                    index = 0;
                }
                switch(options.effect){
                    case 'left':
                        var width = li.width(); 
                        li.eq(index).css({'z-index': 2, 'left': width});
                        li.eq(index).stop(true, true).animate({'left': 0}, options.speed,function(){
                            li.css({'z-index': 0});
                            if(index <= 0){
                                li.eq(length-1).css({'z-index': 1});
                            }else{
                                li.eq(index-1).css({'z-index': 1});
                            }
                        });
                        $('.indexs li').eq(index).addClass('cur').siblings().removeClass('cur');
                        break;
                    case 'fadeOut':
                        li.fadeOut(options.speed);
                        li.eq(index).stop(true, true).css({'z-index': 2}).fadeIn(options.speed, function(){
                            li.css({'z-index': 0});
                            if(index <= 0){
                                li.eq(length-1).css({'z-index': 1});
                            }else{
                                li.eq(index-1).css({'z-index': 1});
                            }
                        });
                        $('.indexs li').eq(index).addClass('cur').siblings().removeClass('cur');
                        break;
                    default:
                        li.css({'z-index': 0});
                        li.eq(index).css({'z-index': 1}).show();
                        $('.indexs li').eq(index).addClass('cur').siblings().removeClass('cur');
                        break;
                    
                }
                index++;
                scroll.start();
            }
        };
        scroll.init();
    };
})(jQuery);