<?php
$data = array("username" => "arvind@myapp.com", "password" => "pass123");                                                                    
$data_string = json_encode($data);     
$ch = curl_init('http://localhost:3000/login');      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                          
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                 
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string))         
);                                                                                                                   
$result = curl_exec($ch);
$arr_result=json_decode($result);
var_dump($arr_result);
?>