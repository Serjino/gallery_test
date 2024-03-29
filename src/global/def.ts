export interface IGetImgListResp {
  [x: string]: any;
  limit: number;
  message: string;
  offset: number;
  photos: {
    description: string;
    id: number;
    title: string;
    url: string;
    user: number;
  }[];
  success: boolean;
  total_photos: number;
}
