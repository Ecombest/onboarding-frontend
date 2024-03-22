"use client";
import AdminCreateOption from '@/components/AdminCreateOption'
import MenuBar from '@/components/Menu'
import AddTemplate from '@/components/Template'
import ListTemplate from '@/components/Template/listTemplate'
import EditTemplate from '@/components/Template/editTemplate'
import ImageCanvas from '@/components/Form/image'
import React from 'react'

export default function AdminOption() {
    const [isRefesh, setIsRefesh] = React.useState(false)

    return (
        <div>
            <AddTemplate setIsRefesh={setIsRefesh} />
            <ListTemplate setIsRefesh={setIsRefesh} isRefesh={isRefesh} />
        </div>
    )
}