import { useState } from "react";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import {
  TRAVEL_TYPE_OPTIONS,
  TRANSPORT_OPTIONS,
  HOTEL_TYPE_OPTIONS,
  FOOD_PREFERENCE_OPTIONS,
  INTEREST_OPTIONS,
} from "../../utils/constants";

const defaultForm = {
  start_place: "",
  destination: "",
  start_date: "",
  end_date: "",
  number_of_people: 1,
  budget: 0,
  travel_type: "",
  interests: "",
  preferred_transport: "Any",
  hotel_type: "Any",
  food_preference: "Any",
  status: "Planning",
};

export default function TripForm({ initialData = null, onSubmit, loading = false, submitLabel = "Create Trip" }) {
  const [form, setForm] = useState(() => {
    if (!initialData) return { ...defaultForm };
    // Backend stores interests as comma string, dates as YYYY-MM-DD
    return {
      start_place: initialData.start_place || "",
      destination: initialData.destination || "",
      start_date: initialData.start_date || "",
      end_date: initialData.end_date || "",
      number_of_people: initialData.number_of_people ?? 1,
      budget: initialData.budget ?? 0,
      travel_type: initialData.travel_type || "",
      interests: initialData.interests || "",
      preferred_transport: initialData.preferred_transport || "Any",
      hotel_type: initialData.hotel_type || "Any",
      food_preference: initialData.food_preference || "Any",
      status: initialData.status || "Planning",
    };
  });

  const [errors, setErrors] = useState({});
  const [selectedInterests, setSelectedInterests] = useState(() => {
    if (!initialData?.interests) return [];
    return initialData.interests.split(",").map((s) => s.trim()).filter(Boolean);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) => {
      const next = prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest];
      setForm((f) => ({ ...f, interests: next.join(", ") }));
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (!form.start_place.trim()) e.start_place = "Start place is required";
    if (!form.destination.trim()) e.destination = "Destination is required";
    if (!form.start_date) e.start_date = "Start date is required";
    if (!form.end_date) e.end_date = "End date is required";
    if (form.start_date && form.end_date && form.end_date < form.start_date) {
      e.end_date = "End date cannot be before start date";
    }
    if (!form.number_of_people || Number(form.number_of_people) <= 0) e.number_of_people = "Must be greater than 0";
    if (form.budget === "" || form.budget == null) e.budget = "Budget is required";
    else if (Number(form.budget) < 0) e.budget = "Budget cannot be negative";
    if (!form.travel_type) e.travel_type = "Travel type is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Prepare payload: ensure correct types
    const payload = {
      start_place: form.start_place.trim(),
      destination: form.destination.trim(),
      start_date: form.start_date,
      end_date: form.end_date,
      number_of_people: Number(form.number_of_people),
      budget: Number(form.budget),
      travel_type: form.travel_type,
      interests: form.interests || null,
      preferred_transport: form.preferred_transport || "Any",
      hotel_type: form.hotel_type || "Any",
      food_preference: form.food_preference || "Any",
      // status only for edit? but allow anyway - backend defaults to Planning
      ...(form.status ? { status: form.status } : {}),
    };
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Start Place"
          name="start_place"
          value={form.start_place}
          onChange={handleChange}
          placeholder="e.g., Delhi"
          error={errors.start_place}
          required
        />
        <FormInput
          label="Destination"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="e.g., Manali, Goa, Jaipur"
          error={errors.destination}
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Start Date"
          name="start_date"
          type="date"
          value={form.start_date}
          onChange={handleChange}
          error={errors.start_date}
          required
        />
        <FormInput
          label="End Date"
          name="end_date"
          type="date"
          value={form.end_date}
          onChange={handleChange}
          error={errors.end_date}
          required
        />
      </div>

      {/* People & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Number of People"
          name="number_of_people"
          type="number"
          value={form.number_of_people}
          onChange={handleChange}
          min={1}
          step={1}
          error={errors.number_of_people}
          required
        />
        <FormInput
          label="Budget (₹)"
          name="budget"
          type="number"
          value={form.budget}
          onChange={handleChange}
          min={0}
          step={100}
          placeholder="e.g., 25000"
          error={errors.budget}
          required
        />
      </div>

      {/* Travel Type */}
      <FormSelect
        label="Travel Type"
        name="travel_type"
        value={form.travel_type}
        onChange={handleChange}
        options={TRAVEL_TYPE_OPTIONS}
        placeholder="Select travel type"
        error={errors.travel_type}
        required
      />

      {/* Interests - multiple checkboxes */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Interests</label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const active = selectedInterests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                  ${active
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"}`}
              >
                {active ? "✓ " : ""}{interest}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-2">Select multiple interests. Leave empty if none.</p>
      </div>

      {/* Transport / Hotel / Food */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormSelect
          label="Preferred Transport"
          name="preferred_transport"
          value={form.preferred_transport}
          onChange={handleChange}
          options={TRANSPORT_OPTIONS}
        />
        <FormSelect
          label="Hotel Type"
          name="hotel_type"
          value={form.hotel_type}
          onChange={handleChange}
          options={HOTEL_TYPE_OPTIONS}
        />
        <FormSelect
          label="Food Preference"
          name="food_preference"
          value={form.food_preference}
          onChange={handleChange}
          options={FOOD_PREFERENCE_OPTIONS}
        />
      </div>

      {/* Status - visible mainly for edit */}
      {initialData && (
        <FormSelect
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Planning", "Confirmed", "Completed", "Cancelled"]}
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
