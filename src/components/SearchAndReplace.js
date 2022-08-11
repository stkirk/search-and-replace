import React, { useState } from "react";
import { saveAs } from "file-saver";
import DownloadDisplay from "./DownloadDisplay";
import SearchAndReplaceForm from "./SearchAndReplaceForm";

const SearchAndReplace = () => {
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
        [e.target.name]: e.target.value.toString(),
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // pull the text out of the file
    appState.selectedFile
      .text()
      .then((text) => {
        // count occurences by splitting text on search term and counting gaps between indices
        const count = text.split(appState.search_param).length - 1;
        console.log("COUNT", text.split(appState.search_param));
        // make the necessary edits to original text
        const new_text = text.replaceAll(
          appState.search_param,
          appState.replacement_param
        );
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

  const resetForm = () => {
    setAppState(initialAppState);
  };

  return (
    <div className="search-replace-container">
      <SearchAndReplaceForm
        appState={appState}
        submitHandler={submitHandler}
        onChange={onChange}
      />

      {appState.showDownload && (
        <DownloadDisplay
          appState={appState}
          downloadHandler={downloadHandler}
          resetForm={resetForm}
        />
      )}
    </div>
  );
};

export default SearchAndReplace;
