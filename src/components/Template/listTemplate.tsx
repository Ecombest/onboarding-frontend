"use client";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BiEdit, BiTrashAlt, BiUserPlus } from "react-icons/bi"
import Button from '@mui/material/Button';
import Link from 'next/link'
import { toast } from 'react-toastify';

export default function ListTemplate(props: { isRefesh: boolean, setIsRefesh: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [templates, setTemplates] = React.useState([])

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/template`)
      .then(res => res.json())
      .then(templates => {
        setTemplates(templates)
      })
  }, [props.isRefesh])

  const handleDelTemplate = (template) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/template/${template.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        toast.success('Delete successfull !')
        props.setIsRefesh((prev) => !prev)
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Artwork Name</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Update At</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template: any) => (
            <>
              <TableRow
                key='x'
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{template.name}</TableCell>
                <TableCell align="center">{template.name}</TableCell>
                <TableCell align="center">{template.createdAt}</TableCell>
                <TableCell align="center">{template.updatedAt}</TableCell>
                <TableCell align="center">
                  <Link href={`/editTemplate/${template.id}`}>
                    <Button className="cursor"><BiEdit size={22}></BiEdit></Button>
                  </Link>
                  <Button onClick={() => { handleDelTemplate(template) }} className="cursor"><BiTrashAlt size={22}></BiTrashAlt></Button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}