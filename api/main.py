from typing import Union
import io
from PIL import Image

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

import torchvision.transforms.functional as TF

from model.transfer import run_style_transfer
from model.process import cnn_normalization_std, cnn_normalization_mean, cnn

from resize import resize_image
from preprocess import preprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
)

"""
    TODO: Add tweaks of values for number of steps and style weight from frontend
    Extract key-value pairs from request body
"""
@app.post("/")
async def root(input_image: UploadFile = File(...), style_image: UploadFile = File(...)):
    input_image_bytes = await input_image.read()
    style_image_bytes = await style_image.read()

    input_image_pil = Image.open(io.BytesIO(input_image_bytes))
    style_image_pil = Image.open(io.BytesIO(style_image_bytes))

    resized_input_image = resize_image(input_image_pil)
    resized_style_image = resize_image(style_image_pil)

    input_image_tensor = preprocess(resized_input_image)
    style_image_tensor = preprocess(resized_style_image)

    output_image = run_style_transfer(cnn, cnn_normalization_mean, cnn_normalization_std, input_image_tensor, style_image_tensor, input_image_tensor)
    output_i = output_image.squeeze().cpu().detach()  

    output_image_pil = TF.to_pil_image(output_i)

    img_byte_array = io.BytesIO()
    output_image_pil.save(img_byte_array, format="PNG")
    img_byte_array.seek(0)

    return StreamingResponse(io.BytesIO(img_byte_array.getvalue()), media_type="image/png")