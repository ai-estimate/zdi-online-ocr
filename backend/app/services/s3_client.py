import boto3

from ..config import settings


class S3Client:
    client = boto3.client(
        "cognito-idp",
        region_name=settings.aws_region_name,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
    )
