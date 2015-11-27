/**
 * 刮刮乐特效
 * $author tony@jentian.com
 * $date 2015-11-10
 * */
var scratch = {
    shade: document.getElementById('shade'), //画布对象
    brush: null,  //画笔
    mousedown: false,  //鼠标和触摸事件后的一个状态
    init: function(){
        scratch.shade.width = $('#shade').width();
        scratch.shade.height = $('#shade').height();
        this.draw();
        scratch.brush.globalCompositeOperation = 'destination-out'; //此处是关键，设置属性在源图像外显示目标图像
        scratch.shade.addEventListener('touchstart', scratch.eventDown);             
        scratch.shade.addEventListener('touchend', scratch.eventUp);             
        scratch.shade.addEventListener('touchmove', scratch.eventMove);             
        scratch.shade.addEventListener('mousedown', scratch.eventDown);             
        scratch.shade.addEventListener('mouseup', scratch.eventUp);             
        scratch.shade.addEventListener('mousemove', scratch.eventMove); 
    },
    draw: function(){
        scratch.brush = scratch.shade.getContext('2d');  //创建画笔
        scratch.brush.fillStyle='b9b9b9';   //染色          
        scratch.brush.fillRect(0, 0, scratch.shade.width, scratch.shade.height); //在画布上画矩形
        
        //此步可以省略
        var img = document.getElementById('shadeImg');  //获取img对象
        scratch.brush.drawImage(img, 0, 0, scratch.shade.width, scratch.shade.height); //将img画在画布上
    },
    eventDown: function(e){
        e.preventDefault();
        scratch.mousedown = true;
    },
    eventUp: function(e){
        e.preventDefault();
        scratch.mousedown = false;
    },
    eventMove: function(e){
        e.preventDefault(); //阻止浏览器的默认事件
        var offsetX = $(scratch.shade).offset().left, offsetY = $(scratch.shade).offset().top; //画布在页面上的位置
        if(scratch.mousedown){
            if(e.changedTouches){                         
                e=e.changedTouches[e.changedTouches.length-1];                     
            }                     
            var x =  e.pageX - offsetX,  //获取事件触发时，触碰点在画布上所处的位置                       
            y =  e.pageY - offsetY;                         
            scratch.brush.beginPath();  //画笔开始一条新的路径
            scratch.brush.arc(x, y, 15, 0, Math.PI * 2); //画圆                        
            scratch.brush.fill();  //填充颜色
        }
    }
};