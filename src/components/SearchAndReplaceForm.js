import React, { useState } from "react";

const SearchAndReplaceForm = () => {
  const initialFormValues = {
    // may need to set initial file as empty Blob for typing issues
    selectedFile: "",
    search_param: "",
    replacement_param: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = (e) => {
    if (e.target.name === "selectedFile") {
      setFormValues({
        ...formValues,
        selectedFile: e.target.files[0],
      });
      console.log("selectedFile--> ", e.target.files[0], e.target.name);
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
      console.log(e.target.value);
    }
  };

  return (
    <div className="form-container">
      <form>
        <input
          className="file-btn"
          type="file"
          name="selectedFile"
          onChange={onChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Enter a string to search and replace"
          name="search_param"
          value={formValues.search_param}
          onChange={onChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Enter a replacement for the search string"
          name="replacement_param"
          value={formValues.replacement_param}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default SearchAndReplaceForm;
