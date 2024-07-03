import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function SignUp() {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",geolocation:""})
    const navigate=useNavigate();
    const handelSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("https://gofood-nc4b.onrender.com/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            //name should be same as backend
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        })
        const json = await response.json();
        console.log(json);
        if(!json.success){
            alert("Enter Valid Credentials.")
        }
        if(json.success){
          navigate("/login");
        }

    }
    const onChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div className='container col-5 border border-5 border-primary p-5 mt-5 bg-blue-300'>
    <form onSubmit={handelSubmit}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}  />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' onChange={onChange}/>
  </div>
 
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to='/login' className='m-3 btn btn-danger'>Already a user?</Link>
</form>

    </div>
   
      
    </>
  )
}
