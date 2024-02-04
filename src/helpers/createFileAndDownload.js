export default function createFileAndDownload({ content, fileName, fileType }) {
    const blob = new Blob([content], { type: fileType });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }