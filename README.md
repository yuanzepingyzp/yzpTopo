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
/*Example*/
