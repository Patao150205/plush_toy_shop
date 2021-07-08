/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";

export const uploadImg = async (imgs: any[]) => {
  if (!process.env.CLOUDINARY_URL) return null;

  return Promise.all(
    imgs.map(async (img) => {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "blush_toy_shop");

      try {
        const res = await axios.post(process.env.CLOUDINARY_URL as string, formData);
        return res.data.url;
      } catch (error) {
        console.error(error.response);
        return error;
      }
    })
  );
};
