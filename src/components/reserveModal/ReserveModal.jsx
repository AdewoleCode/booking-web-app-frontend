import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./ReserveModal.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const ReserveModal = ({ setModal, hotelId }) => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedRooms, setSelectedRooms] = useState([])

    const getHotelsRoomRoute = `http://localhost:8000/api/hotels/room/${hotelId}`


    const dates = useSelector(state=> state.search.date)
    console.log(dates);

    // const getDatesRange = async (startDate, endDate) => {
    //     const start = new Date(startDate)
    //     const end = new Date(endDate)
    //     const date = new Date(start.getTime())

    //     const dateList = []

    //     while (data <= end){
    //         dateList.push(new Date(date))
    //         date.setDate(date.getDate() + 1)
    //     }

    //     return dateList
    // }

    // const allDates =(getDatesRange(dates[0].startDate, dates[0].endDate ));

    // const isAvailable = (roomNumber) => {
    //     const isFound = roomNumber.unavailableDates.some(date => {
    //         allDates.includes(new Date(date).getTime())
    //     })

    //     return !isFound
    // }

    const handleClick = async () => {
        // try {
        //     await Promise.all(selectedRooms.map(roomId => {
        //         const res = axios.put(`http://localhost:8000/api/rooms/availability/${roomId}`, {dates: allDates})
        //         return res.data
        //     }))
        // } catch (err) {
        //     log
        // }
        setModal(false)
        navigate("/")
    }


    useEffect(() => {
        fetchData(getHotelsRoomRoute)
    }, [getHotelsRoomRoute])

    const fetchData = async (url) => {
        setLoading(true)
        await axios.get(url).then((res) => {
            setData(res.data)
            setLoading(false)
        })
    }

    const handleSelect = async (e) => {
        const checked = e.target.checked
        const value = e.target.value

        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    }



   

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setModal(false)}
                />
                <span>Select your rooms:</span>
                <h1>rooms</h1>
                {loading ? "loading please wait" : data?.map((item) => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map((roomNumber, i) => (
                                <div className="room" key={i}>
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        // disabled={!isAvailable}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">
                    Reserve Now!
                </button>
            </div>
        </div>
    );
};

export default ReserveModal