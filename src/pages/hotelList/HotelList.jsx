import "./HotelList.css";
import { useLocation } from "react-router-dom";
import { useState} from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem"
import { useEffect } from "react";
import axios from "axios";


const HotelList = () => {
  const location = useLocation();
  // console.log(location);
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [minPrice, setMinPrice ] = useState(undefined)
  const [maxPrice, setMaxPrice ] = useState(undefined)


  useEffect(() => {
    fetchData(`http://localhost:8000/api/hotels/find/?city=${destination}`)
  }, [])

  const fetchData = async (url) => {
    setLoading(true)
    await axios.get(url).then((res) => {
      setData(res.data)
      // console.log(res.data);
      setLoading(false)
    })
  }

  const refetchUrl = `http://localhost:8000/api/hotels/find/?city=${destination}&min=${minPrice || 1}&max=${maxPrice || 999}`

  useEffect(() => {
    refetchData()
  }, [refetchUrl])


  const refetchData = async (url) => {
    
    setLoading(true)
    await axios.get(refetchUrl).then((res) => {
      setData(res.data)
      // console.log(res.data);
      setLoading(false)
    })
  }


  const handleClick = () => {
    refetchData()
  }


  return (
    <div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder="lagos, abuja or bayelsa
              ?" onChange={(e)=> setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(
                  date[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input onChange={(e)=> setMinPrice(e.target.value)} type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input onChange={(e)=> setMaxPrice(e.target.value)} type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading please wait..."
            ) : (
              <>
                {
                  data && data?.map((item, i)=>(
                    <SearchItem item={item} key={item._id}/>
                  ) )

                }
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;