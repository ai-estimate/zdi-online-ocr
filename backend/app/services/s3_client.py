import logging

import boto3

from ..config import settings


class S3Client:
    client = boto3.client(
        "s3",
        region_name=settings.aws_region_name,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
    )

    @classmethod
    def createPresignedUrl(
        cls,
        filename: str,
        fields=None,
        expiration=3600,
    ):
        try:
            response = cls.client.generate_presigned_url(
                "get_object",
                Params={
                    "Bucket": settings.aws_s3_bucket_name,
                    "Key": filename,
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
