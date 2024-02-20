import { setSuccess } from "@/store/ai";
import { useAppDispatch } from "@/store/store";
import SimpleButton from "@/utils/Button/SimpleButton";
import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";

const AddText = ({ top, title, width, change }) => {
  return (
    <div
      className="w-[100%] "
      style={{
        width: width ? width : "100%",
        marginTop: top,
      }}
    >
      <p className="text-[14px] font-medium tracking-wide text-[#8a9099]">
        {title}*
      </p>
      <input
        onChange={(e) => {
          change(e.target.value);
        }}
        type="text"
        className="w-[100%] bg-white text-[#3f434a] border-[#e8e9eb] border-[2px] mt-[10px] rounded-[13px] py-[10px] tracking-wide text-[14px] font-medium px-[14px] h-[38px] outline-none"
      />
    </div>
  );
};

const Uploads = ({ cancel, leadId, id, owners, refresh, setBool }) => {
  const [file, setFile] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [dragActive, setDragActive] = React.useState(false);
  const [loading, setLoading] = useState(false);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    setFile(e[0]);
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);

      setFile(e.target.files[0]);
      setFileSelected(true);
    }
  };
  const inputRef = React.useRef(null);

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const dispatch = useAppDispatch();

  const [submitStart, setSubmitStart] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setAccessToken(localStorage.getItem("access-token") || "");
    }
  }, []);

  const submit = async () => {
    if (submitStart) {
      setSubmitStart(false);
      setLoading(true);
      try {
        if (file) {
          const formData = new FormData();
          // formData.append("userId", owners);
          formData.append("leadId", leadId);
          formData.append("title", "file-1");
          formData.append("file", file);
          formData.append("activeCallId", id);

          const res = await axios
            .post(
              `${baseUrl}api/call-script/create?activeCallId=${id}`,
              formData,
              { headers: { Authorization: accessToken } }
            )
            .then((e) => {
              refresh();
              setBool(false);
              dispatch(
                setSuccess({
                  show: true,
                  success: e.data.message ?? "Script Added Successfully!",
                })
              );
              cancel();
            });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[100%] h-[100%]  py-[30px] pl-[40px] pr-[40px]  relative">
      <h1 className="text-[#3f434a] text-[31px] font-medium  mb-[24px] tracking-[1px]">
        Upload file
      </h1>
      {file && (
        <p className="text-[#3f434a] mt-4">File selected: {file.name}</p>
      )}
      <Dropzone
        onDrop={handleDrop}
        // onDragEnter={() => setDropzoneActive(true)}
        // onDragLeave={() => setDropzoneActive(false)}
        // accept={{
        //   "application/pdf": [],
        // }}
        onDragEnter={() => setDropzoneActive(true)}
        onDragLeave={() => setDropzoneActive(false)}
        accept={{
          "application/pdf": [],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            id="form-file-upload"
            className="w-[100%] h-[250px] mt-[30px]"
          >
            <input
              // accept="application/pdf"
              ref={inputRef}
              {...getInputProps()}
              onChange={handleChange}
            />
            <label
              id="label-file-upload"
              htmlFor="input-file-upload"
              className={dragActive ? "drag-active" : ""}
            >
              <div>
                <Image
                  src="/PDF.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="mx-auto"
                />
                <p className="text-[#000] mt-[30px] ">
                  Drop or{" "}
                  <span className="underline cursor-pointer text-bg-red">
                    Browse
                  </span>{" "}
                  to upload your file.
                </p>
              </div>
            </label>
          </div>
        )}
      </Dropzone>
      <div className="custom-scroll-black w-[100%] pb-[60px] overflow-y-auto ">
        <div className="absolute right-[40px] bottom-[40px] mt-[130px] flex ">
          <SimpleButton
            theme={2}
            text={"Cancel"}
            left={20}
            right={0}
            click={() => {
              cancel();
            }}
          />
          <SimpleButton
            theme={1}
            text={loading ? "Loading..." : "Complete"}
            left={20}
            right={0}
            click={submit}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Uploads);
