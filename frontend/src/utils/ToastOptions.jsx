import { toast } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
//   theme: "dark",
};

export const showError = (message) => {
  toast.error(message, toastOptions);
};