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
import { OptionSetInterface } from "./listOption";

export default function ListOptionSet(props: {
  isRefesh: boolean;
  setIsRefesh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [optionSets, setOptionsets] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/option-set`)
      .then((res) => res.json())
      .then((optionsSets) => {
        setOptionsets(optionsSets);
      });
  }, [props.isRefesh]);

  const handleDelTemplate = (optionset: OptionSetInterface) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/option-set/${optionset.id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("Delete successfull !");
      props.setIsRefesh((prev) => !prev);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Update At</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {optionSets.map((optionSet: any) => (
            <>
              <TableRow key="x" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">{optionSet.name}</TableCell>
                <TableCell align="center">{optionSet.createdAt}</TableCell>
                <TableCell align="center">{optionSet.updatedAt}</TableCell>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">
                  <Link href={`/editOptionSet/${optionSet.id}`}>
                    <Button className="cursor">
                      <BiEdit size={22}></BiEdit>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      handleDelTemplate(optionSet);
                    }}
                    className="cursor"
                  >
                    <BiTrashAlt size={22}></BiTrashAlt>
                  </Button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
