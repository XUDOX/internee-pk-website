import React, { useState } from 'react';

const FileManager = () => {
  // These are the "memories" (states) for your component
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState('certificates'); // Default folder
  const [isUploading, setIsUploading] = useState(false);
const handleUpload = async () => {
  // Guard clause: Don't do anything if no file is selected
  if (!file) return alert("Please select a file first!");
  
  setIsUploading(true); // Start the loading spinner/message

  // 1. Prepare the "Digital Envelope"
  const formData = new FormData();
  formData.append('file', file); // The key 'file' must match your backend's upload.single("file")

  try {
    // 2. Send it to your specific AWS Backend Route
    // Notice how we include the ${folder} state in the URL!
    const response = await fetch(`https://yaseen-cloud-project.duckdns.org/api/files/upload/${folder}`, {
      method: 'POST',
      body: formData, // Send the envelope
    });
    
    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    alert(`🚀 Success! File saved in S3: ${data.fileName}`);
    
    // Optional: Clear the file input after success
    setFile(null);
  } catch (error) {
    console.error("Upload error:", error);
    alert("❌ Upload failed. Check your console for details.");
  } finally {
    setIsUploading(false); // Stop the loading spinner
  }
};
const handleView = async (filename: string) => {
  if (!filename) return alert("Please enter a filename to view!");

  try {
    // 1. Request a temporary 'VIP ticket' from your backend
    const response = await fetch(`https://yaseen-cloud-project.duckdns.org/api/files/share/${folder}/${filename}`);
    
    if (!response.ok) throw new Error("Could not get secure link");

    const data = await response.json();

    // 2. Open the temporary Signed URL in a new browser tab
    // This link contains a security token and will expire (e.g., in 15 mins)
    window.open(data.secureUrl, '_blank');
    
  } catch (error) {
    console.error("View error:", error);
    alert("❌ Error: Could not generate a secure link for this file.");
  }
};
  return (
  <div style={{ 
    padding: '25px', 
    maxWidth: '500px', 
    margin: '20px auto', 
    border: '1px solid #ddd', 
    borderRadius: '12px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }}>
    <h2 style={{ color: '#2c3e50', textAlign: 'center' }}>📂 Intern Document Vault</h2>
    
    {/* --- SECTION 1: UPLOAD --- */}
    <div style={{ marginBottom: '25px' }}>
      <h4 style={{ marginBottom: '10px' }}>Step 1: Upload Document</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <select 
          value={folder} 
          onChange={(e) => setFolder(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="certificates">Certificates</option>
          <option value="joining-letters">Joining Letters</option>
          <option value="reports">Reports</option>
        </select>

        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          style={{ padding: '5px' }}
        />

        <button 
          onClick={handleUpload} 
          disabled={isUploading}
          style={{ 
            backgroundColor: isUploading ? '#ccc' : '#4CAF50', 
            color: 'white', 
            padding: '12px', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isUploading ? '📤 Uploading to AWS...' : '🚀 Upload to S3'}
        </button>
      </div>
    </div>

    <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />

    {/* --- SECTION 2: SECURE VIEW --- */}
    <div>
      <h4 style={{ marginBottom: '10px' }}>🔐 Step 2: Secure File Viewer</h4>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Enter the filename to generate a temporary 15-minute secure link:
      </p>
      
      <div style={{ display: 'flex', gap: '5px' }}>
        <input 
          type="text" 
          id="viewFilename" 
          placeholder="e.g. 17123456_cert.pdf" 
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        
        <button 
          onClick={() => {
            const name = (document.getElementById('viewFilename') as HTMLInputElement).value;
            handleView(name);
          }}
          style={{ 
            padding: '8px 15px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          View
        </button>
      </div>
    </div>
  </div>
);
};
export default FileManager;