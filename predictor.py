import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder
knn = joblib.load('fitness_knn_model.pkl')
scaler = joblib.load('scaler.pkl')

labels = ['Low', 'High', 'Medium']
encoder = LabelEncoder()
encoder.fit(labels)

# Order: workout_days, sleep_hours, steps_per_day, bmi, age, resting_hr
new_data = np.array([[4, 7, 8000, 22, 25, 65]])

new_data_scaled = scaler.transform(new_data)

prediction = knn.predict(new_data_scaled)

predicted_label = encoder.inverse_transform(prediction)

print("Predicted Fitness Level:", predicted_label[0])
