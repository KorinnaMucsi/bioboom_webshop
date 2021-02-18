function ContactUs()
{
	var subject='A new message was entered through the webshop';
	var mail_body='<b>Message details:</b><br>';
	
	var mail_subject='<br><b>Subject provided by the user:</b> ' + document.getElementById('txtSubject').value;
	var mail_message='<br><br><b>Message provided by the user:</b> ' + document.getElementById('txtMessage').value;
	var mail_address='<br><br><b>Mail address provided by the user:</b> ' + document.getElementById('txtMail').value;
	var mail_user='<br><br><b>Name provided by the user:</b> ' + document.getElementById('txtUser').value;
	
	var body=mail_body + mail_subject + mail_message + mail_address + mail_user;

	$.ajax
	({
		type: "POST",
		url: 'mail.php',
		data: 
		{
			subject:subject, 
			body:body
		},
		async:false,
		success:function(response)
		{
			if(response=='1')
			{
				alert('You message was sent! Thank you!');			
				window.location.href='home.html';
			}
			else
			{
				alert('Ooops,something went wrong,please, try again!');
			}
		}
	});	
}