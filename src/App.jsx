import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setdata] = useState([])
  const [form, setform] = useState({ web_name: "", username: "", password: "" })
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()


  const copyit = (text) => {
    navigator.clipboard.writeText(text)
    toast("Copied to clipboard!");
  }

  const del_data = (e) => {
    setdata(data.filter((item) => item.id !== e))
    localStorage.setItem('data', JSON.stringify(data.filter((item) => item.id !== e)))
    toast("Deleted successfully!");
  }

  const edit_data = (id) => {
    let row = data.filter((item) => item.id === id)
    ref1.current.value = row[0].web_name
    ref2.current.value = row[0].username
    ref3.current.value = row[0].password
    setform({ web_name: row[0].web_name, username: row[0].username, password: row[0].password })
    setdata(data.filter((item) => item.id !== id))
  }

  useEffect(() => {
    if (localStorage.getItem('data')) {
      console.log("hii");
      let a = JSON.parse(localStorage.getItem('data'))
      setdata(a)
    }
  }, [])



  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  // To store the data in local host
  const handleClick = () => {
    if (ref1.current.value.length > 0 && ref2.current.value.length > 0 && ref3.current.value.length > 0) {
      console.log(form);
      setdata([...data, { ...form, id: uuidv4() }])
      ref1.current.value = ""
      ref2.current.value = ""
      ref3.current.value = ""
      toast("Saved successfully!");
    }
    localStorage.setItem('data', JSON.stringify([...data, { ...form, id: uuidv4() }]))
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className='w:[100vw] md:w-[60vw] md:p-0 p-5 mx-auto flex flex-col items-center'>
        <div className='font-bold text-center text-5xl md:text-4xl my-7'>
          Password <span className='text-green-300 text-4xl'>Operator</span>
        </div>
        <div className='w-full py-5 flex flex-col gap-5'>
          <input ref={ref1} onChange={handlechange} className='w-full border px-4 py-2 border-green-300 rounded-full' placeholder='Enter the name of website' type="text" name="web_name" />
          <div className='flex md:flex-row flex-col gap-5 md:gap-0 justify-between'>
            <input ref={ref2} onChange={handlechange} className='md:w-[60%] border px-4 py-2 border-green-300 rounded-full' placeholder='Enter the Username' type="text" name="username" />
            <input ref={ref3} onChange={handlechange} className='md:w-[38%] border px-4 py-2 border-green-300 rounded-full' placeholder='Enter the Password' type="password" name="password" />
          </div>
          <button onClick={handleClick} className='bg-green-200 border border-green-400 cursor-pointer hover:bg-green-100 px-5 py-2 w-fit mx-auto rounded-full flex items-center gap-3'>
            <lord-icon
              src="https://cdn.lordicon.com/rcgrnzji.json"
              trigger="hover">
            </lord-icon>
            <p>Add Password</p>
          </button>
        </div>
        <div className='w-[94vw] md:w-full pb-5'>
          <h1 className='font-bold text-2xl mb-1'>List of Passwords</h1>
          {data.length == 0 ? <div>No Passwords to show here</div> : (
            <table className='w-[94vw] md:w-full bg-green-200 rounded-lg'>
              <thead className='bg-green-400 rounded-lg'>
                <tr>
                  <th className='pt-3'>Web Name</th>
                  <th className='pt-3 hidden md:block'>Username</th>
                  <th className='pt-3'>Password</th>
                  <th className='pt-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e) => {
                  return (
                    <tr key={uuidv4()} className='text-center'>
                      <td className='py-3'>
                        <div className='flex justify-center items-center gap-2'>
                          <a href={`${e.web_name}`} target="_blank">{e.web_name}</a>
                          <svg onClick={() => { copyit(e.web_name) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                        </div>
                      </td>
                      <td className='py-3 md:block hidden'>
                        <div className='flex justify-center items-center gap-2'>
                          {e.username}
                          <svg onClick={() => { copyit(e.username) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                        </div>
                      </td>
                      <td className='py-3'>
                        <div className='flex justify-center items-center gap-2'>
                          {e.password}
                          <svg onClick={() => { copyit(e.password) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>

                        </div>
                      </td>
                      <td>
                        <div className='flex gap-2 justify-center items-center'>
                          <div onClick={() => { edit_data(e.id) }} className=' cursor-pointer'>
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover"
                              style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                          </div>
                          <div onClick={() => { del_data(e.id) }} className=' cursor-pointer'>
                            <lord-icon
                              src="https://cdn.lordicon.com/hwjcdycb.json"
                              trigger="hover"
                              style={{ "width": "22px", "height": "22px" }}>
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>)}
        </div>
      </div>
    </>
  )
}

export default App
