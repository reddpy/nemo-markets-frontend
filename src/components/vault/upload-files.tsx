import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const UploadFilesForm = () => {
  const [filesList, setFilesList] = useState(Array);
  const fileInputRef: any = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const changeHandler = (e: any) => {
    e.preventDefault();
    console.log("files selected==>", e.target.files);
    const files = Array.from(e.target.files);

    setFilesList(files);
  };

  const removeFileHandler = (file_to_remove: File, idx: number) => {
    const new_files_list = filesList.filter((file_obj) => {
      return file_obj != file_to_remove;
    });

    setFilesList(new_files_list);
  };

  const uploadFiles = async () => {
    filesList.map(async (file_obj) => {
      const { data, error } = await supabase.storage
        .from("/assets/1")
        .upload(file_obj.name, file_obj);

      console.log("uploaded file===>", data, error);
    });
  };

  const file_output = filesList.map((files_obj: any, index) => {
    return (
      <>
        <div
          key={index}
          className="flex flex-row mt-2 max-w-[400px] hover:bg-slate-500 rounded-xl"
        >
          <p className="pt-2 max-w-[200px]">{files_obj.name}</p>
          <Button
            className="ml-4"
            onClick={() => removeFileHandler(files_obj, index)}
          >
            Remove
          </Button>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Button color="primary" onClick={handleClick}>
          Select Files
        </Button>
        <input
          onSubmit={(e) => e.preventDefault()}
          id="files"
          type="file"
          multiple
          onChange={changeHandler}
          hidden
          ref={fileInputRef}
          //   value={filesList}
        />
      </div>
      {file_output}
      <Button onClick={uploadFiles}>Upload!</Button>
    </>
  );
};

export default UploadFilesForm;
