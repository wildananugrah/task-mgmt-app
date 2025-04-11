import { useState } from "react";

export default function TestSlideInDrawerButtons(props: {
    setOpenRight: any
}) {
    const { setOpenRight } = props;
    return (
        <>
            <button
                onClick={() => setOpenRight(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
                Open Right Drawer
            </button>
        </>
    )
}