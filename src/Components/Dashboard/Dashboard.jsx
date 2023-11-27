import React, { useState, useEffect } from 'react';
import "./Dashboard.css"
import axios from 'axios'
import { apiurl } from "../Apiconfig/Apiconfig"
import InfiniteScroll from "react-infinite-scroll-component";


function Dashboard() {

  var token = localStorage.getItem("token")

  const [userdata, setUserdata] = useState([])
  const [pagenum, setPagenum] = useState(1);
  const [hasmore, setHasMore] = useState(true)


  var config = {
    headers: {
      'Authorization': `Token ${token}`
    }
  }


  const fetchData = async () => {
    try{
    await axios.get(`${apiurl}/users/?page=${pagenum}`, config).then((res) => {
      if (res) {
        console.log(res?.data)
        setUserdata((prevData) => [...prevData, ...res?.data?.results])
        console.log(res?.data?.results?.length)

        if (res?.data?.results?.length < 10) {

          setHasMore(false);
        } else {
          setPagenum(pagenum + 1);
          setHasMore(true);
        }
      }
    })
  }catch(err){
    console.log(err.message)
  }
}

  useEffect(() => {

    fetchData();
  }, [token])




  return (
    <div className='dashboarddata'>
      <h2 className='text-center pt-5'>User Details</h2>
      <InfiniteScroll
        dataLength={userdata.length}
        next={fetchData}
        hasMore={hasmore}
        loader={<div className="text-center">Loading.............</div>}
      >
        <div className='tbl'>
          <table class="table table-hover table-responsive table-bordered">
            <thead className='table-secondary'>
              <tr>
                <th className='px-3' scope="col">#</th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((item, k) => <tr>
                <th className='px-3' scope="row">{item.id}</th>
                <td style={{ maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</td>
                <td style={{ maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.username}</td>
              </tr>)}

            </tbody>
          </table>
          </div>
      </InfiniteScroll>

    </div>
  );
}



export default Dashboard;
