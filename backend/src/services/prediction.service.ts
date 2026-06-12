import { exec } from "child_process";

interface PredictionInput {
  attendance: number;
  assignmentScore: number;
  testScore: number;
  studyHours: number;
  caScore: number;
}

export const predictPerformance = (data: PredictionInput): Promise<string> => {
  return new Promise((resolve, reject) => {
    const command = `python ml/predict.py ${data.attendance} ${data.assignmentScore} ${data.testScore} ${data.studyHours} ${data.caScore}`;

    console.log("COMMAND =>", command);

    exec(command, (error, stdout, stderr) => {
      console.log("STDOUT =>", stdout);
      console.log("STDERR =>", stderr);

      if (error) {
        reject(error.message);
        return;
      }

      if (stderr) {
        reject(stderr);
        return;
      }

      if (!stdout.trim()) {
        reject("Python returned empty output");
        return;
      }

      const result = JSON.parse(stdout.trim());

      resolve(result.prediction);
    });
  });
};
