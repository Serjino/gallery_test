import "./Slider.css";
import { ISliderProps } from "./Slider.def";
import { DEFAULTS } from "../../config";
import { useEffect, useState } from "react";

export function Slider({
  imgCountPerPage = DEFAULTS.imgCountePerPage,
  store,
  totalCount,
  onNewImageUpload,
}: ISliderProps) {
  const [currImgIndex, setCurrImgIndex] = useState(0);
  const prevImg = store[currImgIndex - 1]?.src;
  const nextImg = store[currImgIndex + 1]?.src;

  function skipImg(nextOrPrev: "next" | "prev") {
    if (nextOrPrev === "next") {
      if (currImgIndex === store.length - 1) {
        return;
      }
    } else {
      if (currImgIndex === 0) {
        return;
      }
    }
    setCurrImgIndex((currImgIndex) =>
      nextOrPrev === "next" ? currImgIndex + 1 : currImgIndex - 1
    );
  }

  useEffect(() => {
    if (currImgIndex < totalCount - 1 && currImgIndex === store.length - 1) {
      onNewImageUpload();
    }
  }, [currImgIndex]);

  return (
    <div className="wrapper">
      <div className="preview_wrapper">
        {prevImg && (
          <div className="preview_img prev" onClick={() => skipImg("prev")}>
            <img src={prevImg} />
          </div>
        )}
        <div className="preview_img current">
          <img src={store[currImgIndex]?.src} />
        </div>
        {nextImg && (
          <div className="preview_img next" onClick={() => skipImg("next")}>
            <img src={nextImg} />
          </div>
        )}
      </div>
      <div className="navigation">
        <span
          className="material-symbols-outlined mui-icon"
          onClick={() => skipImg("prev")}
        >
          skip_previous
        </span>
        {store?.map((img, index) => {
          return (
            <div
              className="navigation_item"
              onClick={() => setCurrImgIndex(() => index)}
            >
              <img
                src={img.src}
                style={{
                  ...(currImgIndex === index && {
                    outline: "2px solid var(--active)",
                    transform: "scale(1.1)",
                    padding: "2px",
                  }),
                }}
              />
            </div>
          );
        })}
        <span
          className="material-symbols-outlined mui-icon"
          onClick={() => skipImg("next")}
        >
          skip_next
        </span>
      </div>
      <div>
        <span>
          {currImgIndex + 1} из {totalCount}
        </span>
      </div>
    </div>
  );
}
