import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
function LocationList() {
  const { data, isLoading } = useFetch("https://my-json-server.typicode.com/alifarashiani1276/hotel-booking-app/hotels", "");
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
                alt={item.name || "default image"} // یک مقدار پیش‌فرض برای alt هم خوب است
                onError={(e) => {
                  // این کد اطمینان حاصل می‌کند که اگر عکس پیش‌فرض هم مشکل داشت،
                  // دوباره onError صدا زده نشود و برنامه دچار خطا نشود.
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
