import { useEffect, useRef, useState } from "react";
import Card from "./Components/Card";
import { topK } from "./functions/distance";
import { Hike, HikeComparable } from "./types.tsx/hike";

type ResultsProps = {
  srcIdx: number;
  hikes: Array<Hike>;
  mask: Array<number>;
  k: number,
  loadingFn: (b: boolean) => void
};

const Results = (props: ResultsProps) => {


  const resultsRef = useRef<HTMLDivElement>(null)
  const copyOfHikes = [...props.hikes];
  const target: Hike = copyOfHikes.splice(props.srcIdx, 1)[0];
  const [res, setRes] = useState<Array<HikeComparable> | undefined >(undefined)

  useEffect(() => {

    const load = async() => {
      props.loadingFn(true)
      const results = await topK(target, copyOfHikes, props.k, props.mask);
      setRes(results)
      if (resultsRef.current !== null) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      props.loadingFn(false)
    }
    load()
  }, [props.srcIdx, props.mask, props.k])

  return (
    <div ref={resultsRef} className="flex flex-col justify-center items-center w-full bg-slate-200">
      <div className="bg-emerald-600 text-white w-full ">
        <h1 className="text-3xl text-white">Similar Hikes</h1>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full justify-center">
        {res && res.map((hike, idx) => (
          <Card key={idx} hike={hike} />
        ))}
      </div>
    </div>
  );
};

export default Results;
