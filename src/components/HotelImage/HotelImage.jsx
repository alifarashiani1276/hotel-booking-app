import { useEffect, useMemo, useRef, useState } from "react";
import { getImageCandidates } from "../../utils/hotelImage";

// اگه یه آدرس خطا بده یا بیشتر از این مدت طول بکشه، سراغ آدرس بعدی می‌ریم
const LOAD_TIMEOUT_MS = 8000;

function HotelImage({ hotel, alt, ...rest }) {
  const candidates = useMemo(() => getImageCandidates(hotel), [hotel]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const isLast = index >= candidates.length - 1;

  // با عوض شدن هتل، از اول شروع کن
  useEffect(() => {
    setIndex(0);
  }, [hotel?.id]);

  // اگه عکس فعلی دیر لود شد (مثلاً سایت بلاک شده و timeout می‌شه)، برو بعدی
  useEffect(() => {
    if (isLast) return;
    timerRef.current = setTimeout(() => setIndex((i) => i + 1), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, isLast, hotel?.id]);

  return (
    <img
      {...rest}
      src={candidates[Math.min(index, candidates.length - 1)]}
      alt={alt}
      referrerPolicy="no-referrer"
      onLoad={() => clearTimeout(timerRef.current)}
      onError={() => {
        clearTimeout(timerRef.current);
        if (!isLast) setIndex((i) => i + 1);
      }}
    />
  );
}

export default HotelImage;
