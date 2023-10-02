from pydantic import BaseModel  # Import BaseModel from pydantic for defining input/output models

class InputModel(BaseModel):
    subscribers: float
    video_views: float
    category: float
    uploads: float
    country: float
    channel_type: float
    video_views_rank: float
    country_rank: float
    channel_type_rank: float
    video_views_last_30_days: float
    subscribers_last_30_days: float