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
         * 私有的ajax(post)
         * @param {[type]} postUrl  [请求链接]
         * @param {[type]} ajaxData [ajax数据]
         * @param {[type]} objFunc  [ajax请求成功后执行的function]
         */
        SmartAjax: function(postUrl,ajaxData,objFunc)
        {
            $.ajax({
                type: 'POST',
                url: postUrl,
                async: false,  // 同步设置
                data: ajaxData,
                dataType: 'json',
                error: function(msg){
                    console.log('error:'+msg);
                },
                success:function(msg){
                    if (msg.status == 1){
                        objFunc(msg.data);
                    }
                }
            }); 
        }, 
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
        tables_init: function(_tag,_ajax,_columns,_column_button)
        {
            var columnDefsValue;
            var columnButton = [{
                targets: _columns.length,
                width: '5%',
                render: function(data, type, row, meta) {
                    var _html = " \
                        <i class='blue icon-zoom-in bigger-130' class='tooltip-show' data-toggle='tooltip' title='查看' onclick='read("+row.id+");'></i> &nbsp; \
                        <i class='green icon-wrench bigger-130' class='tooltip-show' data-toggle='tooltip' title='修改' onclick='change("+row.id+");'></i> &nbsp; \
                        <i class='red icon-trash bigger-130' class='tooltip-show' data-toggle='tooltip' title='删除' onclick='del("+row.id+");'></i> &nbsp; \
                    ";
                    return _html;
                } 
            }];

            if (_column_button ==''){
                columnDefsValue = columnButton;
            }else{
                columnDefsValue = _column_button;
            }
            var tables_func = $(_tag).DataTable({
                "deferRender":true,
                "bDestroy": true,
                responsive: true, 
                ajax:_ajax,
                initComplete:function(msg){
                    // 默认加载一些提示的功能，在按钮上
                    $("[data-toggle='tooltip']").tooltip(); 
                },
                columns: _columns,
                columnDefs: columnDefsValue
            });
            return tables_func;
        },
        /**
         * ajax 再次加载 datatables
         * @param  {[type]} table_obj [database对象]
         * @return {[type]}           [description]
         */
        tables_reload: function(table_obj)
        {
            table_obj.ajax.reload(function ( msg ) {
                $("[data-toggle='tooltip']").tooltip();
            },false);
        },
        /**
         * wangeEdit编辑器 
         * @param  {[type]} upload_url [上传地址]
         * @param  {[type]} tag        [对象或id]
         */
        wangeditor: function(upload_url,tag)
        {
            var editor = new wangEditor(tag);
            editor.config.uploadImgUrl = upload_url;
            editor.config.menus = [
                'bold',
                'underline',
                'italic',
                'strikethrough',
                'eraser',
                'forecolor',
                '|',
                'quote',
                'fontfamily',
                'fontsize',
                'head',
                'unorderlist',
                'orderlist',
                'alignleft',
                'aligncenter',
                'alignright',
                'link',
                'unlink',
                'img',
                'insertcode',
                '|',
                'undo',
                'redo'
            ];
            editor.create();
        },    
        /**
         * 按钮特效（loading效果）
         * --- 
         * bootstrap v3 已经去除该效果，老版本才有
         * 这里添加回来
         * @param  {[type]} buttonTag    [按钮的TAG]
         * @param  {[type]} staTus       [状态选择（open/close）]
         * @param  {[type]} defaultTitle [初始状态的文字]
         * @param  {[type]} LoadingTitle [运行状态的文字]
         * @return {[type]}              [description]
         */
        button_status: function(buttonTag,staTus,defaultTitle,LoadingTitle)
        {
            if (staTus == 'open'){
                buttonTag.addClass('disabled');
                buttonTag.html(LoadingTitle);
            }else if(staTus == 'close'){
                buttonTag.removeClass('disabled');
                // 还原成最初的html text
                buttonTag.html(defaultTitle);
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

            formData = huineng.queryStr2Object(queryStr, true);

            return formData;
        },
        /**
         * 合并对象
         * @param  {[type]} o1 [准备合并的对象1]
         * @param  {[type]} o2 [准备合并的对象2]
         * @return {[type]}    [description]
         */
        mergeData: function(o1,o2){
           for(var key in o2){
               o1[key]=o2[key]
           }
           return o1;
        }
    };
}) (jQuery);