"use client";
import { BiUserPlus } from 'react-icons/bi'
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ListOption() {
    const [isShowModalCreate, setIsShowModalCreate] = React.useState(false)

    const showModalCreate = () => {
        setIsShowModalCreate(true)
    }

    const cancelModalCreate = () => {
        setIsShowModalCreate(false)
    }

    return (
        <div>
            <div className="container mx-auto flex justdify-between py-5 border-b">
                <div className="left flex gap-3">
                    <button onClick={showModalCreate} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
                        Add option <span className="px-1"><BiUserPlus size={22}></BiUserPlus></span>
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
                    <button className='button position-absolute-button'>
                        Save
                    </button>
                </div>
            </div>
            <Modal
                // open={isShowModalCreate}
                onClose={cancelModalCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create new option
                        <div className="py-2">
                            <label>Option types:</label>
                            <div>
                                <select id="option_type" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                                    <option value="text_input">Text input</option>
                                    <option value="dropdown">Dropdown</option>
                                    <option value="swatch">Swatch</option>
                                    <option value="image_upload">Image upload</option>
                                    <option value="calendar">Calendar</option>
                                    <option value="extension">Extension</option>
                                    <option value="template">Template</option>
                                </select>
                            </div>
                        </div>
                        <div className="py-2">
                            <label>Option label:</label>
                            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' placeholder='Option label'></input>
                        </div>
                        <div className="py-2">
                            <label>Help Text (HTML is allowed):</label>
                            <textarea id="help-text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            </textarea>
                        </div>
                        <div className='py-2'>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<ImageIcon />}
                            >
                                Default image
                                <VisuallyHiddenInput name="file" type="file" accept='image/png, image/jpeg' />
                            </Button>
                        </div>
                        <div className='py-2 flex justify-space'>
                            <div>
                                <label>Button label:</label>
                                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5' placeholder='Button label'></input>
                            </div>
                            <div>
                                <label>Image min width:</label>
                                <input type='number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5' placeholder='Image min width'></input>
                            </div>
                            <div>
                                <label>Image min height:</label>
                                <input type='number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5' placeholder='Image min height'></input>
                            </div>
                        </div>
                        <div>
                            <label>Function:</label>
                            <div>
                                <select id="function_type" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                                    <option value="image_upload">Image upload</option>
                                    <option value="text_input">Text input</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>LayerID:</label>
                            <input type='number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5' placeholder='Image min height'></input>
                        </div>
                    </Typography>
                    <button style={{
                        backgroundColor: 'green',
                        color: 'white',
                        textAlign: 'center',
                        padding: '20px',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '12px'
                    }} onClick={cancelModalCreate}>Cancel</button>
                    <button style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        textAlign: 'center',
                        padding: '20px',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '12px',
                    }}>Create</button>
                </Box>
            </Modal>
            <Modal
                open={isShowModalCreate}
                onClose={cancelModalCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div>
                            Select an template
                        </div>
                        <div className='w-full h-full flex'>
                            <div>
                                Template
                            </div>
                            <div>
                                Layers
                            </div>
                        </div>

                    </Typography>

                </Box>
            </Modal>
        </div>
    )
}