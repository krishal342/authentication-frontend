'use client'
import { useEffect, useState } from "react";
const Home = () => {

  const [data, setdata] = useState(null);

  useEffect(() => {
    async function fetchData() {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
        method: 'GET',
        credentials: 'include'
      });

      const resData = await response.json();

      if (response.status === 401) {
        // window.location.href = '/auth/login';
        console.log(resData);
      }
      else if (response.ok) {
        setdata(resData);
      }

    }

    fetchData();
  }, [])

  const handleLogout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include'
    });
    if (response.ok)
      window.location.href = '/auth/login';
    // window.location.reload();
  }

  if (!data) {
    return <h1>fetching...</h1>
  }

  return (


    <div className="flex flex-col gap-5">
      <p>Welcome to Home Page: </p>
      <div>
        <p>{data.firstName} {data.lastName}</p>
        <p>{data.email}</p>
        <div className="mt-5">

          <p>Ways you can login with: </p>
          <ul className="list-disc ml-6">

            {
              data.password && <li>Email and Password</li>
            }
            {
              data.googleId && <li>Google</li>
            }
            {
              data.githubId && <li>GitHub</li>
            }
          </ul>
        </div>
      </div>

      <div>
        <button className="btn max-w-fit" onClick={handleLogout}>Log Out</button>
      </div>


    </div>
  )
}

export default Home