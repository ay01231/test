from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi import File, UploadFile
import os

app = FastAPI()

origins = [
    "http://localhost:8000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_location = f"./uploaded_files/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(await file.read())
    return {"message": "File has been uploaded successfully"}

@app.get("/download")
async def download_file():
    file_path = "./uploaded_files/example.txt"  
    if os.path.isfile(file_path):
        return FileResponse(path=file_path, filename="example.txt")
    return {"error": "File not found."}
