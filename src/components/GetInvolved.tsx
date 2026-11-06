"use client";

import { useState } from "react";

type TabId = "attend" | "volunteer" | "exhibit";
type FormValues = Record<string, string>;
type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: readonly string[];
};
type InvolvementOption = {
  id: TabId;
  label: string;
  description: string;
  color: string;
  fields: readonly Field[];
};

const involvementOptions: readonly InvolvementOption[] = [
  {
    id: "attend",
    label: "Register to Attend",
    description: "Be part of 1,000 young people exploring technology, innovation and opportunities in the digital economy.",
    color: "bg-[#d9ec79]",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "gender", label: "Gender (optional)", type: "select", options: ["Select...", "Male", "Female", "Prefer not to say"] },
      { name: "ageRange", label: "Age Range", type: "select", options: ["Select...", "13-17", "18-24", "25-30", "31-35", "35+"] },
      { name: "state", label: "State and Location", type: "text", required: true },
      { name: "organisation", label: "Organisation, School or Institution", type: "text" },
      { name: "status", label: "Current Status", type: "select", options: ["Select...", "Student", "Corps Member", "Entrepreneur", "Professional", "Job Seeker", "Other"] },
      { name: "interest", label: "Area of Interest", type: "text" },
      { name: "hearAbout", label: "How did you hear about the event?", type: "select", options: ["Select...", "Social Media", "Friend/Colleague", "School/Institution", "Radio/TV", "Flyer/Poster", "Other"] },
    ],
  },
  {
    id: "volunteer",
    label: "Become a Volunteer",
    description: "Are you passionate about technology, youth development, innovation and community impact? Join our volunteer team and contribute your time, skills and creativity towards delivering an impactful experience for 1,000 young people.",
    color: "bg-[#dfe1d5]",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "skills", label: "Skills and Experience", type: "textarea", required: true },
      { name: "department", label: "Preferred Volunteer Department", type: "select", options: [
        "Select...", 
        "Community Mobilisation", 
        "Registration & Participant Management", 
        "Media, Photography & Videography", 
        "Publicity & Digital Marketing", 
        "Technical & ICT Support", 
        "Logistics & Venue Management", 
        "Welfare & Hospitality", 
        "Partnerships & Sponsorship"
      ] },
      { name: "availability", label: "Availability", type: "select", options: ["Select...", "Full Day", "Morning Only", "Afternoon Only", "Flexible"] },
      { name: "whyVolunteer", label: "Why do you want to volunteer?", type: "textarea", required: true },
      { name: "cv", label: "CV or Portfolio (optional)", type: "file" },
    ],
  },
  {
    id: "exhibit",
    label: "Exhibit at the Tech Fest",
    description: "Showcase your products, services, innovations, technology solutions and business ideas to an audience of young people, entrepreneurs, professionals and potential customers.",
    color: "bg-[#c5d8d1]",
    fields: [
      { name: "orgName", label: "Organisation/Business Name", type: "text", required: true },
      { name: "contactName", label: "Contact Person's Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "category", label: "Business Category", type: "select", options: [
        "Select...", 
        "Technology Company/Startup", 
        "Digital Training Institution", 
        "SME/Innovative Business", 
        "AI & Software Solution Provider", 
        "Creative Agency/Digital Professional", 
        "Educational/Development Organisation", 
        "Other"
      ] },
      { name: "description", label: "Description of Product/Service/Innovation", type: "textarea", required: true },
      { name: "requirements", label: "Exhibition Requirements", type: "textarea" },
      { name: "website", label: "Website/Social Media Handles", type: "text" },
      { name: "package", label: "Preferred Exhibition Package", type: "select", options: ["Select...", "Standard Booth", "Premium Booth", "Startup Package", "Custom Package"] },
      { name: "sponsorship", label: "Sponsorship or Partnership Interest", type: "select", options: ["Select...", "Not Interested", "Interested in Sponsorship", "Interested in Strategic Partnership", "Want to Discuss Options"] },
    ],
  },
];

export default function GetInvolved() {
  const [activeTab, setActiveTab] = useState<TabId>("attend");
  const [formData, setFormData] = useState<Record<TabId, FormValues>>({
    attend: {},
    volunteer: {},
    exhibit: {},
  });
  const [submitStatus, setSubmitStatus] = useState<Record<TabId, "" | "submitting" | "success">>({
    attend: "",
    volunteer: "",
    exhibit: "",
  });

  const handleChange = (tab: TabId, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: value },
    }));
  };

  const handleSubmit = async (tab: TabId, e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus((prev) => ({ ...prev, [tab]: "submitting" }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitStatus((prev) => ({ ...prev, [tab]: "success" }));
    setFormData((prev) => ({ ...prev, [tab]: {} }));

    setTimeout(() => {
      setSubmitStatus((prev) => ({ ...prev, [tab]: "" }));
    }, 3000);
  };

  return (
    <section id="get-involved" className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-[#f0efe8]">
      <div className="max-w-7xl mx-auto">
        {/* Section kicker */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-[#171912]/18">
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            05 / GET INVOLVED
          </span>
          <span className="text-xs font-extrabold tracking-[0.13em] uppercase text-[#66685f]">
            THREE WAYS TO BE PART OF IT
          </span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h2 className="font-[950] leading-[0.86] tracking-[-0.085em] text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4">
            YOUR ROLE,
            <br />
            <span className="text-[#989c8b]">YOUR WAY.</span>
          </h2>
          <p className="text-sm leading-[1.8] text-[#62645c] max-w-2xl">
            Whether you want to learn, contribute, or showcase — there&apos;s a place for you at Ogbor Youth Tech Fest 2026.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-[#171912]/18 pb-4" role="tablist">
          {involvementOptions.map((option) => (
            <button
              key={option.id}
              role="tab"
              aria-selected={activeTab === option.id}
              aria-controls={`${option.id}-panel`}
              id={`${option.id}-tab`}
              onClick={() => setActiveTab(option.id)}
              className={`px-6 py-3 text-xs font-extrabold uppercase tracking-[0.09em] rounded-full transition-all ${
                activeTab === option.id
                  ? "bg-[#171912] text-white"
                  : "bg-white text-[#171912] hover:bg-[#e9e8df]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div className="relative min-h-[400px]">
          {involvementOptions.map((option) => (
            <div
              key={option.id}
              role="tabpanel"
              id={`${option.id}-panel`}
              aria-labelledby={`${option.id}-tab`}
              className={`absolute inset-0 ${option.color} rounded-2xl p-6 md:p-8 transition-opacity duration-200 ${
                activeTab === option.id ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-10"
              }`}
            >
              <div className="max-w-2xl mx-auto">
                {/* Info header */}
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-[950] leading-[0.86] tracking-[-0.075em] uppercase mb-3">
                    {option.label}
                  </h3>
                  <p className="text-sm leading-[1.7] text-[#4f5147] max-w-[230px]">
                    {option.description}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={(e) => handleSubmit(option.id, e)} className="space-y-4">
                  {option.fields.map((field) => (
                    <div key={field.name} className="space-y-1.5">
                      <label htmlFor={`${option.id}-${field.name}`} className="block text-xs font-bold text-[#171912]">
                        {field.label} {field.required && <span className="text-[#005536]">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={`${option.id}-${field.name}`}
                          name={field.name}
                          rows={4}
                          className="w-full px-4 py-3 bg-white border border-[#171912]/18 rounded-lg text-sm text-[#171912] placeholder-[#75766e] focus:outline-none focus:ring-2 focus:ring-[#005536] focus:border-transparent transition-all"
                          value={formData[option.id][field.name] || ""}
                          onChange={(e) => handleChange(option.id, field.name, e.target.value)}
                          required={field.required}
                        />
                      ) : field.type === "select" ? (
                        <select
                          id={`${option.id}-${field.name}`}
                          name={field.name}
                          className="w-full px-4 py-3 bg-white border border-[#171912]/18 rounded-lg text-sm text-[#171912] focus:outline-none focus:ring-2 focus:ring-[#005536] focus:border-transparent transition-all"
                          value={formData[option.id][field.name] || ""}
                          onChange={(e) => handleChange(option.id, field.name, e.target.value)}
                          required={field.required}
                        >
                          {field.options!.map((opt, i) => (
                            <option key={i} value={opt === "Select..." ? "" : opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "file" ? (
                        <input
                          id={`${option.id}-${field.name}`}
                          type="file"
                          name={field.name}
                          className="w-full px-4 py-3 bg-white border border-[#171912]/18 rounded-lg text-sm text-[#171912] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#005536] file:text-white file:font-bold file:uppercase file:tracking-wide hover:file:bg-[#00442a] transition-colors"
                          onChange={(e) => handleChange(option.id, field.name, e.target.files?.[0]?.name || "")}
                        />
                      ) : (
                        <input
                          id={`${option.id}-${field.name}`}
                          type={field.type}
                          name={field.name}
                          className="w-full px-4 py-3 bg-white border border-[#171912]/18 rounded-lg text-sm text-[#171912] placeholder-[#75766e] focus:outline-none focus:ring-2 focus:ring-[#005536] focus:border-transparent transition-all"
                          value={formData[option.id][field.name] || ""}
                          onChange={(e) => handleChange(option.id, field.name, e.target.value)}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}

                  {/* Submit button */}
                  <div className="pt-4 border-t border-[#171912]/18">
                    <button
                      type="submit"
                      disabled={submitStatus[option.id] === "submitting"}
                      className="w-full flex items-center justify-between bg-[#171912] text-white px-6 py-3 text-xs font-extrabold uppercase tracking-[0.03em] hover:bg-[#46483d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span>{submitStatus[option.id] === "submitting" ? "Submitting..." : submitStatus[option.id] === "success" ? "Submitted Successfully!" : option.label}</span>
                      <span aria-hidden="true">
                        {submitStatus[option.id] === "success" ? "✓" : "→"}
                      </span>
                    </button>
                    <p className="text-xs text-[#75766e] mt-3 text-center">
                      By submitting, you agree to receive communications about Ogbor Youth Tech Fest 2026.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}