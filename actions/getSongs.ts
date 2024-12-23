import { Song } from "@/types"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getSongs = async (): Promise<Song[]> => { 
   const supabase = createServerActionClient({
      cookies: cookies
   })

   const {data, error} = await supabase
      .from("songs")
      .select("*")
      .order('created_at', {ascending: false})

   if (error) {
      throw new Error(error.message)
   }

   return (data as any) || []
}

export default getSongs;