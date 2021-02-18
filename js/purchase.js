//Ezeket a valtozokat a torleses a kirajzolo funkcio is hasznalja, globalisak kell, hogy legyenek
var tbl_rows;
var tbl_rows_po;
var storedNames;
var storedNamesPO;
var prc_sum_po;

function GetOrderedItems()
{	
	tbl_rows='';
	
	//Kiolvassuk a kosarba teves alkalmaval formalt array-t a lokalis valtozobol, majd tablazatba formaljuk
	storedNames = JSON.parse(localStorage.getItem("cartItems"));
	storedNames.forEach(PrintTable);
	
	//Ha minden ki lett torolve, akkor nem kell a fejlec sem
	if(storedNames.length==0)
	{
		var tbl_head='';
		var tbl='';
	}
	else
	{
		var tbl_head=	'<thead style="font-weight:bold;">' +
						'<tr>' +
						'<td style="width:15%;">Item number</td>' +
						'<td style="width:30%;">Item Description</td>' +
						'<td style="width:15%;">Price<br>without VAT<br>(RSD)</td>' +
						'<td style="width:15%;">Ordered quantity</td>' +
						'<td style="width:15%;">Amount to pay<br>without VAT<br>(RSD)</td>' +
						'<td style="width:10%;"></td>'+
						'</tr>' +
						'</thead>';
		var tbl='<table class="tblPurchase">' + tbl_head + '<tbody>' + tbl_rows + '</tbody></table>';
	}
	
	document.getElementById("tblPurchDiv").innerHTML=tbl;
}
function PrintTable(cartItem)
{
	var id=cartItem.prod_id;
	var qty=cartItem.prod_ordqty;
	var descr=cartItem.prod_descr;
	var price=cartItem.prod_price;
	var price_sum=price.replace(",",".")*cartItem.prod_ordqty;
 	
	tbl_rows+=	'<tr>' + 
				'<td>' + id + '</td>' +
				'<td>' + descr + '</td>' +
				'<td>' + price.replace(".",",") + ' RSD' + '</td>' +
				'<td>' + qty + '</td>' +
				'<td>' + price_sum.toFixed(2).replace(".",",") + ' RSD' + '</td>' +
				'<td><a href="#">' + 
				'<img class="delCartItem" src="img/delete.png" alt="Delete" onclick="Javascript:delCartItem(\'' + id + '\');"/>' +
				'</a></td>' +
				'</tr>';
}

function GetOrderedItemsPO()
{	
	tbl_rows_po='';
	prc_sum_po=0;
	
	//Kiolvassuk a kosarba teves alkalmaval formalt array-t a lokalis valtozobol, majd tablazatba formaljuk
	storedNamesPO = JSON.parse(localStorage.getItem("cartItems"));
	storedNamesPO.forEach(PrintTablePO);
	
	//Ha minden ki lett torolve, akkor nem kell a fejlec sem
	if(storedNamesPO.length==0)
	{
		var tbl_head_po='';
		var tbl_po='';
	}
	else
	{
		var tbl_head_po=	'<thead style="font-weight:bold;background-color:#4472C4;">' +
							'<tr>' +
							'<td style="border:thin #666666 solid;text-align:center;width:15%;">Item number</td>' +
							'<td style="border:thin #666666 solid;text-align:center;width:30%;">Item Description</td>' +
							'<td style="border:thin #666666 solid;text-align:center;width:15%;">Price<br>without VAT<br>(RSD)</td>' +
							'<td style="border:thin #666666 solid;text-align:center;width:15%;">Ordered quantity</td>' +
							'<td style="border:thin #666666 solid;text-align:center;width:15%;">Amount to pay<br>without VAT<br>(RSD)</td>' +
							'</tr>' +
							'</thead>';
		var tbl_po=	'<table style="margin:2% 0 2% 0;width:100%;border:thin #666666 solid;table-layout:auto;font-size:12pt;">' + 
					tbl_head_po + '<tbody>' + tbl_rows_po + '</tbody></table>';
	}
	
	return tbl_po;
}
function PrintTablePO(cartItemPO)
{
	var id_po=cartItemPO.prod_id;
	var qty_po=cartItemPO.prod_ordqty;
	var descr_po=cartItemPO.prod_descr;
	var price_po=cartItemPO.prod_price;
	var price_sum_po=price_po.replace(",",".")*cartItemPO.prod_ordqty;
	
	prc_sum_po=prc_sum_po + price_sum_po;
	
	tbl_rows_po+=	'<tr>' + 
					'<td style="border:thin #666666 solid;text-align:center;">' + id_po + '</td>' +
					'<td style="border:thin #666666 solid;text-align:center;">' + descr_po + '</td>' +
					'<td style="border:thin #666666 solid;text-align:center;">' + price_po.replace(".",",") + ' RSD' + '</td>' +
					'<td style="border:thin #666666 solid;text-align:center;">' + qty_po + '</td>' +
					'<td style="border:thin #666666 solid;text-align:center;">' + price_sum_po.toFixed(2).replace(".",",") + ' RSD' + '</td>' +
					'</tr>';
}

//A torleskor kivesszuk az array-bol azt a tetelt, amit ki akart a felhasznalo torolni, toroljuk a webshop textbox-bol is,
//0-ra allitjuk, beirjuk a lokalis valtozoba es frissitjuk az oldalt, hogy eltunjon a tablazat
function delCartItem(itemID)
{
	//Le kell nullazni a valtozot, hogy ujraszamolja a For ciklus, miutan kitoroltuk az array-bol
	cart_qty=0;
	
	for(var i = 0; i < storedNames.length; i++) 
	{
		if(storedNames[i].prod_id == itemID) 
		{
			storedNames.splice(i, 1);
			localStorage.setItem("cartItems", JSON.stringify(storedNames));
			sessionStorage.setItem(itemID + 'Value', 0);
			document.location.reload();
			break;
		}
	}	
	
	//Osszeszamoljuk hany tetel van a kosarban, hogy a Cart menupont melle tehessuk
	for(var i = 0; i < storedNames.length; i++) 
	{
		cart_qty=cart_qty + parseInt(storedNames[i].prod_ordqty);
	}
	localStorage.setItem("cartCnt", cart_qty);
	document.getElementById("cartCnt").innerHTML = '(' + localStorage.getItem("cartCnt") + ')';	
}
function GetLastPONo()
{
	if (localStorage.getItem("lastPO")===null)
	{
		return 1;
	}
	else
	{
		return localStorage.getItem("lastPO");
	}
}
function sendPO()
{
	
	if(localStorage.getItem("cartCnt")==0)
	{
		alert('Please, put at least one item to your cart before purchasing!');
	}
	else
	{	

		var lastPO=GetLastPONo();
		var subject='Purchase Order: #' + lastPO;
		var tbl=GetOrderedItemsPO();
		var bb=	'<div style="display:inline-block;position:relative;float:left;clear:left;width:48%;padding:0.5%;text-align:left;border:thin solid black;">' + 
				'BIOBOOM D.O.O.<br>' +
				'Glavna 12.<br>' +
				'24400 Senta<br>' +
				'SERBIA<br>' +
				'Tel: 024/811-549<br>' +
				'E-mail: bioboom01@gmail.com<br>' +
				'PIB: 100110018<br>' +
				'Broj tekućeg računa: 200-1239-00 CVB' +
				'</div>';
				
		var ub=	'<div style="display:inline-block;position:relative;width:48%;padding:0.5%;float:right;text-align:left;border:thin solid black;">' + 
				document.getElementById("txtFirstName").value + " " + 
				document.getElementById("txtLastName").value + '<br>' +
				document.getElementById("txtAddress").value + '<br>' +
				document.getElementById("txtCity").value + ", " +
				document.getElementById("txtZIP").value + '<br>' +
				document.getElementById("txtCountry").value + '<br>' +
				'Tel: ' + document.getElementById("txtPhone").value + '<br>' +
				'E-mail: ' + document.getElementById("txtMail").value + '<br><br><br>' +
				'</div>';
				
		var net=prc_sum_po;
		var vat=prc_sum_po*0.2;
		var gross=net+vat;
		
		var net_str=parseFloat(net).toFixed(2);
		var vat_str=parseFloat(vat).toFixed(2);
		var gross_str=parseFloat(gross).toFixed(2);
				
		var amounts='<h2 style="background-color:#CCCCCC;padding-left:5%;">Total:</h2>' +
					'<div style="display:inline-block;position:relative;width:100%;padding:0.5%;float:right;text-align:right;">' +
					'Net price (RSD): ' + net_str.replace('.',',') + '<br>' +
					'VAT - 20% (RSD): ' + vat_str.replace('.',',') + '<br>' +
					'Gross price (RSD): ' + gross_str.replace('.',',') + '<br><br>' +
					'<b>INVOICE AMOUNT (RSD): </b>' + gross_str.replace('.',',') + 
					'</div>';
					
		var body=	'<div style="width:100%;">' +
					'<div style="width:70%;margin-left:15%;margin-right:15%;">' + bb + ub + 
					'<div style="display:inline-block;position:relative;float:left;clear:both;width:100%;padding-top:5%;padding-bottom:5%;text-align:center;">' +
					'<h1 style="background-color:#FFC000;">' + subject + '</h1>' +
					'</div>' + tbl + '<br><hr><br>' + amounts + '</div></div>';		
				
		localStorage.setItem("lastPO",+lastPO + +1);
		
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
					alert('Your order has been placed, please check your e-mail!');
					localStorage.removeItem('cartItems');
					localStorage.removeItem('cartCnt');
					sessionStorage.clear();
					
					window.location.href='home.html';
				}
				else
				{
					alert('Ooops,something went wrong,please, try again!');
				}
			}
		});	
	}
}