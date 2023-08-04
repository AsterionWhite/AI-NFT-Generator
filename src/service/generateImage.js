
export const generateImage = (inputQuery, selectedQuantity, selectedSize) => {
  return fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({
          prompt: inputQuery,
          n: selectedQuantity,
          size: selectedSize,
          response_format: 'b64_json'
        }),
      },
  );
};
