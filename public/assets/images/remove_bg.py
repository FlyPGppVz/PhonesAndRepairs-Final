import sys
from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # Removing white background and creating transparent logo
    for item in datas:
        # A bit of tolerance for white (e.g., > 220, 220, 220)
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0)) # Fully transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print("Background removed and saved to " + output_path)

if __name__ == "__main__":
    remove_white_bg("logo-original.png", "logo-transparent.png")
