import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage"
import 'react-native-url-polyfill/auto';


const supabaseUrl ="https://qxxkixssdiuudaqmaxqz.supabase.co"

const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eGtpeHNzZGl1dWRhcW1heHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjEzMzIsImV4cCI6MjA0NTE5NzMzMn0.Zv1SHuezebt3kh8LK-YjVC6jbE64F0Sabw5gUgncSqs"

export const supabase = createClient (supabaseUrl, supabaseAnonKey,{
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }  
})
