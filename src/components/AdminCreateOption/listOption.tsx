"use client";
import { BiUserPlus } from "react-icons/bi";
import React, { useEffect, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    backGroundColor: "#f0f0f0",
};

const styles = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    backGroundColor: "#f0f0f0",
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

export default function ListOption() {
    const [isShowModalCreate, setIsShowModalCreate] = React.useState(false);
    const [listTemplate, setListTemplate] = React.useState([])
    const [listLayer, setListLayer] = React.useState([])
    const [isShowModalLayer, setisShowModalLayer] = React.useState(false)
    const [formAd, setFormAd] = React.useState({})
    const [file, setFile] = React.useState<File | null>(null);
    const [listFunction, setListFunction] = React.useState([])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const image = new Image();
        image.src = URL.createObjectURL(file as Blob | MediaSource);
        image.onload = function () {
            console.log(image.width, image.height);
            setFormAd({
                ...formAd,
                width: image.width,
                height: image.height,
            });
        };
        setFile(file);
    };

    useEffect(() => {
        if (!isShowModalCreate) {
            setFormAd({});
            setFile(null);
        }
    }, [isShowModalCreate]);

    const uploadFile = async (file: File) => {
        const selectedFile = file;
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "vitamim"); // Replace with your Cloudinary upload preset

        return await fetch("https://api.cloudinary.com/v1_1/vitamim/image/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                return data.url;
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });
    };

    const handleFormAd = (e: any) => {
        setFormAd({
            ...formAd,
            [e.target.name]: e.target.value,
        });
        console.log(formAd)
    };

    const showModalTemplateLayer = () => {
        setisShowModalLayer(true);
    }

    const cancelModalTemplateLayer = () => {
        setisShowModalLayer(false);
    }

    const showModalCreate = () => {
        setIsShowModalCreate(true);
    };

    const cancelModalCreate = () => {
        setIsShowModalCreate(false);
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/template`)
            .then(res => res.json())
            .then(templates => {
                setListTemplate(templates)
            })
    }, [])

    const handleShowLayers = (template: any) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/layer/template/${template.id}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(layers => {
                setListLayer(layers)
            })
    }

    const addFunction = () => {
        const newListFunction = [
            ...listFunction,
        ];
        setListFunction(newListFunction);
        console.log(listFunction)
    }

    const setValueLayerID = (layer: any) => {

    }

    return (
        <div>
            <div className="container mx-auto flex justdify-between py-5 border-b">
                <div className="left flex gap-3">
                    <button onClick={showModalCreate} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
                        Add option{" "}
                        <span className="px-1">
                            <BiUserPlus size={22}></BiUserPlus>
                        </span>
                    </button>
                </div>
            </div>
            <div className="option-set-overlay position-relative">
                <div className="option-set-content">
                    <div className="option-set-title">Option set data</div>
                    <label htmlFor="set-title">Set title</label>
                    <input type="text" id="set-title" />
                    <p>Option set items</p>
                    {new Array(5).fill(0).map((_, index) => {
                        return (
                            <div key={index} className="item">
                                <span>{index + 1}</span> - <span>(image upload)</span>
                            </div>
                        );
                    })}
                    <button className="button position-absolute-button">Save</button>
                </div>
            </div>
            <Modal
                open={isShowModalCreate}
                onClose={cancelModalCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h2>Create new option</h2>
                        <div className="flex">
                            <div className="py-2">
                                <label>Option types:</label>
                                <div>
                                    <select
                                        id="option_type"
                                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block p-2.5"
                                    >
                                        <option value="image_upload">Image upload</option>
                                        <option value="text_input">Text input</option>
                                    </select>
                                </div>
                            </div>
                            <div className="py-2 margin-left">
                                <label>Option label:</label>
                                <input
                                    type="text"
                                    name="option-label"
                                    onChange={handleFormAd}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                                    placeholder="Option label"
                                ></input>
                            </div>
                        </div>
                        <div className="py-2">
                            <label>Help Text (HTML is allowed):</label>
                            <textarea
                                id="help-text"
                                name="help-text"
                                onChange={handleFormAd}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            ></textarea>
                        </div>
                        <div className="py-2">
                            {!file ? (
                                <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<ImageIcon />}>
                                    Upload image
                                    <VisuallyHiddenInput
                                        name="file"
                                        onChange={handleFileChange}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                    />
                                </Button>
                            ) : (
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="image"
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                            maxWidth: "200px",
                                            maxHeight: "200px",
                                            position: "relative",
                                            top: "0",
                                            left: "50%",
                                            transform: "translate(-50%,0)",
                                        }}
                                    />
                                    <span
                                        style={{
                                            position: "absolute",
                                            right: "-5px",
                                            top: "0px",
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "24px",
                                            fontFamily: "Arial",
                                        }}
                                        onClick={() => {
                                            setFile(null);
                                            setFormAd({
                                                ...formAd,
                                                width: 0,
                                                height: 0,
                                            });
                                        }}
                                    >
                                        X
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex">
                            {
                                listFunction.map((item) => (
                                    <>
                                        <div>
                                            <label>Function:</label>
                                            <div>
                                                <select
                                                    id="function_type"
                                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block p-2.5"
                                                >
                                                    <option value="image_upload">Image upload</option>
                                                    <option value="text_input">Text input</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="margin-left">
                                            <label>LayerID:</label>
                                            <input
                                                onClick={showModalTemplateLayer}
                                                type="number"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5"
                                                placeholder="LayerID"
                                            ></input>
                                        </div>
                                    </>
                                ))
                            }
                            <div>
                                <label>Function:</label>
                                <div>
                                    <select
                                        id="function_type"
                                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block p-2.5"
                                    >
                                        <option value="image_upload">Image upload</option>
                                        <option value="text_input">Text input</option>
                                    </select>
                                </div>
                            </div>
                            <div className="margin-left">
                                <label>LayerID:</label>
                                <input
                                    onClick={showModalTemplateLayer}
                                    type="number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5"
                                    placeholder="LayerID"
                                ></input>
                            </div>
                        </div>
                        <div className="py-2">
                            <button onClick={addFunction} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
                                Add
                            </button>
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
                        onClick={cancelModalCreate}
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
                    >
                        Create
                    </button>
                </Box>
            </Modal>
            <Modal
                open={isShowModalLayer}
                onClose={cancelModalCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="choose-template-box">
                            <h2>Select an template</h2>
                            <div className="w-full h-full flex p-2 white">
                                <div className="left-bar">
                                    <span>Template</span>
                                    {
                                        listTemplate.map((template: any, index) => (
                                            <span onClick={() => { handleShowLayers(template) }} className="template-item">{template.name}</span>
                                        ))
                                    }
                                    {/* <input type="text" placeholder="Search" /> */}

                                </div>
                                <div className="right-bar">
                                    <span>Layers</span>
                                    {
                                        listLayer.map((layer: any, index) => (
                                            <div className="flex template-item">
                                                <span className="template-item">{index + 1}#</span>
                                                <span onClick={() => { setValueLayerID(layer) }} className="template-item">{layer.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
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
                        onClick={cancelModalTemplateLayer}
                    >
                        Cancel
                    </button>
                </Box>
            </Modal>
        </div>
    );
}
