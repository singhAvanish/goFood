import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
  const [credentials,setCredentials]=useState({email:"",password:""});
  const navigate=useNavigate();
  const handelSubmit=async(e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:4000/api/loginuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          //name should be same as backend
          body:JSON.stringify({email:credentials.email,password:credentials.password})
      })
      const json = await response.json();
      console.log(json);
      if(!json.success){
          alert("Enter Valid Credentials.")
      }
      if(json.success){
        localStorage.setItem("userEmail",credentials.email)
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/")
      }

  }
  const onChange=(event)=>{
      setCredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
    <>
    <div className='container col-5 border border-5 border-primary p-5 mt-5 bg-blue-300' >
    <form onSubmit={handelSubmit}>
    
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={onChange}/>
  </div>
  
 
  <button type="submit" className="m-3 btn btn-primary">Submit</button>
  <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user.</Link>
</form>
    
      
    </div>

    </>
    
  )
}

export default Login
