import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/BrandMark";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090B",
          borderRadius: 16,
        }}
      >
        <BrandMark size={52} color="#FFFFFF" cutout="#09090B" />
      </div>
    ),
    size,
  );
}
