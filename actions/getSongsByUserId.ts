import { Song } from "@/types"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getSongsByUserId = async (): Promise<Song[]> => { 
   const supabase = createServerActionClient({
      cookies: cookies
   })

   const {
      data: sessionData, 
      error: sessionError } 
      = await supabase.auth.getSession();

   if(sessionError) {
      console.log(sessionError);
   }

   const {data, error} = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("created_at", {ascending: false});
   
   if(error) {
      console.log(error.message);
   }

   return (data as any) || [];
}

export default getSongsByUserId;