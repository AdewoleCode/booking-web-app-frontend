import "./HotelPage.css";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem"
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SearchActions } from "../../redux/slices/SearchSlice";


const HotelList = () => {
    const dispatch = useDispatch()

    const option = useSelector(state => state.search.options)

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [options, setOptions] = useState(option);
    const [openDate, setOpenDate] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetchData(`http://localhost:8000/api/hotels/find/`)
    }, [])
    
    

    const fetchData = async (url) => {
        setLoading(true)
        await axios.get(url).then((res) => {
            setData(res.data)
            // console.log(res.data);
            setLoading(false)
        })
    }


    const dispatchDate = () => {
        dispatch(SearchActions.newSearch({
            date,
            options
        }))
    }    


    return (
        <div>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
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
                    </div>
                    <div className="listResult">
                        {loading ? (
                            "loading please wait..."
                        ) : (
                            <>
                                {
                                    data && data?.map((item, i) => (
                                        <SearchItem item={item} key={item._id} dispatchDate={dispatchDate} />
                                    ))

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