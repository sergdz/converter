import { useState, useEffect } from 'react';

import './App.css';

const App = () => {

  return (
    <div className="app">
      <Converter />
    </div>

  )

}

const Converter = () => {

  const [arr, setArr] = useState([])
  const [oneCarr, setOneCarr] = useState(0)
  const [twoCarr, setTwoCarr] = useState(0)
  const [inputCarr, setInputCarr] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newArr = [];

    const a = (url) => {
      fetch(url)
        .then(response => {
          console.log(response.ok);
          if (!response.ok) {
            throw new Error('s')
          }
          return response.json()

        })
        .then(json => {
          newArr.sort((a, b) => a.txt.localeCompare(b.txt, 'ru'));
          json.map(item => newArr.push(item))
          newArr.sort((a, b) => a.txt.localeCompare(b.txt, 'ru'));
          setArr(newArr);
        })
        .catch(e => console.error(e))


    }

    a('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  }, []);

  function setCurrency(e) {
    const attribute = e.target.getAttribute('data-carr');
    if (attribute === 'oneCarr') {
      setOneCarr(e.target.value)
    } else if (attribute === 'twoCarr') {
      setTwoCarr(e.target.value)
    }
  }

  const btns = arr.map((item, i) => {
    return <option key={i} value={item.rate}> {item.txt}</option>
  })

  function setCurrValue(e) {
    setInputCarr(e.target.value)
  }

  function setTotalValue(e) {
    setTotal(e.target.value);
  }

  useEffect(() => {
    if (oneCarr && twoCarr) {
      setTotal(0)
      setTotal(((inputCarr * oneCarr) / twoCarr).toFixed(3));
    }
  }, [oneCarr, twoCarr, inputCarr]);

 /*  useEffect(() => {
    if (oneCarr && twoCarr) {
      setInputCarr(0)
      setInputCarr(((total * twoCarr) / oneCarr).toFixed(3);  TODO
    }
  }, [ total]);
 */
  return (
    <>
      <div className="btn-list">
        <input onChange={setCurrValue} type='number' value={inputCarr} className='counter__item' />
        <select data-carr="oneCarr" onChange={setCurrency} className="controls" defaultValue=''>
          <option disabled value=''>Выберите валюту</option>
          <option value='1'>Гривня</option>
          {btns}
        </select>
      </div>

      <div className="btn-list">
          <input type='number' onChange={setTotalValue} value={total} className='counter__item'/>
        <select data-carr="twoCarr" onChange={setCurrency} className="controls" defaultValue=''>
          <option disabled value=''>Выберите валюту</option>
          <option value='1'>Гривня</option>
          {btns}
        </select>
      </div>

    </>
  )
}

export default App





