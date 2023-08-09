FROM python:3.11.0b4-bullseye
WORKDIR /oldschoolgym
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
WORKDIR /oldschoolgym/oldschoolgym
