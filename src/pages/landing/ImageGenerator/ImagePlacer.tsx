import React, { DragEvent, useState } from 'react';
import StarIcon from '../../../components/icons/StarIcon';

const ImageUpload = ({onUpload}: {onUpload: (file: File) => void}) => {
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);


    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        // Process the file here
        const files = e.dataTransfer.files;
        console.log(files[0]); // log the file or handle it as required
        if (files?.[0]) {
            onUpload(files[0])
        }
        (e.target as HTMLInputElement).value = '';

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            // You can handle the file upload process here
            onUpload(file)

        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();  // Trigger the file input when the button is clicked
    };

    return (
    <div 
        className={`
            w-[230px] h-[200px] bg-white bg-opacity-50 rounded-lg border-2 border-dashed ${dragOver ? 'border-black' : 'border-[#005695]'}
            flex flex-col items-center cursor-pointer p-3 justify-center
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
    >
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            id="fileUpload"
        />
        <div className="flex-col justify-center items-center mt-4 text-[#000]">
            <div className="font-thin flex items-center justify-center ">
                <div className="mx-2 ">
                    <StarIcon color={"black"} width={24} height={35}/>
                </div>
                <div>

                    Upiši u polje iznad kakvu sliku zamišljaš
                </div>
            </div>
            <div className='flex px-2 justify-center items-center my-2'>
                <hr  className="bg-black h-[1px]  w-full mr-2"/>ili<hr  className="bg-black h-[1px]  w-full ml-2"/>
            </div>
        </div>
        <button
            className="w-[190px] mt-3 bg-[#E5F4FE] p-4 rounded-lg hover:bg-blue-100 text-[#0090F8]"
            onClick={handleUploadClick}
        >
            ubaci sliku
        </button>
    </div>
    );
};

export default ImageUpload;
