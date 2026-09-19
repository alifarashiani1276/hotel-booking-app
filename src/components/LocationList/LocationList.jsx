import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { API_URL } from "../../config";
function LocationList() {
  const { data, isLoading } = useFetch(`${API_URL}/hotels`, "");
  const defaultImagePath = "/123.jpg";
  if (isLoading) return <Loader />;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img
                src={
                  item.xl_picture_url ||
                  item.picture_url?.url ||
                  defaultImagePath
                }
                alt={item.name || "default image"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultImagePath;
                }}
              />
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
