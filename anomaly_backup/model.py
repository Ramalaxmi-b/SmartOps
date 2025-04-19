import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, RepeatVector, TimeDistributed

def build_lstm_autoencoder(window_size=30, n_features=1):
    model = Sequential([
        LSTM(128, activation='relu', 
             input_shape=(window_size, n_features), 
             return_sequences=True),
        LSTM(64, activation='relu', return_sequences=False),
        RepeatVector(window_size),
        LSTM(64, activation='relu', return_sequences=True),
        LSTM(128, activation='relu', return_sequences=True),
        TimeDistributed(Dense(n_features))
    ])
    model.compile(optimizer='adam', loss='mse')
    return model