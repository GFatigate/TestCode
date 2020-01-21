import React, {useState, useEffect, useLayoutEffect} from 'react';
import './global.css';
import './App.css';
import './Main.css';

const apple = 20;
const banana = 10;
const orange = 30;
const a = -0.3;
const foo = -100;

function App() {

const [applePrice, setApplesPrice] = useState(0);
const [appleWeight, setApplesWeight] = useState(0);

const [bananaPrice, setBananasPrice] = useState(0);
const [bananaWeight, setBananasWeight] = useState(0);

const [orangePrice, setOrangesPrice] = useState(0);
const [orangeWeight, setOrangesWeight] = useState(0);

const [subtotal, setSubTotal] = useState(0);
const [shipping, setShipping] = useState(0);
const [total, setTotal] = useState(0);

const [couponName, setCouponName] = useState(" ");
const [couponValue, setCouponValue] = useState(0);

useEffect(() => {
  setApplesPrice(appleWeight*apple);
}, [appleWeight])

useEffect(() => {
  setBananasPrice(bananaWeight*banana);
}, [bananaWeight])

useEffect(() => {
  setOrangesPrice(orangeWeight*orange);
}, [orangeWeight])

useEffect(() => {
  setSubTotal(applePrice + bananaPrice + orangePrice);
}, [applePrice, bananaPrice, orangePrice])

useEffect(() => {

  if(subtotal == 0)
  {
    setShipping(0);
  }

  else if(subtotal>400.00)
  {
    setShipping(0);
  }

  else if (appleWeight + bananaWeight + orangeWeight > 10)
  {
    var finalShipping = (appleWeight + bananaWeight + orangeWeight - 10) / 5;
    finalShipping = Math.floor(finalShipping);
    setShipping(30 +(finalShipping*7));
  }

  else
  {
    setShipping(30)
  }

}, [subtotal])

useEffect(() => {
  if(subtotal + shipping + couponValue > 0)
  {
    setTotal(subtotal + shipping + couponValue);
  }

  else
  {
    setTotal(0);
  }

}, [subtotal, shipping, couponValue])

useEffect(() => {
  if(couponName === "A")
  {
    setCouponValue(subtotal*a)
  }

  else if(couponName === "FOO")
  {
    setCouponValue(foo)
  }
  
  else if((couponName === "C")&&(subtotal >= 300.5))
  {
    setCouponValue(-shipping);
  }
  
  else
  {
    setCouponValue(0);
  }
},[couponName, subtotal])

function handleApplesWeight()
{
  setApplesWeight(parseFloat(document.getElementById("numApples").value));
}

function handleBananasWeight()
{
  setBananasWeight(parseFloat(document.getElementById("numBananas").value));
}

function handleOrangesWeight()
{
  setOrangesWeight(parseFloat(document.getElementById("numOranges").value));
}
  
  function handleCoupon()
  {
    if (document.getElementById("couponCod").value === "A")
    {
      setCouponName(document.getElementById("couponCod").value);
    }

    else if (document.getElementById("couponCod").value === "FOO")
    {
      setCouponName(document.getElementById("couponCod").value);
    }

    else if (document.getElementById("couponCod").value === "C")
    {
      setCouponName(document.getElementById("couponCod").value);
    }

    else
    {
      alert("This coupon doesn't exist");
    }
  }

  function handleRemoveButton(){
    setCouponName("");
    setCouponValue(0);
  }

  return (
    <div id = "app"> 
      <main>
        <form>
          <div className = "car">
            <div className = "input-block">
              <div className = "input-group"> 
                <label htmlFor = "numberApples" >Apples</label>
                <input type = "number" min = "0" name = "numApples" id = "numApples" onChange = {handleApplesWeight} value = {appleWeight}></input>
                <label htmlFor = "kg" >Kg</label>
                <div className = "price">
                  <label htmlFor = "result">${applePrice}</label>
                </div>
              </div>
            </div>

            <div className = "input-block">
              <div className = "input-group"> 
                <label htmlFor = "numberBananas" >Bananas</label>
                <input type = "number" min = "0" name = "numberBananas" id = "numBananas" onChange = {handleBananasWeight} value = {bananaWeight}></input>
                <label htmlFor = "kg" >Kg</label>
                <div className = "price">
                  <label htmlFor = "result" >${bananaPrice}</label>
                </div>
              </div>
            </div>
            
            <div className = "input-block">
              <div className = "input-group"> 
                <label htmlFor = "numberOranges" >Oranges</label>
                <input type = "number" min = "0" name = "numOranges" id = "numOranges" onChange = {handleOrangesWeight} value = {orangeWeight}></input>
                <label htmlFor = "kg" >Kg</label>
                <div className = "price">
                  <label htmlFor = "result" >${orangePrice}</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className = "remove-coupon">
            <div className = "input-block">
              <div className = "input-group"> 
                <label htmlFor = "coupon" >Coupon {couponName}</label>
                <button type="button" onClick = {() => handleRemoveButton()}>Remove</button>
                <label></label>
                <div className = "price">
                  <label htmlFor = "result" >${couponValue}</label>
                </div>
              </div>
            </div>
          </div>


          <div className = "buy">
            <div className = "input-block">
              <div className = "output-group"> 
                <label htmlFor = "subtotal" >Subtotal</label>
                <div className = "price">
                  <label htmlFor = "result" >${subtotal}</label>
                </div>
              </div>
            </div>
              
            <div className = "input-block">
              <div className = "output-group"> 
                <label htmlFor = "shipping" >Shipping</label>
                <div className = "price">
                  <label htmlFor = "result" >${shipping}</label>
                </div>
              </div>
            </div>

            <div className = "input-block">
              <div className = "output-group"> 
                <label htmlFor = "total" >Total</label>
                <div className = "price">
                  <label htmlFor = "result" >${total}</label>
                </div>
              </div>
            </div>
          </div>

          <div className = "input-coupon">
              <input name = "couponCod" id = "couponCod" placeholder="Coupon Code"></input>
              <button type="button" onClick={handleCoupon} value="Submit">Apply</button>  
          </div>
          
          <div className = "accept-button">
            <button type="submit" onClick = {() => alert("Thanks for buying, we hope you come back soon")}>Purchase</button>
          </div>
          
        </form>
      </main>
    </div>
  );
}

export default App;