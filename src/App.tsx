import { useEffect, useState } from 'react'
import { HangImage } from './components/HangImage'
import {letters} from './helpers/letters'
import {getRandomWord} from './helpers/getRandomWords'

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attemps, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  useEffect( () => {
    if(attemps >= 9 ){
      setLose(true);
    }
  }, [attemps]);

  useEffect( () => {
    if(hiddenWord.split(' ').join('') === word ){
      setWon(true);
      console.log(hiddenWord);
      
    }
  }, [hiddenWord]);

  const checkLetter = (letter: string) => {
    if(lose)return
    if(won)return

    if( !word.includes(letter)){
      setAttempts(Math.min(attemps+1,9));
      return;
    }
    const hiddenWordArray = hiddenWord.split(' ');


    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
  
      }      
      setHiddenWord(hiddenWordArray.join(' '));
      
    }


  }

  const newGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  };

  return (
    <div className="App">
  {/* Imágenes */}
    <HangImage imageNumber={attemps}/>
  {/* Palabra oculta */}
  <h3>{hiddenWord}</h3>

  {/* Contador de intentos */}
  <h3>Intentos: {attemps}</h3>

  {/* Mensaje lose */}

  {(lose)? <h2>Perdiste</h2> :''}

    {/* Mensaje won */}

    {(won)? <h2>Ganaste</h2> :''}

  {/* Botones de letras */}

  {
    letters.map((letter) => (
      <button onClick={() => checkLetter(letter)}key = {letter}>{letter}</button>
    ))
  }

  <button onClick={newGame}>¿Jugar de nuevo?</button>

    </div>
  )
}

export default App
