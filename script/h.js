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
            /* if (num === 3) {
                 $('.nextbtn').find('i').attr('class', 'fa fa-angle-up');
             } else {
                 $('.nextbtn').find('i').attr('class', 'fa fa-angle-down');
             };*/
        }, 600);

    });
    /*栅格菜单动画*/
    $(".menubtn").hover(function() {
        $(this).find('i').eq(1).animate({ 'margin-top': '7px','margin-bottom':'7px' }, 100);
    }, function() {
        $(this).find('i').eq(1).animate({ 'margin-top': '5px','margin-bottom':'5px'  }, 100);
    });

    /*显示隐藏菜单*/
    $(".menubtn").click(function() {
        var num = 0;
        var listHeight = winHeight*0.14;
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
            .animate({ height: '100%'}, 300, function() {
                showList();
            });
        $('.hidemenu .maskmenu').fadeIn();
        $("body").css({ "width": $('body').width(), "overflow": "hidden" });

        function showList(_this) {
            $(".hidemenu .name").fadeIn();
            setTimeout(function() {
                $(".listmenu li a").eq(0).animate({ opacity: 1, left: "0px" });
                $(".listmenu li a").eq(1).delay(100).animate({ opacity: 1, left: "0px" });
                $(".listmenu li a").eq(2).delay(200).animate({ opacity: 1, left: "0px" });
                $(".listmenu a").eq(3).delay(300).animate({ opacity: 1, left: "0px" });
                $(".listmenu a").eq(4).delay(400).animate({ opacity: 1, left: "0px" });
                setTimeout(function() {
                    $(".listmenu li a").addClass('transition');
                }, 1000);
            }, 200);
        }
    });

    $(".closemenu,.maskmenu").click(function() {
        $(".listmenu li a").removeClass('transition').css({ opacity: 0, left: "7%" });
        $(".closemenu,.name,.maskmenu").fadeOut();
        $(".hidemenu")
            .animate({ height: "5px" })
            .animate({ width: 0 }, function() {
                $("body").css({ "width": "auto", "overflow": "auto" });
            });
    });



});
