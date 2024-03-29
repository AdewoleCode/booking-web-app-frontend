import "./FeaturedList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getHotelsFeatured } from "../../apiRoutes/routes";
import Spinner from "../spinner/Spinner";


const FeaturedList = () => {


  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
    "https://www.thecable.ng/wp-content/uploads/2022/10/capital-hotels-Sheraton-Abuja-Hotel.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
  ]

  useEffect(() => {
    fetchData(getHotelsFeatured)
  }, [])

  const fetchData = async (url) => {
    setLoading(true)
    await axios.get(url).then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }
  return (

    <div className="p-type-con">
      <h3>Featured properties</h3>

      <div className="fp">
        {
          loading ? (
            <Spinner />
          ) : (
            <>
              {
                data && images.map((img, i) => (
                  <div className="fpItem" key={i}>
                    <img
                      src={img}
                      alt=""
                      className="fpImg"
                    />
                    <span className="fpName">{data[i]?.name}</span>
                    <span className="fpCity">{data[i]?.city}</span>
                    <span className="fpPrice">Starting from ${data[i]?.cheapestPrice}</span>
                    {
                      data[i]?.rating ?
                      <div className="fpRating">
                        <button>8.9</button>
                        <span>Excellent</span>
                      </div> : null
                    }
                  </div>

                ))

              }
            </>
          )

        }
      </div>
    </div>
  );
};

export default FeaturedList;