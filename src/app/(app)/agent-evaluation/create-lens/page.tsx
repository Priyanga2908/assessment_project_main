'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';
import AiStudioSidebar from '@/components/ai_studio/AiStudioSidebar';
import AiStudioSectionHeader from '@/components/ai_studio/AiStudioSectionHeader';

export default function CreateLensPage() {
  const router = useRouter();
  const [lens_name, setLensName] = useState('');
  const [lens_description, setDescription] = useState('');
  const [csv_file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = 'http://localhost:8080/api/lenses/upload-csv';

  // 🔹 Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationMessage('');
    setIsValidated(false);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  // 🔹 Validate CSV File
  const handleValidate = () => {
    if (!csv_file) {
      setValidationMessage('Error: Please select a file to validate.');
      return;
    }

    if (!csv_file.name.toLowerCase().endsWith('.csv')) {
      setValidationMessage('Error: File invalid, please upload a CSV file only.');
      return;
    }

    setIsProcessing(true);
    setValidationMessage('Validating...');

    Papa.parse<string[]>(csv_file, {
      header: false,
      complete: (results) => {
        if (results.errors.length > 0) {
          setValidationMessage(`Error parsing CSV: ${results.errors[0].message}`);
          setIsValidated(false);
          setIsProcessing(false);
          return;
        }

        const requiredHeaders = [
          'Category',
          'Control Objective',
          'What to Check',
          'Rating Explanation',
          'Recommendations',
        ];

        if (results.data.length < 2) {
          setValidationMessage('Error: CSV must contain a header row and at least one data row.');
          setIsValidated(false);
          setIsProcessing(false);
          return;
        }

        const headers = (results.data[0] as string[]).map((h) => h.trim());
        const firstDataRow = results.data[1] as string[];

        const hasAllHeaders =
          requiredHeaders.every((h, index) => headers[index] === h) &&
          headers.length === requiredHeaders.length;

        if (!hasAllHeaders) {
          setValidationMessage('Error: CSV headers do not match the required format.');
          setIsValidated(false);
          setIsProcessing(false);
          return;
        }

        const isFirstRowValid =
          firstDataRow.length === requiredHeaders.length &&
          firstDataRow.every((cell) => cell && cell.trim() !== '');

        if (!isFirstRowValid) {
          setValidationMessage('Error: The first data row below the headers cannot be empty.');
          setIsValidated(false);
          setIsProcessing(false);
          return;
        }

        setValidationMessage('Success: CSV is valid. You can now create the lens.');
        setIsValidated(true);
        setIsProcessing(false);
      },
    });
  };

  // 🔹 Submit to Backend
  const handleSubmit = async () => {
    if (!lens_name.trim() || !lens_description.trim() || !category.trim()) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    if (!isValidated || !csv_file) {
      alert('Please validate your CSV before creating the lens.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('lens_name', lens_name);
      formData.append('lens_description', lens_description);
      formData.append('lens_category', category);
      formData.append('csv_file', csv_file);

      // 🔸 JWT Token for Auth
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhlZTMyOGUyODI2NWM2OGJmNDVmMTllIiwiZW1haWwiOiJybmFnZXNoNjYwQGdtYWlsLmNvbSIsImV4cCI6MTc2MDYyNzYyMiwibmJmIjoxNzYwNjA5NjIyLCJpYXQiOjE3NjA2MDk2MjJ9.Hn1f6KcYsFfZnD_gI6VNchQy1301XdC1QWC5NwyIQc8';

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Lens created successfully:', data);
      alert('Lens created successfully!');
      router.push('/agent-evaluation');
    } catch (error) {
      console.error('Error creating lens:', error);
      alert('Failed to create lens. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 Category options
  const categories = ['Gen AI', 'Network Security', 'Cloud (AWS)', 'DevOps', 'IoT'];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background dark:from-primary/20 dark:via-accent/15 dark:to-background/90">
      <AiStudioSectionHeader
        title="Create Lens"
        subtitle="Upload a validated CSV and define a new assessment lens"
        onNavigateHome={() => router.push('/agent-evaluation')}
      />

      <div className="flex flex-1 overflow-hidden">
        <AiStudioSidebar activeNav="agentEvaluation" setActiveNav={() => {}} />

        <div className="flex-1 flex flex-col bg-sidebar overflow-hidden h-full">
          <main className="flex-1 overflow-y-auto">
            <div className="p-8 w-full mt-[30px] max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl shadow-md p-6 sm:p-8 space-y-6 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-3xl font-semibold text-foreground">Create New Lens</h2>
                <p className="text-sm text-muted-foreground">
                  Fill in the details below, validate your CSV file, and upload it to store your lens in MongoDB.
                </p>

                {/* Lens Name */}
                <div>
                  <label htmlFor="lensName" className="block text-sm font-medium text-foreground mb-1">
                    Lens Name
                  </label>
                  <input
                    type="text"
                    id="lensName"
                    value={lens_name}
                    onChange={(e) => setLensName(e.target.value)}
                    placeholder="Enter lens name"
                    className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="lensDescription" className="block text-sm font-medium text-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    id="lensDescription"
                    value={lens_description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full p-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Provide a brief description..."
                  />
                </div>

                {/* ✅ Category Dropdown */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CSV Upload */}
                <div>
                  <label htmlFor="csv-upload" className="block text-sm font-medium text-foreground mb-1">
                    Upload CSV
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer h-10 px-4 rounded-md border border-border bg-background text-foreground text-sm font-medium flex items-center hover:bg-muted/10">
                      Choose file
                      <input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {csv_file ? csv_file.name : 'No file chosen'}
                    </span>
                  </div>
                </div>

                {/* Validation + Submit */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground flex-1">
                    {validationMessage && (
                      <span className={isValidated ? 'text-green-600' : 'text-red-600'}>
                        {validationMessage}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleValidate}
                      disabled={!csv_file || isProcessing}
                      className="h-10 px-4 rounded-md border border-border bg-background text-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'Validate'}
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isValidated || isSubmitting}
                      className={`h-10 px-4 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all duration-200 ${
                        (!isValidated || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Create'}
                    </button>

                    {/* 🔹 Cancel Button */}
                    <button
                      type="button"
                      onClick={() => router.push('/agent-evaluation')}
                      className="h-10 px-4 rounded-md border border-border bg-background text-foreground text-sm font-medium hover:bg-muted/10 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <footer className="w-full p-2 sm:p-2 border-t border-border bg-sidebar text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Axcess.io. All rights reserved.</p>
      </footer>
    </div>
  );
}
