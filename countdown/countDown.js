/*
 * 倒计时
 * $Author: tony@jentian.com
 * $date: 2016-01-25
 */

(function($){
    $.fn.countDown = function(option){
        var defaults = {
            container: null,    //外层容器
            text: '距离开抢还剩：',    //提示信息
            endMsg: '活动已结束',    //倒计时结束后显示信息
            startTime: 0,       //倒计时开始时间
            endTime: 0,     //倒计时结束时间
            autoShowDay: true,      //是否显示 天
            autoShowHour: true,     //是否显示 时
        },
            _this = $(this);
        var options = $.extend(option, defaults);

        var element = "<span class='cd_text'>"+options.text+"</span>"
                    + '<em></em><span>天</span>'
                    + '<em></em><span>时</span>'
                    + '<em></em><span>分</span>'
                    +'<em></em><span>秒</span>',
            obj = (options.container == null) ? _this : options.container;
        var value = (options.endTime - options.startTime)*1000;
        if(value <= 0){
            obj.html(options.endMsg);
            return;
        }else{
            obj.html(element);
            var ems = obj.find('em'), spans = obj.find('span'); d = new Date(), timer = null;
            d.setTime(value + d.getTimezoneOffset() * 60000);
            var day = Math.floor(diff/(86400*1000)), hour = d.getHours(), minute = d.getMinutes(), second = d.getSeconds();
            ems.eq(0).text(day < 10 ? '0'+day: day);
            ems.eq(1).text(hour < 10 ? '0'+hour: hour);
            ems.eq(2).text(minute < 10 ? '0'+minute: minute);
            ems.eq(3).text(second < 10 ? '0'+second: second);

            function go(){
                second--;
                if (second < 0) {
                    second = 59;
                    minute--;
                    if (minute < 0) {
                        minute = 59;
                        hour--;
                        if (hour < 0) {
                            hour = 23;
                            day--;
                            if (day < 0) {
                                obj.text(options.endMsg);
                                clearTimeout(timer);
                                timer = null;
                            }
                            ems.eq(0).text(day < 10 ? '0'+day: day);
                        }
                        ems.eq(1).text(hour < 10 ? '0'+hour: hour);
                    }
                    ems.eq(2).text(minute < 10 ? '0'+minute: minute);
                }
                ems.eq(3).text(second < 10 ? '0'+second: second);

                if(!options.autoShowDay){
                    ems.eq(0).hide();
                    spans.eq(1).hide();
                }
                if(!options.autoShowHour){
                    ems.eq(1).hide();
                    spans.eq(2).hide();
                }
                timer = setTimeout(go, 1000);
            }
            go();
        }
    }
})(jQuery);