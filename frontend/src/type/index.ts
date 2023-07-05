export interface DialogItem {
  direction: "left" | "right";
  text: string;
}

export interface PostList {
  posts: Post[];
}

export interface Post {
  title: string;
  text: string;
  image_url: string;
}

export interface PostRes {
  status: string;
  post_id: number;
}

export interface PostProps {
  user_id: number;
  title: string;
  text: string;
  image_url: string;
  month: number;
  year: number;
}

export interface UploadToken {
  key: string;
  token: string;
  url: string;
}

export interface Answer {
  answer: string;
}

export interface LightStyle {
  color: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Relationship {
  image_url: string;
}
