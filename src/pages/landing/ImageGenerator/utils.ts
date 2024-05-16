export function convertFileToSrc(file: File | null, callback: (src: string | ArrayBuffer | null) => void): void {
    // Ensure that the file is provided
    if (file === null) {
        callback(null)
        return;
    }

    // Initialize a new instance of FileReader
    const reader: FileReader = new FileReader();

    // Define what happens on successful data read
    reader.onload = (event: ProgressEvent<FileReader>): void => {
        // Use nullish coalescing to ensure we never pass undefined to the callback
        const result = event.target?.result ?? null;
        callback(result); // Now correctly handles undefined by converting it to null
    };

    // Define what happens in case of error
    reader.onerror = (): void => {
        console.error('Error reading file.');
        reader.abort();
    };

    // Read the file as a Data URL
    reader.readAsDataURL(file);
}   
