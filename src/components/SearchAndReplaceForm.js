import React from "react";

const SearchAndReplaceForm = ({ appState, submitHandler, onChange }) => {
  return (
    <form onSubmit={submitHandler}>
      {!appState.showDownload && (
        <div className="inputs-container">
          <label htmlFor="selectedFile" className="input-label">
            Select the text file you want edited
          </label>
          <div className="input-div">
            <input
              className="file-btn"
              type="file"
              accept=".txt"
              name="selectedFile"
              onChange={onChange}
            />
          </div>
          <label htmlFor="search_param" className="input-label">
            What string do you want replaced?
          </label>
          <div className="input-div">
            <input
              type="text"
              className="text-input"
              placeholder="Enter search string"
              name="search_param"
              value={appState.search_param}
              onChange={onChange}
            />
          </div>
          <label htmlFor="replacement_param" className="input-label">
            What do you want to replace it with?
          </label>
          <div className="input-div">
            <input
              type="text"
              className="text-input"
              placeholder="Enter replacement string"
              name="replacement_param"
              value={appState.replacement_param}
              onChange={onChange}
            />
          </div>
        </div>
      )}
      {!appState.showDownload &&
        appState.selectedFile &&
        appState.search_param.length > 0 &&
        appState.replacement_param.length > 0 && (
          <button className="submit-btn">
            Search file for {appState.search_param} and replace with{" "}
            {appState.replacement_param}
          </button>
        )}
    </form>
  );
};

export default SearchAndReplaceForm;
