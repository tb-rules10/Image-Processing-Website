import uvicorn
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.responses import Response
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import base64
from constants import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Invert Colors
@app.post("/api/invert-color")
async def invert_colors(file: UploadFile):
    # Return the inverted image as a Response object
    return Response(content=encode_image(invert_colors(read_image(file))), headers=headers)

# Flip Image
@app.post("/api/flip-image")
async def invert_colors(file: UploadFile):
    # Return the inverted image as a Response object
    return Response(content=encode_image(flip_image(read_image(file))), headers=headers)

def flip_image(image, flip_code=1):
    return cv2.flip(image, flip_code)

def invert_colors(image):
    # Invert the image colors using cv2
    return cv2.bitwise_not(image)

def read_image(file: UploadFile):
    print("--> Received file - ", file.filename)

    if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        raise HTTPException(status_code=400, detail="Invalid file format. Supported formats: JPG, JPEG, PNG")

    # Convert the uploaded image to a byte array
    image_bytes = file.file.read()
    # Create a numpy array from the byte array
    image_np = np.frombuffer(image_bytes, np.uint8)
    
    return cv2.imdecode(image_np, cv2.IMREAD_COLOR)


def encode_image(image, format=".png"):
    # Encode the image as bytes
    _, encoded_image = cv2.imencode(format, image)
    base64_encoded_image = base64.b64encode(encoded_image.tobytes()).decode("utf-8")
    return 'data:image/png;base64,{}'.format(base64_encoded_image)


# uvicorn main:app --reload --host 0.0.0.0 --port 5000