from PIL import Image
import os

def reduce_resolution_by_half(input_folder, output_folder):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Loop through files in input folder
    for filename in os.listdir(input_folder):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            # Open image
            img_path = os.path.join(input_folder, filename)
            img = Image.open(img_path)
            
            # Get new dimensions
            new_width = img.width // 2
            new_height = img.height // 2
            
            # Resize image
            resized_img = img.resize((new_width, new_height))
            
            # Save resized image to output folder
            output_path = os.path.join(output_folder, filename)
            resized_img.save(output_path)
            print(f"Resized {filename} and saved as {output_path}")

# Example usage
if __name__ == "__main__":
    input_folder = "./examples"
    output_folder = "./resized_examples"
    reduce_resolution_by_half(input_folder, output_folder)
