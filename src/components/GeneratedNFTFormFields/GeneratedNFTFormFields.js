import "../GeneratedNFTForm/GenerateNFTForm.css";
import { NFT_SIZES } from "../../const";


const GeneratedNFTFormFields = (props) => {
  const {
    onSubmitFormHandler,
    inputQuery,
    setInputQuery,
    selectedQuantity,
    setSelectedQuantity,
    selectedSize,
    setSelectedSize,
    generatingImageError,
  } = props;

  return (
    <form onSubmit={onSubmitFormHandler} className="container">
      <div className="flex-wrapper">
        <p className="description margin">Your generation prompt:</p>{" "}
        <input
          className="generate-input margin"
          placeholder="German shepherd catching a frisbee in midair at the park realistic 4k"
          type="text"
          maxLength={250}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
      </div>
      <div className="flex-wrapper">
        <p className="description margin">
          Number of instances to be generated:
        </p>
        <select
          className="select-input margin"
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(Number(e.target.value))}
        >
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>

      <div className="flex-wrapper">
        <p className="description margin">
          Select a size of the generated image:
        </p>
        <select
          className="select-input margin"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option>{NFT_SIZES.small}</option>
          <option>{NFT_SIZES.medium}</option>
          <option>{NFT_SIZES.large}</option>
        </select>
      </div>
      <div className="flex-wrapper">
        <div className="generate-button-wrapper margin">
          <button
            disabled={inputQuery.length === 0}
            type="submit"
            className="generate-btn"
          >
            Generate Image
          </button>
        </div>
      </div>
      <div>
        {generatingImageError && (
          <p className="error-description margin">{generatingImageError}</p>
        )}
      </div>
    </form>
  );
};


export default GeneratedNFTFormFields;