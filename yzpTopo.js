var tool={
	isOnline:function(start,p,end){
		var distance1=Math.sqrt(Math.pow(p[0]-start[0],2)+Math.pow(p[1]-start[1],2));
		var distance2=Math.sqrt(Math.pow(end[0]-p[0],2)+Math.pow(end[1]-p[1],2));
		var distance=Math.sqrt(Math.pow(end[0]-start[0],2)+Math.pow(end[1]-start[1],2));
		if(distance1+distance2-distance<1){
			return true;
		}else{
			return false;
		}
	},
    getObj:function(objList,key,value){
        for(var i=0;i<objList.length;i++){
                if(objList[i][key]===value){
                    return objList[i];
                }
        }
    }
}

function yzpTopo(id,nodeConfig,lineConfig){
    this.nodes=[];
	this.id=id;
	this.nodeConfig=nodeConfig;
	this.lineConfig=lineConfig;
	this.createNode=function(){
		for(var i=0;i<this.nodeConfig.length;i++){
			this.nodes.push(new node(this.id,this.nodeConfig[i]));
		}
	};
	this.createLine=function(){
		for(var i=0;i<this.lineConfig.length;i++){
		var lineconfig={
				start:tool.getObj(this.nodes,'name',this.lineConfig[i].start.name),
				end:tool.getObj(this.nodes,'name',this.lineConfig[i].end.name),
				color:'rgb(150,200,150)',
				width:5
			}
			new line(this.id,lineconfig);
		}
	}
	this.init=(function(This){
		This.createNode();
		This.createLine();
	})(this);
}
/*创建拓扑节点*/
function node(id,config){
	var canvas=document.getElementById(id);
	var context=canvas.getContext('2d');
	
	this.src=config.src||'';
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
		if(this.src){
			var img=new Image();
			img.src=this.src;
			context.beginPath();
			context.drawImage(img,this.coordinate[0],this.coordinate[1],this.width,this.height);
		}else{
			context.beginPath();
			context.rect(this.coordinate[0]-this.width/2,this.coordinate[1]-this.height/2,this.width,this.height);
			context.fillStyle=this.color;
			context.fill();
		}
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
					canvas.parentNode.removeChild(document.getElementById(This.name));
				}
				This.color=This.startColor;
				This.render();
			}
		});
	};
	this.renderinfor=function(){
		if(document.getElementById(this.name)){
			canvas.parentNode.removeChild(document.getElementById(this.name));
		}
		var inforbox=document.createElement('div');
		inforbox.setAttribute('id',this.name);
		inforbox.innerHTML=this.toolTip.template;
		inforbox.style.backgroundColor=this.toolTip.bgColor;
		inforbox.style.color=this.toolTip.color;
		inforbox.style.boxShadow=this.toolTip.boxShadow;
		canvas.parentNode.position='relative';
		inforbox.style.position='absolute';
		inforbox.style.top=this.coordinate[1]+this.height+'px';
		inforbox.style.left=this.coordinate[0]-this.width/4*3+'px';
		inforbox.style.padding='10px';
		inforbox.style.borderRadius='10px';
		canvas.parentNode.appendChild(inforbox);
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
    this.highlightColor=config.highlightColor||'rgb(100,200,200)';
	this.textColor=config.color;
	this.width=config.width;
	this.deg=Math.atan((this.start.coordinate[1]-this.end.coordinate[1])/(this.start.coordinate[0]-this.end.coordinate[0]))*180/Math.PI;
	this.render=function(){
		context.beginPath();
		context.moveTo(this.start.coordinate[0],this.start.coordinate[1]);
		context.lineTo(this.end.coordinate[0],this.end.coordinate[1]);
		context.lineWidth=this.width;
		context.strokeStyle=this.color;
		context.stroke();
	};
	this.renderInfor=function(){
		if(document.getElementById(this.start.name+this.end.name)){
			canvas.parentNode.removeChild(document.getElementById(this.start.name+this.end.name));
		}
		var inforBox=document.createElement('div');
		inforBox.innerHTML=this.start.name+"<span style='color:rgb(200,100,100)'> 至 </span>"+this.end.name;
		inforBox.style.position='absolute';
        inforBox.setAttribute('id',this.start.name+this.end.name);
		inforBox.style.left=(this.start.coordinate[0]+this.end.coordinate[0])/2-40+'px';
		inforBox.style.top=(this.start.coordinate[1]+this.end.coordinate[1])/2-20+'px';
		inforBox.style.color=this.highlightColor;
		inforBox.style.transform='rotate('+this.deg+'deg)';
		canvas.parentNode.appendChild(inforBox);
	};
	this.toggleInfor=function(){
		var This=this;
		canvas.addEventListener('mousemove',function(){
			if(tool.isOnline(This.start.coordinate,[event.clientX,event.clientY],This.end.coordinate)){
				This.renderInfor();
                This.start.color=This.start.highlightColor;
                This.start.render();
                This.end.color=This.start.highlightColor;
                This.end.render();
			}else{
				canvas.parentNode.removeChild(document.getElementById(This.start.name+This.end.name));
			}
		})
	};
	this.init=(function(This){
		This.render();
		This.toggleInfor();
	})(this);
}
