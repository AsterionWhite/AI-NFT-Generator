export const validateJSONMetadata = (metadataInput) => {
    // Empty text area input should let user to exit the window
    if (!metadataInput) {
      return true;
    }
    try {
      JSON.parse(metadataInput);
      return true;
    } catch (e) {
      console.log(e, "JSON ERROR");
      return false;
    }
  };