import React, { useState } from "react";

const SearchAndReplaceForm = () => {
  const initialFormValues = {
    // may need to set initial file as empty Blob for typing issues
    selectedFile: "",
    search_param: "",
    replacement_param: "",
    newFileText: "",
    count: 0,
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
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // pull the text out of the file
    formValues.selectedFile
      .text()
      .then((text) => {
        // build regex for our search pattern, case insentive option add i to flag in regex
        const regex = new RegExp(formValues.search_param, "g");
        // count occurences of search param using regex
        const count = (text.match(regex) || []).length;
        // make the necessary edits and count search terms in the file's text
        const new_text = text.replace(regex, formValues.replacement_param);
        // set new_text and count to state
        setFormValues({
          ...formValues,
          newFileText: new_text,
          count: count,
        });
        console.log("NEW TEXT AFTER REPLACE", new_text);
        console.log("NEW COUNT", count);
      })
      .catch((err) => {
        console.log("ERROR--> ", err);
      });
    // make a new file with new text
    // provide it for download
    // clear form
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
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
        <button className="submit-btn">
          Search file for {formValues.search_param} and replace with{" "}
          {formValues.replacement_param}
        </button>
      </form>
    </div>
  );
};

export default SearchAndReplaceForm;
