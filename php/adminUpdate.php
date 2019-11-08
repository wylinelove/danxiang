<?php
require('init.php');
   @$sid=$_REQUEST['sid'];
   @$price=$_REQUEST['price'];
   $reg='/^[0-9]{1,}$/';
   $rs=preg_match($reg,$sid);
   if($rs==0){
     die("{code:-1,msg:'狗狗编号不正确'}");
   }
   $rs=preg_match($reg,$price);
   if($rs==0){
     die("{code:-1,msg:'狗狗价格不正确'}");
   }
  
   $sql="update dog_select set price='$price' where sid=$sid";
   $result=mysqli_query($conn,$sql);
    $count=mysqli_affected_rows($conn);
   if($count>0){
     echo '{"code":1,"msg":"更新价格成功"}';
   }else{
   echo '{"code":-1,"msg":"更新价格失败"}';
   }