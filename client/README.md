# ML Models Overview

This directory contains machine learning modules for the SmartOps project.

- **anomaly_detection/**: Contains the anomaly detection service.  
  - `model.py`: FastAPI application that exposes an `/anomaly` endpoint.
  - `train.py`: Training script placeholder for the anomaly detection model.
  - `requirements.txt`: Python dependencies.
  - `README.md`: Documentation for anomaly detection.

- **recommendation/**: Contains the recommendation engine service.  
  - `model.py`: FastAPI application that exposes a `/recommend` endpoint.
  - `train.py`: Training script placeholder for the recommendation model.
  - `requirements.txt`: Python dependencies.
  - `README.md`: Documentation for recommendation model.

Use Docker to containerize these services and orchestrate them with your overall application.
