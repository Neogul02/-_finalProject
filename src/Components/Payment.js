import { useState } from 'react';
import React from 'react';

const Payment = ({ cartItems, calculateTotalPrice }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Payment Page</h2>
      {cartItems.length === 0 && <div>장바구니가 비어있습니다</div>}

      {cartItems.map((item) => (
        <div key={item.id}>
          <img style={{ width: '10%', height: '10%', margin: 15,border: '1px solid #ccc',  }} alt={item.name} src={item.img} />
          <span>
            {item.name} - {item.totalPrice.toLocaleString()}원 - 수량: {item.quantity.toLocaleString()}개
          </span>
        </div>
      ))}
      <div>총 가격 : {calculateTotalPrice().toLocaleString()}원</div>
      <div style={{ margin: 10, marginBottom:50 }} className="credit">
        <label  htmlFor="paymentMethod">결제 방법 선택: </label>
        <select id="paymentMethod" onChange={handlePaymentMethodChange} value={selectedPaymentMethod}>
          <option value="">선택하세요</option>
          <option value="무통장입금">무통장입금</option>
          <option value="신용카드">신용카드</option>
          <option value="카카오페이">카카오페이</option>
        </select>

        {selectedPaymentMethod && (
          <div style={{ margin: 20 }}>
            선택된 결제 방법: <strong>{selectedPaymentMethod}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
