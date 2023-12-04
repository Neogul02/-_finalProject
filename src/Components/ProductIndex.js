import React, { useState } from 'react';

const ProductIndex = ({ product, addToCart }) => {
  const [review, setReview] = useState({ rating: 0, comment: '' });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = { rating: review.rating, comment: review.comment };
    // 기존 리뷰 배열이 없다면 빈 배열로 초기화 후 리뷰 추가
    if (!product.reviews) {
      product.reviews = [];
    }
    product.reviews.push(newReview);
    // 리뷰 제출 후 상태 초기화
    setReview({ rating: 0, comment: '' });
  };


  return (
    <div style={indexStyle}>
      <h1>{product.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <img style={imageStyle} alt={product.name} src={product.img} />
            </td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>제품명:</td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td>가격:</td>
                    <td>{product.price}</td>
                  </tr>
                  <tr>
                    <td>
                      <button onClick={() => addToCart(product)}>장바구니에 추가</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div>제품상세:</div>
      <div>{product.info}</div>
      
      {/* 리뷰 입력 폼 */}
      <form onSubmit={handleReviewSubmit} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ textAlign: 'center' }}>리뷰 작성</h3>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          평점:
          <input type="number" min="1" max="5" value={review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })} />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          코멘트:
          <textarea value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })}></textarea>
        </label>
        <button type="submit">리뷰 남기기</button>
      </form>


      {/* 리뷰 목록 */}
      <div style={{ textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>제품 리뷰</h3>
        <ul style={{ padding: 0 }}>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <li key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <div style={{ marginBottom: '5px' }}>
                  <strong>평점:</strong> {review.rating}
                </div>
                <div>
                  <strong>코멘트:</strong> {review.comment}
                </div>
              </li>
            ))
          ) : (
            <li>리뷰가 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

const imageStyle = {
  width: '80%',
  height: '80%',
  objectFit: 'cover',
};

const indexStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default ProductIndex;