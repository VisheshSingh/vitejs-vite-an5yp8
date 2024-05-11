import { useEffect, useState } from 'react';
import './App.css';

function generateRandomColor() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

  let hexCode = '#';
  while (hexCode.length < 7) {
    hexCode += digits[Math.floor(Math.random() * digits.length)];
  }
  return hexCode;
}

function App() {
  const [color, setColor] = useState('');
  const [choices, setChoices] = useState(new Array(4).fill(''));
  const [answer, setAnswer] = useState('');

  const pickColor = () =>{
    const colorVal = generateRandomColor();
    setColor(colorVal);
    setChoices(choices => {
      return [generateRandomColor(), colorVal, generateRandomColor()].sort(() => Math.random() - .5)
    });
  }
  useEffect(() => {
    pickColor()
  }, []);

  const handleClick = e => {
    console.log(e.target.innerText)
    setAnswer('')
    if(color === e.target.innerText) {
      setAnswer('Correct')
      setTimeout(() => {
        pickColor()
      }, 3000)
    } else {
      setAnswer('Wrong')
    }
  }
  return (
    <div className="container">
      <div className="color-block" style={{ backgroundColor: color }}></div>
      <div class='choices'>
        {choices.map((choice, idx) => (
          <button key={idx} onClick={handleClick}>{choice}</button>
        ))}
      </div>
      <p>{answer.length > 0 && answer}</p>
    </div>
  );
}

export default App;
