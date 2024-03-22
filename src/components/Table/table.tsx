"use client";
import { BiEdit, BiTrashAlt } from "react-icons/bi"
import React from "react";
import { User } from "@/interface/users.interface"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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


export default function Table(){
    const [users, setUsers] = React.useState<User[]>([])
    const [userCur, setUserCur] = React.useState(null)
    const [isUpdate, setIsUpdate] = React.useState(true)
    
    // const [isModalOpen, setIsModalOpen] = React.useState(false)
    React.useEffect(() => {
        fetch('http://192.168.1.222:3000/employees')
            .then(res => res.json())
            .then(users => {
                setUsers(users)
            },
        )
    }, [isUpdate])

    const handleDeleteUser = (user) => {
        fetch(`http://192.168.1.222:3000/employees/${user.employeeId}`, {
            method: 'DELETE'
        })
    }

    const handleUpdateUser = (user) => {
        fetch(`http://192.168.1.222:3000/employees/${user.employeeId}`, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...user,
                age: Number(user.age),
            })
        })
        .then(() => {
            setIsUpdate(!isUpdate)
        })
    }

    const ShowModal = (user) => {
        setUserCur(user)
    }

    const handleCancel = () => {
        setUserCur(null);
    }

    return (
        <div>
            <table className="min-w-full table-auto"> 
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">ID</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">HireDate</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Department</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Age</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Status</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Action</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                {users.map((user) => (
                    <tr key={user.id} className="text-center">
                        <td className="px-16 py-2">
                            <span>{user.fullName}</span>
                        </td>
                        <td className="px-16 py-2">
                            <span>{user.employeeId}</span>
                        </td>
                        <td className="px-16 py-2">
                            <span>{user.hireDate}</span>
                        </td>
                        <td className="px-16 py-2">
                            <span>{user.department}</span>
                        </td>
                        <td className="px-16 py-2">
                            <span>{user.age}</span>
                        </td>
                        <td className="px-16 py-2">
                            <span>{user.active}</span>
                        </td>
                        <td className="px-16 py-2 flex justify-around gap-4">
                        <Button className="cursor" onClick={() => {ShowModal(user)}}><BiEdit size={22}></BiEdit></Button>
                        <Button className="cursor" onClick={()=>{handleDeleteUser(user)}}><BiTrashAlt size={22}></BiTrashAlt></Button>
                        </td>
                    </tr>
                    // console.log(user)
                ))}
            </tbody>
        </table>
        <Modal
                open={userCur != null}
                onClose={handleCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update User
                </Typography>
                <div className="input-type py-3">
                    <span> Name </span>
                    <input type="text" onChange={(e) => {setUserCur({...userCur, fullName: e.target.value})}} value={userCur?.fullName} name="fullName" className="border w-full px-5 py-3 focus:outline-none rounded-md"/>
                </div>
                <div className="input-type py-3">
                    <span> Age </span>
                    <input type="number" onChange={(e) => {setUserCur({...userCur, age: e.target.value})}} value={userCur?.age}  name="age" className="border w-full px-5 py-3 focus:outline-none rounded-md"></input>
                </div>
                <div className="input-type py-3">
                    <span> Department </span>
                    <input type="text" onChange={(e) => {setUserCur({...userCur, department: e.target.value})}} value={userCur?.department}  className="border w-full px-5 py-3 focus:outline-none rounded-md"></input>
                </div>
                <div className="input-type py-3">
                    <span> HireDate </span>
                    <input type="text" onChange={(e) => {setUserCur({...userCur, hireDate: e.target.value})}} value={userCur?.hireDate}  className="border w-full px-5 py-3 focus:outline-none rounded-md"></input>
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
                }} onClick={() => handleUpdateUser(userCur)}>Update</button>
                </Box>
            </Modal>
        </div>
    )
}