import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart,useCart } from './ContextReducer';



const Card = (props) => {
let dispatch= useDispatchCart();  
let data =useCart();
const priceRef=useRef();
let  options=props.option;
let foodItem = props.foodItem;
let priceOption=Object.keys(options);
const [qty,setQty]=useState(1);
const [size,setSize]=useState("");
const handelAddToCart=async()=>{
  let food=[];
  for(const item of data){
    if(item.id===foodItem._id){
      food=item;

      break;
    }
  }
  if(food.length !== 0){
    if(food.size===size){
      await dispatch({type:"UPDATE",id:foodItem._id,price:finalPrice,qty:qty})
      return 

    }else if(food.size !== size){
      await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size,img:foodItem.img,date:new Date()})
      return 

    }
    return
   
  }
  await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size,img:foodItem.img,date:new Date()})
  

  
  

}

useEffect(()=>{
  setSize(priceRef.current.value)

},[])
let finalPrice = qty*parseInt(options[size])

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem",height:"500px" }}>
          <img src={foodItem.img} className="card-img-top" alt="..." style={{height:"40%"}} />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>
            <p className="card-text">
              {foodItem.description}
            </p>
            <div className="container w-100">
                <select className="m-2 h-100  bg-primary rounded" onChange={(e)=>setQty(e.target.value)}>
                    {Array.from(Array(6),(e,i)=>{
                        return(
                            <option key={i+1} value={i+1}>{i+=1}</option>
                        )
                    })}
                </select>
                <select className="m-2  h-100  bg-primary rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
               {
                priceOption.map((sel)=>{
                  return(
                    <option key={sel} value={sel}>{sel}</option>

                  )
                  

                })
               }

                </select>
                <div className="d-inline h-100 fs-5" >
                ₹{finalPrice}/-
                </div>
            </div>
            <hr/>
            <div>
              <button className={`btn btn-primary justify-center ms-2`} onClick={handelAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
