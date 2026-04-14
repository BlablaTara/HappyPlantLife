import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mwadswxpdbuwzdevaiak.supabase.co";
const supabaseKey = "sb_publishable_MvK8qT9riBInt4UUd2v0Qw_5y6gLnN5";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

