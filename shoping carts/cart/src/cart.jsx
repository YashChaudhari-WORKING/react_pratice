import React from "react";

export default function Cart({ cartitems, onIncrease, onDecrease,onCheckout }) {
  return (
    <div>
      <h3>Cart</h3>
      {cartitems.length === 0 ? (
        <p>No items found</p>
      ) : (
        cartitems.map((item, index) => (
          <div key={index}>
            <p>
              {item.prize} -- {item.count} -- {item.name} -- {item.prize * item.count}
            </p>
            <button onClick={() => onIncrease(index)}>+</button>
            <button onClick={() => onDecrease(index)}>-</button>

          </div>
        ))
      )}
       <button onClick={() => onCheckout()}>Checkout</button>
    </div>
  );
}
