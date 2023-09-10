import ChartFillImage from "./assets/Chart_fill.png";
import ChatImage from "./assets/Chat.png";
import UserImage from "./assets/User.png";


export const AppName = "Designer";
export const Path = ["/images", "/videos", "/slides"]

export const Menus = [
  {
    title: "Image Processing",
    src: ChartFillImage,
    path: "/images",
    submenu: [
      { title: "Invert Colors", submenuPath: `${Path[0]}/invert-color` },
      { title: "Flip Image", submenuPath: `${Path[0]}/flip-image` },
      { title: "Histogram", submenuPath: `${Path[0]}/histogram` },
    ],
  },
  {
    title: "Something",
    src: ChatImage,
    path: "/videos",
    submenu: [
      { title: "Item 4", submenuPath: "/item-4" },
      { title: "Item 5", submenuPath: "/item-5" },
      { title: "Item 6", submenuPath: "/item-6" },
    ],
  },
  {
    title: "Study Material",
    src: UserImage,
    path: "/slides",
    submenu: [
      { title: "Item 7", submenuPath: "/item-7" },
      { title: "Item 8", submenuPath: "/item-8" },
      { title: "Item 9", submenuPath: "/item-9" },
    ],
  },
];
