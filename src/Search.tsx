import { useEffect, useRef, useState } from "react";
import { Hike } from "./types.tsx/hike";

type SearchProps = {
  hikes: Array<Hike>
  handleSubmit: (idx: number, masks: Array<number>, searchSize: number) => void
};

const Search = (props: SearchProps) => {

  
  const targetRef = useRef<HTMLDivElement>(null)
  const [searchData, setSearchData] = useState("");
  const [src, setSrc] = useState<number>(-1)
  const [rangeValues, setRangeValues] = useState<Array<number>>([1, 1, 1, 1]);
  const [k, setK] = useState(6)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setSrc(-1)
    props.handleSubmit(-1, rangeValues, k)
    setSearchData(e.target.value);
  };

  const handleSelectClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    const targetIdx = props.hikes.findIndex((hike) => hike.name.toLowerCase() === searchData.toLowerCase())
    setSrc(targetIdx)
  }
 
  const handleSearchClick = (e: React.MouseEvent<HTMLFormElement, MouseEvent>): void => {
    e.preventDefault()
    props.handleSubmit(src, rangeValues, k)
  }

  const handleRangeChange = (index: number, value: number): void => {
    const newRangeValues = [...rangeValues];
    newRangeValues[index] = value;
    setRangeValues(newRangeValues);
  };

  useEffect(() => {
    if (src >= 0 && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [src])

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit">
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex items-center rounded-sm">
          <input
            type="text"
            placeholder="Enter a hike you enjoyed..."
            onChange={handleSearchChange}
            value={searchData}
            className="w-full h-10 p-4 border-2"
          />
          <button
          className="bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleSelectClick}>
            Select
          </button>
          
        </div>
      </div>
      <div className="text-left text-sm w-full gap-1 rounded-md grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <p className="lg:col-span-3 md:col-span-2 sm:col-span-1 p-2 text-lg font-medium">Choose a Hike</p>
        {props.hikes &&
          props.hikes
            .map(hike => hike.name)
            .filter((hike) => hike.toLowerCase().startsWith(searchData.toLowerCase()))
            .sort()
            .map((hike, idx) => (
              <div key={idx} className="h-8">
                <button
                  onClick={() => {
                    window.scrollTo(0, 0)
                    setSearchData(hike)
                  }}
                  className="text-black text-left text-xs opacity-75 hover:opacity-100 hover:font-bold">
                    {hike}
                 </button>
              </div>
            ))}
          {props.hikes &&
          props.hikes
            .map(hike => hike.name)
            .filter((hike) => hike.toLowerCase().startsWith(searchData.toLowerCase()))
            .length === 0 &&
              <p className="lg:col-span-3 md:col-span-2 sm:col-span-1 text-red-500">
                No hikes found with name {searchData}.
              </p>
          }
      </div>

      
  
      {src >= 0 &&
        <section ref={targetRef} className="w-full gap-4 flex flex-col lg:flex-row md:flex-row sm:flex-col justify-center items-center bg-slate-100">
            <div className="overflow-hidden max-w-[350px] max-h-[350px]">
                <a className="text-xl" href={props.hikes[src].url}>{props.hikes[src].name}</a>
                <img src={props.hikes[src].imageSrc} className=" object-contain w-full h-full " />
            </div>

            <form 
            className="flex flex-col flex-wrap  rounded-md p-2"
            onSubmit={(e: React.MouseEvent<HTMLFormElement, MouseEvent>) => handleSearchClick(e)}
            >
              
              <div className="flex flex-col">

                <div className="flex lg:block md:block sm:flex gap-4">
                <div className="flex flex-col items-center justify-end gap-1">
                  <label>Length/Elevation</label>
                  <input
                  className=" accent-blue-500 w-[175px]"
                  onChange={(e) => handleRangeChange(0, Number(e.target.value))}
                  defaultChecked type="range" min={0} max={1} step={0.1} value={rangeValues[0]}/>
                </div>
                <div className="flex flex-col items-center justify-end gap-1">
                  <label>Features</label>
                  <input
                  className=" accent-blue-500 w-[175px]"
                  onChange={(e) => handleRangeChange(1, Number(e.target.value))}
                  defaultChecked type="range" min={0} max={1} step={0.1} value={rangeValues[1]} />
                </div>
                </div>

                <div className="flex lg:block md:block sm:flex gap-4">
                <div className="flex flex-col items-center justify-end gap-1">
                  <label>Image</label>
                  <input
                  className=" accent-blue-500 w-[175px]"
                  onChange={(e) => handleRangeChange(2, Number(e.target.value))}
                  defaultChecked type="range" min={0} max={1} step={0.1} value={rangeValues[2]} />
                </div>
                <div className="flex flex-col items-center justify-end gap-1">
                  <label>Description</label>
                  <input
                  className=" accent-blue-500 w-[175px]"
                  onChange={(e) => handleRangeChange(3, Number(e.target.value))}
                  defaultChecked type="range" min={0} max={1} step={0.1} value={rangeValues[3]} />
                </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-end gap-1">
                <label># of hikes to find</label>
                <input
                onChange={(e) => setK(Number(e.target.value))}
                defaultChecked type="number" width={20} min={0} max={30} step={1} value={k} />
              </div>
              <button type="submit" className="bg-blue-500 rounded-md hover:bg-blue-600">
                Find
              </button>
              
            </form>
          
        </section>
      }
      <div className="w-full h-8 bg-slate-100"></div>
     
      
      
    </div>
  );
};

export default Search;
