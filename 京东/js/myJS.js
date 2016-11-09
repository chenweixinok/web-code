// JavaScript Document
window.onload=function()
{
	//左侧导航栏
	var tool_line=document.getElementById("tool_line");
	var tools=document.getElementById("tools");
	var oFloor_nav=getByClass("floor_icon");
	var oNavbar=document.getElementById("navbar_left");
	var oNav_li=oNavbar.getElementsByTagName("li");
	var oNav_show=getByClass(oNavbar,"show");
	var oNav_hide=getByClass(oNavbar,"hide");
	var oFloor=getByClass("floor");
	var oNav=document.getElementById("nav");
	var oHeight=document.documentElement.clientHeight;
	var oWidth=document.documentElement.clientWidth;
	oNavbar.style.left=(oWidth-1210)/2-35+"px";
	tool_line.style.height=oHeight+"px";
	tools.style.top=oHeight/2-tools.offsetHeight/2+"px";
	window.onresize=function()
	{
		oHeight=document.documentElement.clientHeight;
		var oWidth=document.documentElement.clientWidth;
		oNavbar.style.left=(oWidth-1210)/2-35+"px";
		oNavbar.style.top=oHeight/2-oNavbar.offsetHeight/2+"px";
		tool_line.style.height=oHeight+"px";
		tools.style.top=oHeight/2-tools.offsetHeight/2+"px";
	}
	for(var i=0;i<oNav_li.length;i++)
	{
		oNav_li[i].index=i;
		oNav_li[i].flag=true;
		oNav_li[i].onmouseover=function()
		{
			oNav_show[this.index].style.display="none";
			oNav_hide[this.index].style.display="block";
			oNav_hide[this.index].style.color="white";
		}
		oNav_li[i].onmouseout=function()
		{
			if(this.flag)
			{
				oNav_show[this.index].style.display="block";
				oNav_hide[this.index].style.display="none";
			}else{
				oNav_show[this.index].style.display="none";
				oNav_hide[this.index].style.display="block";
				oNav_hide[this.index].style.color="#C81623"
			}
		}
		oNav_li[i].onclick=function()
		{
			window.removeEventListener("scroll",change,false)
			for(var i=0;i<oNav_hide.length;i++)
			{
				oNav_li[i].flag=true;
				oNav_show[i].style.display="block";
				oNav_hide[i].style.display="none";
			}
			this.flag=false;
			var oThis=oFloor[this.index].offsetTop;
			startMove_html(document.documentElement,"scrollTop",oThis,function(){window.addEventListener("scroll",change,false);});
			startMove_html(document.body,"scrollTop",oThis,function(){window.addEventListener("scroll",change,false);});
		}
		
	};
	window.addEventListener("scroll",change,false);
	function change()
	{
		var oScroll=document.body.scrollTop||document.documentElement.scrollTop;
		if(oScroll+oHeight>oNav.offsetTop)
		{
			oNavbar.style.display="block";
			oNavbar.style.top=oHeight/2-oNavbar.offsetHeight/2+"px";
			setTimeout(function(){
				oScroll=document.body.scrollTop||document.documentElement.scrollTop;
				for(var i=0;i<oFloor.length;i++)
				{
					if(oFloor[i].offsetTop<oScroll+oHeight/2)
					{
						for(var j=0;j<oFloor.length;j++)
						{
							if(j!=i)
							{
							oNav_show[j].style.display="block";
							oNav_hide[j].style.display="none";
							}
						}
						oNav_show[i].style.display="none";
						oNav_hide[i].style.display="block";
						oNav_hide[i].style.color="#C81623"
					}
				}
			},200)
					
		}else{
			oNavbar.style.display="none";
		}
		
	}
	
	//右侧工具条
	var tool_img=tools.getElementsByTagName("img");
	var tool_hide=getByClass(tools,"tool_hide");
	var tool_timer1=null;
	var tool_timer2=null;
	var tool_arr=["images/imggg1.png","images/imggg2.png","images/imggg3.png","images/imggg4.png","images/imggg5.png","images/imggg6.png"];
	var tool_arr1=[];
	for(var i=0;i<tool_img.length;i++)
	{
		tool_arr1.push(tool_img[i].src);
		tool_img[i].index=i;
		tool_hide[i].index=i;
		tool_img[0].onclick=function()
		{
		  document.body.scrollTop = 0;
		  document.documentElement.scrollTop = 0;
		}
		tool_img[i].onmouseover=function()
		{
			clearTimeout(tool_timer2);
			var oImg=this.src;
			var n=this.index
			this.src=tool_arr[this.index];
			tool_hide[this.index].style.background="#C81623";
			this.onmouseout=function()
			{
				tool_img[this.index].src=oImg;
				tool_hide[this.index].style.background="#7A6E6E";
				tool_timer1=setTimeout(function(){
								startMove(tool_hide[n],"width",0,function(){tool_hide[n].style.display="none";})
							},300)
			}
			tool_timer2=setTimeout(function(){
							tool_hide[n].style.display="block";
							startMove(tool_hide[n],"width",63)
						},300)
		}
		tool_hide[i].onmouseover=function()
		{
			this.style.background="#C81623";
			tool_img[this.index].src=tool_arr[this.index];
			clearTimeout(tool_timer1);
			this.style.display="block";	
		}
		tool_hide[i].onmouseout=function()
		{
			this.style.background="#7A6E6E";
			tool_img[this.index].src=tool_arr1[this.index];
			var n1=this.index;
			tool_timer1=setTimeout(function(){
					startMove(tool_hide[n1],"width",0,function(){tool_hide[n1].style.display="none";})
				},300)
		}
	}
	//送货地址切换
	var address=document.getElementById("address");
	var province=document.getElementById("province");
	var province_item=province.getElementsByTagName("span");
	province_item[2].style.background="#C81623";
	province_item[2].style.color="white";
	for(var i=0;i<province_item.length;i++)
	{
		province_item[i].onclick=function()
		{
			for(var i=0;i<province_item.length;i++)
			{
				province_item[i].style.background="white";
				province_item[i].style.color="black";	
			}
			this.style.background="#C81623";
			this.style.color="white";
			address.innerHTML="送至："+this.innerHTML;	
			province.style.display="none";
		}
	}
    //导航栏菜单切换
	var oToggle=getByClass("toggle");
	var oToggle_body=getByClass("neirong");
	var oWhite=getByClass("white");
	for(var i=0;i<oToggle.length;i++)
	{
		oToggle[i].index=i;
		oToggle_body[i].index=i;
		oToggle[i].onmouseover=function()
		{
			oWhite[this.index].style.width=this.offsetWidth+"px";
			oToggle_body[this.index].style.display="block";
		
		}
		oToggle_body[i].onmouseout=oToggle[i].onmouseout=function()
		{
			oToggle_body[this.index].style.display="none";
			oWhite[this.index].style.width=0;
			oToggle_body[this.index].onmouseover=function()
			{
				oWhite[this.index].style.width=oToggle[this.index].offsetWidth+"px";
				oToggle_body[this.index].style.display="block";
			}	
		}
	}
	//搜索历史列表
	var oSearch1=document.getElementById("search");
	var oSearch=document.getElementById("searchBox");
	var oHistoryBox=document.getElementById("historyBox");
	var oHistory=document.getElementById("history");
	var arr2=["运动鞋","布鞋","饮料","衬衫","手机","小米5","华为","牛仔裤","桌子","零食","雨伞","电脑"]
	for(var i=0;i<arr2.length;i++)
	{
		var oLi=document.createElement("li");
		oLi.innerHTML="<span class='value'>"+arr2[i]+"</span><span class='del'>搜索历史</span>"
		oHistory.appendChild(oLi);
	}
	var timer3=null;
	var timer4=null;
	var timer5=null;
	var oLi_history=oHistory.getElementsByTagName("li");
	var oDel=getByClass(oHistory,"del");
	var oValue=getByClass(oHistory,"value");
	var oClose=getByClass(oSearch1,"close")[0];
	oSearch.onfocus=function()
	{
		oHistoryBox.style.display="block";
		oSearch.onmouseover=function()
		{
			oHistoryBox.style.display="block";
			clearInterval(timer4)
		}
		oSearch.onmouseout=function()
		{
			timer5=setTimeout(function(){
				oHistoryBox.style.display="none";
			},1000)
		}
	}
	oHistoryBox.onmouseover=function()
	{
		clearInterval(timer5)
		oHistoryBox.style.display="block";
		oHistoryBox.onmouseleave=function()
		{
			timer4=setTimeout(function(){
				oHistoryBox.style.display="none";
			},1000)
		
		}
	}
	oSearch.onblur=function()
	{
		oSearch.onmouseover=function()
		{
			oHistoryBox.style.display="none";
		}
	}
	oClose.onclick=function()
	{
		oHistoryBox.style.display="none";
	}
	del();
	function del()
	{
		oLi_history=oHistory.getElementsByTagName("li");
		oDel=getByClass(oHistory,"del");
		oValue=getByClass(oHistory,"value");
		for(var i=0;i<oLi_history.length;i++)
		{
			oLi_history[i].index=i;
			oLi_history[i].onmouseover=function()
			{
				var n=this.index
				oHistoryBox.style.display="block";
				for(var i=0;i<oLi_history.length;i++)
				{
					oLi_history[i].style.background="white";
					oDel[i].innerHTML="搜索历史";
					oDel[i].style.color="#AAA";
				}
				this.style.background="#FFDFC6";
				oDel[this.index].innerHTML="删除";
				oDel[this.index].onclick=function()
				{
					oHistory.removeChild(oLi_history[n])	
					del();
				}
				oDel[this.index].style.color="#005AA0";
			}
			oValue[i].onclick=function()
			{
				oSearch.value=this.innerHTML;
			}
			
		}
	}
	//商品分类切换
	var oList=document.getElementById("list");
	var oLi=oList.getElementsByTagName("li");
	var oNo=getByClass("no");
	var oList2=getByClass("list2");
	for(var i=0;i<oLi.length;i++)
	{
		oLi[i].index=i;
		oList2[i].index=i;
		oLi[i].onmouseover=function()
		{
			oNo[this.index].style.display="block";
			oList2[this.index].style.display="block";
			this.style.background="#F7F7F7";
			this.style.color="#B61D1D";
		}
		oList2[i].onmouseout=oLi[i].onmouseout=function()
		{
			oList2[this.index].style.display="none";
			oNo[this.index].style.display="none";
			oLi[this.index].style.color="white";
			oLi[this.index].style.background="url(images/icon.png) no-repeat right top #C81623";
			oList2[this.index].onmouseover=function()
			{
				oNo[this.index].style.display="block";
				oList2[this.index].style.display="block";
				oLi[this.index].style.background="#F7F7F7";
				oLi[this.index].style.color="#B61D1D";
			}	
		}
		
	}
	//小图标抖动
	var icon=document.getElementById("icon");
	shake(icon)
	function shake(ele)
	{
		var arr1=[];
		for(var i=18;i>0;i-=2)
		{
			arr1.push(-i);
			arr1.push(i);	
		}
		arr1.push(0);
		var oDiv_icon=ele.getElementsByTagName("div");
		var oImg_icon=ele.getElementsByTagName("img");
		for(var i=0;i<oDiv_icon.length;i++)
		{
			oDiv_icon[i].index=i;
			oDiv_icon[i].style.width=oDiv_icon[i].offsetWidth+"px";
			oDiv_icon[i].style.height=oDiv_icon[i].offsetHeight+"px";
			oImg_icon[i].style.position="absolute";
			oImg_icon[i].style.left=0;
			oDiv_icon[i].onmouseover=function()
			{
				var num=this.index;
				var n=0;
				this.timer=setInterval(function(){
					oImg_icon[num].style.left=arr1[n]+"px";
					n++;
					if(oImg_icon[num].style.left==0)
					{
						clearInterval(oDiv_icon[num].timer)		
					}
				},30)
				this.onmouseout=function()
				{
					this.timer=null;
				}
			}
		}
		
		
	}
	//楼层分类切换
	var oL=getByClass("lc");
	for(var i=0;i<oL.length;i++)
	{
		toggle(i);
	}
	//淡入淡出轮播
	fadeToggle(0);
	//倒计时
	var nowTime=document.getElementById("nowTime");
	var leftTime=document.getElementById("leftTime");
	var color1=leftTime.getElementsByTagName("span")[0];
	var arr=["blue","red","green","orange","#39F","purple",]
	timer=setInterval(function(){
		var n=Math.round(Math.random()*5);
		color1.style.color=arr[n];
		var nowDate=new Date();
		var newDate=new Date(2016,10,11,0,0,0);
		var year=nowDate.getFullYear();
		var month=nowDate.getMonth()+1;
		var date=nowDate.getDate();
		var hour=nowDate.getHours();
		var minute=nowDate.getMinutes();
		var second=nowDate.getSeconds();
		var leftTime1=parseInt((newDate.getTime()-nowDate.getTime())/1000);
		var date1=parseInt(leftTime1/(24*3600));
		var hour1=parseInt(leftTime1/3600%24);
		var minute1=parseInt(leftTime1/60%60);
		var second1=parseInt(leftTime1%60);
		nowTime.innerHTML=year+"年"+month+"月"+date+"日 "+two(hour)+"："+two(minute)+"："+two(second);
		color1.innerHTML=date1+"天"+two(hour1)+"时"+two(minute1)+"分"+"<span>"+two(second1)+"</span>"+"秒";
		
	},1000)
	function two(n)
	{
		if(n<10)
		{
			n="0"+n;
		}
		return n;
	}
	//图片移动
	var picMOve=document.getElementById("picMove");
	var oPic_Move=picMove.getElementsByTagName("img");
	for(var i=0;i<oPic_Move.length;i++)
	{
		move(oPic_Move[i]);
	}
    function move(ele)
	{
		ele.onmouseover=function()
		{
			startMove(this,"left",-20)	
		}
		ele.onmouseout=function()
		{
			startMove(this,"left","0")	
		}
	}
	//图片放大
	var picBig=document.getElementById("picBig");
	var oPic_Big=picBig.getElementsByTagName("img")
	var oBig=getByClass("big");
	for(var i=0;i<oBig.length;i++)
	{ 
		oBig[i].style.width=oBig[i].offsetWidth+"px";
		oBig[i].style.height=oBig[i].offsetHeight+"px";
		big(oPic_Big[i]);
	}
    function big(ele)
	{
		var oWidth1=ele.offsetWidth;
		var oHeight1=ele.offsetHeight;
		var oWidth=parseInt(ele.offsetWidth*1.2);
		var oHeight=parseInt(ele.offsetHeight*1.2);
		ele.onmouseover=function()
		{
			startMove1(this,{"width":oWidth,"height":oHeight,"opacity":"100"})	
		}
		ele.onmouseout=function()
		{
			startMove1(this,{"width":oWidth1,"height":oHeight1,"opacity":"80"})
		}
	} 
	//轮播
	var oWrap1=[];
	var oWrap2=getByClass("wraper");
	for(var i=0;i<oWrap2.length;i++)
	{
		oWrap2[i].index=i;
		if(getByClass(oWrap2[i],"picBox")!="")
		{
			oWrap1.push(oWrap2[i]);
			
		}
	}
	for(var i=0;i<oWrap1.length;i++)
	{
		togglePic(i);
	}
	function togglePic(n)
	{
		var oWrap=oWrap1[n];
		var oPic=getByClass(oWrap,"picBox")[0];
		var oImg=oPic.getElementsByTagName("div");
		var oSlide=getByClass(oWrap,"slide")[0];
		var oPre=getByClass(oWrap,"pre")[0];
		var oNext=getByClass(oWrap,"next")[0];
		var parent=oWrap.parentNode.parentNode;
		if(getByClass(oWrap,"slider_item")!="")
		{
			var oSlider=getByClass(oWrap,"slider_item")[0];
			var oItem=oSlider.getElementsByTagName("li");
		}
		var target1=-oImg[0].offsetWidth;
		var target2=-oImg.length/2*oImg[0].offsetWidth+oImg[0].offsetWidth;
		var timer=null;
		var timer1=null;
	    timer1=setInterval(function(){
			if(getStyle(parent,"display")=="block")
			{
				moveRight();
			}
		},3000)
		oWrap.onmouseover=function()
		{
			clearInterval(timer1);
			oSlide.style.display="block";	
		}
		oWrap.onmouseout=function()
		{
			timer1=setInterval(function(){
			if(getStyle(parent,"display")=="block")
			{
				moveRight();
			}
		},3000)
			oSlide.style.display="none";	
		}
		oPre.onclick=function()
		{
			moveLeft();	
		}
		oNext.onclick=function()
		{
			moveRight();	
		}
		if(oItem)
		{
			for(var i=0;i<oItem.length;i++)
			{
				oItem[i].index=i;
				oItem[i].onmouseover=function()
				{
					clearInterval(timer);
					for(var i=0;i<oItem.length;i++)
					{
						oItem[i].className="";	
					}
					this.className="active";
					var target=-this.index*oImg[0].offsetWidth;
					timer=setInterval(function(){
					var cur=oPic.offsetLeft;
					var speed=(target-cur)/5;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
					if(cur==target)
					{
						clearInterval(timer);
						target1=oPic.offsetLeft-oImg[0].offsetWidth;
						target2=oPic.offsetLeft+oImg[0].offsetWidth;
					}else{
						oPic.style.left=cur+speed+"px";	
					}
				},30)
				}
				
			}
		}
		function moveRight()
		{
			clearInterval(timer);	
			if(oPic.offsetLeft==-oImg.length/2*oImg[0].offsetWidth)
			{
				oPic.style.left=0;
				target1=oPic.offsetLeft-oImg[0].offsetWidth;
			}
			if(oItem)
			{
				var n=-target1/oImg[0].offsetWidth;
				if(n>=oItem.length)
				{
					n=0;
				}
				for(var i=0;i<oItem.length;i++)
				{
					if(i!=n)
					{
						oItem[i].className="";
					}
				}
				oItem[n].className="active";
			}
			timer=setInterval(function(){
				var cur=oPic.offsetLeft;
				var speed=(target1-cur)/5;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(cur==target1)
				{
					clearInterval(timer);
					target1=oPic.offsetLeft-oImg[0].offsetWidth;
					target2=oPic.offsetLeft+oImg[0].offsetWidth;
				}else{
					oPic.style.left=cur+speed+"px";	
				}
			},30)
		}
		function moveLeft()
		{
			clearInterval(timer);
			if(oPic.offsetLeft==0)
			{
				oPic.style.left=-oImg.length/2*oImg[0].offsetWidth+"px";
				target2=oPic.offsetLeft+oImg[0].offsetWidth;
			}
			if(oItem)
			{
				var n=-target2/oImg[0].offsetWidth;
				if(n==oImg.length/2)
				{
					n=0;	
				}
				for(var i=0;i<oItem.length;i++)
				{
					if(i!=n)
					{
						oItem[i].className="";
					}
				}
				oItem[n].className="active";
			}
			timer=setInterval(function(){
				var cur=oPic.offsetLeft;
				var speed=(target2-cur)/5;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(cur==target2)
				{
					clearInterval(timer);
					target1=oPic.offsetLeft-oImg[0].offsetWidth;
					target2=oPic.offsetLeft+oImg[0].offsetWidth;
				}else{
					oPic.style.left=cur+speed+"px";	
				}
			},30)
		}
	}
	
	//底部图片移动
	var bottomMove=document.getElementById("bottomMove");
	var oPic_Move1=bottomMove.getElementsByTagName("img");
	for(var i=0;i<oPic_Move1.length;i++)
	{
		move1(oPic_Move1[i]);
	}
    function move1(ele)
	{
		ele.onmouseover=function()
		{
			startMove(this,"bottom",0)	
		}
		ele.onmouseout=function()
		{
			startMove(this,"bottom","20")	
		}
	}
	//热门晒单滚动
	show_pc();
	function show_pc()
	{
		var hot_show=document.getElementById("hot_show");
		var oPic=getByClass(hot_show,"picBox")[0];
		var oImg=oPic.getElementsByTagName("img");
		var timer=null;
		var timer1=null;
	    timer1=setInterval(function(){
				moveBottom();
		},3000)
		hot_show.onmouseover=function()
		{
			clearInterval(timer1);
		}
		window.onblur=function()
		{
			clearInterval(timer1);
		}
		window.onfocus=function()
		{
			clearInterval(timer1);
			timer1=setInterval(function(){
				moveBottom();
		},3000)
		}
		hot_show.onmouseout=function()
		{
			timer1=setInterval(function(){
				moveBottom();
			},3000)
		}
		function moveBottom()
		{
			clearInterval(timer);
			var target=oPic.offsetTop+oImg[0].offsetHeight;	
			
			if(oPic.offsetTop==-(oImg.length/2-2)*oImg[0].offsetHeight)
			{
				
				oPic.style.top=-(oImg.length-2)*oImg[0].offsetHeight+"px";
				target=oPic.offsetTop+oImg[0].offsetHeight;	
			}
			timer=setInterval(function(){
				var cur=oPic.offsetTop;
				var speed=(target-cur)/5;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(cur==target)
				{
					clearInterval(timer);
				}else{
					oPic.style.top=cur+speed+"px";	
				}
			},30)
		}
		
	}
	
	
}/*window.onload结束*/

function getStyle(ele,attr)
{
	var a=window.getComputedStyle(ele,null)[attr]
	return a
}

function getByClass(ele,name)
{
	var a;
	var b=[];
	var c
	if(arguments.length==2)
	{
		a=arguments[0].getElementsByTagName("*");
		c=arguments[1];	
	}else{
		a=document.getElementsByTagName("*");
		c=arguments[0];
	}
	for(var i=0;i<a.length;i++)
	{
		var d=a[i].className;
		if(d.indexOf(c)!=-1&&(d.charAt(d.indexOf(c)+c.length)==" "||d.lastIndexOf(c.charAt(c.length-1))==d.length-1))
		{
			b.push(a[i]);
		}
	}
	return b;
}
//链式运动
function startMove(ele,attr,Target,fn)
{
	if(!ele.timer)
	{
		ele.timer=null;
	}else{
		clearInterval(ele.timer);
	}
	ele.timer=setInterval(function()
	{
	   var cur=0;
	   if(attr=="opacity")
	   {
		  cur=Math.round(parseFloat(getStyle(ele,attr))*100);
	   }else{
		  cur=parseInt(getStyle(ele,attr));
	   }
	   var speed=(Target-cur)/5;
	   speed=speed>0?Math.ceil(speed):Math.floor(speed);
	   if(cur==Target)
	   {
		  clearInterval(ele.timer);
		   if(fn)
	      {
		    fn();
		  }
	   }else{
		   if(attr=="opacity")
		   {
				cur+=speed;
				ele.style.filter="alpha(opacity="+cur+")";
				ele.style.opacity=cur/100;		
		   }else{
				ele.style[attr]=cur+speed+"px";  
	   }
	   };
	},30)
}
//页面运动
function startMove_html(ele,attr,Target,fn)
{
	if(!ele.timer)
	{
		ele.timer=null;
	}else{
		clearInterval(ele.timer);
	}
	ele.timer=setInterval(function()
	{
	   var cur=0;
	   cur=parseInt(ele[attr]);
	   var speed=(Target-cur)/5;
	   speed=speed>0?Math.ceil(speed):Math.floor(speed);
	   if(cur==Target)
	   {
		  clearInterval(ele.timer);
		   if(fn)
	      {
		    fn();
		  }
	   }else{
	   		ele[attr]=cur+speed;  
	   };
	},30)
}
//淡入淡出轮播
function fadeToggle(n)
{
	var oCon=getByClass("container")[n];
		var oPic=getByClass(oCon,"picBox")[0];
		var oImg=oPic.getElementsByTagName("img");
		var oSlide=getByClass(oCon,"slide")[0];
		var oPre=getByClass(oCon,"pre")[0];
		var oNext=getByClass(oCon,"next")[0];
		var oSlider=getByClass(oCon,"slider_item")[0];
		var oItem=oSlider.getElementsByTagName("li");
		var num=0;
		var timer1=null;
		for(var i=1;i<oImg.length;i++)
		{
			oImg[i].style.opacity=0;
			oImg[i].style.filter="alpha(opacity=0)";
		}
		timer1=setInterval(function(){
			fade1();
		},2000)
		oCon.onmouseover=function()
		{
			clearInterval(timer1);
			oSlide.style.display="block";	
		}
		oCon.onmouseout=function()
		{
			timer1=setInterval(function(){
				fade1();
			},3000)
			oSlide.style.display="none";	
		}
		oPre.onclick=function()
		{
			fade2();	
		}
		oNext.onclick=function()
		{
			fade1();	
		}
		for(var i=0;i<oItem.length;i++)
		{
			oItem[i].index=i;
			oItem[i].onmouseover=function()
			{
				for(var i=0;i<oItem.length;i++)
				{
					oItem[i].className="";	
				}
				this.className="active";
				oImg[num].style.zIndex=0;
				oImg[this.index].style.zIndex=1;
				num=this.index;
				startMove(oImg[num],"opacity",100,function(){
					for(var i=0;i<oImg.length;i++)
					{
						if(i!=num)
						{
							oImg[i].style.opacity=0;
							oImg[i].style.filter="alpha(opacity=0)";
						}
					}
			   })
			}
		}
		function fade1()
		{
			num++;
			if(num==oImg.length)
			{
				num=0;
				oImg[oImg.length-1].style.zIndex=0;
			}else{
				oImg[num-1].style.zIndex=0;
			}
			if(oItem)
			{
				for(var i=0;i<oImg.length;i++)
				{
					oItem[i].className="";
				}
				oItem[num].className="active";
			}
			oImg[num].style.zIndex=1;
			startMove(oImg[num],"opacity",100,function(){
				for(var i=0;i<oImg.length;i++)
				{
					if(i!=num)
					{
						oImg[i].style.opacity=0;
						oImg[i].style.filter="alpha(opacity=0)";
					}
				}
			})
			
		}
		function fade2()
		{
			num--;
			if(num<0)
			{
				num=oImg.length-1;
				oImg[0].style.zIndex=0;
			}else{
				oImg[num+1].style.zIndex=0;
			}
			if(oItem)
			{
				for(var i=0;i<oImg.length;i++)
				{
					oItem[i].className="";
				}
				oItem[num].className="active";
			}
			oImg[num].style.zIndex=1;
			startMove(oImg[num],"opacity",100,function(){
				for(var i=0;i<oImg.length;i++)
				{
					if(i!=num)
					{
						oImg[i].style.opacity=0;
						oImg[i].style.filter="alpha(opacity=0)";
					}
				}
			})
			
		}
}
//选项卡切换
function toggle(n)
{
	var oLc=getByClass("lc")[n];
	var oLi1=oLc.getElementsByTagName("li");
	var oA=oLc.getElementsByTagName("a");
	var oLine=getByClass(oLc,"line");
	var oMain_body=getByClass("main_body")[n];
	var oMain=getByClass(oMain_body,"main");
	for(var i=0;i<oLi1.length;i++)
	{
		oLi1[i].index=i;
		oLine[0].style.display="block";
		oLine[0].style.width=oLi1[0].offsetWidth-1+"px";
		oLi1[0].style.width=oLi1[0].offsetWidth+"px";
		oLi1[0].style.height=oLi1[0].offsetHeight+"px";
		oA[0].className="active_nav"
		oLi1[i].onmouseover=function()
		{
			for(var i=0;i<oMain.length;i++)
			{
				oMain[i].style.display="none";
				oLine[i].style.display="none";
				oLine[i].style.width=0;
				if(i==oMain.length-1)
				{
					oA[i].className="br";	
				}else{
					oA[i].className="";
				}
			}
			oLine[this.index].style.width=this.offsetWidth-1+"px";
			oLi1[this.index].style.width=this.offsetWidth+"px";
			oLi1[this.index].style.height=this.offsetHeight+"px";
			oLine[this.index].style.display="block";
			oMain[this.index].style.display="block";
			oA[this.index].className="active_nav";
		}

	}
}
//同时运动
function startMove1(ele,json,fn)
{
	if(!ele.timer)
	{ele.timer=null;}else{
	clearInterval(ele.timer);
	}
	ele.timer=setInterval(function()
	{ 
		var flag=true;
		for(var attr in json)
		{
			if(attr=="opacity")
			{
			  cur=Math.round(parseFloat(getStyle(ele,attr))*100);
			}else{
			  cur=parseInt(getStyle(ele,attr));
			}
			var speed=(json[attr]-cur)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur!=json[attr])
			{
			  flag=false;
			}
			if(attr=="opacity")
			{
			  cur+=speed;
			  ele.style.filter="alpha(opacity="+cur+")";
			  ele.style.opacity=cur/100;		
			}else{
			  ele.style[attr]=cur+speed+"px";  
			}
			if(flag)
			{
			  clearInterval(ele.timer);
			  if(fn)
			  {
				fn();
			  }
			}
	   };
	},30)
}
