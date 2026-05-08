import React, { useState, useEffect } from 'react'; // 1. Added useEffect

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrack: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, selectedTrack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    university: '',
    track: selectedTrack || 'Cloud Computing (AWS)',
    linkedin: '',
    github: ''
  });

  // 2. NEW: This hook forces the form to update when you click different tracks
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        track: selectedTrack
      }));
    }
  }, [selectedTrack, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a resume file to upload.");

    setIsUploading(true);

    try {
      // --- STEP 1: UPLOAD RESUME TO S3 ---
      const s3FormData = new FormData();
      s3FormData.append("file", file);

      const s3Res = await fetch('https://yaseen-cloud-project.duckdns.org/api/files/upload/resumes', {
        method: 'POST',
        body: s3FormData,
      });

      if (!s3Res.ok) throw new Error("Cloud upload failed");
      const { fileName } = await s3Res.json();

      // --- STEP 2: SUBMIT FULL FORM TO RDS ---
      const finalSubmission = {
        ...formData,
        resume_key: fileName 
      };

      const rdsRes = await fetch('https://yaseen-cloud-project.duckdns.org/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalSubmission),
      });

      if (rdsRes.ok) {
        alert("Success! Your application and resume have been secured in the cloud.");
        onClose();
      } else {
        alert("Database Error: Form submitted but could not be saved.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong. Check your internet connection.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        <div className="bg-lime-600 h-2 w-full"></div>

        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-all bg-gray-100 p-2 rounded-full cursor-pointer border-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh] custom-scrollbar">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Start Your Journey</h2>
            <p className="text-gray-500 mt-2 font-medium">Applying for: <span className="text-lime-600 font-bold">{formData.track}</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* --- SECTION 1: PERSONAL INFO --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                <input name="fullName" type="text" required value={formData.fullName} onChange={handleChange} placeholder="Muhammad..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="khan@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Phone</label>
                <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+92..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">City</label>
                <input name="city" type="text" required value={formData.city} onChange={handleChange} placeholder="Haripur" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none transition-all" />
              </div>
            </div>

            {/* --- SECTION 2: RESUME UPLOAD --- */}
            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-lime-500 transition-colors">
              <label className="block text-sm font-bold text-gray-700 mb-3 text-center">Cloud Resume Upload (PDF only)</label>
              <input type="file" required accept=".pdf" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100 cursor-pointer" />
            </div>

            {/* --- SECTION 3: ACADEMIC (Updated Track List) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">University</label>
                <input name="university" type="text" required value={formData.university} onChange={handleChange} placeholder="PAF-IAST" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Selected Track</label>
                <select 
                  name="track" 
                  value={formData.track} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none bg-white font-bold cursor-pointer"
                >
                  {/* Comprehensive Track List */}
                  <option value="Cloud Computing (AWS)">Cloud Computing (AWS)</option>
                  <option value="Frontend Internship">Frontend Internship</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Full Stack Web Dev">Full Stack Web Dev</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Chatbot Development">Chatbot Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Other Internships">Other Internships</option>
                </select>
              </div>
            </div>

            {/* --- SECTION 4: SOCIALS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">LinkedIn URL</label>
                <input name="linkedin" type="url" value={formData.linkedin} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">GitHub URL</label>
                <input name="github" type="url" value={formData.github} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-lime-500 outline-none transition-all" />
              </div>
            </div>

            <button 
                type="submit" 
                disabled={isUploading}
                className={`w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all shadow-xl shadow-lime-600/20 border-none cursor-pointer flex items-center justify-center gap-3 ${isUploading ? 'bg-gray-400' : 'bg-lime-600 hover:bg-lime-700 active:scale-95'}`}
            >
              {isUploading ? '🚀 Uploading to AWS...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;