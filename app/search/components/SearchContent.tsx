"use client";
import MediaItem from "@/Components/MediaItem";
import {Song} from "@/types";

interface SearchContentProps {
   songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
   songs
}) => {
   if(songs.length===0) 
      return (
      <div className="
         flex
         flex-col
         gap-y-2
         w-full
         px-6
         text-neutral-400
      "
      >No Songs Found
      </div>
      )
   return (
      <div className="
         flex
         flex-col
         gap-y-2
         w-full
         px-6
      ">
         {songs.map((song) => (
            <div key={song.id} className="flex items-center gap-x-4 w-full">
               <div className="flex-1">
                  <MediaItem data={song} onClick={(id: string) => {}}/>
               </div>
               {/* add like feature */}
            </div>
         ))}
      </div>   
   )
}

export default SearchContent;