# yzpTopo
my topoFramework based on canvas

/*Example*/
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
/*Example*/
