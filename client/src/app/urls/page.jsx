import React from 'react'
import axios from 'axios'

export async function Urls() {
    try {
        const res = await axios.get("http://localhost:4000/shorturl")
        const data = await res.data
        return data;
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return []; // Return an empty array in case of error
    }
}

const Page = async () => {
    const urls = await Urls();
    console.log(urls);

    return (
        <> 
          <div className='max-w-[500px] mx-auto mt-10'>
            <h1 className='flex items-center justify-center'>All Shortened URLs display here</h1>
            {urls.length === 0 ? (
                <p className='text-center'>No data found</p>
            ) : (
                <ul className=''>
                    {urls.map((url) => (
                        <li key={url.shortUrl} className='underline cursor-pointer'>
                            <a href={url.originalurl}>
                                {url.shortUrl}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
          </div>
        </>
    )
}

export default Page;
