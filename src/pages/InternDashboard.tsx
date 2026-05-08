import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  User, Send, TrendingUp, Award, Image as ImageIcon, Sun, Moon, Sunrise 
} from 'lucide-react';

const InternDashboard: React.FC = () => {
    const [performance, setPerformance] = useState<any>(null);
    const [submission, setSubmission] = useState({ title: '', link: '' });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Dynamic User ID from session
    const userId = localStorage.getItem("userId") || 1; 

    // --- 1. GREETING LOGIC ---
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return { text: "Good Morning", icon: <Sunrise className="text-orange-400" /> };
        if (hour < 18) return { text: "Good Afternoon", icon: <Sun className="text-yellow-400" /> };
        return { text: "Good Evening", icon: <Moon className="text-blue-400" /> };
    };
    const greeting = getGreeting();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://yaseen-cloud-project.duckdns.org/api/performance/${userId}`);
                setPerformance(res.data);
            } catch (err) {
                console.error("Error fetching performance", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    // --- 2. UPLOAD & SUBMIT FLOW ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            let projectImageKey = "";
            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                const uploadRes = await axios.post(`https://yaseen-cloud-project.duckdns.org/api/files/upload/projects`, formData);
                projectImageKey = uploadRes.data.fileName;
            }

            await axios.post('https://yaseen-cloud-project.duckdns.org/api/submissions', {
                applicant_id: userId,
                project_title: submission.title,
                submission_link: submission.link,
                project_image_key: projectImageKey
            });

            alert("🚀 Project & Screenshot Submitted Successfully!");
            setSubmission({ title: '', link: '' });
            setImageFile(null);
        } catch (err) {
            alert("❌ Submission failed. Check backend console.");
        } finally {
            setIsUploading(false);
        }
    };

    const chartData = performance ? [
        { name: 'Attendance', value: performance.attendance_rate || 0 },
        { name: 'Technical', value: performance.technical_score || 0 },
        { name: 'Soft Skills', value: performance.soft_skills_score || 0 },
    ] : [
        { name: 'Attendance', value: 0 }, { name: 'Technical', value: 0 }, { name: 'Soft Skills', value: 0 }
    ];

    if (loading) return <div className="flex justify-center items-center h-screen text-white bg-[#0a0a0a]">Loading Portal...</div>;

    return (
        /* ✅ FIXED: Increased pt-24 to pt-40 to clear the fixed Navbar */
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-4 md:p-8 pt-40 font-outfit">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* --- TOP SECTION: GREETING --- */}
                <div className="bg-[#111] p-8 rounded-[2rem] border border-white/5 flex items-center gap-6 shadow-2xl">
                    <div className="bg-white/5 p-4 rounded-2xl shadow-inner">
                        {greeting.icon}
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">
                            {greeting.text}, <span className="text-blue-500 italic uppercase">{performance?.name || 'Intern'}</span>!
                        </h1>
                        <p className="text-gray-400 mt-1 font-medium italic tracking-wide">Ready to scale your next project today?</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- LEFT: Analytics --- */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 shadow-lg h-full">
                            <div className="flex items-center gap-2 mb-8">
                                <TrendingUp className="text-lime-500" size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest text-gray-400">Live Progress</h2>
                            </div>
                            
                            {/* Recharts Container */}
                            <div className="w-full h-[350px] min-h-[350px]">
                                <ResponsiveContainer width="100%" height="100%" debounce={1}>
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                        <XAxis dataKey="name" stroke="#555" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                                        <YAxis stroke="#555" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        />
                                        <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : index === 1 ? '#84cc16' : '#8b5cf6'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: Upload & Status --- */}
                    <div className="space-y-8">
                        <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 shadow-lg">
                            <div className="flex items-center gap-2 mb-6">
                                <Send className="text-blue-500" size={20} />
                                <h2 className="text-xl font-bold uppercase tracking-widest text-gray-400">Submission</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Project Title</label>
                                    <input 
                                        type="text" required
                                        placeholder="e.g. Cloud Infrastructure"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 outline-none focus:border-blue-500/50 transition-all text-sm"
                                        value={submission.title}
                                        onChange={(e) => setSubmission({...submission, title: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">GitHub / URL</label>
                                    <input 
                                        type="text" required
                                        placeholder="https://github.com/..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 outline-none focus:border-blue-500/50 transition-all text-sm"
                                        value={submission.link}
                                        onChange={(e) => setSubmission({...submission, link: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">Screenshot (S3)</label>
                                    <div className="relative group flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all cursor-pointer bg-white/[0.01]">
                                        <input 
                                            type="file" accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                        />
                                        <ImageIcon className="text-gray-600 group-hover:text-blue-400 transition mb-2" size={28} />
                                        <span className="text-[10px] text-gray-500 font-bold truncate w-full text-center px-4">
                                            {imageFile ? imageFile.name : "Select JPG/PNG"}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    disabled={isUploading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase text-xs tracking-widest"
                                >
                                    {isUploading ? "Uploading..." : "Deploy to Review"}
                                </button>
                            </form>
                        </div>

                        {/* Evaluation Status Card */}
                        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-8 rounded-[2rem] border border-white/10 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Award className="text-yellow-500" size={18} />
                                    <h2 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Final Grade</h2>
                                </div>
                                <p className="text-5xl font-black text-white italic">{performance?.overall_grade || '---'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Status</p>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-tighter">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternDashboard;