import { useEffect, useState } from 'react';
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

  if (hikesData === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className='relative w-screen min-h-screen'>
      <NavBar />
      <main className='w-full flex flex-col items-center'>
        <About />
        <Search handleSubmit={handleCurrentHikeChange} hikes={hikesData} />
        <p className='text-center text-sm text-red-500'>{error}</p>
        {currentHikeIdx !== undefined && currentHikeIdx >= 0 &&
          <div className='w-full flex justify-center'>
            <Results mask={mask} hikes={hikesData} srcIdx={currentHikeIdx} k={searchSize} />
          </div>
        }
      </main>
     
    </div>
  )
}

export default App;
