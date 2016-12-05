# yzpTopo
my topoFramework based on canvas


function yzpTopo(id,data){
	this.id=id;
	this.data=data;
	this.createNode=function(){
		for(var i=0;i<this.data.length;i++){
			if(this.data[i].end){
			var lineconfig={
				start:this.data[i],
				end:this.data[i].end,
				color:'rgb(150,200,150)',
				width:5
			}
			new line(this.id,lineconfig);
			}
			var nodes=new node(this.id,this.data[i]);
		}
	};
	this.init=(function(This){
		This.createNode();
	})(this);
}
/*创建拓扑节点*/
function node(id,config){
	var canvas=document.getElementById(id);
	var context=canvas.getContext('2d');
	
	this.name=config.name;
	this.coordinate=config.coordinate;
	this.width=config.width;
	this.height=config.height;
	this.src=config.src;
	this.tipCss={
		bgColor:'rgb(100,200,200)',
		color:'white'
	};
	this.render=function(){
		var img=new Image();
		img.src=this.src;
		context.beginPath();
		context.rect(this.coordinate[0],this.coordinate[1],this.width,this.height);
		context.fillStyle='rgb(100,200,200)';
		context.fill();
	};
	this.toggleInfor=function(){
		var This=this;
		canvas.addEventListener('mousemove',function(){
			if((event.clientX-This.coordinate[0])>0&&(event.clientY-This.coordinate[1])>0&&(event.clientX-This.coordinate[0])<This.width&&(event.clientY-This.coordinate[1])<This.height){
				This.renderinfor();
			}else{
				if(document.getElementById('inforbox')){
					document.body.removeChild(document.getElementById('inforbox'));
				}
			}
		});
	};
	this.renderinfor=function(){
		if(document.getElementById('inforbox')){
			document.body.removeChild(document.getElementById('inforbox'));
		}
		var inforbox=document.createElement('div');
		inforbox.setAttribute('id','inforbox');
		inforbox.innerHTML=this.name;
		inforbox.style.backgroundColor=this.tipCss.bgColor;
		inforbox.style.color=this.tipCss.color;
		inforbox.style.width=2*this.width+'px';
		inforbox.style.height=this.height+'px';
		inforbox.style.boxShadow='1px 1px 1px rgb(100,100,100)';
		inforbox.style.position='absolute';
		inforbox.style.top=this.coordinate[1]-this.height+'px';
		inforbox.style.left=this.coordinate[0]-this.width/3+'px';
		document.body.appendChild(inforbox);
	};
	this.init=(function(This){
		This.render();
		This.toggleInfor();
	})(this);
}
/*创建拓扑线*/
function line(id,config){
	var canvas=document.getElementById(id);
	var context=canvas.getContext('2d');

	this.start=config.start;
	this.end=config.end;
	this.color=config.color;
	this.width=config.width;
	this.render=function(){
		context.beginPath();
		context.moveTo(this.start.coordinate[0]+this.start.width/2,this.start.coordinate[1]+this.start.height/2);
		context.lineTo(this.end.coordinate[0]+this.end.width/2,this.end.coordinate[1]+this.end.height/2);
		context.lineWidth=this.width;
		context.strokeStyle=this.color;
		context.stroke();
	};
	this.init=(function(This){
		This.render();
	})(this);
}


window.onload=function(){
	var config=[{
		name:'yzp',
		coordinate:[100,100],
		width:40,
		height:40,
		data:{
			"设备数":'1000'
		},
		end:{
		name:'yjj',
		coordinate:[500,500],
		width:40,
		height:40,
		}
	},
	{
		name:'yjj',
		coordinate:[500,500],
		width:40,
		height:40,
	}
	];
	var mytopo=new yzpTopo('canvas',config);
}
