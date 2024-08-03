import Card from "./Components/Card";
import { topK } from "./functions/distance";
import { Hike } from "./types.tsx/hike";

type ResultsProps = {
  srcIdx: number;
  hikes: Array<Hike>;
  mask: Array<number>;
  k: number
};

const Results = (props: ResultsProps) => {
  const copyOfHikes = [...props.hikes];
  const target: Hike = copyOfHikes.splice(props.srcIdx, 1)[0];

  const nearestK = topK(target, copyOfHikes, props.k, props.mask);

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-200">
      <div className="bg-emerald-600 text-white w-full ">
        <h1 className="text-3xl text-white">Similar Hikes</h1>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full justify-center">
        {nearestK.map((hike, idx) => (
          <Card key={idx} hike={hike} />
        ))}
      </div>
    </div>
  );
};

export default Results;
