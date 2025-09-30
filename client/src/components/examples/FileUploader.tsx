import { FileUploader } from "../FileUploader";

export default function FileUploaderExample() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <FileUploader onFileUpload={(data) => console.log("File uploaded:", data)} />
    </div>
  );
}
