import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  data: any;
  onEditorStateChange?: () => void;
};

const QuillThinkPro = ({ data, onEditorStateChange }: Props) => {
  return (
    <ReactQuill
      theme="snow"
      value={data}
      onChange={onEditorStateChange}
      modules={{
        // toolbar: {
        // 	...QuillThinkPro.modules.toolbar,
        // 	handlers: {
        // 		//   image: handleImageUpload,
        // 	},
        // },
        ...QuillThinkPro.modules,
      }}
      placeholder="Type your description"
      formats={QuillThinkPro.formats}
      style={{
        height: "auto",
      }}
    />
  );
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
QuillThinkPro.modules = {
  toolbar: [
    // [{ header: '1' }, { header: '2' }, { font: [] }],
    // [{ size: [] }],
    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    // ["clean"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuillThinkPro.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

/*
 * PropType validation
 */

export default QuillThinkPro;
