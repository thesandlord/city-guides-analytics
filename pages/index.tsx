import { Tour } from "@/baml_client";
import { useState } from "react";

export default function Home() {
  const [tourInfo, setTourInfo] = useState("");
  const [result, setResult] = useState<(Tour & { error?: string }) | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze-tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plain: tourInfo }),
      });
      const data = (await response.json()) as Tour & { error?: string };
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            City Guides Tour Information Analyzer
          </h1>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="tourInfo"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Tour Information
              </label>
              <textarea
                id="tourInfo"
                rows={4}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                value={tourInfo}
                onChange={(e) => setTourInfo(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !tourInfo.trim()}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Analyze Tour"}
            </button>

            {result && (
              <div className="mt-6">
                {result.error ? (
                  <div className="rounded-md bg-red-50 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Error Processing Tour Information
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{result.error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Tour Analysis Results
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Field
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Tour Name
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {result.tourName}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Tour Date
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {result.tourDate}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Expected Attendees
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {result.expectedAttendees}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Actual Attendees
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {result.actualAttendees}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Walk-ups
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {result.walkups}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Waitlist
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {result.waitlist}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Donations
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              ${result.donations.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
