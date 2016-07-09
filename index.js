$(function(){
	
	// 正在放映
	$.ajax({
		url:'https://api.douban.com/v2/movie/in_theaters',
		type:'GET',
		dataType:'jsonp',
		jsonp:'jsonpcallback',
		data:{
			city:'北京'
		},
		success:function(data){
			// 获取三个正在上映的电影()
			var totalInfo=(data.subjects).slice(0,3);
			var htm="";
			for(var i in totalInfo){
				var list=totalInfo[i];
				htm+='<li><a data-id="'+list.id+'" class="list-info" href="'+list.alt+'"><img class="file-img" src="'+list.images.small+'"><span class="file-name">'+list.title+'</span><span class="file-score">'+score(list.rating.stars)+'</span></a><a class="list-choose" href="https://movie.douban.com/subject/"'+list.id+'"/cinema/">选座购票</a></li>';
			}
			$("#J_OngoingList").html(htm);
		}
	})
	
	// 近期热门
	$.ajax({
		url:'https://api.douban.com/v2/movie/us_box',
		type:'GET',
		dataType:'jsonp',
		jsonp:'jsonpcallback',
		success:function(data){
			var totalInfo=(data.subjects).slice(0,3);
			var htm="";
			for(var i in totalInfo){
				var list=totalInfo[i].subject;
				htm+='<li><a href="list.alt" class="list-info"><img class="file-img" src="'+list.images.small+'"><span class="file-name">'+list.title+'</span></a></li>';
			}
			$("#J_RecentList").html(htm);
		}
	})

	// 导航栏
	$("#J_TopNav").on("tap",function(){
		if($("#J_Slide").hasClass('active')){
			$("#J_Slide").removeClass('active').css("transform",'translateX(-100%)');
			$("#J_Main").css("transform",'translateX(0%)');
		}else{
			$("#J_Slide").addClass('active').css("transform",'translateX(100%)');
			$("#J_Main").css("transform",'translateX(80%)');
		}
	})

})
function score(num){
	var t=(parseInt(num)/100.0).toFixed(2);
	var htm='';
	if(t<0.1){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>0.1&&t<0.2){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-half"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>=0.2&&t<0.3){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>=0.3&&t<0.4){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-half"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>=0.4&&t<0.5){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>=0.5&&t<0.6){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-half"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>=0.6&&t<0.7){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-gray"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>=0.7&&t<0.8){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-half"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>=0.8&&t<0.9){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-gray"></span></span>';
	}else if(t>=0.9&&t<1){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-half"></span></span>';
	}else if(t==1){
		htm='<span class="rating-stars"><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span><span class="rating-star rating-star-small-full"></span></span>';
	}
	return htm;
}