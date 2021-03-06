;(function($) {
    $.fn.monthpicker = function(options){
        var defaults = {
            Year: new Date().getFullYear(), //显示年
            SelectMonth: null, //选择日期
            SelectYear: null,
            initDate:null,
            format:"yyyy-MM"
        }
        var options = $.extend(defaults, options);
        //判断是否选择日期
        var domVal = $(this).val();
        if(domVal!=null && domVal.length==7){
            var dateArray = domVal.split("-");
            if(dateArray!=null && dateArray.length==2){
                 options.SelectYear = dateArray[0];
                 options.SelectMonth = dateArray[1];
            }
        }else{
            if(options.initDate!=null){
                var dateArray = options.initDate.split("-");
                if(dateArray!=null && dateArray.length==2){
                     options.SelectYear = dateArray[0];
                     options.SelectMonth = dateArray[1];
                }
            }
        }

        PreYear = function(m) {
            options.Year = options.Year - 1;
            Draw(m);
        }
        NextYear = function(m) {
            options.Year = options.Year + 1;
            Draw(m);
        }
        IsSame = function(d1, d2) {
            return (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth());
        }
        Date.prototype.Format = function(fmt)
        {
            var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "h+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        }
        Draw = function(m) {
            $("#mirs-monthpicker-dom").remove();
            var datepicker_div = $('<div id="mirs-monthpicker-dom" class="mirs-monthpicker mirs-helper-clearfix mirs-corner-all"></div>');
            var header = $('<div class="mirs-monthpicker-header mirs-helper-clearfix mirs-corner-all"></div>');
            var pre = $('<a class="mirs-prev">&lt;</a>');
            var next = $('<a class="mirs-next">&gt;</a>')
            var year = '<div class="mirs-title"><span class="mirs-monthpicker-year">' + options.Year + '</span>年</div>';
            header.append(pre).append(next).append(year);
            pre.click(function() {
                PreYear(m);
            });
            next.click(function() {
                NextYear(m);
            });
            var sarr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            var iarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            var table = $('<table class="mirs-monthpicker-calendar"></table>');

            while (sarr.length) {
                var row = $("<tr></tr>");
                for (var i = 1; i <= 3; i++) {
                    if (sarr.length) {
                        var cell = $("<td></td>");
                        var a = $('<a class="mirs-state-default"></a>');
                        var d = sarr.shift();
                        var ia = iarr.shift();
                        if (d) {
                            a.html(d);
                            a.attr("mirs-month-num", ia);
                            var on = new Date(options.Year, ia - 1, 1);
                            //判断是否今月
                            IsSame(on, new Date()) && a.addClass("mirs-state-active");
                            options.SelectYear && options.SelectMonth && IsSame(on, new Date(options.SelectYear, options.SelectMonth - 1, 1)) && a.addClass("mirs-state-highlight");
                        }
                        a.click(function() {
                            var month = $(this).attr("mirs-month-num");
                            options.SelectMonth = parseInt(month);
                            options.SelectYear = options.Year;
                            m.val(new Date(options.Year,options.SelectMonth-1,1).Format(options.format));
                            datepicker_div.remove();
                        });
                        cell.append(a);
                        row.append(cell);
                    }
                }
                table.append(row);
            }
            var of = m.offset();
            var left = of.left;
            var top = of.top + m.outerHeight() + 2;
            datepicker_div.append(header).append(table);
            datepicker_div.show();
            datepicker_div.css("top", top);
            datepicker_div.css("left", left);
            datepicker_div.css("position", "absolute");
            $("body").append(datepicker_div);
        }

        this.each(function() {
            var $This=$(this);
            $This.addClass("jg-monthpicker");
            $(this).focus(function() {
                Draw($This);
                $("#mirs-monthpicker-dom").show();
            });
            $(document).click(function (e) {
                var className = e.target.className.toString();
                if(!className || (className.indexOf('jg-monthpicker')<0 &&className.indexOf("mirs-")<0)){
                    $("#mirs-monthpicker-dom").remove();
                }
            });
        });
    };
})(jQuery);