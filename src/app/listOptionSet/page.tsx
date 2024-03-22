"use client";
import AddOptionSet from '@/components/AdminCreateOption/createOptionSet';
import ListOptionSet from '@/components/AdminCreateOption/listOptionSet';
import React from 'react'

export default function AdminOption() {
    const [isRefesh, setIsRefesh] = React.useState(false)

    return (
        <div>
            <AddOptionSet setIsRefesh={setIsRefesh} />
            <ListOptionSet setIsRefesh={setIsRefesh} isRefesh={isRefesh} />
        </div>
    )
}