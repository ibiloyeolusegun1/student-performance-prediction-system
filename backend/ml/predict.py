import sys
import json
import joblib
import pandas as pd

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(
    BASE_DIR,
    "student_performance_model.pkl"
)

model = joblib.load(model_path)

attendance = float(sys.argv[1])
assignment = float(sys.argv[2])
test = float(sys.argv[3])
study_hours = float(sys.argv[4])
ca = float(sys.argv[5])

data = pd.DataFrame(
    [[
        attendance,
        assignment,
        test,
        study_hours,
        ca
    ]],
    columns=[
        "attendance",
        "assignment",
        "test",
        "study_hours",
        "ca"
    ]
)

prediction = model.predict(data)[0]

print(
    json.dumps({
        "prediction": prediction
    })
)