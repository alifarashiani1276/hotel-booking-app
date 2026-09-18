import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  const defaultImagePath = "/123.jpg";
  if (isLoading) return <Loader />;

  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`searchItem ${
                item.id === currentHotel?.id ? "current-hotel" : ""
              }`}
            >
              <img
                src={
                  item.xl_picture_url ||
                  item.picture_url?.url ||
                  defaultImagePath
                }
                alt={item.name || "default image"} // یک مقدار پیش‌فرض برای alt هم خوب است
                onError={(e) => {
                  // این کد اطمینان حاصل می‌کند که اگر عکس پیش‌فرض هم مشکل داشت،
                  // دوباره onError صدا زده نشود و برنامه دچار خطا نشود.
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = defaultImagePath;
                }}
              />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export default Hotels;
