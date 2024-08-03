import { useEffect, useRef, useState } from 'react';
import './App.css'
import { Hike } from './types.tsx/hike';
import Search from './Search';
import Results from './Results';
import NavBar from './Components/Navbar';
import About from './About';

function App() {
  const [hikesData, setHikesData] = useState<undefined | Array<Hike>>(undefined);
  const [currentHikeIdx, setCurrentHikeIdx] = useState<number | undefined>(undefined)
  const [searchSize, setSearchSize] = useState(6)
  const [mask, setMasks] = useState([1,1,1,1])
  const [error, setError] = useState('')

  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCurrentHikeChange = (idx: number, masks: Array<number>, k: number): void => {
    setError('')
    setCurrentHikeIdx(idx)
    setMasks(masks)
    setSearchSize(k)
    console.log(idx)
  }

  useEffect(() => {
    fetch('/hikes.json')
      .then(res => res.json())
      .then(data => setHikesData(data))
      .catch(err => console.error(`Error loading hikes: ${err}`))
  }, [])


  useEffect(() => {
    if (resultsRef.current !== null && currentHikeIdx && currentHikeIdx >= 0) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentHikeIdx, mask, searchSize])

  if (hikesData === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full h-screen '>
      <NavBar />
      <main className='mt-12'>
        <About />
        <Search handleSubmit={handleCurrentHikeChange} hikes={hikesData} />
        <p className='text-center text-sm text-red-500'>{error}</p>

        {
        currentHikeIdx !== undefined && currentHikeIdx >= 0 &&
          <div ref={resultsRef} className='w-full flex justify-center'>
          
            <Results mask={mask} hikes={hikesData} srcIdx={currentHikeIdx} k={searchSize} />
          
          </div>
          }
        
      </main>
    </div>
  )
}

export default App;
