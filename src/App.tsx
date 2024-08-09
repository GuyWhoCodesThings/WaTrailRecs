import { useEffect, useState } from 'react';
import './App.css'
import { Hike } from './types.tsx/hike';
import Search from './Search';
import Results from './Results';
import NavBar from './Components/Navbar';
import About from './About';
import { IoTrailSignOutline } from "react-icons/io5";

function App() {
  const [hikesData, setHikesData] = useState<undefined | Array<Hike>>(undefined);
  const [currentHikeIdx, setCurrentHikeIdx] = useState<number | undefined>(undefined)
  const [searchSize, setSearchSize] = useState(-1)
  const [mask, setMasks] = useState([1,1,1,1])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(true)

  const handleCurrentHikeChange = (idx: number, masks: Array<number>, k: number): void => {
    setCurrentHikeIdx(idx)
    setMasks(masks)
    setSearchSize(k)
  }

  const changePage = (s: boolean): void => {
    if (s !== page) {
      handleCurrentHikeChange(-1, [], -1)
    }
    setPage(s)
  }

  const changeLoading = (loadState: boolean) => {
    setLoading(loadState)
  }

  useEffect(() => {
    setLoading(true)
    fetch('/hikes1.json')
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        setHikesData(data)
      })
      .catch(err => console.error(`Error loading hikes: ${err}`))
  }, [])



  if (hikesData === undefined || loading) {
    return (
    <div className='flex justify-center gap-6 items-center'>
      <p>Loading hikes...</p>
      <IoTrailSignOutline size={35} className='animate-spin text-emerald-600' />
    </div>
    )
  }

  return (
    <div className='relative w-screen h-screen'>
      <NavBar changePage={changePage} />

    { !page ?
      
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <h1 className='mb-4 font-thin'>Questions?</h1>
        <p className='font-light'>contact us at <span className='font-normal'>watrailrecs@gmail.com</span></p>
      </div>
      :
      <main className='mt-12 w-full h-full'>
        <About />
        <Search handleSubmit={handleCurrentHikeChange} hikes={hikesData} />
        {
        currentHikeIdx !== undefined && currentHikeIdx >= 0 && searchSize >= 0 &&
          <div className='w-full flex justify-center'>
          
            <Results loadingFn={changeLoading}  mask={mask} hikes={hikesData} srcIdx={currentHikeIdx} k={searchSize} />
          
          </div>
          }
        
      </main>
      }
      
    </div>
  )
}

export default App;
