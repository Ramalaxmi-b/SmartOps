import numpy as np
from .model import build_recommendation_model
from .utils.data_loader import load_actions_data
from .utils.preprocessor import preprocess_training_data
import joblib

def train_recommendation_engine():
    # Load historical actions and outcomes
    df = load_actions_data()
    
    # Preprocess data
    X, y = preprocess_training_data(df)
    
    # Train model
    model = build_recommendation_model()
    model.fit(X, y)
    
    # Save model
    joblib.dump(model, 'recommendation_engine_v1.pkl')
    print("Recommendation model trained and saved!")

if __name__ == "__main__":
    train_recommendation_engine()