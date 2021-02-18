//Mikor ujranyitjak a browser ablakot, berantja a lokalis valtozobol a kosar tartalmat, hogy
//amig nem finalizalja a megrendelest, megmaradjon a felhasznalonak amit mar beletett a kosarba
if(localStorage.getItem("cartItems") === null)
{
	var cart=[];
}
else
{
	var cart= JSON.parse(localStorage.getItem("cartItems"));
}
var cart_qty;
function AddToCart(ProductID)
{
	//Lenullazuk, mert ujraszmolja a for ciklus
	cart_qty=0;

	var txtID='txt'+ProductID;
	var td_descr='descr' + ProductID;
	var td_price='price' + ProductID;
	
	var order_qty = document.getElementById(txtID).value;
	var descr= document.getElementById(td_descr).innerText;
	var price=document.getElementById(td_price).innerText;
	
	//Szesszios valtozoban taroljuk az utoljara bevitt mennyiseget, hogy a frissites utan megmaradjon az adat
	sessionStorage.setItem(ProductID + 'Value', order_qty);
	
	if(order_qty==0 || order_qty==null || order_qty=='')
	{
		alert('Please, enter a valid number, bigger than 0');
	}
	else
	{
		//Amikor felulirja a mennyiseget, akkor az ne + tetel legyen a listan, hanem 
		//torolje az eredetit es mint ujat tegye a listara - CSAK AKKOR, HA MAR VAN A KOSARBAN VALAMI!!!!
		
		if(localStorage.getItem("cartItems") !== null)
		{
			for(var i = 0; i < cart.length; i++) 
			{
			    if(cart[i].prod_id == ProductID) 
			    {
			        cart.splice(i, 1);
			        break;
			    }
			}
		}		
		
		//Uj tetel a listan
		cart.push({prod_id:ProductID, prod_ordqty:order_qty, prod_descr:descr, prod_price:price});
		
		//Osszeszamoljuk hany tetel van a kosarban, hogy a Cart menupont melle tehessuk
		for(var i = 0; i < cart.length; i++) 
		{
			cart_qty=cart_qty + parseInt(cart[i].prod_ordqty);
		}
		//a megszamolt teteleket a kosarbol betoltjuk egy lokalis valtozoba, hogy ujranyitas utan is egyezzen a
		//szinten lokalis valtozoban tarolt kosar tartalmaval
		localStorage.setItem("cartCnt", cart_qty);
		document.getElementById("cartCnt").innerHTML = '(' + localStorage.getItem("cartCnt") + ')';
		alert('Added ' + order_qty + ' item(s) to the cart.');
	}
	//A cart array-ban levo teteleket lementjuk a lokalis valtozoba
	localStorage.setItem("cartItems", JSON.stringify(cart));
}
