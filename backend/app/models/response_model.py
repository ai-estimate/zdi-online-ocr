from pydantic import BaseModel


class S3CreatePresignedUrlResponseModel(BaseModel):
    code: str = "SUCCESS"
    message: str = "success"
    data: dict = {}

    class Config:
        schema_extra = {
            "example": {
                "code": "SUCCESS",
                "message": "success",
                "data": {
                    "url": "https://mybucket.s3.amazonaws.com",
                },
            }
        }
