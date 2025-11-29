import {createClient} from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if(!supabaseKey || !supabaseUrl){
    throw new Error("Missing Supabase environment variables!!")
}

export const supabase = createClient(supabaseKey, supabaseUrl)