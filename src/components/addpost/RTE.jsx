import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../../conf/conf";

const RTE = ({ name, control, defaultValue = "" }) => {
  return (
    <Controller
      name={name || "content"}
      control={control}
      render={({ field: { onChange } }) => (
        <Editor
          apiKey={conf.rteApiKey}
          initialValue={defaultValue}
          init={{
            branding: false,
            height: 300,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar: [
              "undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help ",
            ],
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={onChange}
        />
      )}
    ></Controller>
  );
};

export default RTE;
