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
                $('#state li').find('span').removeClass('select');
                $('#state li').eq(num - 1).find('span').addClass('select');

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
                $('#state li').find('span').removeClass('select');
                $('#state li').eq(num + 1).find('span').addClass('select');
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

    /*状态小圆点击事件*/
    $('#state li').click(function() {
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
            $('#state li').find('span').removeClass('select');
            $('#state li').eq(num).find('span').addClass('select');
        });

        obj.css('top', topx + "px");
        $('#state li').find('span').removeClass('select');
        $('#state li').eq(num).find('span').addClass('select');
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

    /*下一页按钮*/
    $('.nextbtn').click(function() {
        $(this).css('background', 'rgba(0,0,0,0.7)');
        setTimeout(function() {
            $('.nextbtn').css('background', 'none');
        }, 100);
        var obj = $(".sectionwrap");
        var num = obj.attr('data-num') * 1;

        if (num < 4 && status == 0) {
            status = 1;
            topx = topx - winHeight;
            obj.css('top', topx + "px");
            $('#state li').find('span').removeClass('select');
            $('#state li').eq(num + 1).find('span').addClass('select');
            setTimeout(function() {
                status = 0;
                obj.attr('data-num', num + 1);
                if (num === 3) {
                    $('.nextbtn').find('i').attr('class', 'fa fa-angle-up');
                };
            }, 600);
        }
        if (num == 4 && status == 0) {
            status = 1;
            topx = 0;
            obj.css('top', "0px");
            $('#state li').find('span').removeClass('select');
            $('#state li').eq(0).find('span').addClass('select');
            setTimeout(function() {
                status = 0;
                obj.attr('data-num', 0);
                $('.nextbtn').find('i').attr('class', 'fa fa-angle-down');
            }, 600);
        };
    });
    /*栅格菜单动画*/
    $(".menubtn").hover(function() {
        $(this).find('i').eq(1).animate({ 'margin-top': '7px', 'margin-bottom': '7px' }, 100);
    }, function() {
        $(this).find('i').eq(1).animate({ 'margin-top': '5px', 'margin-bottom': '5px' }, 100);
    });

    /*显示隐藏菜单*/
    $(".menubtn").click(function() {
        var num = 0;
        var listWidth;
        if (winWidth > 992) {
            listWidth = winWidth * 0.35;
        } else if (winWidth > 768) {
            listWidth = winWidth * 0.55;
        } else {
            listWidth = winWidth;
        }
        $(".hidemenu")
            .animate({ width: listWidth + "px" }, 300)
            .animate({ height: '100%' }, 300, function() {
                showList();
            });
        $('.maskmenu').fadeIn();

        function showList() {
            $(".name,.closemenu").fadeIn();
            setTimeout(function() {
                $(".listmenu li a").eq(0).animate({ opacity: 1, left: 0 });
                $(".listmenu li a").eq(1).delay(100).animate({ opacity: 1, left: 0 });
                $(".listmenu li a").eq(2).delay(200).animate({ opacity: 1, left: 0 });
                $(".listmenu li a").eq(3).delay(300).animate({ opacity: 1, left: 0 });
                $(".listmenu li a").eq(4).delay(400).animate({ opacity: 1, left: 0 });
            }, 200);
        }
    });

    /*绑定关闭菜单事件*/
    $(".closemenu,.maskmenu").click(function() {
        $(".listmenu li a").css({ opacity: 0, left: "7%" });
        $(".closemenu,.name,.maskmenu").fadeOut();
        $(".hidemenu")
            .animate({ height: "5px" })
            .animate({ width: 0 });
    });

});
