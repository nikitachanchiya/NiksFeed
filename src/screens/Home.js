import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')

  const loadFoodItems = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/foodData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json()
      setFoodItems(response[0] || [])
      setFoodCat(response[1] || [])
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">

          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input 
                  className="form-control me-2 w-75 bg-white text-dark" 
                  type="search" 
                  placeholder="Search in here..." 
                  aria-label="Search" 
                  value={search} 
                  onChange={(e) => { setSearch(e.target.value) }} 
                />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900" 
                className="d-block w-100" 
                style={{ filter: "brightness(30%)", maxHeight: "500px", objectFit: "cover" }} 
                alt="Burger" 
              />
            </div>
            <div className="carousel-item">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900" 
                className="d-block w-100" 
                style={{ filter: "brightness(30%)", maxHeight: "500px", objectFit: "cover" }} 
                alt="Pizza" 
              />
            </div>
            <div className="carousel-item">
              <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=900" 
                className="d-block w-100" 
                style={{ filter: "brightness(30%)", maxHeight: "500px", objectFit: "cover" }} 
                alt="Barbeque" 
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                <div key={data._id || data.CategoryName} className='row mb-3'>
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems.length > 0 ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id || filterItems.name} className='col-12 col-md-6 col-lg-3'>
                          <Card 
                            foodName={filterItems.name} 
                            item={filterItems} 
                            options={filterItems.options ? filterItems.options[0] : {}} 
                            ImgSrc={filterItems.img} 
                          />
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""
        }
      </div>
      <Footer />
    </div>
  )
}