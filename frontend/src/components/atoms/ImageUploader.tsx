import { ChangeEvent, ImgHTMLAttributes, useState } from "react";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholder: string;
  handleUpload: (file: File) => void;
}

export default function ImageUploader<T>({
  placeholder,
  handleUpload,
  ...rest
}: IProps) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState(placeholder);

  const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUrl(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-2 my-2 border-2 border-dashed border-gray-200 bg-gray-50 rounded">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        id="photo"
        className="hidden"
        onChange={handleImg}
      />
      <label htmlFor="photo" className="block min-h-20 cursor-pointer">
        <img
          src={url}
          {...rest}
          className="block max-w-full mx-auto object-cover w-32 h-32 border cursor-pointer rounded-full"
        />
      </label>
    </div>
  );
}
