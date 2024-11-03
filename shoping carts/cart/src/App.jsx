import { useState } from "react";
import Cart from "./cart";

export default function App() {
  const [list, setList] = useState([]);
  const items = [
    { name: "headphone", prize: 250 },
    { name: "iphone", prize: 65000 },
    { name: "ipad", prize: 35000 },
    { name: "buds", prize: 2050 },
    { name: "cycle", prize: 25000 }
  ];

  function handleItems(index) {
    const selectedItem = items[index];
    setList((prev) => {
      const existingItem = prev.find((i) => i.name === selectedItem.name);
      if (existingItem) {
        return prev.map((i) =>
          i.name === selectedItem.name ? { ...i, count: i.count + 1 } : i
        );
      } else {
        return [...prev, { ...selectedItem, count: 1 }];
      }
    });

  }

  function increaseCount(index) {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, count: item.count + 1 } : item
      )
    );
  }

  function decreaseCount(index) {
    setList((prev) =>
      prev.map((item, i) =>
        i === index && item.count > 1 ? { ...item, count: item.count - 1 } : item
      )
    );
  }
  function Checkout() {
    alert("thanks you")
    setList([]); 
  }

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <h5>{item.prize}</h5>
          <button onClick={() => handleItems(index)}>Buy</button>
        </div >
      ))}
      <Cart cartitems={list} onIncrease={increaseCount} onDecrease={decreaseCount} onCheckout={Checkout}/>

    </>
  );
}
