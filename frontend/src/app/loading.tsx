export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h1 className="text-blue-600 text-2xl font-bold mt-5">
          Student Performance Prediction System
        </h1>

        <p className="text-gray-500 mt-3">
          Loading application...
        </p>
      </div>
    </div>
  );
}