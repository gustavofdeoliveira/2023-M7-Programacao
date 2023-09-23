# image of python
FROM python:3.8-slim

# set working directory
WORKDIR /app
# copy requirements.txt to the working directory
COPY requirements.txt requirements.txt

# update dependencies
RUN apt-get update && apt-get install -y libgomp1
# install libraries
RUN pip install -r requirements.txt
# copy the files to the working directory
COPY . .
# expose port 8000
EXPOSE 8000
# run the command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]