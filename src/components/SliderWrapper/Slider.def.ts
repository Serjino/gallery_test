export interface ISliderProps {
  imgCountPerPage: number;
  store: ISliderImg[];
  totalCount: number;
  onNewImageUpload: () => void;
}

export interface ISliderImg {
  id: number;
  src: string;
}
