from typing import Union
import io
from PIL import Image

# Import necessary libraries
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

import torchvision.transforms.functional as TF

from model.transfer import run_style_transfer
from model.process import cnn_normalization_std, cnn_normalization_mean, cnn

from resize import resize_image
from preprocess import preprocess

# Setup the FastAPI server
app = FastAPI()

# Setup CORS middleware to allow all origins and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
)

# Root endpoint for the app which is an asynchronous function
@app.post("/")
async def root(request: Request, input_image: UploadFile = File(...), style_image: UploadFile = File(...)):
    """
    Endpoint for processing images with style transfer.

    This endpoint accepts two images (input and style images) via file upload,
    processes them using a neural style transfer model, and returns the
    stylized image as a PNG.

    Parameters:
    - request (Request): The request object.
    - input_image (UploadFile): The input image file.
    - style_image (UploadFile): The style image file.

    Returns:
    - StreamingResponse: The stylized image in PNG format.
    """
    
    # Read both input and style image from the frontend
    input_image_bytes = await input_image.read()
    style_image_bytes = await style_image.read()
    
    # Configurations
    number_of_steps = int(await request.form()['numOfSteps'])
    style_weight = float(await request.form()['styleWeight'])

    # Convert binary input images into bytes and open as PIL images
    input_image_pil = Image.open(io.BytesIO(input_image_bytes))
    style_image_pil = Image.open(io.BytesIO(style_image_bytes))

    # Resize the images with regards to the setup of the model (VGG19)
    resized_input_image = resize_image(input_image_pil)
    resized_style_image = resize_image(style_image_pil)

    # Convert images to tensors
    input_image_tensor = preprocess(resized_input_image)
    style_image_tensor = preprocess(resized_style_image)

    # Feed the images to the model
    output_image = run_style_transfer(
        cnn, cnn_normalization_mean, cnn_normalization_std,
        input_image_tensor, style_image_tensor,
        input_image_tensor, number_of_steps, style_weight
    )
    
    output_i = output_image.squeeze().cpu().detach()
    output_image_pil = TF.to_pil_image(output_i)

    # Convert the PIL image to a byte array
    img_byte_array = io.BytesIO()
    output_image_pil.save(img_byte_array, format="PNG")
    img_byte_array.seek(0)

    # Return the image in a StreamingResponse format
    return StreamingResponse(io.BytesIO(img_byte_array.getvalue()), media_type="image/png")
