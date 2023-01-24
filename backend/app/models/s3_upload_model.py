from pydantic import BaseModel


class S3CreatePresignedUrlRequestModel(BaseModel):
    filename: str
