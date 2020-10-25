FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /code /code/static
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
RUN python manage.py collectstatic --noinput --clear
RUN pip freeze
