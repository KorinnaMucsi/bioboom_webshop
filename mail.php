<?php
	require_once('mail/PHPMailerAutoload.php');
	
	$subject=$_POST['subject'];
	$mail_body=$_POST['body'];

	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';	 
	$mail->isSMTP();                                      							
	$mail->Host = 'smtp.live.com';                       							
	$mail->SMTPAuth = true;                               							
	$mail->Username = '*******@hotmail.com';   						
	$mail->Password = '*******';               									
	$mail->SMTPSecure = 'tls'; 
	//$mail->SMTPDebug = 2;                           							
	$mail->Port = 587;                                    						
	$mail->setFrom('*******@hotmail.com', 'BB');     				
	$mail->addAddress('*******@hotmail.com'); 
	$mail->WordWrap = 50;                         
	$mail->isHTML(true);                          			 
	$mail->Subject = $subject;
	$mail->Body    = $mail_body;
			
	if(!$mail->send()) 
	{
		$response='0';
	}
	else
	{
		$response='1';
	}
	
	echo $response;
	exit;
?>