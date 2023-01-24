import logging

import boto3
from botocore.client import Config

from ..config import settings


class S3Client:
    client = boto3.client(
        "s3",
        region_name=settings.aws_region_name,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
        config=Config(signature_version="s3v4"),
    )

    @classmethod
    def createPresignedUrl(
        cls,
        filename: str,
        file_type: str,
        expiration=3600,
    ):
        try:
            response = cls.client.generate_presigned_url(
                "put_object",
                Params={
                    "Bucket": settings.aws_s3_bucket_name,
                    "Key": filename,
                    "ContentType": file_type,
                    "ACL": "public-read",
                },
                ExpiresIn=expiration,
            )
        except Exception as e:
            print(e)
            logging.error(e)
            return "Error"
        # The response contains the presigned URL
        return response
        # return cls.client.generate_presigned_post(
        #     Bucket=settings.aws_s3_bucket_name,
        #     Key=filename,
        #     Conditions=[{"acl": "public-read"}, {"Content-Type": file_type}],
        #     ExpiresIn=expiration,
        #     Fields=fields,
        # )
