import { useRef } from "react";

const UploadPhotoButton = ({ onUpload }: { onUpload: (file: File) => void}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            onUpload(file)
        }
        (event.target as HTMLInputElement).value = '';
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };


    return (
        <div className="w-full">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                id="fileUpload"
            />
            <button className="bg-[#E5F4FE] w-full h-[50px] sm:w-[200px] sm:ml-4 rounded-full hover:bg-blue-100 text-[#0090F8] shadow-md" onClick={handleUploadClick}>Ubaci sliku</button>
        </div>
    )
}

export default UploadPhotoButton