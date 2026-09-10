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
          background: "#FFFFFF",
          borderRadius: "50%",
        }}
      >
        <BrandMark size={64} color="#09090B" cutout="#FFFFFF" />
      </div>
    ),
    size,
  );
}
