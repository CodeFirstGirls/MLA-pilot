FROM python:3.9.7-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 6000

CMD ["gunicorn", "-b", "0.0.0.0:5050", "run:app"]
