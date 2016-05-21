# Smarttang.bootstrap.js

[![bootstrap 3.3.x](https://img.shields.io/badge/bootstrap-3.3.X-green.svg)](https://www.bootcss.com/)  [![jquery 2.2.1](https://img.shields.io/badge/jquery-2.2.1-green.svg)](http://jquery.com/download/)


##简介

这个js插件汇聚了我还有之前37游戏的一个前端同事（已离职）做的一些前端功能，因为自己经常都要使用，所以封装了下，方便自己加载使用。google了下，做这样功能的人挺多的，但是貌似都没有做成一个独立的插件，so，这个东西就诞生了，我会持续维护，因为当前我兼任前端、后端、底层的开发。前端交互会用到的功能我都会封装起来，希望给有需要的朋友带来帮助。：）

##配置

在使用前，请关注下是否加载的jquery还有bootstrap。

```
 <script src="js/jquery-2.2.1.min.js"></script>
 <script src="js/bootstrap.min.js"></script>
```
在确定都加载了之后，加载这个插件。

```
 <script src="js/smarttang.bootstrap.js"></script>
```
要注意：先后顺序！！

##用法

加载完成后，可以在console里面输入两个变量，可以看到具体的一些方法。

```
 -> huineng
	Object {}
		getFormData: function:(...)
		queryStr2Object: function:(...)
 -> smarttang
 	Object {}
 		modal: function(...)
 		tables: function(...)
```
在页面里面如何调用？

```
  smarttang.modal(...)
  smarttang.tables_init(...)
  smarttang.tables_reload(...)

```
有些函数是有返回值的，比如tables返回的是一个对象，方便reload，这个根据自己的需求使用就好。
当然，你也可以改动一些配置来达到自己的目的，可以自己随意修改。：）

##Demo

datatables 使用.

```

	// 初始化
	var department_tables = smarttang.tables_init(
		'.department-manager',
		{
			url: OBJECT_DEPARTMENT,
			type: 'POST',
			data: {
				'obj':'list'
			}
		},
		[
			{
				data: 'department',
				width:'30%'
			},
			{
				data: 'department_manager',
				width:'15%',
			},
			{
				data: 'department_count',
				width:'20%',
	        	render: function (data, type, row, meta) {
	        		return '<span class="badge">'+ data + '</span>';
	        	}
			}
		],
		''
	);

	// 修改、删除、添加完成后，reload表格。
	smarttang.tables_reload(department_tables);

```

SmartAjax 使用.(无返回)

```
	function add()
	{
		var form_json = huineng.getFormData($('#department_add_form'));
		smarttang.SmartAjax(
			OBJECT_DEPARTMENT,
			huineng.mergeData(form_json,{'obj':'add'}),
			function(){
				$('#myModal-min').modal('hide');
				smarttang.tables_reload(department_tables);
			}
		);
	}
```

SmartAjax 使用.(有返回)

```
	function read(_id)
	{
		var info_id = filterXSS_id);
		smarttang.SmartAjax(
			OBJECT_DEPARTMENT,
			{'obj':'read','id':info_id},
			function(msg){
				var _html = '<具体的html内容>';
				var _button = '<button data-bb-handler="success" type="button" class="btn btn-sm btn-info" data-dismiss="modal">关闭</button>';
				smarttang.modal('modal视图的标题',_html,_button);
			}
		);
	}
```

##记录
> * [2016.5.16] 增加 wangEditor 支持。
> * [2016.5.16] 增加 datatables 支持（ajax初始化/ajax reload）
> * [2016.5.17] 增加 SmartAjax 支持（定制化ajax请求）
> * [2016.5.17] 增加 mergeData 支持（Object对象合并）
> * [2016.5.17] 增加 button_status 支持（还原 Bootstrap v3 版本之前的按钮loading特效）
> * [2016.5.18] 删除 delete 功能，增加 SmartAjax 返回值功能，用于处理。
> * [2016.5.21] 更新 tables_init 功能，修复按钮无法出现的 bug.
> * 等待增加...

##说明

1. 有任何bug问题请直接提issue, 我会看的，看到会处理，3天内提问者没回复默认关闭。
2. 有好的建议也可以发issue。采纳建议后，会把你的贡献加入到作者著名里面。
3. 长期维护该插件，只要用到的前端功能都会汇聚到这个插件里面。

##相关链接

* [版权声明](./LICENSE) (MIT协议，可以随意修改但是最好留下作者名字表示尊重)
* [作者邮箱](mailto:tangyucong@163.com) (有特别好的建议，直接发我)
* [wangEditor](http://wangeditor.github.io/) (这是我用过最好的在线编辑器，虽然坑很多....)
* [datatables](https://www.datatables.net/) (这是我最喜欢的插件，没有之一...)