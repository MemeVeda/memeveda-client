export interface MemeCardType {
  key: string;
  href: string;
  like: number;
  dislike: number;
  download: number;
  owner_id: string;
}

export interface UserType {
  user_id: string;
  img_url?: string;
  user_name: string;
  user_desc: string;
}

export interface CropType {
  unit: string;
  width: number;
  height: number;
  x: number;
  y: number;
}
