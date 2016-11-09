/////搜索JSONP
function serch(data){
  if(data.result.length > 0){
	 $(".serch-box").show();
	 $(".serch-history").hide();
	 $(".serch-box p").hide()
  }else{ 
	 $(".serch-box").show();
	 $(".serch-box p").show()
  }
  var html = '';
  var value = document.getElementById("serch-input").value;
  for(var k = 0 ;k<data.result.length;k++){
	  html +="<li><a href='https://s.taobao.com/search?q="+value+"&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.50862.201856-taobao-item.1&ie=utf8' target='_blank'>"+data.result[k][0]+"</a></li>"  
  }
  $(".serch-box ul").html(html);
  $(".serch-show ul li").bind("mouseenter",function(){
	$(this).children().css("font-size","18px").parent('li').siblings().children().css("font-size","12px");  
	$(this).prev('li').children().animate({"font-size":"15px"},0);
	$(this).next('li').children().animate({"font-size":"15px"},0);
  })
  $(".serch-box ul li ").bind("mouseleave",function(){
	$(this).children().animate({"font-size":"12px"},0).parent().siblings().children().css("font-size","12px");  
  })
 }
//////载入开始
window.onload = function(){
 //顶部
  $(".top-right li").bind("mouseenter",function(){
	 $(this).children('div').slideDown(200); 
  })
  $(".top-right li").bind("mouseleave",function(){
	 $(this).children('div').slideUp(200); 
  })		
  $(".net-nav").children('div').mouseenter(function(){
	 var m =   $(".net-nav").children('div').index($(this));
	 var netrgb = ["red","#9fb838","#d75696","#2e9fdb"];
	$(".net-nav .net-item ul li").mouseenter(function(){
	  $(this).css({"background":netrgb[m]}).children().css("color","#fff")
	})
	$(".net-nav .net-item ul li").mouseleave(function(){
	  $(this).css({"background":"#fff"}).children().css("color","#666")
	})
  })
 /////////////搜索分类
  $(".serch-type-wrapper").bind("mouseenter",function(){
	 $(this).children('span').addClass("rotate");
	 $(".serch-type").slideDown();
  })
  $(".serch-type-wrapper").bind("mouseleave",function(){
	 $(this).children('span').removeClass("rotate");
	 $(".serch-type").slideUp();
  })
  $(".serch-type li").bind("click",function(event){
	   $(".serch-type-show").html(this.innerHTML).hide().slideDown(200);
	   var m = 	$(".serch-type li").index(this);
	  
	   if(m==0 || m ==2){
		   $(".serch-hot").children().eq(0).show().siblings().hide();
		   $("#serch-btn").css("background","#ff4200");
		   $("#serch-input-wrapper").css("border","2px solid #ff4200");
		   $(".serch-show,.serch-type-wrapper").css("border","1px solid #ff4200");
	    }
	   if(m==1){
		   $(".serch-hot").children().eq(1).show().siblings().hide();
		   $("#serch-btn").css("background","#c40000");
		   $("#serch-input-wrapper").css("border","2px solid #c40000");
		   $(".serch-show,.serch-type-wrapper").css("border","1px solid #c40000");
	    }
	   $(this).addClass("serch-select").siblings().removeClass("serch-select"); 
	   $(".serch-type").slideUp(200);
	   event.stopPropagation();
	   $(this).parent().siblings('span').removeClass("rotate");
  })
  /////////////搜索显示
  
 $(".serch-show").mouseenter(function(){
	 $("#serch-input").unbind("blur");
  })
  $(".serch-show").mouseleave(function(){ 
     $("#serch-input").live("blur",function(){
		   $(".serch-show").fadeOut(); 
	  });
  })
  $(".serch-show ul li").bind("mouseenter",function(){
	$(this).children().css("font-size","20px").parent('li').siblings().children().css("font-size","14px");  
	$(this).prev('li').children().animate({"font-size":"17px"},0);
	$(this).next('li').children().animate({"font-size":"17px"},0);
  })
 
  $(".serch-history ul li ").bind("mouseleave",function(){
	$(this).children().animate({"font-size":"14px"},0).parent().siblings().children().css("font-size","14px");  
  })
  $(".serch-history ul li span").click(function(event){
	event.stopPropagation();
	$(this).parent('li').animate({width:"0"},300,function(){$(this).remove();});
	  
    if($(".serch-history ul li").length<1){
	   $(".serch-history p:first").show();
    }
  })
  
  $(".serch-history p em").click(function(event){
	 event.stopPropagation();
	 $(this).parent().siblings().children().slideUp(function(){ $(".serch-history ul li").remove();});
	 $(".serch-history p:first").show();
	  
  })

	
  $("#serch-input").bind("focus",function(event){
    if($(".serch-history ul li").length != 0 && this.value.length==0){
	   $(".serch-show").fadeIn();
	   $(".serch-history").show();	
	}else{
	   $(".serch-show").fadeIn();
	   $(".serch-history p:first").show();
	}
   }).click(function(event){
	   event.stopPropagation();
	  })
 
   $(document).click(function(){ 
	 $(".serch-show").fadeOut(300); 
   })
   $("#serch-btn").bind("click",function(){
	 var val = document.getElementById('serch-input').value;
	 var form = document.getElementById('serch-form');
     form.action="https://s.taobao.com/search?q="+val+"&imgfile=&js=1&stats_click=search_radio_all%3A1&ie=utf8";
   })
  /////////////搜索JSONP
  var date = new Date();
  $("#serch-input").bind("keyup",function(){ 
   var Oscript = document.createElement('script');
	    Oscript.src="https://suggest.taobao.com/sug?code=utf-8&q="+this.value+"&_ksTS=1475834237860_1837&callback=serch&t="+date.getTime();
		$(Oscript).appendTo("body");
		$(".serch-history").hide();
  })
  
  /////////////搜索历史添加
  $("#serch-btn").bind("click",function(){
	 var Oli= document.createElement('li');
	 Oli.innerHTML = "<a href=''>"+document.getElementById("serch-input").value+"</a>";
	 $(Oli).appendTo(".serch-history ul");
	 if($(".serch-history ul li").length > 10){
	    $(".serch-history ul li:first").remove();
	 }
  })
  
  /////|//导航
  $(".nav-style li").bind("mouseenter",function(){
	$(this).children().css("color","#ff4200").parent().siblings().children().css("color","#fff");
	var index = $(".nav-style li").index(this);
	$(".nav-bg").show().stop().animate({top:index*$(this).height()+$(".nav h3").innerHeight()+"px",width:"178px",height:"26px",left:"2px"},200);
    $(".nav-content").css({"top":"0","height":$(".nav").height()-1+"px","left":$(".nav").width()+"px"}).stop().show().animate({width:"620px"},300).children().eq(index).show().siblings().hide();	
  })
  ///判断鼠标离开NAV方向
  $(".nav-style").bind("mouseleave",function(e){ 
    var Ox = e.pageX;
	var Oy = e.pageY;
	if(Ox <= $(this).offset().left-1){
	  $(".nav-content").animate({width:"0"},300,function(){ $(".nav-bg").animate({width:"0px"},300);$(".nav-content").hide();});
	  $(this).children().children().css("color","#fff");
	}
    if(Oy<=$(this).offset().top-1){
	  $(".nav-content").animate({height:"0"},300,function(){  $(".nav-bg").animate({height:"0px"},300);$(".nav-content").hide();});
	  $(this).children().children().css("color","#fff");
	}
    if(Oy>=$(".nav-style li:last").offset().top+$(".nav-style li:last").height()-1){
	  $(".nav-content").animate({height:"0",top:$(".nav").height()+"px"},300,function(){ $(".nav-bg").animate({top:$(".nav").height()+"px",height:"0px"},200);$(".nav-content").hide();})	
	  $(".nav-bg").animate({top:$(".nav").height()+"px",height:"0px"},300);
	  $(this).children().children().css("color","#fff");
	}
  })
  ///判断鼠标离开NAV-content方向
  $(".nav-content").bind("mouseleave",function(e){
	  var Nx=e.pageX;
	  var Ny=e.pageY;
	  $(".nav-style").children().children().css("color","#fff");
  if(Nx>$(this).offset().left+$(this).width()){
		  $(".nav-bg").animate({width:"0px",left:$(".nav").width()+"px"},300,function(){
			 $(".nav-content").animate({width:"0",left:$(".nav-content").width()+$(".nav").width()+"px"},300,function(){
          $(".nav-content").hide();
				 }) 
			 })
	  }
	  if(Ny<=$(this).offset().top-1){
	   $(".nav-content").animate({height:"0"},300,function(){  $(".nav-bg").animate({height:"0px"},300);$(".nav-content").hide();})
	  }
	  if(Ny>=$(this).offset().top-1+$(this).height()){
	  $(".nav-content").animate({height:"0",top:$(".nav").height()+"px"},300,function(){ $(".nav-bg").animate({top:$(".nav").height()+"px",height:"0px"},200);$(".nav-content").hide();})
	  }
  })

  ///轮播框架
  moveAll=function(mov,runnum,prev,next,direction,time){
	  var m = 0;
	  mov.children().eq(0).clone().appendTo(mov);
	  function moving(){
		if( m == mov.children().length){
		    m = 0;
			mov.css(direction,"0px");	
		} 
		if(m==-1){
		   mov.css({ direction: -(mov.children().length- 1) * mov.children().eq(0).outerWidth()+'px' });
           m = mov.children().length - 2;	
		}
		if(m==mov.children().length-1){
		   runnum.eq(0).addClass("imgactive").siblings().removeClass("imgactive");
		}else{
		   runnum.eq(m).addClass("imgactive").siblings().removeClass("imgactive");
		} 
		if(direction == "left"){
		   mov.width(mov.children().eq(0).outerWidth()*mov.children().length)
		   mov.animate({left:-m*mov.children().eq(0).outerWidth()+"px"});
		}
		if(direction == "top"){
		  mov.animate({top:-mov.children().eq(0).outerHeight()+"px"},scrolltop());
		   function scrolltop(){
		    mov.children().eq(0).remove().appendTo(mov);
			mov.css("top","0")
		  }
		}
	  }
      mov.timer = setInterval(function(){m++;moving()},time);
	  mov.parent('div').mouseenter(function(){
	     clearInterval(mov.timer);
	  })
	  mov.parent("div").mouseleave(function(){
		 mov.timer = setInterval(function(){m++;moving()},time);
	  })
	  runnum.mouseover(function(){
		   index = $(this).index();
		   m = index;
		   mov.animate({left:-m*mov.children().eq(0).outerWidth()+"px"},0);  
		   runnum.eq(m).addClass("imgactive").siblings().removeClass("imgactive");
	  })
	  prev.click(function(){
		 m--;
		 moving();
	  })
	  next.click(function(){
		  m++;
		  moving();
	  })
  }
  moveAll($(".big-move"),$(".run-num1 li"),$(".prev"),$(".next"),"left",5000);
  moveAll($(".small-move"),$(".run-num2 li"),$(".prev1"),$(".next1"),"left",3000);
  moveAll($(".news-item"),$("none"),$("none"),$("none"),"top",3000);
  moveAll($(".every-move ul"),$("none"),$(".prev2"),$(".next2"),"left",3000);
	////公告栏
  $('.notice-item li').bind("mouseenter",function(){
	  var index = $('.notice-item li').index(this);
	  $(this).css("font-weight","bold").siblings().css("font-weight","normal")
	  $(".notice").children('div').eq(index+1).show().siblings('div').hide();
	  $(".notice-banner").show().stop().animate({left:index*$(this).width()+5+"px"},200);
  })
  /////充值框
  $(".charge-item li").mouseenter(function(){
	 $(this).children('div:first').css("border","1px solid red").children('em').addClass("charge-rotate"); 
  })
  $(".charge-item li").mouseleave(function(){
	 $(this).children('div:first').css("border","1px solid white").children('em').removeClass("charge-rotate"); 
  })
  $(".show-charge").bind("mouseenter",function(){
	 $(this).children('div:first').css({"z-index":"5","border-bottom":"1px solid white"}).siblings('div').slideDown(200);
  })
  $(".show-charge").bind("mouseleave",function(){
     $(this).children('div:first').css({"z-index":"2","border":"1px solid white"}).siblings('div').hide();
  })
  /////双十一时间提示
  function time(){
  var day = new Date();
  var month= day.getMonth()+1;
  var date =day.getDate();
  var minute=day.getMinutes();
  var newDate=new Date(2016,10,11,0,0,0);
  var havetime= parseInt((newDate.getTime()-day.getTime())/1000);
  var datel = parseInt(havetime/(24*3600));
  var hourl =parseInt(havetime/3600%24);
  var minutel  = parseInt(havetime/60%60);
  var secondl = parseInt(havetime%60);
  function zoro(num,n){
	var str = '' +num;
	while(str.length<n)
	{
		str = "0"+str;
    }  
	return str;
  }
  $('.timer').children('p:first').children('span:first').html(month);
  $('.timer').children('p:first').children('span:last').html(date);
  $('.timer').children('p:last').children('span:eq(0)').html(datel);
  $('.timer').children('p:last').children('span:eq(1)').html(zoro(hourl,2));
  $('.timer').children('p:last').children('span:eq(2)').html(zoro(minutel,2));
  $('.timer').children('p:last').children('span:eq(3)').html(zoro(secondl,2));
  }
  setInterval(time,1000);
  ////////经常逛效果
  $(".ofen-item-list").children('div').css("width","789px")
  $(".ofen-item ul li").bind("mouseenter",function(){
	var index =  $(".ofen-item ul li").index(this); 
	var Oindex = index%4;
	$(this).parent('ul').next('div').stop().animate({left:$(".ofen-item ul li:first").outerWidth()*Oindex-2+"px"},300)
    $(this).parent().parent().next().children().stop().animate({left:-$(".ofen-item-list").children().eq(0).width()*Oindex+"px"},200)
  })

  ///////热卖单品
  $(".hot-sell-item").children('div').bind("mouseenter",function(){
	 var Otop= $(".hot-sell-item").position().top;
	 var Oleft =  $(".hot-sell-item").position().left;
	$('.hot-sell-same').show().stop().animate({
	  width:$(this).outerWidth()+"px",
	  height:$(this).outerHeight()+"px",
	  left:$(this).position().left+Oleft+"px",
	  top:$(this).position().top+Otop+"px"},300) ;
  })
  $(".hot-sell-content").bind("mouseleave",function(){
    $('.hot-sell-same').stop().fadeOut(200);
  })
  
  var kg = true;
  var levelrgb = ["#ff4200","#f05","#8d7afb","#A8C001","#a2745b","#c64adc","#ff4200"];
   //////滚动时
  $(window).scroll(function(){
	 var m =  $(window).scrollTop();
	 ////楼层BANNER走过来
	 if(m>$('.everyday').offset().top){
		 $('.level-nav').fadeIn()
	  }else{
		  $('.level-nav').fadeOut()
	  }
     $('.body .ofen').each(function() {
		 var otop = $(this).offset().top;
		 var index = $(this).index()-2;
		 /////楼层指标位置
		 var iheight = $('.like').offset().top+$('.like').height()-$('.ofen').offset().top;
		 var movearrow = Math.ceil(($('.level-nav').height()*m)/iheight-$(".level-banner li:first").height())-$(".level-banner li:first").height()+15;
		 if(movearrow >$(".level-banner").height()-$(".level-banner li:first").height()){
		   movearrow = $(".level-banner").height()-$(".level-arrow").outerHeight();
		 }
		 if(movearrow < -6){
		   movearrow = -6	 
		 }
         $('.level-arrow').stop().animate({top:movearrow+"px"},30)
		 if(m <otop+$(this).height()*0.6){
		  /////楼层流动条
		  $(".level-arrow").css("border-left-color",levelrgb[index])
		  $(".ofen-banner .ofen-arrow").removeClass("level-active");
		  $(".ofen-banner .ofen-arrow").eq(index).addClass("level-active");
		  if(kg){
		    for(var lev = 0;lev<levelrgb.length;lev++){
	           $(".level-banner li").eq(lev).css({"color":levelrgb[lev],"background":"none"});
			   
			   $(".level-banner li").eq(index).css({"background":levelrgb[index],"color":"#fff"})
          }
		  return false;
		 }
	   }
	 })
  })
  //判断屏幕宽度
  var Width = $(window).width();
  $(".level-nav").css("left",(Width-1000)/2-70+"px");
  $(window).resize(function(){
		var owidth = $(window).width();
		$(".level-nav").css("left",(owidth-1000)/2-50+"px");
	})
  //左面楼层导航
  $(".level-banner li").bind("click",function(){
	kg = false;
	$(this).addClass('level-show').siblings().removeClass('level-show');
	var Oindex = $(".level-banner li").index(this);
	$("html,body").animate({scrollTop:$(".body").children().eq(Oindex+2).offset().top-100+"px"},300,function(){kg=true;});
  
  })
  //////右面导航
  var navbg = "url(image/right-bg.png)";
  var navpo = ["-89px 176px","-52px 0","-51px -52px","-190px -152px","-51px -152px"]
  for(var bg = 0;bg<$('.nav-right-ul li').length;bg++){
	  $('.nav-right-ul li').eq(bg).css({"background-image":navbg,"background-position":navpo[bg]});
  }
  $(".nav-right-ul li").bind("mouseenter",function(){
	 $(this).css("background-color","red").children('div').show().stop().animate({right:"24px"},300)  
  })
   $(".nav-right-ul li").bind("mouseleave",function(){
	 $(this).css("background-color","#7a6e6e").children('div').hide().stop().animate({right:"-10px"},0)  
  })
  /////底部切换
  $(".tag-top").bind("click",function(){
	  kg = false;
	  $("html,body").animate({scrollTop:0},400,function(){kg=true;})
  })
  $(".tag-bottom").bind("click",function(){
	  $("html,body").animate({scrollTop:$(".footer").offset().top+"px"},400)
  })
}