"use client";
import { BiUserPlus } from "react-icons/bi";
import React, { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddTemplate(props: { setIsRefesh: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isShowModal, setIsShowModal] = React.useState(false);
  const [formAd, setFormAd] = React.useState({});

  const router = useRouter();

  const showModal = () => {
    setIsShowModal(true);
  };

  const cancelModal = () => {
    setIsShowModal(false);
  };

  const handleFormAd = (e: any) => {
    setFormAd({
      ...formAd,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileAd = (e: any) => {
    setFormAd({
      ...formAd,
      imageUrl: e,
    });
  };

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "vitamim"); // Replace with your Cloudinary upload preset

    fetch("https://api.cloudinary.com/v1_1/vitamim/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return handleFileAd(data.url as string);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleSubmit = (e: any) => {
    fetch("http://192.168.1.222:3000/template", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formAd,
        width: Number(formAd.width),
        height: Number(formAd.height),
      }),
    }).then(() => {
      toast.success("Create successfull !");
      props.setIsRefesh((prev) => !prev);
    });
    setIsShowModal(false);
  };

  return (
    <div>
      <div className="container mx-auto flex justdify-between py-5 border-b">
        <div className="left flex gap-3">
          <button onClick={showModal} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
            Add template{" "}
            <span className="px-1">
              <BiUserPlus size={22}></BiUserPlus>
            </span>
          </button>
        </div>
      </div>
      <Modal
        open={isShowModal}
        onClose={cancelModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Template
            <div className="py-2">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleFormAd}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Option label"
              ></input>
            </div>
            <div className="flex">
              <div>
                <label>Width</label>
                <input
                  type="number"
                  name="width"
                  onChange={handleFormAd}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5"
                  placeholder="Max length"
                ></input>
              </div>
              <div className="px-4">
                <label>Height</label>
                <input
                  type="number"
                  name="height"
                  onChange={handleFormAd}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5"
                  placeholder="Max length"
                ></input>
              </div>
            </div>
            <div className="py-3">
              <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<ImageIcon />}>
                Upload image
                <VisuallyHiddenInput name="file" onChange={uploadFile} type="file" accept="image/png, image/jpeg" />
              </Button>
            </div>
          </Typography>
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              textAlign: "center",
              padding: "20px",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",
              borderRadius: "12px",
            }}
            onClick={cancelModal}
          >
            Cancel
          </button>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              textAlign: "center",
              padding: "20px",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",
              borderRadius: "12px",
            }}
            onClick={handleSubmit}
          >
            Create
          </button>
        </Box>
      </Modal>
    </div>
  );
}
