import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("dataset.csv")

X = df[
    [
        "attendance",
        "assignment",
        "test",
        "study_hours",
        "ca"
    ]
]

y = df["performance"]

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

joblib.dump(
    model,
    "student_performance_model.pkl"
)

print("Model trained successfully")