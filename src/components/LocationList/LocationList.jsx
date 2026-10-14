import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { getHotels } from "../../api/db";
import HotelImage from "../HotelImage/HotelImage";
function LocationList() {
  const { data, isLoading } = useFetch(() => getHotels(), []);
  if (isLoading) return <Loader />;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <HotelImage hotel={item} alt={item.name || "default image"} />
              <div className="locationItemDesc">
                <p className="locaiton">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default LocationList;
