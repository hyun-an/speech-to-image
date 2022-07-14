import React, { useState, useEffect } from 'react'
import './App.css'
import { Microphone, CaretDoubleDown } from 'phosphor-react'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import Navbar from './components/Navbar'
import FinalPage from './components/FinalPage'
import Footer from './components/Footer'

function App() {
  const [status, setStatus] = useState('API is not working properly')

  const [imageLink1, setImageLink1] = useState(
    'https://replicate.com/api/models/borisdayma/dalle-mini/files/7f987d1c-a6c2-4236-a761-6b3b685385d4/output_0.png'
  )
  const [imageLink2, setImageLink2] = useState(
    'https://replicate.com/api/models/borisdayma/dalle-mini/files/7f987d1c-a6c2-4236-a761-6b3b685385d4/output_0.png'
  )
  const [imageLink3, setImageLink3] = useState(
    'https://replicate.com/api/models/borisdayma/dalle-mini/files/7f987d1c-a6c2-4236-a761-6b3b685385d4/output_0.png'
  )
  const [imageLink4, setImageLink4] = useState(
    'https://replicate.com/api/models/borisdayma/dalle-mini/files/7f987d1c-a6c2-4236-a761-6b3b685385d4/output_0.png'
  )

  const [text1, setText1] = useState('Sentence 1')
  const [text2, setText2] = useState('Sentence 2')
  const [text3, setText3] = useState('Sentence 3')
  const [text4, setText4] = useState('Sentence 4')

  const [listOfLinks, setListOfLinks] = useState([''])
  const [listOfText, setListOfText] = useState([''])

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        setStatus(data.message)
        console.log(data)
        console.log(data.message)
      })
  }, [])

  const getImage = (queryText, loc) => {
    fetch('/getimg', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ queryText: queryText })
    })
      .then(res => res.json())
      .then(data => {
        switch (loc) {
          case 1:
            setImageLink1(data.output)
            break
          case 2:
            setImageLink2(data.output)
            break
          case 3:
            setImageLink3(data.output)
            break
          case 4:
            setImageLink4(data.output)
            break
          default:
            setImageLink1(data.output)
        }
      })
  }

  let queryObj = null
  const handleClick = (n, story) => {
    let curN = n
    let stringQuery = '' + document.getElementById(`text_${story}`)?.innerText
    let numberQuery = '' + document.getElementById(`queryText${curN}`)?.value
    let count = (stringQuery.match(/\n/g) || []).length
    if (stringQuery !== '') {
      for (let i = 0; i < count; i++) {
        stringQuery = stringQuery.replace('\n', ' ' + numberQuery.bold() + ' ')
        curN++
        numberQuery = getValue(curN)
      }
    }
    switch (story) {
      case 1:
        setImageLink1(
          'https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif'
        )
        setText1(stringQuery)
        break
      case 2:
        setImageLink2(
          'https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif'
        )
        setText2(stringQuery)
        break
      case 3:
        setImageLink3(
          'https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif'
        )
        setText3(stringQuery)
        break
      case 4:
        setImageLink4(
          'https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif'
        )
        setText4(stringQuery)
        break
      default:
        setText1('Sentences not completely made')
    }
    queryObj = { queryText: stringQuery }
    getImage(queryObj, story)
  }

  const getValue = num => {
    return document.getElementById(`queryText${num}`)?.value
  }

  const [active, setActive] = useState(false)
  const handleStorifyButton = () => {
    setActive(!active)
    setListOfText([text1, text2, text3, text4])
    setListOfLinks([imageLink1, imageLink2, imageLink3, imageLink4])
  }

  const { transcript, listening } = useSpeechRecognition()

  const SpecialInp = ({ typeOfInput, n }) => {
    const activeList = listening
    return (
      <span className='inline-block pl-3 pr-3'>
        <div className='flex items-center border-2 border-gray-600 p-1 leading-3 rounded-xl'>
          <input
            className='border-dashed min-w-[80px] max-w-[120px] outline-none text-[28px]'
            type='text'
            id={`queryText${n}`}
            name='queryText'
            placeholder={typeOfInput}
            defaultValue={activeList ? transcript : null}
          />
          <Microphone
            onClick={
              activeList
                ? SpeechRecognition.stopListening
                : SpeechRecognition.startListening
            }
          />
        </div>
      </span>
    )
  }

  return (
    <div>
      <Navbar apiStatus={status} />
      <div id='left' className='grid grid-cols-2'>
        {/*First oanel*/}
        <div className='pl-6 h-screen flex items-center'>
          <div>
            <div className='text-[28px]'>
              <p id='text_1' className='leading-[4rem] pl-3'>
                {/*This is where a sentence will be made*/}
                One day, the mermaid
                <SpecialInp n={1} story={1} typeOfInput={'Noun'} />
                was swimming when she saw a mysterious cave
                {/*This is where a sentence will be ended*/}.
              </p>
            </div>
            <div>
              <div className='flex justify-center pt-10'>
                <button
                  className='text-[28px] pl-1 pr-1 hover:bg-green-200 border-2 rounded-lg border-gray-700'
                  onClick={() => handleClick(1, 1)}
                >
                  Generate
                </button>
              </div>
              <div className='flex justify-center mt-8'>
                <a href='#2'>
                  <CaretDoubleDown
                    className='hover:bg-green-200 rounded-xl p-1'
                    size='44'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          id='image side'
          className='flex justify-center items-center space-x-10'
        >
          <img
            className='rounded-lg'
            src={imageLink1}
            alt={imageLink1}
            width={384}
            height={384}
          />
        </div>

        {/*Second oanel*/}
        <div id='2' className='pl-6 h-screen flex items-center'>
          <div>
            <div className='text-[28px]'>
              <p id='text_2' className='leading-[4rem] pl-3'>
                {/*This is where a sentence will be made*/}
                She decided to go investigate. Mermaid
                <SpecialInp n={2} typeOfInput={'Adverb'} />
                swam
                <SpecialInp n={3} typeOfInput={'Adverb'} />
                towards the entrance of the cave
                {/*This is where a sentence will be ended*/}.
              </p>
            </div>
            <div>
              <div className='flex justify-center pt-10'>
                <button
                  className='text-[28px] pl-1 pr-1 hover:bg-green-200 border-2 rounded-lg border-gray-700'
                  onClick={() => handleClick(2, 2)}
                >
                  Generate
                </button>
              </div>
              <div className='flex justify-center mt-8'>
                <a href='#3'>
                  <CaretDoubleDown
                    className='hover:bg-green-200 rounded-xl p-1'
                    size='44'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id='image side' className='flex justify-center items-center'>
          <img
            className='rounded-lg'
            src={imageLink2}
            alt={imageLink2}
            width={384}
            height={384}
          />
        </div>

        {/*Third panel*/}
        <div id='3' className='pl-6 h-screen flex items-center'>
          <div>
            <div className='text-[28px]'>
              <p id='text_3' className='leading-[4rem] pl-3'>
                {/*This is where a sentence will be made*/}
                The cave was mostly dark, but inside it she saw something
                <SpecialInp n={4} story={3} typeOfInput={'Noun'} />
                {/*This is where a sentence will be ended*/}.
              </p>
            </div>
            <div>
              <div className='flex justify-center pt-10'>
                <button
                  className='text-[28px] pl-1 pr-1 hover:bg-green-200 border-2 rounded-lg border-gray-700'
                  onClick={() => handleClick(4, 3)}
                >
                  Generate
                </button>
              </div>
              <div className='flex justify-center mt-8'>
                <a href='#4'>
                  <CaretDoubleDown
                    className='hover:bg-green-200 rounded-xl p-1'
                    size='44'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id='image side' className='flex justify-center items-center'>
          <img
            className='rounded-lg'
            src={imageLink3}
            alt={imageLink3}
            width={384}
            height={384}
          />
        </div>

        {/*Fourth panel*/}
        <div id='4' className='pl-6 h-screen flex items-center'>
          <div>
            <div className='text-[28px]'>
              <p id='text_4' className='leading-[4rem] pl-3'>
                {/*This is where a sentence will be made*/}
                As she entered the cave, she realized she was not alone! There
                was a
                <SpecialInp n={5} typeOfInput={'Adjective'} />
                hermit crab watching her
                {/*This is where a sentence will be ended*/}.
              </p>
            </div>
            <div>
              <div className='flex justify-center pt-10'>
                <button
                  className='text-[28px] pl-1 pr-1 hover:bg-green-200 border-2 rounded-lg border-gray-700'
                  onClick={() => handleClick(5, 4)}
                >
                  Generate
                </button>
              </div>
              <div className='flex justify-center mt-8'>
                <a href='#result'>
                  <CaretDoubleDown
                    className='hover:bg-green-200 rounded-xl p-1'
                    size='44'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id='image side' className='flex justify-center items-center'>
          <img
            className='rounded-lg'
            src={imageLink4}
            alt={imageLink4}
            width={384}
            height={384}
          />
        </div>
      </div>
      <a href='#result' className='flex justify-center'>
        <button
          className='text-4xl rounded-xl hover:border-[4px] border-white bg-gradient-to-r p-2 from-[#7928ca] to-[#ff0080] transition-all duration-300 hover:from-[#ff0080] hover:to-[#545ff]'
          onClick={handleStorifyButton}
        >
          Storify!
        </button>
      </a>
      <div id='result' className='h-[3.5rem]'></div>
      {active ? (
        <FinalPage
          id='result'
          listOfLinks={listOfLinks}
          listOfText={listOfText}
        />
      ) : undefined}
      <Footer />
    </div>
  )
}

export default App
