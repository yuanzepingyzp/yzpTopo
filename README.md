# yzpTopo
##my topology framework based on canvas

*Example*
<br>
###html code
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<title>myframework demo</title>
	</head>
	<body>
		<div>
		<canvas width=1000 height=900 id='canvas'></canvas>
		</div>
		<script src='js/yzpTopo.js'></script>
		<script src='js/main.js'></script>
	</body>
</html>
```
###javascript code
```javascript
/*define node object*/
var nodeConfig=[{
		name:'yzp',
		coordinate:[100,100],
		width:40,
		height:40,
		data:{
			IQ:95,
			EQ:60
		}
	},
	{
		name:'袁泽平',
		coordinate:[500,100],
		width:40,
		height:40,
		data:{
			智力:95,
			情商:60
		}
	}
	];
	/*define line relation*/
	var lineConfig=[{start:nodeConfig[0],end:nodeConfig[1]}];
	var mytopo=new yzpTopo('canvas',nodeConfig,lineConfig);
}
```
###API introduce
####node config
```javascript
var nodeConfig=[{
	name:'string',/*node name necessary attribute*/
	coordinate:array[0,0],/*define the coordinate of the node is  necessary*/
	src:'string',/*not necessary render a img if this value is available*/
	width:number,/*define the width of the node,not necessary,default value is 40*/
	height:number,/*define the height of the node ,not necessary,default value is 40*/
	color:'string',/*define backgroundcolor of node,not necessary,default value is 'rgb(150,200,150)'*/
	highlightColor:'string',/*define the highlightColor of the node,not necessary,default value is 'rgb(100,200,200)'*/
	data:object{}/*define the data need to show of the node,neccesary*/
}];
```
####line config
```javascript
var lineConfig=[{
	start:nodeConfig[i],/*define the begin node of the line,necessary*/
	end:nodeConfig[j],/*define the end node of the line,necessary*/
}]
```
####总结
#####oop(面向对象）的编程思想实际上可以理解成一种仿生的编程方式,它有一个基本的结构，只要能够迅速转变思想的话，肯定要比面向过程的编程方式更为容易，因为面向过程是比面向对象更为底层的编程方式，例如我要在canvas中绘制一些节点，只需要定义一个构造函数，在这个构造函数定义好节点的基本属性，例如长宽以及坐标，然后在定义一个render方法将节点渲染到canvas中，如果需要在new的同时就将节点渲染到canvas，就需要将render方法立即执行，但需要注意的是立即执行函数内的this是指向window对象，所以就需要将对象作为形参传入，因为我们要定义的对象中需要立即执行的方法不止一个，所以最后的实践定义一个如何方法比如init，这个方法是立即执行的，然后在这个方法中调用其他需要立即执行的方法，同样需要注意this的指向。接受了这样的opp的模式后剩下的就是数学及物理问题了。
