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
	
	this.name=config.name||'yzp';
	this.coordinate=config.coordinate;
	this.width=config.width||40;
	this.height=config.height||40;
	this.color=config.color||'rgb(150,200,150)';
	this.startColor=this.color;
	this.highlightColor=config.highlightColor||'rgb(100,200,200)';
	this.data=config.data||[];
	this.toolTip={
		bgColor:'rgb(250,250,250)',
		color:'rgb(100,100,100)',
		boxShadow:'1px 1px 4px rgb(100,100,100)',
		template:(function(This){
			var temp='<h3>'+This.name+'</h3>';
			for(i in This.data){
				var element='<p>'+i+':'+This.data[i]+'</p>';
				temp+=element;
			}
			return temp;
		})(this)
	};
	this.render=function(){
		var img=new Image();
		img.src=this.src;
		context.beginPath();
		context.rect(this.coordinate[0],this.coordinate[1],this.width,this.height);
		context.fillStyle=this.color;
		context.fill();
	};
	this.toggleInfor=function(){
		var This=this;
		canvas.addEventListener('mousemove',function(){
			if((event.clientX-This.coordinate[0])>0&&(event.clientY-This.coordinate[1])>0&&(event.clientX-This.coordinate[0])<This.width&&(event.clientY-This.coordinate[1])<This.height){
				This.renderinfor();
				This.color=This.highlightColor;
				This.render();
				
			}else{
				if(document.getElementById(This.name)){
					document.body.removeChild(document.getElementById(This.name));
				}
				This.color=This.startColor;
				This.render();
			}
		});
	};
	this.renderinfor=function(){
		if(document.getElementById(this.name)){
			document.body.removeChild(document.getElementById(this.name));
		}
		var inforbox=document.createElement('div');
		inforbox.setAttribute('id',this.name);
		inforbox.innerHTML=this.toolTip.template;
		inforbox.style.backgroundColor=this.toolTip.bgColor;
		inforbox.style.color=this.toolTip.color;
		inforbox.style.boxShadow=this.toolTip.boxShadow;
		inforbox.style.position='absolute';
		inforbox.style.top=this.coordinate[1]+1.5*this.height+'px';
		inforbox.style.left=this.coordinate[0]-this.width/3+'px';
		inforbox.style.padding='10px';
		inforbox.style.borderRadius='10px';
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
	this.color=config.color||'rgb(150,200,150)';
	this.textColor=config.color;
	this.width=config.width;
	this.deg=Math.atan((this.start.coordinate[1]-this.end.coordinate[1])/(this.start.coordinate[0]-this.end.coordinate[0]))*180/Math.PI;
	this.render=function(){
		context.beginPath();
		context.moveTo(this.start.coordinate[0]+this.start.width/2,this.start.coordinate[1]+this.start.height/2);
		context.lineTo(this.end.coordinate[0]+this.end.width/2,this.end.coordinate[1]+this.end.height/2);
		context.lineWidth=this.width;
		context.strokeStyle=this.color;
		context.stroke();
	};
	this.renderInfor=function(){
		var inforBox=document.createElement('h6');
		inforBox.innerHTML=this.start.name+"<span style='color:rgb(200,100,100)'> 至 </span>"+this.end.name;
		inforBox.style.position='absolute';
		inforBox.style.left=(this.start.coordinate[0]+this.end.coordinate[0])/2+'px';
		inforBox.style.top=(this.start.coordinate[1]+this.end.coordinate[1])/2-20+'px';
		inforBox.style.color=this.textColor;
		inforBox.style.transform='rotate('+this.deg+'deg)';
		document.body.appendChild(inforBox);
	}
	this.init=(function(This){
		This.render();
		This.renderInfor();
	})(this);
}


window.onload=function(){
	var config=[{
		name:'yzp',
		coordinate:[100,100],
		width:40,
		height:40,
		data:{
			IQ:95,
			EQ:60
		},
		end:[{
			name:'袁泽平',
			coordinate:[500,100],
			width:40,
			height:40,
			data:{
				智力:95,
				情商:60
			     }
		    }]
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
	var mytopo=new yzpTopo('canvas',config);
}
