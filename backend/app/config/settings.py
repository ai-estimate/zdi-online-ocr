from dotenv import load_dotenv
from pydantic import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    aws_region_name: str
    aws_access_key_id: str
    aws_secret_access_key: str

    class Config:
        env_file = ".env"


settings = Settings()
