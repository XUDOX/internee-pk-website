import { useState } from "react";

export const FooterNewsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="gap-x-6 flex flex-col justify-between gap-y-6 border-gray-700 pb-8 border-b border-solid md:flex-row">
      <div>
        <h2 className="text-lg font-semibold leading-7 mb-2 md:text-xl">
          Subscribe to Newsletter
        </h2>
        <p className="text-gray-400 text-sm leading-5 max-w-md">
          Subscribe to our newsletter and get exclusive insights, industry trends.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full md:w-auto">
        <div className="items-center backdrop-blur-sm bg-white/10 gap-x-2 flex gap-y-2 w-full border p-1.5 rounded-full border-solid border-white/10 md:w-[460px]">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            className={`text-gray-900 text-sm flex basis-[0%] grow h-11 leading-5 px-3 py-2 rounded-full border ${status === "error" ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"} outline-none focus:border-lime-500 transition-colors`}
          />
          <button
            type="submit"
            className={`text-white text-sm font-semibold items-center flex h-11 justify-center leading-5 text-nowrap px-6 py-2 rounded-full transition-all duration-200 active:scale-95 ${status === "success" ? "bg-green-600" : "bg-lime-600 hover:bg-lime-700"}`}
          >
            {status === "success" ? "✓ Subscribed!" : "Subscribe"}
          </button>
        </div>
        {status === "error" && (
          <p className="text-red-400 text-xs mt-1.5 ml-3">Please enter a valid email address.</p>
        )}
      </form>
    </div>
  );
};