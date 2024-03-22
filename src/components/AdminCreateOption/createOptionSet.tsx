"use client";
import { BiUserPlus } from 'react-icons/bi'
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';

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

export default function AddOptionSet(props: { setIsRefesh: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isShowModalCreate, setIsShowModalCreate] = React.useState(false)
    const [formAd, setFormAd] = React.useState({})

    const showModalCreate = () => {
        setIsShowModalCreate(true)
    }

    const cancelModalCreate = () => {
        setIsShowModalCreate(false)
    }

    const handleFormAd = (e: any) => {
        setFormAd({
            ...formAd,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/option-set`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formAd,
            })
        })
            .then(() => {
                toast.success('Create successfull !')
                props.setIsRefesh((prev) => !prev)
            })
        setIsShowModalCreate(false)
    }

    return (
        <div>
            <div className="container mx-auto flex justdify-between py-5 border-b">
                <div className="left flex gap-3">
                    <button onClick={showModalCreate} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
                        Add option set <span className="px-1"><BiUserPlus size={22}></BiUserPlus></span>
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
                        New OptionSet
                        <div className="py-2">
                            <label>Set title</label>
                            <input onChange={handleFormAd} type="text" name='name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' placeholder='Option set title'></input>
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
                    }} onClick={handleSubmit}>Create</button>
                </Box>
            </Modal>
        </div>
    )
}