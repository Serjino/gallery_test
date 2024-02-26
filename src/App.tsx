import QueryString from "qs";
import { useEffect } from "react";
import { API_URL, DEFAULTS, INITIAL_REQ_PARAMS } from "./config";
import { useAppDispatch, useAppSelector } from "./store/store";
import {
  addImages,
  imgStoreSelector,
  setImages,
  setTotal,
} from "./features/imgStore";
import { IGetImgListResp } from "./global/def";
import { Slider } from "./components/SliderWrapper/Slider";

function App() {
  const { images, total } = useAppSelector(imgStoreSelector);
  const dispatch = useAppDispatch();
  function getInitialData() {
    return fetch(
      API_URL +
        QueryString.stringify(
          {
            ...INITIAL_REQ_PARAMS,
          },
          {
            addQueryPrefix: true,
          }
        )
    );
  }
  useEffect(() => {
    getInitialData().then(async (data) => {
      const PARSED_DATA = (await data?.json()) as unknown as IGetImgListResp;
      dispatch(
        setImages(
          PARSED_DATA?.photos?.map((photo) => ({
            id: photo?.id,
            src: photo?.url,
          }))
        )
      );
      dispatch(setTotal(PARSED_DATA.total_photos));
    });
  }, []);

  function uploadNewPhoto() {
    return fetch(
      API_URL +
        QueryString.stringify(
          {
            limit: 1,
            offset: images.length,
          },
          {
            addQueryPrefix: true,
          }
        )
    ).then(async (data) => {
      const PARSED_DATA = (await data?.json()) as unknown as IGetImgListResp;
      dispatch(
        addImages(
          PARSED_DATA?.photos?.map((photo) => ({
            id: photo?.id,
            src: photo?.url,
          }))
        )
      );
    });
  }

  return (
    <>
      <Slider
        imgCountPerPage={DEFAULTS.imgCountePerPage}
        store={images}
        totalCount={total}
        onNewImageUpload={uploadNewPhoto}
      />
    </>
  );
}

export default App;
