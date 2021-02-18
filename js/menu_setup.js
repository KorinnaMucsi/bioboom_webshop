$(document).ready(function() {
	$('.toggle-nav').click(function(e) {
		$('.menu ul').toggleClass('active');

		e.preventDefault();
	});
	$('#cont_pp').click(function() {
		$('#tbldiv_pp').toggleClass('tbldiv_pp_act');

		e.preventDefault();
	});
	$('#cont_vs').click(function() {
		$('#tbldiv_vs').toggleClass('tbldiv_vs_act');

		e.preventDefault();
	});
	$('#cont_opd').click(function() {
		$('#tbldiv_opd').toggleClass('tbldiv_opd_act');

		e.preventDefault();
	});
	$('#cont_hs').click(function() {
		$('#tbldiv_hs').toggleClass('tbldiv_hs_act');

		e.preventDefault();
	});
	
	//Megszamoljuk hany tetelt tarol a kosar lokalis valtozo - amennyiben egyet sem, akkor 0 a kosar tartalma
	//es ezt fogjuk zarojelbe tenni a Cart menupont melle.
	var cartCnt=localStorage.getItem("cartCnt");
	if(!cartCnt)
	{
		cartCnt=0;
	}	
	document.getElementById("cartCnt").innerHTML = '(' + cartCnt + ')';

	//Ameddig az oldal el, szesszios valtozobol kiolvassuk az utoljara betoltott ertekeket, amik belekerultek a kosarba
	loadSettings();
    
});

//Itt majd modositani kell az i erteket, ha gyarapodik a termekmennyiseg
//Lefuttatja az osszes termekre a mennyiseg mezo setup-jat, az utolso ertekkel, ha frissites utan betoltodik az oldal
//ne ures mezokkel toltodjon be
function loadSettings() 
{
	for(var i = 1; i <= 2; i++)
	{
		if(i<10)
		{
			var val='PP0' + i + 'Value';
			var txt_id='txtPP0' + i;
		}
		else
		{
			var val='PP' + i + 'Value';
			var txt_id='txtPP' + i;
		}
		
		if(!sessionStorage.getItem(val))
		{
			document.getElementById(txt_id).value=0;
		}
		else
		{
			document.getElementById(txt_id).value=sessionStorage.getItem(val);
		}
	}
}
