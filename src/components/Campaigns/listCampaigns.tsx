"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiEdit, BiTrashAlt, BiUserPlus } from "react-icons/bi";
import Button from "@mui/material/Button";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ListCampaign(props: {
    isRefesh: boolean;
    setIsRefesh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [listCampaign, setListCampaign] = React.useState([])

    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign`)
            .then((res) => res.json())
            .then((listcampaign) => {
                setListCampaign(listcampaign)
            })
    }, [props.isRefesh])

    const handleDeleteCampaign = (campaign: any) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign/${campaign.id}`, {
            method: "DELETE"
        })
            .then(() => {
                toast.success("Delete successfull !");
                props.setIsRefesh((prev) => !prev);
            });
    }

    return (
        <div>
            <div className="container mx-auto flex justdify-between py-5 border-b">
                <div className="left flex gap-3">
                    <Link href="/addCampaign">
                        <button className="flex bg-blue-500 text-white px-4 py-2 ml-2 border rounded-md">
                            Add Campaigns{" "}
                            <span className="px-1">
                                <BiUserPlus size={22}></BiUserPlus>
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Artwork Name</TableCell>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            listCampaign.map((item: any, index) => (
                                <TableRow key="x" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.productId}</TableCell>
                                    <TableCell align="center">
                                        <Link href={`/editCampaign/${item.id}`}>
                                            <Button className="cursor">
                                                <BiEdit size={22}></BiEdit>
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleDeleteCampaign(item)}
                                            className="cursor"
                                        >
                                            <BiTrashAlt size={22}></BiTrashAlt>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}