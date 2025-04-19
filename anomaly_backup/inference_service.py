from fastapi import FastAPI
from tensorflow.keras.models import load_model
import numpy as np
from shared.mongo_client import get_mongo_client

app = FastAPI()
model = load_model('anomaly_detector_v1.h5')
threshold = 0.85  # Anomaly threshold

@app.post("/predict")
async def predict_anomaly(data: dict):
    try:
        # Preprocess input data
        sequence = preprocess_input(data['values'])
        
        # Make prediction
        reconstruction = model.predict(sequence)
        loss = np.mean(np.abs(sequence - reconstruction))
        
        # Log to MongoDB
        db = get_mongo_client().smartops
        db.predictions.insert_one({
            "metric": data['metric'],
            "loss": float(loss),
            "is_anomaly": loss > threshold,
            "timestamp": datetime.now()
        })
        
        return {"anomaly": loss > threshold, "confidence": float(loss)}
    
    except Exception as e:
        return {"error": str(e)}