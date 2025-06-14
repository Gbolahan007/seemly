import { useMoveBack } from "./hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-lg rounded-xl bg-white p-8 shadow-2xl sm:p-12">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-6xl font-bold text-gray-800">404</h1>
          <div className="mb-6 text-9xl">🔍</div>
          <h2 className="mb-4 text-2xl font-medium text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-500">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={moveBack}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 hover:shadow-lg"
          >
            <span>←</span>
            <span>Go Back</span>
          </button>
          <a
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-md"
          >
            <span>Go Home</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
