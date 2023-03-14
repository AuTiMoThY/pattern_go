/*--------------------------------------*\
    Pattern Go
    V 2020.0615.1
            by lohaslife AuOzzy
\*--------------------------------------*/

/*
* TOC
*
* pgUI
* - pgUI.init 共用  <<入口>>
* - pgUI.disableScroll()
* - pgUI.enableScroll()
* - pgUI.validateEmail(email)
* - pgUI.getURL()
* - pgUI.getTime()
* - pgUI.mmenu  手機版menu 動作
* - pgUI.countdown 倒數計時
* - pgUI.goTop()
* - pgUI.tabs(defaultShow, opt)
* - pgUI.dropdown  下拉選單
* -- pgUI.dropdown.init(elm[string])
* -- pgUI.dropdown.itemClick(itemElm, callback)
* - pgUI.selectStyled()  <select> 美化
* -- pgUI.selectStyled().init(target)
* -- pgUI.selectStyled().styled(target)
* - pgUI.highlight(elm, name) 高亮顯示
* - pgUI.toggleContent(hideCnt, showCnt, zIndex= 10)
* - pgUI.toggleLayout(elm, classAddToElm)
* - pgUI.checkInputErr()
* - pgUI.pageHome  <<首頁>>
* - pgUI.openItemMore(e)
* - pgUI.openFolderMore(e)
* ================================================================================================
* pgAni
* - pgAni.story(elm)
* - pgAni.homeScroll
* -- pgAni.homeScroll.howToUse(isDebug)
* -- pgAni.homeScroll.why(isDebug)
* ================================================================================================
* pgPopup
* - pgPopup.build(action, frmSetup)
* - pgPopup.open(action, frmSetup, callback)
* - pgPopup.close(clickthis)
* - pgPopup.change(action)
* pgMbrPopup
* - pgMbrPopup.open(clickthis)
* - pgMbrPopup.close(clickthis)
* - pgMbrPopup.openid(id)
* - pgMbrPopup.closeid(id)
* ready
*/

// https://www.geeksforgeeks.org/how-to-force-input-field-to-enter-numbers-only-using-javascript/
function onlyNumberKey(evt) {
    // Only ASCII charactar in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}


/**
 * ---------------------------------------------------------------------------------
 * > pgUI
 */
var pgUI = (function(window, jQuery) {
    if (!window.jQuery) { throw new Error("requires jQuery") }

    var $ = window.jQuery;
    var _this = this;

    var breakpoints = {
        "xxs" : 0,
        "xs"  : 375,
        "sm"  : 576,
        "md"  : 768,
        "lg"  : 900,
        "llg" : 1024,
        "xl"  : 1280,
        "xxl" : 1366,
        "uxl" : 1680
    };

    var mqUp = {
        "xxs" : window.matchMedia("(min-width: "+breakpoints.xxs+"px)"),
        "xs"  : window.matchMedia("(min-width: "+breakpoints.xs+"px)"),
        "sm"  : window.matchMedia("(min-width: "+breakpoints.sm+"px)"),
        "md"  : window.matchMedia("(min-width: "+breakpoints.md+"px)"),
        "lg"  : window.matchMedia("(min-width: "+breakpoints.lg+"px)"),
        "llg" : window.matchMedia("(min-width: "+breakpoints.llg+"px)"),
        "xl"  : window.matchMedia("(min-width: "+breakpoints.xl+"px)"),
        "xxl" : window.matchMedia("(min-width: "+breakpoints.xxl+"px)"),
        "uxl" : window.matchMedia("(min-width: "+breakpoints.uxl+"px)"),
    };


    var mqDown = {
        "xxs" : window.matchMedia("(max-width: "+breakpoints.xs+"px)"),
        "xs"  : window.matchMedia("(max-width: "+breakpoints.sm+"px)"),
        "sm"  : window.matchMedia("(max-width: "+breakpoints.md+"px)"),
        "md"  : window.matchMedia("(max-width: "+breakpoints.lg+"px)"),
        "lg"  : window.matchMedia("(max-width: "+breakpoints.llg+"px)"),
        "llg" : window.matchMedia("(max-width: "+breakpoints.xl+"px)"),
        "xl"  : window.matchMedia("(max-width: "+breakpoints.xxl+"px)"),
        "xxl" : window.matchMedia("(max-width: "+breakpoints.uxl+"px)"),
        // "uxl" : window.matchMedia("(max-width: "+breakpoints.+"px)"),
    };

    // reference:
    // http://jsbin.com/xatidu/4/edit?js,output
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {32: 1, 33: 1, 34: 1, 35: 1, 36: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    return {

        /**
         * >> pgUI.init 共用  <<入口>>
         */
        init: function() {
            var _ = this;


            // 下拉選單
            pgUI.dropdown.init(".pgdropdown");

            // focus input highlight
            $(".pginput").focus(function(event) {
                var $parent = $(this).parent(".pginput-wrap");

                if ($parent.length < 1) return false;

                if (!$parent.hasClass('js-focus')) {
                    $parent.addClass('js-focus');
                }
                console.log($parent.length);
            }).focusout(function(event) {
                var $parent = $(this).parent(".pginput-wrap");
                $parent.removeClass('js-focus');
            });


            _.mmenu.init();


            // _.selectStyled().init($("select:not(.not-styled)"));
        },

        /**
         * ---------------------------------------------------------------------------------
         * >> pgUI.disableScroll()
         */
        disableScroll: function(){
            if (window.addEventListener) { // older FF
                window.addEventListener('DOMMouseScroll', preventDefault, false);
                // window.addEventListener("touchstart", preventDefault, {passive: true} );
            }

            window.onwheel = preventDefault; // modern standard
            window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
            window.ontouchmove  = preventDefault; // mobile
            document.onkeydown  = preventDefaultForScrollKeys;
        },

        /**
         * ---------------------------------------------------------------------------------
         * >> pgUI.enableScroll()
         */
        enableScroll: function() {
            if (window.removeEventListener)
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.onmousewheel = document.onmousewheel = null;
            window.onwheel = null;
            window.ontouchmove = null;
            document.onkeydown = null;
        },


        /**
         * >> pgUI.validateEmail(email)
         */
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        validateEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        /**
         * >> pgUI.getURL()
         */
        getURL: function(){
            var getURL = window.location;
            var URL = "";
            // console.log(getURL);

            if (getURL.hostname == "localhost") {
                URL = getURL.origin;
            }
            else {
                URL = getURL.origin + "/demo"
            }
            return URL;
        },

        /**
         * >> pgUI.getTime()
         */
        getTime: () => {
            var today = new Date();
            var datetime = {
                'date': today.getFullYear()+'-'+ ("0"+(today.getMonth()+1)).slice(-2)+'-'+ ("0"+today.getDate()).slice(-2),
                'time': ("0"+today.getHours()).slice(-2) + ":" + ("0"+today.getMinutes()).slice(-2)
            }
            return datetime;
        },

        /**
         * ---------------------------------------------------------------------------------
         * >> pgUI.mmenu  手機版menu 動作
         */
        mmenu:(function(){
            return {
                init: function() {
                    let _this = this;

                    $("#m_menu").stop().click(function(event) {
                        (!$(this).hasClass('js-open')) ? _this.open($(this)): _this.close($(this));
                    });
                },

                // mmenu.open
                open: function(el) {
                    console.log('open');
                    $(el).addClass('js-open');
                    $(".mobile_nav").addClass('js-show');
                    $("body").addClass('js-show-mmenu');
                },

                // mmenu.close
                close: function(el) {
                    console.log('close');
                    $(el).removeClass('js-open');
                    $(".mobile_nav").removeClass('js-show');
                    $("body").removeClass('js-show-mmenu');
                }
            }
        }()),

        /**
         * >> pgUI.countdown 倒數計時
         */
        // res: https://stuntcoders.com/snippets/javascript-countdown/
        countdown: (function() {
            var time_left = 10; //number of seconds for countdown
            var output_element_id = 'countdownTime';
            var keep_counting = 1;
            var no_time_left_message = '已過時限，請重新發送';

            function countdown() {
                if (time_left < 2) {
                    keep_counting = 0;
                }
                time_left = time_left - 1;
            }

            function add_leading_zero(n) {
                if (n.toString().length < 2) {
                    return '0' + n;
                } else {
                    return n;
                }
            }

            function format_output() {
                var hours, minutes, seconds;
                seconds = time_left % 60;
                minutes = Math.floor(time_left / 60) % 60;
                hours = Math.floor(time_left / 3600);
                seconds = add_leading_zero(seconds);
                minutes = add_leading_zero(minutes);
                hours = add_leading_zero(hours);
                return minutes + ':' + seconds;
                // return hours + ':' + minutes + ':' + seconds;
            }

            function show_time_left() {
                document.getElementById(output_element_id).innerHTML = format_output(); //time_left;
            }

            function no_time_left() {
                document.getElementById(output_element_id).innerHTML = no_time_left_message;
            }
            return {
                init: function(t, element_id) {
                    time_left = t;
                    output_element_id = element_id;
                    pgUI.countdown.timer();
                },
                timer: function() {
                    pgUI.countdown.count();
                    if (keep_counting) {
                        setTimeout("pgUI.countdown.timer();", 1000);
                    } else {
                        no_time_left();
                    }
                },
                count: function() {
                    countdown();
                    show_time_left();
                },

                //Kristian Messer requested recalculation of time that is left
                setTimeLeft: function(t) {
                    time_left = t;
                    if (keep_counting == 0) {
                        pgUI.countdown.timer();
                    }
                }

            };
        }()),

        /**
         * >> pgUI.goTop()
         */
        goTop: function(){
            $(window).scroll(function() {
                if ($("#top").length < 1) return false;
                var gotop_top = $("#top").offset().top;
                if ($(this).scrollTop() > 300) {
                    $("#goTop").addClass('js-show');
                }else {
                    $("#goTop").removeClass('js-show');
                }
            });

            $("#goTop").click(function(event) {
                event.preventDefault();
                // var target = $(this).attr('href').offset().top;
                $("html, body").stop().animate({scrollTop:0}, 300);
            });

        },

        /**
         * >> pgUI.tabs(defaultShow, opt)
         */
        tabs: function(defaultShow = 1, opt){
            var _ = this;
            if (opt == null) {
                var opt = {
                    tabsItem: ".tabs_item",
                    tabsContainer: ".tabs_container",
                    cntBlock: ".tab_content"
                }
            }

            var show = defaultShow - 1;
            var showCntHeight;
            // console.log(show);
            console.log(opt);
            $(opt.tabsItem).eq(show).addClass('js-active');
            $(opt.cntBlock).each(function(index, el) {
                if (show == index) {
                    $(this).addClass('js-show');
                    showCntHeight = $(this).innerHeight();
                }
                // $(el).css({
                //     display: 'none',
                //     opacity: 0,
                //     zIndex: '-1'
                // });

                if ($(el).hasClass('js-show')) {
                    // $(el).css({
                    //     display: 'block',
                    //     opacity: '1',
                    //     zIndex: 10
                    // });
                }
            });


            $(opt.tabsContainer).height(showCntHeight);
            // console.log(showCntHeight);

            $(opt.tabsItem).click(function(event) {
                var showCntID = $(this).data('showcnt');

                if (showCntID == "undefined") {
                    console.log('qq');
                    return false;
                }

                $(opt.tabsItem).removeClass('js-active');
                if (!$(this).hasClass('js-active')) {
                    $(this).addClass('js-active');
                }

                $(opt.cntBlock).removeClass('js-show');
                $("#" + showCntID).addClass('js-show');

                // _.toggleContent(opt.cntBlock, $("#" + opt.showCntPrefix + showCntID));
                $(opt.tabsContainer).height($(opt.cntBlock + ".js-show").innerHeight());
            });
        },

        /**
         * -------------------------------------------------------------------------------------
         * >> pgUI.dropdown  下拉選單
         */
        dropdown: (function(){
            return {
                // >>> pgUI.dropdown.init(elm[string])
                init: function(elm){
                    var _ = this;
                    $(elm).each(function(index, el) {
                        // var $this = $(this);
                        var $ctrl = $(el).find('.pgdropdown-ctrl');
                        // var $list = $(this).find('.pgdropdown-menu');
                        var $item = $(el).find('.menu-item');
                        $ctrl.click(function(event) {
                            event.stopPropagation();

                            var $thisParent = $(this).parents(elm);
                            if (!$thisParent.hasClass('js-active')) {
                                _.open(elm, $thisParent);
                            }
                            else {
                                _.close($thisParent);
                            }

                        });

                        $item.click(function(event) {
                            event.stopPropagation();
                        });

                        $(document).click(function() {
                            $(el).removeClass("js-active");
                            $(el).find('.pgdropdown-menu').slideUp('fast');
                        });
                    });
                },

                open: function(elm, thisParent) {
                    var $thisParent = thisParent;
                    $(elm).removeClass("js-active");
                    $(elm).find('.pgdropdown-menu').slideUp('fast');
                    $thisParent.addClass('js-active');
                    $thisParent.find('.pgdropdown-menu').slideDown('fast');
                },

                close: function(thisParent){
                    var $thisParent = thisParent;
                    $thisParent.removeClass('js-active');
                    $thisParent.find('.pgdropdown-menu').slideUp('fast');
                },

                // >>> pgUI.dropdown.itemClick(itemElm, callback)
                itemClick: function(itemElm, callback) {
                    itemElm.click(function(event) {
                        var thisTxt = $(this).html();
                        var $thisParent = $(this).parents(".pgdropdown");

                        $(".menu-item").removeClass('js-active');
                        $thisParent.find('.ctrl-txt').html(thisTxt).addClass('js-hasSelected');
                        $(this).addClass('js-active');

                        pgUI.dropdown.close($thisParent);

                        if ($.isFunction(callback)) {
                            callback();
                        }
                    });
                }
            }

        }()),

        /**
         * -------------------------------------------------------------------------------------
         * >> pgUI.selectStyled()  <select> 美化
         */
        selectStyled: function() {
            var config = function() {
                return {
                    el: {
                        wrap: "pg-selects",
                        hidden: "pg-selects-hidden",
                        styled: "pg-selects-styled",
                        list: "pg-selects-list",
                        item: "pg-selects-item",
                    },
                    open_class: 'js-open',
                    selected_class: 'js-selected',
                    hasSelected_class: 'js-hasSelected'
                }
            }
            return {
                // >>> pgUI.selectStyled().init(target)
                init: function(target) {
                    console.log('pgUI.selectStyled START');
                    if (!$.browser.mobile) {
                        console.log('not mobile');
                        this.styled(target);
                    } else {
                        target.each(function(index, el) {
                            var $wrapper = $("<div/>", {
                                class: "extra-wrapper"
                            })
                            $(this).wrap($wrapper);

                            // $(el).change(function (event) {
                            //  $(this).addClass('js-hasSelected');
                            //  if ($(this).hasClass('input__field--yoshiko')) {
                            //      $(this).parents(".input.input--yoshiko").addClass('input--filled');
                            //  }
                            // });
                        });

                    }
                },

                // >>> pgUI.selectStyled().styled(target)
                styled: function(target) {
                    var _ = config();
                    target.each(function() {
                        var $this = $(this),
                            numberOfOptions = $(this).children('option').length;
                        var thisClass = $this.attr("class");
                        console.log(thisClass);
                        var thisWrapClass =  `${_.el.wrap} ${_.el.wrap}-${thisClass}`;

                        $this.removeClass('form-control').addClass(_.el.hidden);
                        $this.wrap(`<div class="${thisWrapClass}"></div>`);
                        $this.after(`<div class="${_.el.styled}"></div>`);

                        var $styledSelect = $this.next('div.' + _.el.styled);
                        $styledSelect.text($this.children('option').eq(0).text());

                        // 取得被選擇的項目
                        var selectedIndex = $this.find("option:selected").index();
                        var selectedText = $this.find("option:selected").text();

                        // console.log(selectedIndex);
                        // console.log(selectedText);

                        // 產生選單
                        if ($this.hasClass('dir_up')) {
                            var $list = $('<ul />', {
                                'class': _.el.list + ' lis-n dir_up cf'
                            }).insertAfter($styledSelect);
                        } else {
                            var $list = $('<ul />', {
                                'class': _.el.list + ' lis-n cf'
                            }).insertAfter($styledSelect);
                        }
                        for (var i = 0; i < numberOfOptions; i++) {
                            $('<li />', {
                                'class': _.el.item,
                                'text': $this.children('option').eq(i).text(),
                                'rel': $this.children('option').eq(i).val()
                            }).appendTo($list);

                            // if ($this.children('option').eq(i).) {}
                        }

                        var $listItems = $list.children('li');

                        // var 
                        if (selectedIndex != 0) {
                            if ($this.find('option').get(selectedIndex) != null) {
                                console.log('yoyo');
                                $this.find('option').get(selectedIndex).selected = true;

                                $listItems.eq(selectedIndex).addClass(_.selected_class);
                                $styledSelect.text(selectedText).addClass(_.hasSelected_class);
                            }
                        }


                        $styledSelect.click(function(e) {
                            e.stopPropagation();
                            $('.js-open div.' + _.el.styled).not(this).each(function() {
                                $(this).parent().removeClass(_.open_class);
                            });
                            $(this).parent().toggleClass(_.open_class);
                        });

                        $listItems.click(function(e) {
                            e.stopPropagation();
                            $styledSelect.text($(this).text()).parent().removeClass(_.open_class);
                            if ($(this).attr('rel') == '') {
                                $styledSelect.removeClass(_.hasSelected_class);
                            } else {
                                $styledSelect.addClass(_.hasSelected_class);
                            }

                            $listItems.removeClass(_.selected_class);
                            $(this).addClass(_.selected_class);

                            $this.val($(this).attr('rel'));
                            console.log($this.val());

                            if ($thisParent.hasClass('error')) {
                                $thisParent.removeClass('error').find('label.error').remove();
                            }
                        });

                        $(document).click(function() {
                            $styledSelect.parent().removeClass(_.open_class);
                        });

                    });
                },

                refresh: function(el) {
                    if (!$.browser.mobile) {
                        // console.log('not mobile');
                        // this.styled();
                    } else {
                        target.each(function(index, el) {
                            $(this).wrap('<div class="extra-wrapper"></div>');
                        });
                        target.change(function(event) {
                            $(this).addClass('js-hasSelected')
                        });
                        return false;
                    }
                    console.log('pgUI.selectStyled().refresh() START');
                    var _ = config();
                    var $this = $(el);
                    var $thisParent = $this.parents('.control-field');
                    var numberOfOptions = $this.children('option').length;
                    var $old_list = $this.parent("." + _.el.wrap).find("." + _.el.list);
                    var $old_styledSelect = $this.next('div.' + _.el.styled);

                    $old_list.remove();
                    $old_styledSelect.remove();

                    var $styledSelect = $("<div/>", {
                        class: _.el.styled
                    }).insertAfter($this);
                    $styledSelect.text($this.children('option').eq(0).text());

                    var $list = $("<ul/>", {
                        class: _.el.list + " lis-n cf"
                    }).insertAfter($styledSelect)

                    for (var i = 0; i < numberOfOptions; i++) {
                        $('<li />', {
                            'class': _.el.item,
                            'text': $this.children('option').eq(i).text(),
                            'rel': $this.children('option').eq(i).val()
                        }).appendTo($list);
                        // if ($this.children('option').eq(i).) {}
                    }
                    var $listItems = $list.children('li');

                    if ($this.hasClass('input__field--yoshiko')) {
                        $styledSelect.click(function(event) {
                            $(this).parents(".input--yoshiko").addClass('input--filled');
                        });
                        $listItems.click(function(event) {
                            if ($(this).attr('rel') == '') {
                                $(this).parents(".input--yoshiko").removeClass('input--filled');
                            }
                        });
                    }

                    var selectedIndex = $this.find(":selected").index();
                    var selectedText = $this.find(":selected").text();
                    if ($this.find('option').get(selectedIndex) != null) {
                        $this.find('option').get(selectedIndex).selected = true;

                        $listItems.eq(selectedIndex).addClass(_.selected_class);
                        $styledSelect.addClass(_.hasSelected_class).text(selectedText);
                    }

                    $("."+_.el.wrap).click(function(e) {
                        e.stopPropagation();
                        $('.js-open div.' + _.el.styled).not(this).each(function() {
                            $(this).removeClass(_.open_class);
                        });
                        $(this).toggleClass(_.open_class);
                    });

                    $listItems.click(function(e) {
                        e.stopPropagation();
                        $styledSelect.text($(this).text()).parent().removeClass(_.open_class);
                        if ($(this).attr('rel') == '') {
                            $styledSelect.removeClass(_.hasSelected_class);
                        } else {
                            $styledSelect.addClass(_.hasSelected_class);
                        }

                        $listItems.removeClass(_.selected_class);
                        $(this).addClass(_.selected_class);

                        $this.val($(this).attr('rel'));
                        console.log($this.val());

                        if ($thisParent.hasClass('error')) {
                            $thisParent.removeClass('error').find('label.error').remove();
                        }
                    });

                    $(document).click(function() {
                        $styledSelect.parent().removeClass(_.open_class);
                    });
                },

                hover: function(el, parent){
                    var _ = config();
                    var $cnt = $("<div />", {
                        class: "js-completeTxt"
                    });

                    var $parent = $(parent);
                    $(el).each(function(index, el) {
                        $(el).hover(function() {
                            console.log($parent);
                            var elOffset = $(this).offset();
                            var txt = $(this).text();
                            var cntW = $(this).outerWidth();

                            $cnt.css({
                                position: "absolute",
                                top: elOffset.top + "px",
                                left: elOffset.left + "px",
                                zIndex: "99",
                                minWidth: cntW + "px"
                            }).text(txt);

                            if ($parent.hasClass(_.open_class)) {
                                $("body").append($cnt);
                            }
                        });

                        $(el).click(function(event) {
                            if (!$parent.hasClass("."+_.open_class)) {
                                $cnt.remove();
                            }
                        });
                    });

                    $(document).click(function() {
                        if (!$parent.hasClass("."+_.open_class)) {
                            $cnt.remove();
                        }
                    });
                }
            }
        },

        /**
         * >> pgUI.highlight(elm, name) 高亮顯示
         */
        highlight: function(elm, name) {
            $(elm).each(function(index, el) {
                if ($(el).data('highlight') == name) {
                    $(el).addClass('js-active');
                }
            });
        },

        /**
         * >> pgUI.toggleContent(hideCnt, showCnt, zIndex= 10)
         */
        toggleContent: function(hideCnt, showCnt, zIndex= 10) {
            TweenMax.to(hideCnt, 0.1, {
                opacity: 0,
                onComplete: function() {
                    TweenMax.to(hideCnt, 0, {
                        css: { zIndex: '-1', display: 'none' }
                    })
                    setTimeout(function() {
                        TweenMax.to(showCnt, 0, {
                            css: {
                                display: 'block'
                            },
                            onComplete: function() {
                                // console.log(this);
                                TweenMax.to(showCnt, 0.1, { css: { zIndex: zIndex, opacity: 1 } });
                                var cntHeight = this.target.outerHeight();
                                // console.log(cntHeight);
                                // $tabContainer.height(cntHeight + padding);
                                if ($('.order_list').length > 0) {
                                    $('.order_list').each(function(index, el) {
                                        pgUI.pageOrder().ctrl(el);
                                    });

                                    $(".iwalk_panel").removeClass('js-open');
                                }

                                if ($(".feedback_list").length > 0) {
                                    $('.feedback_list').each(function(index, el) {
                                        pgUI.pageFeedback.ctrl(el);
                                    });
                                    $(".iwalk_panel").removeClass('js-open');
                                }

                                $(".mbr_content-container > .inner").height($(".mbr_content-block.js-show").height());
                            }
                        });
                    }, 300);
                }
            });
        },


        /**
         * >> pgUI.toggleLayout(elm, classAddToElm)
         */
        toggleLayout: function(elm, classAddToElm){
            elm.eq(0).addClass('js-active');
            elm.click(function(event) {
                elm.removeClass('js-active');
                classAddToElm.removeClass('layout_list');
                $(this).addClass('js-active');

                if ($(this).hasClass('layout-toggle-list')) {
                    classAddToElm.addClass('layout_list');
                }

            });
        },

        /**
         * >> pgUI.checkInputErr()
         */
        checkInputErr: function(){
            $(".pgfrm-input").focusout(function(event) {
                $form_group = $(this).parents(".form-group");
                if ($(this).val() != "") {
                    if ($form_group.hasClass('js-error')) {
                        $form_group.removeClass('js-error');
                        $(".error-msg").remove();
                    }
                }
            });

            $(".pgfrm-select").focusout(function(event) {
                if ($(this).val() != "") {
                    $(this).removeClass('error-highlight');
                }
            });
        },

        /**
         * >> pgUI.pageHome  <<首頁>>
         */
        pageHome: (function(){

            return {
                fullpage: function(){
                    return new fullpage('#fullpage', {
                        anchors:['banner','how_to_use','why','story'],
                        menu: "#menu",
                        normalScrollElements: ".simplebar-wrapper"
                    });
                },

                setup: function(){
                    var _ = this;

                    _.fullpage();

                    let $item = $(".story-content-slick .slick-item");
                    for (var i = 1; i <= $item.length; i++) {
                        pgAni.story("#svgStory"+i);
                    }


                    var $slick = $(".story-content-slick");
                    $slick.slick({
                        infinite: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: "0",
                        appendArrows: $(".story-content-ctrl-inner"),
                        prevArrow: "<button type=\"button\" class=\"story-content-ctrl-arrow slick-prev\">上一个</button>",
                        nextArrow: "<button type=\"button\" class=\"story-content-ctrl-arrow slick-next\">下一个</button>",
                    });


                    var currentNum = 1;
                    var $currentTxt = $(".story-content-ctrl-txt .txt");
                    $slick.on('afterChange', function(event, slick, currentSlide, nextSlide){
                        var currentIndex = currentSlide + 1;
                        currentNum = Math.ceil(currentIndex / 1);
                        $currentTxt.html(currentNum);
                    });

                    _.ani();
                },


                ani: function(){
                    pgAni.homeScroll.howToUse();
                    pgAni.homeScroll.why();
                }
            }
        }()),

        /**
         * >> pgUI.openItemMore(e)
         */
        openItemMore: function(e){
            var $this = $(e);
            var $thisFileItem = $this.parents(".pattern_file-item");
            var $moerItem = $thisFileItem.find('.pattern_file-item-more');
            // var moreItemX = $moerItem.offset().left;
            $(".pattern_file-item.js-open_more").removeClass('js-open_more');
            if (!$thisFileItem.hasClass('js-open_more')) {
                $(".pattern_folder-item.js-open_more").removeClass('js-open_more');
                $thisFileItem.addClass('js-open_more');
            }
            else {
                $thisFileItem.removeClass('js-open_more');
            }

            $(document).click(function(event) {
                if (!$(event.target).closest('.pattern_file-item').length) {
                    $(".pattern_file-item").removeClass('js-open_more');
                }
            });

            $thisFileItem.find('.folder-ctrl').click(function(event) {
                if ($thisFileItem.hasClass('js-open_more')) {
                    $thisFileItem.removeClass('js-open_more');
                }
            });

            if ($thisFileItem.hasClass('js-open_more')) {

                // 計算視窗寬度與調整額外選單的位置
                var moreItemX = $(".pattern_file-item.js-open_more .pattern_file-item-more").offset().left;
                var moreItemWidth = $(".pattern_file-item.js-open_more .pattern_file-item-more").width();
                console.log(moreItemX);
                console.log(moreItemWidth);

                var windowsWidth = $(window).width();
                console.log(windowsWidth);

                if ((moreItemX + moreItemWidth + 50) > windowsWidth) {
                    $(".pattern_file-item.js-open_more .pattern_file-item-more").addClass('js-adj_pos').css({
                        right: 0
                    });
                }
                else {
                    $(".pattern_file-item.js-open_more .pattern_file-item-more").removeClass('js-adj_pos').css({
                        right: ''
                    });
                }
            }


        },
        /**
         * >> pgUI.openFolderMore(e)
         */
        openFolderMore: function(e){
            var $this = $(e);
            var $thisFileItem = $this.parents(".pattern_folder-item");
            var $moerItem = $thisFileItem.find('.pattern_folder-item-more');
            // var moreItemX = $moerItem.offset().left;
            if (!$thisFileItem.hasClass('js-open_more')) {
                $(".pattern_folder-item.js-open_more").removeClass('js-open_more');
                $thisFileItem.addClass('js-open_more');
            }
            else {
                $thisFileItem.removeClass('js-open_more');
            }


            $(document).click(function(event) {
                console.log($(event.target).closest('.pattern_folder-item').length)
                if (!$(event.target).closest('.pattern_folder-item').length) {
                    $(".pattern_folder-item").removeClass('js-open_more');
                }
            });

            if ($thisFileItem.hasClass('js-open_more')) {
                // 計算視窗寬度與調整額外選單的位置
                var moreItemX = $(".pattern_folder-item.js-open_more .pattern_folder-item-more").offset().left;
                var moreItemWidth = $(".pattern_folder-item.js-open_more .pattern_folder-item-more").width();
                console.log(moreItemX);
                console.log(moreItemWidth);

                var windowsWidth = $(window).width();
                console.log(windowsWidth);

                if ((moreItemX + moreItemWidth + 50) > windowsWidth) {
                    $(".pattern_folder-item.js-open_more .pattern_folder-item-more").addClass('js-adj_pos').css({
                        right: 0
                    });
                }
                else {
                    $(".pattern_folder-item.js-open_more .pattern_folder-item-more").removeClass('js-adj_pos').css({
                        right: ""
                    });
                }
            }



        }
    }
}(window, jQuery));


// > ================================================================================================
/**
 * ---------------------------------------------------------------------------------
 * > pgAni
 */
var pgAni = (function(pgUI) {

    var FadeIn = (state, delay = 0, callback) => {
        if (state === 'from') {
            return {
                opacity: 0
            }
        }
        else if (state === 'to') {
            return {
                opacity: 1,
                ease: Circ.easeInOut,
                onComplete:function(){
                    if($.isFunction(callback)) {
                        callback();
                    }
                }
            }
        }
    }

    var SlideInRight = (state, delay = 0, callback) => {
        if (state === 'from') {
            return {
                opacity: 0,
                y: 100
            }
        }
        else if (state === 'to') {
            return {
                delay: delay,
                opacity: 1,
                y:0,
                ease: Circ.easeInOut,
                onComplete:function(){
                    if($.isFunction(callback)) {
                        callback();
                    }
                }
            }
        }
    }

    return {
        /**
         * >> pgAni.story(elm)
         */
        story: function(elm){
            var svgset = {};
            svgset.easing = mina.easeinout;
            svgset.viewBox = {
                1: "0 0 627 627",
                2: "0 0 627 560",
                3: "0 0 625.6 554.7",
                4: "0 0 627 559"
            };
            svgset.path = {
                1: [
                    "M24.1138 187.257C63.8302 105.912 155.098 72.5405 242.806 50.1388C331.135 27.5786 426.901 13.909 502.325 65.1166C582.123 119.294 631.969 214.279 626.394 310.57C621.22 399.937 549.079 465 476.167 516.935C411.558 562.956 335.583 585.613 257.18 573.558C172.871 560.594 91.1729 523.998 47.1078 450.962C-0.848128 371.476 -16.6152 270.677 24.1138 187.257Z",
                    "M17.2,137c39.7-81.3,149.3-57.6,237-80C342.5,34.5,411.5-24.7,487,26.5c79.8,54.2,144.2,157.8,138.6,254.1 C620.4,370,547.1,391.1,474.2,443c-64.6,46-139.4,112.6-217.8,100.6c-84.3-13-129.1-72.5-173.2-145.6 C35.2,318.6-23.5,220.5,17.2,137z"
                ],
                2: [
                    "M626.615 299.114C621.262 388.737 547.393 453.373 473.378 504.105C407.395 549.331 330.383 568.755 251.382 556.308C163.735 542.499 72.6845 511.913 29.7403 434.208C-15.5583 352.243 -5.69929 250.888 36.3398 167.201C77.4839 85.2963 154.422 28.7433 243.707 8.26735C333.093 -12.2318 426.803 5.41851 499.849 60.9031C575.183 118.124 632.258 204.633 626.615 299.114Z",
                    "M621,234c15,81-30,258.6-104,309.3c-66,45.2-163-49.9-242-62.3c-87.6-13.8-210.1-13.3-253-91 c-45.3-82,12-141.3,54-225c41.1-81.9,41.7-130.5,131-151c89.4-20.5,195,11.5,268,67C550.3,138.2,606,153,621,234z"
                ],
                3: [
                    "M13.8,194.5c31.1-85,118.3-127.6,203.2-159c85.5-31.6,179.3-55.1,259.6-12c85,45.6,144.4,134.9,148.8,231.2 c4.1,89.4-60.9,161.6-128,220.7c-59.5,52.5-132.7,82.9-211.9,79c-85.2-4.2-170.2-32.1-221.6-100.1C8,380.2-18.1,281.7,13.8,194.5z",
                    "M14,113c31.1-85,167.1-3.6,252-35c85.5-31.6,195.7-96.1,276-53c85,45.6,42.6,121.7,47,218 c4.1,89.4,27.1,205.9-40,265c-59.5,52.5-184.3,50.3-263.5,46.4C200.3,550.2,148.4,498,97,430C41.1,355.9-17.9,200.2,14,113z"
                ],
                4: [
                    "M0.4,260.4c5.4-89.5,79.2-154,153.2-204.6c66-45.1,143-64.5,222-52.1C463.3,17.5,554.3,48,597.3,125.6c45.3,81.8,35.4,183-6.6,266.5c-41.1,81.8-118.1,138.2-207.4,158.7c-89.4,20.5-183.1,2.8-256.1-52.5C51.8,441.1-5.3,354.7,0.4,260.4z",
                    "M28,255C33.4,165.5,7,98.6,81,48C147,2.9,296,9.6,375,22 c87.6,13.8,164.1,33.4,207,111c45.3,81.8,58,215.5,16,299c-41.1,81.8-155.7,86.6-245,107c-89.4,20.5-180,30.4-253-25 C24.7,456.9,22.4,349.3,28,255z"
                ]
            };
            svgset.gradient = {
                1: "L(131.665, 103.589, 490.206, 505.6)#334AC0-#24B6AD",
                2: "L(358.699, 57.6104, 249.03, 566.641)#334AC0-#F9694A",
                3: "L(108, 86.743, 522, 464)#334AC0-#B9378D",
                4: "L(268.301, 501.492, 377.596, -6.70937)#334AC0-#2AA9F0"
            };
            function s(elmStr) {
                return Snap(elmStr);
            }

            var n = 1;
            switch(elm) {
                case "#svgStory1":
                    n = 1;
                    break;
                case "#svgStory2":
                    n = 2;
                    break;
                case "#svgStory3":
                    n = 3;
                    break;
                case "#svgStory4":
                    n = 4;
                    break;
            }


            var p = s(elm).attr('viewBox', svgset.viewBox[n]).path({
                d:svgset.path[n][0],
                fill: svgset.gradient[n]
            });

            var ani1 = function() {
                p.animate({
                    d: svgset.path[n][0]
                }, 7000, svgset.easing, ani2);
            }

            var ani2 = function() {
                p.animate({
                    d: svgset.path[n][1]
                }, 7000, svgset.easing, ani1);
            }
            ani2();
        },

        /**
         * >> pgAni.homeScroll
         */
        homeScroll: (function(){

            var controller = new ScrollMagic.Controller({
                loglevel: 3
            });

            return {
                /// >>> pgAni.homeScroll.howToUse(isDebug)
                howToUse: (isDebug) => {
                    var sceneOpt = () => {
                        return {
                            triggerElement: $(".home_section-how_to_use"),
                            triggerHook: "0.3"
                        }
                    }
                    var titleTween = TweenMax.fromTo($(".home_section-how_to_use .title"), 0.3, FadeIn('from'), FadeIn('to'));
                    var cntTween = TweenMax.fromTo($(".home_section-how_to_use-block"), 0.5, SlideInRight('from'), SlideInRight('to'));

                    var title = new ScrollMagic.Scene(sceneOpt())
                                .setTween(titleTween)
                                .addTo(controller);
                    var cnt = new ScrollMagic.Scene(sceneOpt())
                                .setTween(cntTween)
                                .addTo(controller);
                    if (isDebug) {
                        title.addIndicators();
                        cnt.addIndicators({
                            name: "cnt",
                            indent: 100
                        });
                    }

                },

                /// >>> pgAni.homeScroll.why(isDebug)
                why: (isDebug) => {
                    var sceneOpt = () => {
                        return {
                            triggerElement: $(".home_section-why"),
                            triggerHook: "0.3"
                        }
                    }
                    $(".home_section-why .title").css({opacity: '0'});
                    $(".why_item").css({opacity: '0'});
                    var t1 = new TimelineLite();

                    var titleTween = TweenMax.fromTo($(".home_section-why .title"), 0.3, FadeIn('from'), FadeIn('to'));
                    var itemTween = TweenMax.fromTo($(".why_item"), 0.5, FadeIn('from'), FadeIn('to'));
                    // var cntTween = TweenMax.fromTo($(".home_section-why-content"), 0.5, FadeIn('from'), FadeIn('to'), 0, function(){
                    // });
                    // var itemTween = TweenMax.fromTo($(".home_section-why-block .why_item"), 0.5, FadeIn('from'), FadeIn('to'));
                    // var cntTween = TweenMax.fromTo($(".home_section-why-block"), 0.5, FadeIn('from'), FadeIn('to', 0, function(){
                    //     $(".why_item").each(function(index, el) {
                    //         t1.to(el, 0.1, {opacity: 1 });
                    //     });
                    // }));



                    var title = new ScrollMagic.Scene(sceneOpt())
                                .setTween(titleTween)
                                .addTo(controller);
                    var cnt = new ScrollMagic.Scene(sceneOpt())
                                .setTween(itemTween)
                                .addTo(controller)
                                .on('leave', function(e){

                                });

                    if (isDebug) {
                        title.addIndicators();
                        cnt.addIndicators({
                            name: "cnt",
                            indent: 100
                        });
                    }

                }
            }
        }())
    }

}(pgUI));




// > ================================================================================================
/**
 * ---------------------------------------------------------------------------------
 * > pgPopup
 */
var pgPopup = (function(pgUI) {
    return {
        /**
         * >> pgPopup.build(action, frmSetup)
         */
        build: function(action, frmSetup){
            return pgElm.popup.base(action, frmSetup);
        },

        /**
         * >> pgPopup.open(action, frmSetup, callback)
         */
        open: function(action, frmSetup, callback){
            var _ = this;
            $("body").append($(_.build(action, frmSetup)).addClass('js-show'));

            fullpage_api.setAutoScrolling(false);
            fullpage_api.setAllowScrolling(false);
            $("html").css({
                overflow: 'hidden'
            });

            $(".pgpopup-container").disablescroll("undo");

            $(".pgpopup-close").click(function(event) {
                _.close(this);
            });
            _.change(action);

            if(action == "popupSignup") {
                pgUI.tabs(1);
            }

            if ($.isFunction(callback)) {
                callback();
            }
        },

        /**
         * >> pgPopup.close(clickthis)
         */
        close: function(clickthis){
            // $(".pgpopup-close").click(function(event) {
                var $parents = $(clickthis).parents(".pgpopup");

                $parents.removeClass('js-show');

                setTimeout(function(){
                    $parents.remove();

                    $("html").css({
                        overflow: 'unset'
                    });
                    fullpage_api.setAutoScrolling(true);
                    fullpage_api.setAllowScrolling(true);
                    fullpage_api.reBuild();
                }, 1000);
            // });
        },

        /**
         * >> pgPopup.change(action)
         */
        change: function(action){
            var _ = this;
            if (action == "popupLogin") {
                $(".login_frm-change.to-phone").click(function(event) {
                    var $frm = $(this).parents(".login_frm");
                    $frm.find(".login_frm-email").hide();
                    $frm.find(".login_frm-phone").show();

                });
                $(".login_frm-change.to-email").click(function(event) {
                    var $frm = $(this).parents(".login_frm");
                    $frm.find(".login_frm-email").show();
                    $frm.find(".login_frm-phone").hide();

                });


                $(".js-show-forgetpw").click(function(event) {
                    $(".forget_pw").show();

                    var scrolltop = $(".forget_pw").offset().top;
                    $(".pgpopup-container").disablescroll({
                        handleScrollbar: false
                    });
                    $(".simplebar-content-wrapper").stop().animate({
                        scrollTop: scrolltop
                    }, 500, function() {
                        $(".pgpopup-container").disablescroll("undo");
                    });


                });

            }
            else if(action == "popupSignup") {
                $(".signup_frm-change.to-phone").click(function(event) {
                    var $frm = $(this).parents(".signup_frm");
                    $frm.find(".signup_frm-email").hide();
                    $frm.find(".signup_frm-phone").show();
                });
                $(".signup_frm-change.to-email").click(function(event) {
                    var $frm = $(this).parents(".signup_frm");
                    $frm.find(".signup_frm-email").show();
                    $frm.find(".signup_frm-phone").hide();
                });
            }

        },

    }
}(pgUI));

/**
 * ---------------------------------------------------------------------------------
 * > pgMbrPopup
 */
var pgMbrPopup = (function(pgUI) {
    return {
        /**
         * >> pgMbrPopup.open(clickthis)
         */
        open: (clickthis) => {
            var popupId = $(clickthis).data('popup');

            $("#" + popupId).addClass('js-show');
        },
        /**
         * >> pgMbrPopup.close(clickthis)
         */
        close: (clickthis, clearValue) => {
            var $parents = $(clickthis).parents(".pgpopup");

            $parents.removeClass('js-show');

            if ($.isFunction(clearValue)) {
                clearValue();
            }
        },
        /**
         * >> pgMbrPopup.openid(id)
         */
        openid: (id) => {
            $("#" + id).addClass('js-show');
        },
        /**
         * >> pgMbrPopup.closeid(id)
         */
        closeid: (id) => {
            $("#" + id).removeClass('js-show');
        },
    }
}(pgUI));

// > ready
$(function() {

    pgUI.init();

    // 測試用 - 切換企業 / 一般用戶
    $(".switch_member_level").click(function(event) {
        var link_to = $(this).data('href');
        location.href = link_to;

    });




});
