/*
 *
 * Copyright (c) 2016
 * Author: Smarttang,huineng(找塑料网前端)
 * Github: https://github.com/smarttang/
 *
 */

var smarttang;
var huineng;

(function() {
    smarttang = {   
        /**
         * modal视窗
         * @param  {[type]} _title  [标题]
         * @param  {[type]} _val    [html内容]
         * @param  {[type]} _button [html按钮]
         * @return {[type]}         [description]
         */
        modal: function(_title,_val,_button)
        {
            // 设置弹窗标题
            $('#myModal-min h4').html(_title);
            // 设置弹窗内容
            $('#myModal-min .modal-body').html(_val);
            // 设置按钮
            $('.modal-footer').html(_button);
            // 设置弹出
            $('#myModal-min').modal({show:true,backdrop:true});
        },
        /**
         * datatables 自己配置的表格
         * @param  {[type]} _tag           [dom的tag,可以是class或者id]
         * @param  {[type]} _ajax          [你的ajax请求]
         * @param  {[type]} _columns       [表的字段]
         * @param  {[type]} _column_button [按钮操作]
         * @return {[type]}                [description]
         */
        tables: function(_tag,_ajax,_columns,_column_button)
        {
            var tables_func = $(_tag).DataTable({
                "deferRender":true,
                "bDestroy": true,
                responsive: true, 
                ajax:_ajax,
                initComplete:function(msg){
                    // 默认加载一些提示的功能，在按钮上
                    $("[data-toggle='tooltip']").tooltip(); 
                },
                columns:_columns,
                columnDefs: [{
                    targets: _columns.length - 1,
                    width: '5%',
                    render: function(data, type, row, meta) {
                        var _html = " \
                            <i class='blue icon-zoom-in bigger-130' class='tooltip-show' data-toggle='tooltip' title='查看' onclick='#'></i> &nbsp; \
                            <i class='green icon-wrench bigger-130' class='tooltip-show' data-toggle='tooltip' title='修改' onclick='#'></i> &nbsp; \
                            <i class='red icon-trash bigger-130' class='tooltip-show' data-toggle='tooltip' title='删除' onclick='#'></i> &nbsp; \
                        ";
                        return _html;
                    } 
                }]
            });
            return tables_func;
        },
        /**
         * 删除一个列表里面的值
         * @param  {[type]} id       [准备删除的id]
         * @param  {[type]} title    [栏目的名称]
         * @param  {[type]} post_url [请求的地址]
         * @return {[type]}          [description]
         */
        delete: function(id,title,post_url)
        {
            var bool = false;
            var info_id = id;
            if(confirm('您确定要删除该'+title+'么？')){
                $.ajax({
                    type: 'POST',
                    url: post_url,
                    async: false,  // 同步设置
                    data: {'obj':'delete','id':info_id},
                    dataType: 'json',
                    error: function(msg){
                        console.log('error:'+msg);
                    },
                    success:function(msg){
                        if (msg['status'] == 1){
                            bool = true;
                        }
                    }
                }); 
                return bool;
            }
        }
    };
    huineng = {
        /**
         * 将queryString转换成对象返回
         * @param  {[type]}  url
         * @param  {Boolean} isDecode 是否解码
         * @return {[type]}
         */
        queryStr2Object: function(url, isDecode) {
            url = url || window.location.search;

            var query = url.substr(url.indexOf('?') + 1),
                params = query.split('&'),
                len = params.length,
                result = {},
                i = 0,
                key,
                value,
                item,
                param;

            for (; i < len; i++) {
                param = params[i].split('=');
                key = param[0];
                if (key) {
                    if (param[1]) {
                        value = !!isDecode ? decodeURIComponent(param[1]) : param[1];
                    } else {
                        value = "";
                    }
                }
                item = result[key];
                if ('undefined' == typeof item) {
                    result[key] = value;
                } else
                if ($.isArray(item)) {
                    item.push(value);
                } else {
                    result[key] = [item, value];
                }
            }

            return result;
        },

        /**
         * 获取form表单域值
         * @param  {[type]} $form form的jQuery对象
         * @return {[type]}       [description]
         */
        getFormData: function($form) {
            var formData,
                that = this,
                queryStr = $form.serialize();

            formData = Util.queryStr2Object(queryStr, true);

            return formData;
        }
    };
}) (jQuery);

 