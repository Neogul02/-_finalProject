import React, { useState } from 'react';
import { chat } from '../openai';

const Chat = ({ entry }) => {
  const [result, setResult] = useState('');
  const [Question, setQuestion] = useState('');
  const [titles, setTitles] = useState([]); // 추천 결과에서 추출한 제목들을 저장하는 배열

  const handleQuestion = (selectedQuestion) => {
    setQuestion(selectedQuestion);

    const userPrompt = `당신은 사용자가 제공한 질문을 바탕으로 패션트랜드를 추천해주는 패션디자이너입니다.
    (사용자가 원하는 패션 트랜드나 코디의 키워드를 추천해줍니다.
      예를들어, 사용자가 특정 계절의 코디를 추천받기를 원하면 
      "특정 계절 에 어울리는 코디는 '코디1', '코디2' 입니다." 라고 답변해줍니다.
      또, 사용자가 특정 패션 트랜드를 추천받기를 원하면
      "요즘 유행하는 패션 트랜드는 '트렌드1', '트렌드2' 입니다." 라고 답변해줍니다.
      반드시 추천한 제목들은 '(작은따움표)로 감싸서 추천해줍니다.
      너무많은 키워드 추천은 필요없이 3개 이하로 추천해줍니다.)
      
      답변은 누락되는 내용없이 300자 이하로 제한합니다.
      대답은 반드시 한국어로 번역해서 제공합니다.)

      사용자의 일기 내용: 
      사용자가 원하는 추천 : ${Question}`;

    chat(userPrompt, (result) => {
      setResult(result);

      const resultTitle = result.match(/'([^']+)'/g); //''로 감싸진 제목들을 정규표현식을 사용하여 추출
      if (resultTitle) {
        setTitles(resultTitle.map((title) => title.slice(1, -1))); // '' 제거하고 배열에 저장
      }
    });
  };

  const searchYouTube = (query) => {
    const youTubeSearchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(youTubeSearchURL, '_blank'); // 새 창으로 유튜브 링크 열기
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input placeholder="원하는 패션 트랜드를 입력하세요" style={{ padding: 10, fontSize: 15 }} onChange={(e) => setQuestion(e.target.value)} />
        <div style={{ cursor: 'pointer', marginLeft: 10, padding: 10, backgroundColor: 'lightblue' }} onClick={() => handleQuestion(Question)}>
          <span>전송</span>
        </div>
      </div>

      {/* AI의 추천 결과 표시 */}
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 18 }}>AI Answer : </div>
        <span>{result}</span>
        {result !== '' ? (
          <div>
            <div>
              <a href="http://localhost:3000/products">우리가 제공하는 멋진 제품들을 살펴보세요!</a>
            </div>
            <div style={{margin:10}}>[youtube 바로가기]</div>
          </div>
        ) : null}

        {/* 추천 결과로부터 생성한 YouTube 링크 표시 */}
        <div style={{ marginTop: 10 }}>
          {titles.map((title, index) => (
            <div key={index} onClick={() => searchYouTube(title)} style={{ cursor: 'pointer', color: 'blue' }}>
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
