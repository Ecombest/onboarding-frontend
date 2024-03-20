import AppProvider from "@/context/app.provider";
import {BiUserPlus} from 'react-icons/bi'
import Table from "@/components/Table/table";
import Form from "@/components/Form/form";
export default function Home() {
  return (
    <main>
      <h1 className="text-xl md:text-5xl text-center font-bold py-20">Onboarding User Management</h1>
      <div className="container mx-auto flex justdify-between py-5 border-b">
        <div className="left flex gap-3">
          {/* <button className="flex bg-blue-500 text-white px-4 py-2 border rounded-md">
            Add User <span className="px-1"><BiUserPlus size={22}></BiUserPlus></span>
          </button> */}
        </div>
      </div>

      {/* form */}
      <div className="container mx-auto">
        <Form></Form>
      </div>

      {/* table */}
      <div className="container mx-auto">
        <Table></Table>
      </div>

    </main>
  );
}
