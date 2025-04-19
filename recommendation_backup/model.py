from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import joblib

def build_recommendation_model():
    base_model = RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        class_weight='balanced'
    )
    
    model = MultiOutputClassifier(base_model, n_jobs=-1)
    return model