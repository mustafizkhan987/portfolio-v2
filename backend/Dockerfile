FROM python:3.11

# Set up a working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files
COPY . .



# Create a non-root user (Hugging Face Spaces requires this for security)
RUN useradd -m -u 1000 user
USER user

# Set environment variables for Hugging Face
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    PYTHONPATH=/app \
    PORT=7860

# Expose the port Hugging Face Spaces uses
EXPOSE 7860

# Start the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
