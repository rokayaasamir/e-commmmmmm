//open  and clos cart
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

//Making Add to cart
//cart working js
if(document.readyState=='loading'){
  document.addEventListener('DOMContentLoaded',ready);
}else{
  ready();
}

//making function
function ready(){
  //remove item from cart
  var removeCartButtons=document.getElementsByClassName('cart-remove');
  for(var i= 0 ; i< removeCartButtons.length;i++){
    var button =removeCartButtons[i];
    button.addEventListener("click" , removeCartItem);
  }

  //Quantity change
  var quantityInputs =document.getElementsByClassName('cart-quantity');
  for(var i= 0 ; i< quantityInputs.length;i++){
    var input =quantityInputs[i];
    input.addEventListener('change' , quantityChanged);
  }
  //Add to cart
  var addCart =document.getElementsByClassName('Add-cart');
  for(var i= 0 ; i< addCart.length;i++){
    var button = addCart[i];
    button.addEventListener('click' , addCartClicked);
  }
}



//remove cart item

function removeCartItem(event){
  var buttonClicked=event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}


//quantity change
function quantityChanged(event){
  var input = event.target;
  if(isNaN(input.value) || input.value <=0){
    input.value = 1;
  }
  updatetotal();
}

//add cart function
function addCartClicked(event){
  var button = event.target;
  var container= button.parentElement;
  var title = container .getElementsByClassName("card-title").innerText;
  var price = container .getElementsByClassName("price").innerText;
  var productImg = container.getElementsByClassName("img-fluid")[0];
  addProductToCart(title,price,productImg);
  updatetotal();
}


function addProductToCart(title,price,productImg){
  var cartShopBox=document.createElement('div');
  cartShopBox.classList.add('cart-box');
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (var i =0; i< cartItemsNames.length; i++){
    if(cartItemsNames[i].innerText == title){
      alert('You have already added this item to cart');
      return;
    }
  }


  var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img"/>
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price} </div>
    <input type="number"
     name="" id=""
      value="1" 
     class="cart-quantity"/>
   </div>

  <!--remove item-->
 <i class="cart-remove">Delet</i>`;

  
 cartShopBox.innerHTML = cartBoxContent;
 cartItems.append(cartShopBox);
 cartShopBox.getElementsByClassName("cart-remove")[0]
 .addEventlistener('click',removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0]
 .addEventListener('change',quantityChanged);
}





//update Total
function updatetotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes =cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for(var i=0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price =parseFloat(priceElement.innerText.replace('$',''))
    var quantity = quantityElement.value;
    total+= price * quantity;
//if price contain some cents
total=Math.round(total * 100)/ 100;
    document.getElementsByClassName('total')[0].innerText ='$'+total;
  }
}



  



