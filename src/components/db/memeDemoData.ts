import { MemeCardType, UserType } from "../types/types";
import { AVATAR_API, MEME_STORAGE } from "../utils/contant";
export const memeDemoData = () => {
  let memeData: MemeCardType[] = [
    {
      key: "01",
      owner_id: "02",
      href: "https://www.rd.com/wp-content/uploads/2021/11/new-year-memes-header-image.jpg",
      like: 0,
      dislike: 0,
      download: 0,
      tags: [],
    },
    {
      key: "02",
      owner_id: "03",
      href: "https://images.hindustantimes.com/img/2021/07/07/550x309/Screenshot_2021-07-07_at_8.39.12_PM_1625672031459_1625672046077.png",
      like: 0,
      dislike: 0,
      download: 0,
      tags: [],
    },
    {
      key: "03",
      owner_id: "01",
      href: "https://www.insidehook.com/wp-content/uploads/2021/07/Best-Memes-of-2021-3.jpg?fit=1500%2C1000",
      like: 0,
      dislike: 0,
      download: 0,
      tags: [],
    },
    {
      key: "04",
      owner_id: "04",
      href: "https://www.exterro.com/images/uploads/comicsmemes/_360xAUTO_stretch_center-center_none/Lies-Meme-Blog.png",
      like: 0,
      dislike: 0,
      download: 0,
      tags: [],
    },
    {
      key: "05",
      owner_id: "03",
      href: "https://www.rd.com/wp-content/uploads/2021/11/new-year-memes-header-image.jpg",
      like: 0,
      dislike: 0,
      download: 0,
      tags: [],
    },
    {
      key: "06",
      owner_id: "02",
      href: "https://www.rd.com/wp-content/uploads/2021/11/new-year-memes-header-image.jpg",
      like: 0,
      dislike: 0,
      download: 0,
      tags: [],
    },
  ];

  let userData: UserType[] = [
    {
      user_id: "01",
      user_name: "Shubham Thorat",
      img_url: `${AVATAR_API}`,
      user_desc: "Very Bad meme he has very unique minewhich no ne exist",
    },
    {
      user_id: "02",
      user_name: "Ujjwal Pandey",
      img_url: `${AVATAR_API}`,
      user_desc: "Very Bad meme",
    },
    {
      user_id: "03",
      user_name: "Anubhab Ray",
      img_url: `${AVATAR_API}`,
      user_desc: "Very Bad meme",
    },
    {
      user_id: "04",
      user_name: "Kartikeya Singh",
      img_url: `${AVATAR_API}`,
      user_desc: "Very Bad meme",
    },
  ];
  if (!sessionStorage.getItem(`${MEME_STORAGE}memes`)) {
    sessionStorage.setItem(`${MEME_STORAGE}memes`, JSON.stringify(memeData));
  }

  if (!sessionStorage.getItem(`${MEME_STORAGE}users`)) {
    sessionStorage.setItem(`${MEME_STORAGE}users`, JSON.stringify(userData));
  }
};
