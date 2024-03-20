"use client";
import { BiUserPlus } from 'react-icons/bi'
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AdminCreateOption() {
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
                        Add new option <span className="px-1"><BiUserPlus size={22}></BiUserPlus></span>
                    </button>
                </div>
            </div>
            <Modal
                open={isShowModalCreate}
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
                        <div className="space-x-2">
                            <input type="checkbox" /><label>Required</label>
                        </div>
                        <div className="space-x-2">
                            <input type="checkbox" /><label>Is Hidden ?</label>
                        </div>
                        <div className="space-x-2">
                            <input type="checkbox" /><label>Is Textarea?</label>
                        </div>
                        <div className="py-3">
                            <label>Help Text (HTML is allowed):</label>
                            <textarea id="help-text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            </textarea>
                        </div>
                        <div>
                            <label>Placeholder</label>
                            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5' placeholder='Placeholder'></input>
                        </div>
                        <div>
                            <label>Default value</label>
                            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5' placeholder='Default value'></input>
                        </div>
                        <div>
                            <label>Max length</label>
                            <input type='number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-50 p-2.5' placeholder='Max length'></input>
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
        </div>
    )
}