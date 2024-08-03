import { HikeComparable } from "../types.tsx/hike";

type CardProps = {
  hike: HikeComparable;
};

const Card = (props: CardProps) => {
  return (
    <div className="bg-slate-100 p-1 flex flex-col items-center w-full justify-self-center border-b-8 border-emerald-600">
      
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <img 
          src={props.hike.hike.imageSrc} 
          className="object-cover w-full h-full" 
          alt={`Image of ${props.hike.hike.name}`} 
        />
      </div>
      
      <a href={props.hike.hike.url} className="block text-center text-lg font-semibold">
        {props.hike.hike.name}
      </a>
      <p className="text-center h-6 bg-opacity-85 text-sm font-light text-black">
        Score: <span className="text-orange-500">{props.hike.distance.toFixed(3)}</span>
      </p>
      
    </div>
  );
};

export default Card;
