import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Users, HardDrive, LogOut, Search, ExternalLink, FileText, 
    LayoutDashboard, FolderOpen, Loader2, Download, FileCheck, 
    ChevronRight, Folder, XCircle, Trash2, CheckCircle, ClipboardList, Eye 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState<'applications' | 'files' | 'submissions'>('applications');
    const [applications, setApplications] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // S3 Explorer State
    const [currentPath, setCurrentPath] = useState(""); 
    const [explorerData, setExplorerData] = useState({ folders: [], files: [] });
    const [vaultLoading, setVaultLoading] = useState(false);
    const [showExplorer, setShowExplorer] = useState(false);

    const API_BASE = "https://yaseen-cloud-project.duckdns.org/api";

    // --- DATA FETCHING ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const [appRes, subRes] = await Promise.all([
                axios.get(`${API_BASE}/applications`),
                axios.get(`${API_BASE}/admin/submissions`)
            ]);
            setApplications(appRes.data);
            setSubmissions(subRes.data);
        } catch (err) {
            console.error("Master Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- APPLICATION HANDLERS ---
    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await axios.put(`${API_BASE}/applications/${id}/status`, { status: newStatus });
            setApplications((prev: any) => prev.map((app: any) => app.id === id ? { ...app, status: newStatus } : app));
        } catch (err) { alert("Status update failed."); }
    };

    const handleDeleteApplication = async (id: number) => {
        if (!window.confirm("⚠️ Delete applicant record?")) return;
        try {
            await axios.delete(`${API_BASE}/applications/${id}`);
            setApplications(prev => prev.filter((app: any) => app.id !== id));
        } catch (err) { alert("Delete failed."); }
    };

    // --- S3 & FILE HANDLERS ---
    const fetchBucketData = async (path: string = "") => {
        setVaultLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/files/list?path=${path}`);
            setExplorerData(res.data);
            setCurrentPath(path);
            setShowExplorer(true);
        } catch (err) { alert("S3 Explorer Error."); }
        finally { setVaultLoading(false); }
    };

    const handleViewFile = async (fileKey: string) => {
        if (!fileKey || !fileKey.includes('/')) return alert("Invalid file key.");
        try {
            const [folder, filename] = fileKey.split('/');
            const res = await axios.get(`${API_BASE}/files/share/${folder}/${filename}`);
            if (res.data.secureUrl) window.open(res.data.secureUrl, '_blank');
        } catch (err) { alert("Secure link generation failed."); }
    };

    const handleDeleteS3File = async (fileKey: string) => {
        if (!window.confirm("🔥 Permanently delete from S3?")) return;
        try {
            const [folder, filename] = fileKey.split('/');
            await axios.delete(`${API_BASE}/files/delete/${folder}/${filename}`);
            fetchBucketData(currentPath);
        } catch (err) { alert("S3 Delete failed."); }
    };

    // --- ANALYTICS LOGIC ---
    const trackCounts = applications.reduce((acc: any, app: any) => {
        const track = app.track || 'General';
        acc[track] = (acc[track] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.keys(trackCounts).map(name => ({ name, value: trackCounts[name] }));
    const COLORS = ['#84cc16', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ec4899', '#64748b'];

    const stats = {
        total: applications.length,
        hired: applications.filter((a: any) => a.status === 'Hired').length,
        pending: applications.filter((a: any) => a.status === 'Pending' || !a.status).length,
        submissions: submissions.length
    };

    const handleLogout = () => { localStorage.clear(); window.location.href = "/"; };

    const filteredApps = applications.filter((app: any) => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[#F9FAFB] font-outfit text-neutral-900">
            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-neutral-900 text-white flex flex-col fixed h-full pt-20 z-40 border-r border-neutral-800">
                <div className="p-6 border-b border-neutral-800">
                    <h2 className="text-xl font-bold text-lime-500 flex items-center gap-2 italic uppercase tracking-tighter">
                        <LayoutDashboard size={20} /> CloudAdmin
                    </h2>
                </div>
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <button onClick={() => setActiveTab('applications')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold border-none cursor-pointer ${activeTab === 'applications' ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/20' : 'hover:bg-neutral-800 text-neutral-400 bg-transparent'}`}><Users size={18} /> Applicants</button>
                    <button onClick={() => setActiveTab('submissions')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold border-none cursor-pointer ${activeTab === 'submissions' ? 'bg-lime-600 text-white shadow-lg shadow-lime-600/20' : 'hover:bg-neutral-800 text-neutral-400 bg-transparent'}`}><ClipboardList size={18} /> Project Reviews</button>
                    <button onClick={() => { setActiveTab('files'); setShowExplorer(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold border-none cursor-pointer ${activeTab === 'files' ? 'bg-lime-600 text-white shadow-lg' : 'hover:bg-neutral-800 text-neutral-400 bg-transparent'}`}><FolderOpen size={18} /> S3 Vault</button>
                </nav>
                <div className="p-4 border-t border-neutral-800">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border-none bg-transparent cursor-pointer font-bold"><LogOut size={18} /> Sign Out</button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="ml-64 flex-1 p-8 pt-28">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-neutral-900 tracking-tight uppercase italic">
                            {activeTab === 'applications' ? 'Applicants' : activeTab === 'submissions' ? 'Project Review' : 'Cloud Vault'}
                        </h1>
                        <p className="text-neutral-400 font-medium text-sm">Real-time Cloud Operations Dashboard.</p>
                    </div>
                </div>

                {/* --- TAB 1: APPLICATIONS --- */}
                {activeTab === 'applications' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Total Applied', val: stats.total, color: 'bg-white', text: 'text-neutral-900', icon: <Users size={20}/> },
                                    { label: 'Hired', val: stats.hired, color: 'bg-lime-600', text: 'text-white', icon: <CheckCircle size={20}/> },
                                    { label: 'Pending', val: stats.pending, color: 'bg-blue-50', text: 'text-blue-600', icon: <Loader2 size={20}/> },
                                    { label: 'Submissions', val: stats.submissions, color: 'bg-purple-50', text: 'text-purple-600', icon: <ClipboardList size={20}/> },
                                ].map((card, idx) => (
                                    <div key={idx} className={`${card.color} p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px] transition-transform hover:scale-[1.02]`}>
                                        <div className={`p-3 rounded-2xl w-fit ${card.text} bg-white/20 shadow-sm`}>{card.icon}</div>
                                        <div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${card.text} opacity-60`}>{card.label}</p>
                                            <p className={`text-3xl font-black ${card.text} mt-1`}>{card.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 h-[400px] flex flex-col items-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={6} dataKey="value" stroke="none" label={({ value }) => `${value}`}>
                                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px' }}/>
                                        <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100 gap-4">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" placeholder="Search applicants..." className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-lime-500 transition-all text-sm outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <button onClick={() => window.open(`${API_BASE}/applications/export`, '_blank')} className="flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest border-none cursor-pointer"><Download size={18} className="text-lime-500" /> Export CSV</button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100"><tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest"><th className="p-6">Candidate</th><th className="p-6">Track</th><th className="p-6">Resources</th><th className="p-6 text-right">Actions</th></tr></thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredApps.map((app: any) => (
                                        <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-6"><div><p className="font-bold text-neutral-800">{app.name}</p><p className="text-xs text-gray-400 font-medium">{app.email}</p></div></td>
                                            <td className="p-6"><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase">{app.track || 'General'}</span></td>
                                            <td className="p-6"><div className="flex gap-2">
                                                {app.resume_key && <button onClick={() => handleViewFile(app.resume_key)} className="p-2 bg-lime-50 text-lime-600 rounded-lg border-none cursor-pointer hover:bg-lime-600 hover:text-white transition-all"><FileCheck size={16} /></button>}
                                                {app.linkedin && <a href={app.linkedin} target="_blank" className="p-2 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-lg"><ExternalLink size={16} /></a>}
                                                {app.github && <a href={app.github} target="_blank" className="p-2 bg-gray-50 text-gray-400 hover:text-black rounded-lg"><FileText size={16} /></a>}
                                            </div></td>
                                            <td className="p-6 text-right flex items-center justify-end gap-3">
                                                <select value={app.status || 'Pending'} onChange={(e) => handleStatusChange(app.id, e.target.value)} className="px-4 py-2.5 rounded-xl text-[10px] font-black uppercase border-none cursor-pointer outline-none bg-gray-100">
                                                    <option value="Pending">🕒 Pending</option><option value="Shortlisted">⭐ Shortlisted</option><option value="Hired">🎉 Hired</option><option value="Rejected">❌ Rejected</option>
                                                </select>
                                                <button onClick={() => handleDeleteApplication(app.id)} className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl border-none bg-transparent cursor-pointer"><Trash2 size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- TAB 2: PROJECT SUBMISSIONS --- */}
                {activeTab === 'submissions' && (
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom duration-500">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100"><tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest"><th className="p-6">Intern</th><th className="p-6">Project Title</th><th className="p-6">Links</th><th className="p-6 text-right">Review</th></tr></thead>
                            <tbody className="divide-y divide-gray-100">
                                {submissions.map((sub: any) => (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6"><div><p className="font-bold text-neutral-800">{sub.name}</p><p className="text-xs text-gray-400">{sub.track}</p></div></td>
                                        <td className="p-6 font-medium text-neutral-700">{sub.project_title}</td>
                                        <td className="p-6"><div className="flex gap-3">
                                            <a href={sub.submission_link} target="_blank" className="p-2.5 bg-gray-50 text-gray-400 hover:text-black rounded-xl border border-gray-100"><ExternalLink size={18} /></a>
                                            {sub.project_image_key && <button onClick={() => handleViewFile(sub.project_image_key)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all border-none cursor-pointer"><Eye size={18} /></button>}
                                        </div></td>
                                        <td className="p-6 text-right">
                                            <button className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-lime-600 transition-all border-none cursor-pointer">Evaluate</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- TAB 3: S3 VAULT --- */}
                {activeTab === 'files' && (
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden min-h-[500px] animate-in zoom-in duration-300">
                        {!showExplorer ? (
                            <div className="p-24 text-center">
                                <div className="p-6 bg-gray-50 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-inner"><HardDrive className="text-lime-600" size={40} /></div>
                                <h3 className="text-3xl font-black text-neutral-900 tracking-tight italic uppercase">Cloud Explorer</h3>
                                <button onClick={() => fetchBucketData("")} disabled={vaultLoading} className="mt-8 px-12 py-5 bg-neutral-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest border-none cursor-pointer shadow-2xl flex items-center gap-3 mx-auto">
                                    {vaultLoading ? <Loader2 className="animate-spin" size={20} /> : 'Access AWS Storage'}
                                </button>
                            </div>
                        ) : (
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <button onClick={() => fetchBucketData("")} className="text-[10px] font-black text-lime-600 hover:underline bg-transparent border-none cursor-pointer uppercase">Root</button>
                                    {currentPath && <><ChevronRight size={14} className="text-gray-300" /><span className="text-[10px] font-bold text-gray-500 uppercase">{currentPath}</span></>}
                                    <div className="flex-1"></div>
                                    <button onClick={() => setShowExplorer(false)} className="p-2 hover:bg-red-50 text-red-400 rounded-full bg-transparent border-none cursor-pointer"><XCircle size={20}/></button>
                                </div>
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-gray-100">
                                        {explorerData.folders.map((folder: any) => (
                                            <tr key={folder.fullPath} onClick={() => fetchBucketData(folder.fullPath)} className="hover:bg-lime-50/50 cursor-pointer group transition-colors">
                                                <td className="py-4 flex items-center gap-3 font-bold text-neutral-800"><Folder size={20} className="text-lime-500" /> {folder.name}/</td>
                                                <td className="py-4 text-right"><ChevronRight size={18} className="text-gray-200 inline" /></td>
                                            </tr>
                                        ))}
                                        {explorerData.files.map((file: any) => (
                                            <tr key={file.key} className="hover:bg-gray-50/50 group">
                                                <td className="py-4 flex items-center gap-3 font-medium text-neutral-600 pl-4"><FileText size={18} className="text-gray-400" /> {file.name}</td>
                                                <td className="py-4 text-right flex items-center justify-end gap-2">
                                                    <button onClick={() => handleViewFile(file.key)} className="p-2 text-lime-600 hover:bg-lime-100 rounded-lg border-none bg-transparent cursor-pointer"><ExternalLink size={18} /></button>
                                                    <button onClick={() => handleDeleteS3File(file.key)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg border-none bg-transparent cursor-pointer"><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;