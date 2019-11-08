$(function(){
  function loadProduct(pno,pageSize,key,low,high){
	  var reg=/^[0-9]{1,}$/;
    if(!(reg.test(pno))){
        alert(":页码格式不正确");
        return;
    }
    if(!(reg.test(pageSize))){
        alert(":页码大小格式不正确");
        return;
    }
    if(!(reg.test(low))){
        alert(":价格下限格式不正确");
        return;
    }
    if(!(reg.test(high))){
        alert(":价格上限格式不正确");
        return;
    }
		$.ajax({
		  type:"GET",
		  url:"php/productsearch.php",
			data:{pno,pageSize,key,low,high},
			dataType:'json',
		  success:function(res){
		  var html="";
		  var {data,pageCount,pno,pageSize}=res;
		  for(var d of data ){
		    html+=`<span style='width:5%'><input type="checkbox" class="btns"></span>
				<span style='width:5%'>${d.sid}</span>
				<span style='width:20%'>${d.dog_kinds}</span>
				<span style='width:25%'>${d.title}</span>
				<span style='width:10%'>${d.location}</span>
				<span style='width:10%'>${d.year}</span>
				<span style='width:5%'>${d.price}</span>
			 <span style='width:10%' >
				 <a href="${d.sid}" class="del_btn">删除</a>
					 <a href="${d.sid}" class="update_btn">更新</a>
					 <a href="${d.sid}" class="detail_btn">详情</a>
			 </span>	
					<hr>`;
		  }
		 $("div.bottom_show").html(html);
		 var pno=parseInt(res.pno);
		 var pageCount=parseInt(res.pageCount);
		 var html="";
		 if(pno-2>0){
		    html+=`<li><a data-page="${key}_${low}_${high}">${pno-2}</a></li>`;
		 }
		 if(pno-1>0){
		   html+=`<li><a data-page="${key}_${low}_${high}">${pno-1}</a></li>`;
		 }
		 html+=`<li class="active"><a data-page="${key}_${low}_${high}">${pno}</a></li>`;
		 if(pno+1<=pageCount){
		    html+=`<li><a data-page="${key}_${low}_${high}">${pno+1}</a></li>`;
		 }
		 if(pno+2<=pageCount){
		    html+=`<li><a data-page="${key}_${low}_${high}">${pno+2}</a></li>`
		 }
		$("ul.pages").html(html);
		},
		  error:function(){
		    alert("网络故障");
		  }
		
		})
	
  
  }
loadProduct(1,8,"",0,2100000000);
 $("ul.pages").on("click","a",function(e){
    e.preventDefault();
   var pno=$(this).html();
   var page=$(this).data("page");
   var arr=page.split("_");
   var low=parseFloat(arr[1]);
   var high=parseFloat(arr[2]);
   var  key=arr[0];
  loadProduct(pno,8,key,low,high);
   });
$("#search_btn").click(function(e){
	alert(1);
   e.preventDefault();
	 var low=$("#low").val();
	 cosole.log(low);
	 var high=$("#high").val();
	 console.log(high);
	 var key=$("#key").val();
	 console.log(key);
   loadProduct(1,8,key,low,high)
});
}) 
//主体左侧列表
$("div.main_body>div.list>div+ul>li").on("click","span",function(){
    var span=this;
	 if(span.className=="open"){
	   span.className="";
	 }else{
	   var spanother=document.querySelector("div.main_body>div.list>div+ul>li>span.open");
	   if(spanother!==null){
	     spanother.className="";
	   }
	   span.className="open";
	 }
});