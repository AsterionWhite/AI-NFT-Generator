import axios from "axios";

export const uploadToIPFS = async (urlMethod, contentTypeHeader, data) => {
  const pinataJWT = `Bearer ${process.env.REACT_APP_PINATA_JWT}`;

  const config = {
    method: "POST",
    url: `https://api.pinata.cloud/pinning/${urlMethod}`,
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": contentTypeHeader,
      Authorization: pinataJWT,
    },
    data,
  };

  const result = await axios(config);

  return result;
};
