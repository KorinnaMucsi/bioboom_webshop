<?php
		require_once('PHPMailerAutoload.php');
date_default_timezone_set('Etc/UTC');
		$mail = new PHPMailer;
		 
		$mail->isSMTP();                                      	// Set mailer to use SMTP
		$mail->Host = 'smtp.live.com';                       	// Specify main and backup server
		$mail->SMTPAuth = true;                               	// Enable SMTP authentication
		$mail->Username = 'sqlserver.mssqlserver@hotmail.com';   	// SMTP username
		$mail->Password = 'bamcs2462';               			// SMTP password
		$mail->SMTPSecure = 'tls';                            	// Enable encryption, 'ssl' also accepted
		$mail->Port = 587;                                    	//Set the SMTP port number - 587 for authenticated TLS
		$mail->setFrom('sqlserver.mssqlserver@hotmail.com', 'QA');     		//Set who the message is to be sent from
		$mail->addAddress('k.mucsi@lesaffre.com');               	// Name is optional
		$mail->addCC('a.molnar@lesaffre.com');
		$mail->addBCC('matila63@yahoo.com');
		$mail->WordWrap = 50;                                 	// Set word wrap to 50 characters
/*		$mail->addAttachment('/usr/labnol/file.doc');         	// Add attachments
		$mail->addAttachment('/images/image.jpg', 'new.jpg'); 	// Optional name
*/		$mail->isHTML(true);                                  	// Set email format to HTML
		 
		$mail->Subject = 'Here is the subject';
		$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
		$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
		 
		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
/*		$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
*/		 
		if(!$mail->send()) {
		   echo 'Message could not be sent.';
		   echo 'Mailer Error: ' . $mail->ErrorInfo;
		   exit;
		}
		 
		echo 'Message has been sent';
?>