import { useEffect, useRef } from "react";

export default function NaverMapBox() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "naver-map-sdk";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=gga1wwiqm4";
    script.async = true;
    script.onload = () => {
      const naver = (window as any).naver;
      if (!naver || !naver.maps) return;

      const center = new naver.maps.LatLng(37.102631, 128.423357); // 단양
      const map = new naver.maps.Map(mapRef.current, {
        center,
        zoom: 10,
      });

      new naver.maps.Marker({
        position: center,
        map,
        title: "사업지 위치",
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full h-[220px] md:h-[300px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
