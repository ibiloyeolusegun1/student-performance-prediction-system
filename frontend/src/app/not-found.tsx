"use client";


export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-900">404</h1>

        <h2 className="text-4xl font-bold mt-4 text-gray-700">Oops! Page Not Found</h2>

        <p className="text-gray-500 mt-4">
          The requested page could not be located.
        </p>
      </div>
    </div>
  );
}
