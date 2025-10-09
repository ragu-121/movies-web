import { keyvariables } from "./config";
export class ApiServices{
    // public static base_url = process.env.NEXT_PUBLIC_BASE_URL;
    // public static api_key = process.env.NEXT_PUBLIC_TOKEN;

    public static base_url = keyvariables.NEXT_PUBLIC_BASE_URL;
    public static api_key = keyvariables.NEXT_PUBLIC_TOKEN;


    public static async get(url:string){
        const options = {
            method:'GET',
            headers:{
                accept: 'application/json',
                Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjk1OTJiNzQxYjgwOTkyODljYTA1MjNjN2Q5Y2MzNSIsIm5iZiI6MTc1MTkwNjcwMC40Njg5OTk5LCJzdWIiOiI2ODZiZjk4Y2Y2ZmYxYTI1OTE2ZTg0NTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.znlgZc-NKOwziMJUY-aG7LO8pEPCAKlDF232D9bSRho`
                // Authorization:`Bearer ${this.api_key}`
            }
        }
        // const fetch_url = `${this.base_url}${url}`;
        const fetch_url = `https://api.themoviedb.org/3${url}`;
        console.log('fetch-url',fetch_url)
        const response = await fetch(fetch_url,options);
        if(!response.ok){
            throw new Error('Fetching failed');
        }
        return await response.json();
    }
}