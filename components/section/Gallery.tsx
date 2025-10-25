import React from "react";

/**
 * Full-bleed gallery section that fills the viewport width and height.
 *
 * Notes:
 * - Uses divs with CSS background images so missing files don't break the build.
 * - Replace the image paths in the `images` array to match your `public/imgs` files.
 */
export default function Gallery(): React.ReactElement {
  const images = [
    "/imgs/gallery-1.jpg",
    "/imgs/gallery-2.jpg",
    "/imgs/gallery-3.jpg",
    "/imgs/gallery-4.jpg",
    "/imgs/gallery-5.jpg",
    "/imgs/gallery-6.jpg",
    "/imgs/gallery-7.jpg",
    "/imgs/gallery-8.jpg",
  ];

  return (
    <section className="w-screen h-screen relative overflow-hidden">
      {/* full-bleed grid: 7 columns, auto rows stretch to fill height */}
      <div
        className="absolute inset-0 p-4"
        style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1rem", gridAutoRows: "1fr" }}
      >
        {/* Example layout — adjust colSpan/rowSpan to taste */}
        <div style={{ gridColumn: "span 1", gridRow: "span 2" }} className="relative overflow-hidden rounded-sm bg-gray-100">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${images[0]})` }} />
        </div>

      </div>
    </section>
  );
}
