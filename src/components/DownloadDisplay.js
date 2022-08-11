import React from "react";

const DownloadDisplay = ({ appState, downloadHandler, resetForm }) => {
  return (
    <div className="download-container">
      <p>
        {appState.search_param} was found {appState.count} times
      </p>
      <p>
        {appState.replacement_param} took its place {appState.count} times
      </p>
      <button className="download-btn" onClick={downloadHandler}>
        Download your edited file
      </button>
      <button className="reset-btn" onClick={resetForm}>
        Try Again
      </button>
    </div>
  );
};

export default DownloadDisplay;
