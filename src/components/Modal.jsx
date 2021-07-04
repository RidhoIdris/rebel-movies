import React from 'react'
import { FiX } from "react-icons/fi";

export default function Modal({show,close,url}) {
    return (
        <>
            {(()=>{
                if (show) {
                    return(
                        <div className={`fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="flex items-center justify-center min-h-screen px-8 lg:px-4">
                
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                
                                <div className="bg-main rounded-lg shadow-xl transform max-w-screen-lg w-full p-4 relative">
                                    <div onClick={()=>{close()}} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-700 text-white flex items-center justify-center cursor-pointer">
                                        <FiX className=""/>
                                    </div>
                                    <div className="">
                                        <iframe title="titsd" className="w-full" style={{height:"60vh"}} src={`https://www.youtube.com/embed/${url}?autoplay=1`} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })()}
        </>
    )
}
