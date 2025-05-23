function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

function Preview({ file, clearFile }) {
  if (!file) return null; 

  function removeFile(){
    clearFile();
  }
  return (
    <div className="previewDiv">
      <img alt="Thumbnail" src="./src/assets/file-icon.png" /> 
      <p className="fileName">{file.name}</p>
      <p className="fileSize">({formatFileSize(file.size)})</p>
      <button onClick={removeFile}>❌</button>
    </div>
  );
}

export default Preview;
