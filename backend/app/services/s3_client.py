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
    def createPresignedPost(
        cls,
        filename: str,
        file_type: str,
        fields=None,
        expiration=3600,
    ):
        return cls.client.generate_presigned_post(
            Bucket=settings.aws_s3_bucket_name,
            Key=filename,
            Conditions=[{"acl": "public-read"}, {"Content-Type": file_type}],
            ExpiresIn=expiration,
            Fields=fields,
        )
