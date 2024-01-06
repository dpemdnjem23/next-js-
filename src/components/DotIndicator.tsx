interface DotIndicatorProps {
  totalSlides: number;
  currentPage: number;
}

export default function DotIndication({
  totalSlides,
  currentPage,
}: DotIndicatorProps) {
  const dots = [];

  for (let i = 1; i <= totalSlides; i++) {
    dots.push(
      <span
        key={i}
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: i === currentPage ? "blue" : "gray",
          margin: "0 5px",
          display: "inline-block",
          cursor: "pointer",
        }}
      />
    );
  }

  //   style={{
  //     position: "abso",
  //     bottom: "10px",
  //     // left: "50%",
  //     transform: "translateX(-50%)",
  //     display: "flex",
  //   }}
  return (
    <div className="  ">
      {dots}
    </div>
  );
}
