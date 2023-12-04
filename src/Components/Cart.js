import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, updateCartItem, calculateTotalPrice, removeFromCart }) => {
  const navigate = useNavigate();

  const handleGoToPayment = () => {
    console.log('결제하기 탭으로 이동');
    navigate('/payment');
  }

  const handleUpdateCartItem = (itemId, newQuantity, itemPrice) => {
    if (newQuantity >= 1) {
      updateCartItem(itemId, newQuantity, itemPrice);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Cart Page</h2>
      {cartItems.length === 0 && <div>장바구니가 비어있습니다</div>}
      {cartItems.map((item) => (
        <div key={item.id}>
          <img style={{ width: '100px', height: '100px' }} alt={item.name} src={item.img} />
          <span>
            {item.name} - {item.totalPrice.toLocaleString()}원 - 수량: {item.quantity.toLocaleString()}개
          </span>
          <button onClick={() => handleUpdateCartItem(item.id, item.quantity + 1, item.price)}>+</button>
          <button onClick={() => handleUpdateCartItem(item.id, item.quantity - 1, item.price)}>-</button>

          <button onClick={() => removeFromCart(item.id)}>삭제</button>
        </div>
      ))}
      <div>
        <span>총 주문 가격 : {calculateTotalPrice().toLocaleString()}원 </span>
        <span style={{ margin: 30 }}><button onClick={handleGoToPayment}>결제하기</button></span>
      </div>
    </div>
  );
};

export default Cart;
