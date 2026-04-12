import os
import re

def update_logo_refs():
    root_dir = r"c:\Users\Flypg\Desktop\Nuevo_tema\PhonesAndRepairs-Final"
    for filename in os.listdir(root_dir):
        if filename.endswith(".html"):
            path = os.path.join(root_dir, filename)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Update alt text and any other references to the old branding if found in the header logo tag
            new_content = content.replace('alt="PhoneAndRepairs Logo"', 'alt="CellphonesAndRepair Logo"')
            new_content = new_content.replace('data-alt="Professional PhoneAndRepairs brand logo in red and blue"', 'data-alt="Professional CellphonesAndRepair brand logo"')
            
            if new_content != content:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {filename}")

if __name__ == "__main__":
    update_logo_refs()
