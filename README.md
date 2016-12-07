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
}];
```
####line config
```javascript
var lineConfig=[{
	start:nodeConfig[i],/*define the begin node of the line,necessary*/
	end:nodeConfig[j],/*define the end node of the line,necessary*/
}]
```
