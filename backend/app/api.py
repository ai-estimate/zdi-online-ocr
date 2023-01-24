from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import (
    S3CreatePresignedUrlRequestModel,
    S3CreatePresignedUrlResponseModel,
)
from .services import S3Client

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post(
    "/create-presigned-url",
    tags=["S3"],
    response_model=S3CreatePresignedUrlResponseModel,
)
async def create_presigned_url(item: S3CreatePresignedUrlRequestModel) -> dict:
    res = S3Client.createPresignedUrl(
        filename=item.filename,
    )
    return S3CreatePresignedUrlResponseModel(data={"url": res})
