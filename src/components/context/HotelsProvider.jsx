import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-hot-toast";
import { getHotels, getHotelById } from "../../api/db";

const HotelContext = createContext();

function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadinCurrHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFetch(
    () => getHotels({ q: destination || "", accommodatesGte: room || 1 }),
    [destination, room],
  );

  async function getHotel(id) {
    setIsLoadinCurrHotel(true);
    try {
      const data = await getHotelById(id);
      setCurrentHotel(data);
      setIsLoadinCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadinCurrHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        currentHotel,
        getHotel,
        isLoadingCurrHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}
export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
