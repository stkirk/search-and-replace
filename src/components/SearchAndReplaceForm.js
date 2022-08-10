import React, { useState } from "react";

const SearchAndReplaceForm = () => {
  const initialFormValues = {
    // may need to set initial file as empty Blob for typing issues
    selectedFile: "",
    search_param: "",
    replacement_param: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const onFileChange = (e) => {
    setFormValues({
      ...formValues,
      selectedFile: e.target.files[0],
    });
    console.log("selectedFile--> ", e.target.files[0]);
  };

  return (
    <div className="form-container">
      <form>
        <input type="file" name="selectedFile" onChange={onFileChange} />
      </form>
    </div>
  );
};

export default SearchAndReplaceForm;
