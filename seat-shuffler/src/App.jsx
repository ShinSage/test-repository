import { useState, useEffect } from 'react';
import './index.css';

const TOTAL_STUDENTS = 24;

// 1부터 24까지 배열 생성
const initialStudents = Array.from({ length: TOTAL_STUDENTS }, (_, i) => i + 1);

function App() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const savedSeats = localStorage.getItem('seatArrangement');
    if (savedSeats) {
      setSeats(JSON.parse(savedSeats));
    } else {
      setSeats(initialStudents);
    }
  }, []);

  const shuffleSeats = () => {
    const shuffled = [...seats];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSeats(shuffled);
    localStorage.setItem('seatArrangement', JSON.stringify(shuffled));
  };

  return (
    <div>
      <button onClick={shuffleSeats}>자리 무작위 배치</button>
      
      <div className="classroom-container">
        <div className="teacher-desk-wrapper">
          <div className="teacher-desk">교탁</div>
        </div>
        
        <div className="desk-grid">
          {seats.map((student, index) => (
            <div key={index} className="desk">
              {student}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
