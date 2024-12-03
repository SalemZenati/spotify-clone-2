import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";
import { useState } from "react";

interface SongItemProps {
   data: Song;
   onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ 
   data, 
   onClick 
}) => {
   const imagePath = useLoadImage(data);
   const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);

   return (
      <div
         onClick={() => onClick(data.id)}
         className="
            relative 
            flex 
            flex-col 
            items-center
            justify-center
            rounded-md
            gap-x-4
            bg-neutral-400/5
            hover:bg-neutral-400/10
            cursor-pointer
            transition
            p-3
            overflow-hidden
            group
            
         "
      >
         <div
            className={`
               relative
               aspect-square
               w-full
               h-full
               rounded-md
               overflow-hidden
               transition
               ${isPlayButtonHovered ? 'opacity-50' : 'opacity-100'}
            `}
         >
            <Image
               className="object-cover"
               src={imagePath || '/images/liked.png'}
               fill
               alt="Image"
            />
         </div>
         <div className={`flex flex-col items-start w-full pt-4 gap-y-1 transition ${isPlayButtonHovered ? 'opacity-50' : 'opacity-100'}`}>
            <p className="font-semibold truncate w-full">
               {data.title}
            </p>
            <p className="text-neutral-400 text-sm pb-4 truncate">
               {data.artist}
            </p>
         </div>
         <div
            className="
               absolute
               bottom-24
               right-5
            "
            onMouseEnter={() => setIsPlayButtonHovered(true)}
            onMouseLeave={() => setIsPlayButtonHovered(false)}
         >
            <PlayButton />
         </div>
      </div>
   );
}

export default SongItem;
