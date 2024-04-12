import React, { useState } from 'react';
import ModalFileViewer from './ModalFileViewer';
import EmptyState from './EmptyState';

interface DocumentsListProps {
    files: string[];
}

const DocumentsList: React.FC<DocumentsListProps> = ({ files }: DocumentsListProps) => {
    const [showFile, setShowFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");

    const onFileView = (file: string) => {
        setSelectedFile(file);
        setShowFile(true);
    }

    return (
        <div className="rounded-sm border border-stroke bg-white pt-3 pb-2.5 mr-75 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="text-title-sm2 font-bold pt-3 pb-5 text-black dark:text-white"><h2> Supporting Documents</h2></div>
            {files.length !== 0 ?
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4 px-50 ">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Document Type
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Document Name
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file: any, index: number) => (
                            <tr key={index} className=" text-left dark:bg-meta-4">
                                <td className="border-b border-[#eee] py-4 px-4 pl-12 dark:border-strokedark">
                                    <p className="font-medium text-black dark:text-white">{file.category.coding[0].code}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="font-medium text-black dark:text-white">
                                        {decodeURIComponent(file.valueAttachment.url).split("/").at(-1) || "Document"}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 pl-12 dark:border-strokedark" style={{ display: 'flex', gap: '10px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6" onClick={() => onFileView(file.valueAttachment.url)}>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <a href={file.valueAttachment.url} download>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <EmptyState
                    title="No Documents Found"
                    description="No documents have been added to this claim."
                />
            }
            {showFile &&
                <ModalFileViewer file={selectedFile} onClose={() => setShowFile(false)} />
            }
        </div>
    );
};

export default DocumentsList;