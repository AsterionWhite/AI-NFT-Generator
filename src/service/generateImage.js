import axios from "axios";

export const generateImage = (inputQuery, selectedQuantity, selectedSize) => {
  return axios.post(
    "https://api.openai.com/v1/images/generations",
    {
      prompt: inputQuery,
      n: selectedQuantity,
      size: selectedSize,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
      },
    }
  );
};
