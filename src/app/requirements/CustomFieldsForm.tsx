import { useState } from 'react';

interface CustomField {
  key: string;
  value: string;
}

interface CustomFieldsFormProps {
  skills: string;
  priceRange: string;
  customFields: CustomField[];
  showCustomFields: boolean;
  onCustomFieldChange: (index: number, field: 'key' | 'value', value: string) => void;
  onAddCustomField: () => void;
  onRemoveCustomField: (index: number) => void;
  onShowCustomFields: (show: boolean) => void;
  onSkillsChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onBack: () => void;
  onProceed: () => void;
}

export default function CustomFieldsForm({
  skills,
  priceRange,
  customFields,
  showCustomFields,
  onCustomFieldChange,
  onAddCustomField,
  onRemoveCustomField,
  onShowCustomFields,
  onSkillsChange,
  onPriceRangeChange,
  onBack,
  onProceed
}: CustomFieldsFormProps) {
  return (
    <div className="bg-white rounded-xl p-8 w-[450px] shadow-2xl">
      <div className="flex flex-col gap-2">
        <div>
          <label className="text-gray-500 text-sm">Skills:</label>
          <div className="relative">
            <input
              type="text"
              value={skills}
              onChange={(e) => onSkillsChange(e.target.value)}
              placeholder="What do you want your yaya to be able to do?"
              className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-sm">Price Range:</label>
          <div className="relative">
            <input
              type="text"
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
              placeholder="How much is your budget for a yaya?"
              className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-sm">Additional Requirements:</label>
          {!showCustomFields ? (
            <button
              onClick={() => {
                onShowCustomFields(true);
                onAddCustomField();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-[#FF5733] hover:text-[#E64A2E] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add custom requirements
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end">
                {customFields.length === 0 && (
                  <button
                    onClick={() => onShowCustomFields(false)}
                    className="text-gray-500 hover:text-gray-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {customFields.map((field, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={field.key}
                      onChange={(e) => onCustomFieldChange(index, 'key', e.target.value)}
                      placeholder="Qualification"
                      className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => onCustomFieldChange(index, 'value', e.target.value)}
                      placeholder="Requirement"
                      className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (customFields.length === 1) {
                        onShowCustomFields(false);
                        onRemoveCustomField(index);
                      } else {
                        onRemoveCustomField(index);
                      }
                    }}
                    className="mt-3 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={onAddCustomField}
                className="w-full flex items-center justify-center gap-2 py-2 text-[#FF5733] hover:text-[#E64A2E] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add another qualification
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex-1 bg-[#6B7280] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4B5563] transition-colors"
        >
          go back
        </button>
        <button
          onClick={onProceed}
          className="flex-1 bg-[#FF5733] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E64A2E] transition-colors"
        >
          proceed
        </button>
      </div>
    </div>
  );
}
