from PIL import Image

def resize_image(input_image):
    width, height = input_image.size
    if width > height:
        left = (width - height) / 2
        right = (width + height) / 2
        top = 0
        bottom = height
    else:
        left = 0
        right = width
        top = (height - width) / 2
        bottom = (height + width) / 2

    input_image = input_image.crop((left, top, right, bottom))
    input_image = input_image.resize((650, 650), Image.ANTIALIAS)
    return input_image