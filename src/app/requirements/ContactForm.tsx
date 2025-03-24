interface ContactFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onBack: () => void;
  onFinish: () => void;
  error: string;
}

export default function ContactForm({
  email,
  onEmailChange,
  onBack,
  onFinish,
  error
}: ContactFormProps) {
  return (
    <div className="bg-white rounded-xl p-8 w-[450px] shadow-2xl">
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col gap-6">
        <p className="text-gray-600">
          We'll send you an email containing a list of possible candidates that fit your requirements within the next few days. Tell us where to send the email!
        </p>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 h-12 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FF5733] placeholder-gray-400"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-[#6B7280] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4B5563] transition-colors"
          >
            go back
          </button>
          <button
            onClick={onFinish}
            className="flex-1 bg-[#FF5733] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E64A2E] transition-colors"
          >
            finish
          </button>
        </div>
      </div>
    </div>
  );
}
