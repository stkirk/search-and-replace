import React, { useState } from "react";
import { saveAs } from "file-saver";

const SearchAndReplaceForm = () => {
  const initialAppState = {
    // may need to set initial file as empty Blob for typing issues
    selectedFile: "",
    search_param: "",
    replacement_param: "",
    newFileText: "",
    count: 0,
    showDownload: false,
  };
  const [appState, setAppState] = useState(initialAppState);

  const onChange = (e) => {
    if (e.target.name === "selectedFile") {
      setAppState({
        ...appState,
        selectedFile: e.target.files[0],
      });
    } else {
      setAppState({
        ...appState,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // pull the text out of the file
    appState.selectedFile
      .text()
      .then((text) => {
        // build regex for our search pattern, case insentive option add i to flag in regex
        const regex = new RegExp(appState.search_param, "g");
        // count occurences of search param using regex
        const count = (text.match(regex) || []).length;
        // make the necessary edits and count search terms in the file's text
        const new_text = text.replace(regex, appState.replacement_param);
        // set new_text and count to state
        setAppState({
          ...appState,
          newFileText: new_text,
          count: count,
          showDownload: true,
        });
      })
      .catch((err) => {
        console.log("ERROR--> ", err);
      });
  };

  const downloadHandler = () => {
    // create new blob to save new text to
    const blob = new Blob([appState.newFileText], {
      type: "text/plain;charset=utf-8",
    });
    // remove .txt from old file name for reuse in new one
    const new_file_name = appState.selectedFile.name.slice(
      0,
      appState.selectedFile.name.length - 4
    );
    // download .txt file using new text and file name
    saveAs(blob, new_file_name);
    // clear form
    setAppState(initialAppState);
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <input
          className="file-btn"
          type="file"
          accept=".txt"
          name="selectedFile"
          onChange={onChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Enter a string to search and replace"
          name="search_param"
          value={appState.search_param}
          onChange={onChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Enter a replacement for the search string"
          name="replacement_param"
          value={appState.replacement_param}
          onChange={onChange}
        />
        {!appState.showDownload &&
          appState.selectedFile &&
          appState.search_param.length > 0 &&
          appState.replacement_param.length > 0 && (
            <button className="submit-btn">
              Search file for {appState.search_param} and replace with{" "}
              {appState.replacement_param}
            </button>
          )}

        {appState.showDownload && (
          <div className="download-container">
            <p>
              Search Term: {appState.search_param} was found {appState.count}{" "}
              times
            </p>
            <p>
              Replacement Term: {appState.replacement_param} was replaced{" "}
              {appState.count} times
            </p>
            <button className="download-btn" onClick={downloadHandler}>
              Download your edited file
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchAndReplaceForm;
