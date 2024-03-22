"use client";
import {BiUserPlus} from 'react-icons/bi'
import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Form(){
    const [form, setForm] = React.useState({})
    const [modalAddUser, setModalAddUser] = React.useState(false)

    const showModal = () => {
        setModalAddUser(true)
    }

    const handleCancel = () => {
        setModalAddUser(false)
    }

    const handlesetForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        // e.preventDefault()
        fetch('http://192.168.88.37:3000/employees', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...form,
                age: Number(form.age),
                active: Number(form.active)
            })
        })
        console.log(form)
    }

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4 py-5" onSubmit={handleSubmit}>
            <div>
                <button onClick={() => {showModal()}} className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
                    Add User <span className="px-1"><BiUserPlus size={22}></BiUserPlus></span>
                </button>
            </div>
            <Modal
                open={modalAddUser}
                onClose={handleCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create User
                </Typography>
                <div className="input-type py-3">
                    <span> Name </span>
                    <input type="text" onChange={handlesetForm} name="fullName" className="border w-full px-5 py-3 focus:outline-none rounded-md"/>
                </div>
                <div className="input-type py-3">
                    <span> IdUser </span>
                    <input type="text" onChange={handlesetForm} name="employeeId" className="border w-full px-5 py-3 focus:outline-none rounded-md"/>
                </div>
                <div className="input-type py-3">
                    <span> Age </span>
                    <input type="number" onChange={handlesetForm} name="age" className="border w-full px-5 py-3 focus:outline-none rounded-md"></input>
                </div>
                <div className="input-type py-3">
                    <span> Department </span>
                    <input type="text" onChange={handlesetForm} name="department" className="border w-full px-5 py-3 focus:outline-none rounded-md"></input>
                </div>
                <div className="input-type py-3">
                    <span> HireDate </span>
                    <input type="text" onChange={handlesetForm} name="hireDate" className="border w-full px-5 py-3 focus:outline-none rounded-md"></input>
                </div>
                <div>
                    <div className="form-check">
                        <input type="radio" onChange={handlesetForm} value={1} id="Active1" name="active"></input>
                        <label htmlFor="Active1" className="px-3">
                            Active
                        </label>
                    </div>
                    <div className="form-check">
                        <input type="radio" onChange={handlesetForm} value={0} id="De-Active1" name="active"></input>
                        <label htmlFor="De-Active1" className="px-3">
                            De-active
                        </label>
                    </div>
                </div>
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
                }} onClick={handleCancel}>Cancel</button>
                <button style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    textAlign: 'center',
                    padding: '20px',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '12px'
                }} onClick={handleSubmit}>Create</button>
                </Box>
            </Modal>
        </form>
    )
}