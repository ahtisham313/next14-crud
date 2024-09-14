"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, ChangeEvent } from 'react';

export default function EditPage ({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({ term: "", interpretation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/interpretations/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch interpretation");
        }
        const data = await response.json();
        console.log(data);
        // Assuming data comes directly with `term` and `interpretation`
        setFormData({
          term: data.term,
          interpretation: data.interpretation,
        });

      } catch (error) {
        console.error(error);
        setError("Failed to load interpretation");
      }
    };

    fetchData();
  }, [params.id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.term || !formData.interpretation) {
      setError("Please fill in all fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/interpretations/${params.id}`, {
        method: "PUT", // Use PUT method for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update interpretation");
      }

      router.push("/");

    } catch (error) {
      console.error(error);
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl my-8">Edit Innovations</h1>
      {error ? (
      <p className="text-red-500 mt-4">{error}</p>
    ) : !formData.term && !formData.interpretation ? (
      <p>Loading...</p>
    ) : (
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          name="term"
          type="text"
          placeholder="Term"
          value={formData.term}
          onChange={handleInputChange}
          className="py-1 px-2 border rounded-md"
        />

        <textarea
          name="interpretation"
          placeholder="Interpretation"
          value={formData.interpretation}
          onChange={handleInputChange}
          rows={4}
          className="py-1 px-4 rounded-md border resize-none"
        ></textarea>

        <button
          className="font-bold text-white bg-black py-2 mt-5 px-4 rounded-md cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Innovations"}
        </button>
      </form>) }
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};


