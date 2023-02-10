import React, { useState } from 'react'
import "./Home.css"
import IMG1 from '../../assets/booking-img1.jpg'
import IMG2 from '../../assets/booking-image4.jpg'
import IMG3 from '../../assets/booking-img2.jpg'
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import Featured from '../../components/featured/Featured'
import PropertyTypes from '../../components/propertyTpes/PropertyTypes'
import FeaturedList from '../../components/featuredList/FeaturedList'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import {useNavigate, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SearchActions } from '../../redux/slices/SearchSlice'
import { useSelector } from "react-redux";




const Home = () => {
  const user = useSelector(state=> state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [destination, setDestination] = useState('abuja')
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })
  const [openOptions, setOpenOptions] = useState(false)

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "increase" ? options[name] + 1 : options[name] - 1
      }
    })
  }


  const handleSearch = () => {
    dispatch(SearchActions.newSearch({
      date,
      destination,
      options
    }))
  
    navigate('/hotels', {
      state:{
        destination,
        date,
        options  
      }
    })
  }


  return (
    <>
    <div className='home'>
      <div className="home-hero">
        <div className="home-text">
          <h2>
            A lifetime of discounts? <span>It's Genius!</span>
          </h2>
          <p>
            Get rewarded for your travels. unlock instant savings of
            10% or more with a free AdewoleBookings.com account!
          </p>
          {
            !user && <button className="home-btn"><Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>sign in/Register</Link></button>
          }
        </div>
        <div className="home-img">
          <div className="image image-1">
            <img src={IMG1} alt="" />
          </div>
          <div className="image image-2">
            <img src={IMG2} alt="" />
          </div>
          <div className="image image-3">
            <img src={IMG3} alt="" />
          </div>
        </div>
      </div>


      <div className="headerSearch">
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faBed} className="headerIcon" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="headerSearchInput"
            onChange={e => setDestination(e.target.value)}
            // value="lagos"
          />
        </div>
        <div className="headerSearchItem" onClick={() => setOpenDate(!openDate)}>
          <FontAwesomeIcon className="headerIcon" onClick={() => setOpenDate(!openDate)} icon={faCalendarDays} />
          <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
          </span>
          {openDate && <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
            className='date'
          />}
        </div>
        <div className="headerSearchItem" onClick={() => setOpenOptions(!openOptions)}>
          <FontAwesomeIcon onClick={() => setOpenOptions(!openOptions)}  icon={faPerson} className="headerIcon" />
          <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
            {`${options.adult} adult,  ${options.children} children, ${options.room} room `}
          </span>
          {/* options */}
          {openOptions &&
            <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    onClick={() => handleOptions('adult', 'decrease')}
                    className="optionCounterButton">
                    -
                  </button>
                  <span className="optionCounterNumber" >{options.adult}</span>
                  <button onClick={() => handleOptions('adult', 'increase')} className="optionCounterButton">+</button>
                </div>
              </div>

              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={options.children <= 0}
                    onClick={() => handleOptions('children', 'decrease')}
                    className="optionCounterButton">
                    -
                  </button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button onClick={() => handleOptions('children', 'increase')} className="optionCounterButton">+</button>
                </div>
              </div>

              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button
                    disabled={options.room <= 1}
                    onClick={() => handleOptions('room', 'decrease')}
                    className="optionCounterButton">
                    -
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button onClick={() => handleOptions('room', 'increase')} className="optionCounterButton">+</button>
                </div>
              </div>

            </div>
          }
        </div>

        <div className="headerSearchItem">
          <button onClick={handleSearch} className="headerBtn" >
            Search
          </button>
        </div>
      </div>
    </div>
    <Featured />
    <PropertyTypes />
    <FeaturedList />
    <MailList />
    <Footer />
    </>
  )
}

export default Home