import React, {useState} from 'react'
import { Button, Card } from 'react-bootstrap';
import '../styles/Body.css'
import {properties} from '../records/Data'
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import SearchIcon from '@mui/icons-material/Search';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function Body() {
  const item = properties;
  const [filter, setFilter]=useState(item);
  const [searchdata, setSearchdata]=useState("");
  const [location, setLocation]=useState("");
  const [when, setWhen ]=useState("");
  const [price, setPrice] = useState("");
  const [category , setCategory] = useState("");

    let pricearr=price.split("-");
    let whenarr=when.split("-");

  const manualfilter=()=>{
    let templist = item.filter((x)=>{
        if(location===''){
          return x
        }else if(x.location.toLowerCase().includes(location.toLowerCase())){
          return x
        }
        return false
    });
    templist = templist.filter((x)=>{
      if(when===''){
        return x
      }else if(x.moveby[0]<parseInt(whenarr[0])){
        return x
      }else if(x.moveby[0]===parseInt(whenarr[0]) && x.moveby[1]<parseInt(whenarr[1])){
        return x
      }else if(x.moveby[0]===parseInt(whenarr[0]) && x.moveby[1]===parseInt(whenarr[1]) && x.moveby[2]<=parseInt(whenarr[2])){
        return x
      }return false
    })
    templist = templist.filter((x)=>{
      if(price===''){
        return x
      }else if(parseInt(x.price)>=parseInt(pricearr[0]) && parseInt(x.price)<=parseInt(pricearr[1])){
        return x
      }return false
    })
    let updatedList = templist.filter((x)=>{
      if(category===''){
        return x
      }else if(x.category.toLowerCase()===category.toLowerCase()){
        return x
      }return false
    })
    setFilter(updatedList);
  }

  const searchfilter=()=>{
    const updatedList = item.filter((x)=>{
      if(searchdata===""){
        return x
      }else if(x.title.toLowerCase().includes(searchdata.toLowerCase())){
        return x
      }return false

    });
    setFilter(updatedList);
  }

  

  
  const setdata=()=>{
    const arr=item.filter((x)=> x.price>0 );
    const sorted=arr.sort((a,b) => a.price - b.price)
    console.log(arr);
    console.log(sorted);
  }



  return (
    <div className='body p-4'>
        <div className='container p-5'>
            <div className='header'>
                <div className='row'>
                    <div className='title col-lg-7 col-12 display-6'>
                        Search Properties To Rent
                    </div>
                    <div className='search-bar col-lg-5 col-12 my-3'>
                      <div className='search-bar-inner '>
                       <input 
                          type='text'
                          placeholder='Search with Search Bar' 
                          className='py-2 px-3' 
                          onChange={(e)=>{
                              setSearchdata(e.target.value);
                       }}/></div>
                       <SearchIcon onClick={searchfilter} className='searchbar-btn' sx={{ fontSize: '2rem' }}/>
                    </div>
                </div>
                <div className='filter-menu my-4 py-3 row'>
                    <div className='filter-item col-lg-3 col-sm-6 col-12'>
                        <label for="city">Location </label>
                        <input type="text" id="city" name="city" placeholder='Enter Location'
                          onChange={(e)=>{setLocation(e.target.value)}} className='p-2'
                        />
                    </div>
                    <div className='filter-item col-lg-3 col-sm-6 col-12'>
                        <label for="when">When </label>
                        <input type="date" id="when" name="when" placeholder='Enter Date'
                          onChange={(e)=>{setWhen(e.target.value)}} className='p-2'
                          />
                    </div>
                    <div className='filter-item col-lg-3 col-sm-6 col-12'>
                        <label for="price">Choose Price Range</label>
                          <select id="price" name="price"
                            onChange={setdata} className='p-2'
                            >
                            <option value="">select</option>
                            <option value="500-2000">$500-$2000</option>
                            <option value="2000-3000">$2000-$3000</option>
                            <option value="3000-4000">$3000-$4000</option>
                            <option value="4000-10000">$4000 and above</option>
                          </select>
                    </div>
                    <div className='filter-item col-lg-3 col-sm-6 col-12'>
                        <label for="type">Property Type</label>
                          <select id="type" name="type" className='p-2'
                            onChange={(e)=>{setCategory(e.target.value)}}
                          >
                            <option value="">select</option>
                            <option value="House">House</option>
                            <option value="store">Store</option>
                            <option value="banquet hall">Banquet Hall</option>
                          </select>
                    </div>
                </div>
                <div className='text-center'>
                        <Button variant="primary" onClick={manualfilter} className='m-3'>Search</Button>
                        
                        <OverlayTrigger
                          placement='top'
                          overlay={
                            <Tooltip>
                              Enter Location like India, USA, Europe, Italy, Maldives.
                            </Tooltip>
                          }
                        >
                          <Button variant="primary" className='m-3'>Help</Button>
                        </OverlayTrigger>
                        

                </div>
                <div className='row'>
                    {filter.map((product)=>{
                      return(
                        <>
                          <div className='card-item col-md-4 my-4'>
                              <Card id={product.id} className='card'>
                                <Card.Img variant="top" style={{ height: '20rem'}} src={product.image} className='card-image'/>
                                <Card.Body>
                                  <b>${product.price}/month</b>
                                  <Card.Title>{product.title}</Card.Title>
                                  <Card.Text>
                                   {product.adress} <br/>
                                   Rent it by <b>{product.moveby[2]}/{product.moveby[1]}/{product.moveby[0]}</b>
                                  </Card.Text>
                                  <hr/>
                                  <div className='card-lower'>
                                    <div className='card-lower-item text-center'>
                                      <div><HotelIcon className='mx-1'/></div>
                                      <div>{product.beds} Beds</div>
                                    </div>
                                    <div className='card-lower-item text-center'>
                                      <div><BathtubIcon  className='mx-1'/></div>
                                      <div>{product.bathrooms} Bathrooms</div>
                                    </div>
                                    <div className='card-lower-item text-center'>
                                      <div><AspectRatioIcon className='mx-1'/></div>
                                      <div>{product.area}m<sup>2</sup></div>
                                    </div>
                                  </div>
                                  
                                </Card.Body>
                              </Card>
                          </div>
                        </>
                      )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Body