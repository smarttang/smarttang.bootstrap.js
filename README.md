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
 		delete: function(...)
 		modal: function(...)
 		tables: function(...)
```
在页面里面如何调用？

```
  smarttang.delete(...)
  smarttang.modal(...)
  smarttang.tables(...)

```
有些函数是有返回值的，比如tables返回的是一个对象，方便reload，这个根据自己的需求使用就好。
当然，你也可以改动一些配置来达到自己的目的，可以自己随意修改。：）

##记录
> * [2016.5.16] 增加 wangEditor 支持。
> * [2016.5.16] 增加 datatables 支持（ajax初始化/ajax reload）
> * 等待增加...

##说明

1. 有任何bug问题请直接提issue, 我会看的，看到会处理，3天内提问者没回复默认关闭。
2. 有好的建议也可以发issue。采纳建议后，会把你的贡献加入到作者著名里面。
3. 长期维护该插件，只要用到的前端功能都会汇聚到这个插件里面。

##相关链接

* [版权声明](./LICENSE) (MIT协议，可以随意修改但是最好留下作者名字表示尊重)
* [作者邮箱](mailto:tangyucong@163.com) (有特别好的建议，直接发我)


