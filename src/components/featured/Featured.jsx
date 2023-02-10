import "./Featured.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { countByCityRoute } from "../../apiRoutes/routes";


const Featured = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData(countByCityRoute)
  }, [])

  const fetchData = async (url) => {
    setLoading(true)
    await axios.get(url).then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }


  return (

    <div className="featured">
      {
        loading ? (
          "loading please wait"
        ) :
          <>
            <div className="featuredItem">
              <img
                src="https://fastlagos.com/wp-content/uploads/2020/03/fun-places-in-victoria-island.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Lagos</h1>
                <h2>{data[1]} properties</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img
                src="https://images.luxuryhotel.guru/hotelimage.php?p_id=1&code=137f742926e4d8bf46f5f8e347aca2b8&webpage=luxuryhotel.guru&link=https%3A%2F%2Fsubdomain.cloudimg.io%2Fcrop%2F512x384%2Fq70.fcontrast10.fbright0.fsharp5%2Fhttps%3A%2F%2Fq-xx.bstatic.com%2Fxdata%2Fimages%2Fhotel%2Fmax1536%2F140205154.jpg%3Fk%3D7fdab3b5fbc5a094c26eb5df37c3a8e74fea4a751d18ab43b9ae2798a17c83ff%26o%3D"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Abuja</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img
                src="https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_65,w_845/v1/clients/vancouverbc/victoria_644cf3bd-09d3-4aba-8f00-5c6206cd1812.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>bayelsa</h1>
                <h2>{data[0]} properties</h2>
              </div>
            </div>
          </>

      }
    </div>

  );
};

export default Featured;