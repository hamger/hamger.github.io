$(document).ready(function() {

    /*设置分页宽高*/
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    $(".wraper, .sectionwrap, .section, .colormask").height(winHeight);
    $(".wraper, .sectionwrap, .section, .colormask").width(winWidth);

    $(window).resize(function() {
        var winHeight = $(window).height();
        var winWidth = $(window).width();
        $(".wraper, .sectionwrap, .section, .colormask").height(winHeight);
        $(".wraper, .sectionwrap, .section, .colormask").width(winWidth);
    });
    
     /*鼠标滚轮上下滚动*/
    var topx = 0;
    var status = 0;
    $(window).bind('mousewheel DOMMouseScroll', function(event) {
        var obj = $(".sectionwrap");
        var num = obj.attr('data-num') * 1;
        var winHeight = $(window).height();
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) { //向上滑动
            if (num > 0 && status == 0) {
                status = 1;
                topx = -(num - 1) * winHeight;
                obj.css('top', topx + "px");
                $('#zhuangt li').find('span').removeClass('select');
                $('#zhuangt li').eq(num - 1).find('span').addClass('select');

                setTimeout(function() {
                    status = 0;
                    obj.attr('data-num', num - 1);
                    if (num === 4) {
                        $('.nextbtn').find('i').attr('class', 'fa fa-angle-down');
                    };
                }, 800);
            };
        } else {
            if (num < 4 && status == 0) {
                status = 1;
                topx = -(num + 1) * winHeight;
                obj.css('top', topx + "px");
                $('#zhuangt li').find('span').removeClass('select');
                $('#zhuangt li').eq(num + 1).find('span').addClass('select');
                setTimeout(function() {
                    status = 0;
                    obj.attr('data-num', num + 1);
                    if (num === 3) {
                        $('.nextbtn').find('i').attr('class', 'fa fa-angle-up');
                    };
                }, 800);
            };
        }
    });

     $('#zhuangt li').click(function() {
        var obj = $("div.sectionwrap");
        var num = $(this).index();
        var winHeight = $(window).height();
        status = 1;
        topx = -(num * winHeight);

        obj.stop().animate({
            top: topx + "px"
        }, 300, function() {
            status = 0;
            obj.attr('data-num', num);
            $('#zhuangt li').find('span').removeClass('select');
            $('#zhuangt li').eq(num).find('span').addClass('select');
        });

        obj.css('top', topx + "px");
        $('#zhuangt li').find('span').removeClass('select');
        $('#zhuangt li').eq(num).find('span').addClass('select');
        setTimeout(function() {
            status = 0;
            obj.attr('data-num', num);
            if (num === 3) {
                $('.nextbtn').find('i').attr('class', 'fa fa-angle-up');
            } else {
                $('.nextbtn').find('i').attr('class', 'fa fa-angle-down');
            };
        }, 600);

    });

});
