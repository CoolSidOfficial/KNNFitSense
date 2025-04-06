import pandas as pd
import random

def generate_synthetic_fitness_data(n=200):
    data = []

    for _ in range(n):
        workout_days = random.randint(0, 7)
        sleep_hours = random.uniform(4, 10)
        steps_per_day = random.randint(1000, 20000)
        bmi = round(random.uniform(16, 35), 1)
        age = random.randint(15, 60)
        resting_hr = random.randint(50, 90)

        # Scoring formula
        score = (
            (workout_days * 2) +
            ((sleep_hours - 5) * 1.5) +
            ((steps_per_day - 3000) / 1000) +
            ((22 - abs(bmi - 22)) * 0.5) -
            ((age - 20) * 0.1) -
            ((resting_hr - 60) * 0.1)
        )

        # Labeling
        if score > 15:
            fitness = "High"
        elif score > 8:
            fitness = "Medium"
        else:
            fitness = "Low"

        data.append([
            workout_days,
            round(sleep_hours, 1),
            steps_per_day,
            bmi,
            age,
            resting_hr,
            fitness
        ])

    return pd.DataFrame(data, columns=[
        "workout_days",
        "sleep_hours",
        "steps_per_day",
        "bmi",
        "age",
        "resting_hr",
        "fitness_level"
    ])

# Generate and export
df = generate_synthetic_fitness_data(1000)
print(df.head())

# Save to CSV (optional)
df.to_csv("synthetic_fitness_data.csv", index=False)
