import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CONFIDENCE_THRESHOLD = 0.6;

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        No result data found. Please upload an image again.
      </div>
    );
  }

  const {
    crop,
    disease,
    confidence,
    crop_info,
    disease_info,
    cure,
    image_url,
    gradcam_image
  } = data;

  /* 🔴 LOW CONFIDENCE CASE */
  if (confidence < CONFIDENCE_THRESHOLD) {
    return (
      <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center">
        <div className="max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">
            ⚠️ Nothing Detectable
          </h1>

          <p className="text-gray-700">
            The uploaded image could not be confidently identified as a crop leaf.
            Please ensure that the image clearly shows a plant leaf.
          </p>

          <p className="text-sm text-gray-500">
            Confidence Score: {(confidence * 100).toFixed(2)}%
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/")}
              className="rounded-lg bg-green-600 px-6 py-2 text-white font-medium hover:bg-green-700 transition"
            >
              🔄 Upload Another Image
            </button>

            <a
              href="https://icar.org.in"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-green-600 px-6 py-2 text-green-700 font-medium hover:bg-green-50 transition"
            >
              🌾 Agricultural Help
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* 🟢 NORMAL HIGH-CONFIDENCE CASE */
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-green-700 text-center">
          SmartAgro Diagnosis Result
        </h1>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">🌱 Crop Detected</h2>
          <p className="text-lg font-medium">{crop}</p>
          <p className="text-gray-700">{crop_info}</p>
        </section>

        {gradcam_image && (
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">🔥 AI Focus Area (Grad-CAM)</h2>
            <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={`data:image/jpeg;base64,${gradcam_image}`}
                alt="Grad-CAM"
                className="object-contain h-full"
              />
            </div>
            <p className="text-sm text-gray-500">
              Highlighted regions indicate areas the AI focused on while making its diagnosis.
            </p>
          </section>
        )}


        <section className="space-y-2">
          <h2 className="text-xl font-semibold">📸 Uploaded Leaf Image</h2>
          <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
            <img src={image_url} alt="Crop Leaf" className="object-contain h-full" />
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">🦠 Disease Status</h2>
          {disease === "Healthy" ? (
            <p className="text-green-600 font-medium">
              ✅ The crop appears healthy.
            </p>
          ) : (
            <>
              <p className="text-red-600 font-medium">{disease}</p>
              <p className="text-gray-700">{disease_info}</p>
            </>
          )}
        </section>

        {disease !== "Healthy" && (
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">💊 Recommended Cure</h2>
            <p className="text-gray-700">{cure}</p>
          </section>
        )}

        <div className="pt-4 text-sm text-gray-500 text-center">
          Confidence Score: {(confidence * 100).toFixed(2)}%
        </div>

        <div className="pt-6 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-green-600 px-6 py-2 text-white font-medium hover:bg-green-700 transition"
          >
            🔙 Analyze Another Image
          </button>
        </div>
      </div>
    </div>
  );
}
