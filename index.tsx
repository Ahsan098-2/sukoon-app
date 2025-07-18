/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import ReactDOM from 'react-dom/client';

type View = 'ONBOARDING' | 'HOME' | 'MOOD' | 'AUDIO' | 'BREATHE' | 'COMMUNITY' | 'PANIC' | 'SETTINGS';

type MoodLog = {
    emoji: string;
    note: string;
    date: string;
};

type CommunityPost = {
    id: number;
    text: string;
    replies: number;
    time: string;
};

// --- Mock Data ---
const audioTherapySessions = [
    { id: 1, title: "غم کو کیسے ہینڈل کریں", description: "جذبات پر قابو پانے کے طریقے سیکھیں", duration: "10 منٹ" },
    { id: 2, title: "تنہائی اور اس کا علاج", description: "اکیلے پن کے احساسات سے نمٹیں", duration: "12 منٹ" },
    { id: 3, title: "بےچینی سے چھٹکارا", description: "ذہن کو پرسکون کرنے کی مشقیں", duration: "8 منٹ" },
    { id: 4, title: "بہتر نیند کے لئے", description: "گہری اور پرسکون نیند کے لئے رہنمائی", duration: "15 منٹ" },
];

const initialCommunityPosts: CommunityPost[] = [
    { id: 1, text: "مجھے اکثر رات کو نیند نہیں آتی، بہت پریشانی ہوتی ہے۔ کوئی مشورہ؟", replies: 5, time: "2 گھنٹے پہلے" },
    { id: 2, text: "کام کے دباؤ کی وجہ سے میں بہت تناؤ میں ہوں۔ کیا کروں؟", replies: 8, time: "5 گھنٹے پہلے" },
];

const moodEmojis = [ '😊', '😄', '😐', '😟', '😢' ];

// --- App Components ---

const Onboarding: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <div className="onboarding-overlay">
        <h1 className="onboarding-title urdu">سکون</h1>
        <p className="onboarding-subtitle urdu">آپ کے ذہنی سکون کا ساتھی</p>
        <button className="onboarding-button urdu" onClick={onStart}>شروع کریں</button>
    </div>
);

const PanicScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="panic-screen">
        <h2 className="urdu">گہری سانس لیں</h2>
        <div className="breathing-circle"></div>
        <p className="urdu" style={{ color: 'white', marginTop: '1rem', textAlign: 'center' }}>
            آپ محفوظ ہیں۔ یہ احساس گزر جائے گا۔
        </p>
        <button className="close-panic-btn urdu" onClick={onClose}>بند کریں</button>
    </div>
);

const BreatheScreen: React.FC = () => {
    const [instruction, setInstruction] = React.useState("سانس اندر لیں");
    const [animationState, setAnimationState] = React.useState("inhale");

    React.useEffect(() => {
        const timer = setInterval(() => {
            setInstruction(prev => prev === "سانس اندر لیں" ? "سانس باہر نکالیں" : "سانس اندر لیں");
            setAnimationState(prev => prev === "inhale" ? "exhale" : "inhale");
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`screen breathe-container ${animationState}`}>
            <div className="breathing-circle"></div>
            <h2 className="breathe-instruction urdu">{instruction}</h2>
        </div>
    );
};

const HomeScreen: React.FC<{ setView: (view: View) => void, onMoodSelect: (emoji: string) => void, selectedTodayMood: string | null }> = ({ setView, onMoodSelect, selectedTodayMood }) => (
    <div className="screen">
        <div className="card mood-checkin">
            <p className="urdu">آج آپ کیسا محسوس کر رہے ہیں؟</p>
            <div className="mood-selector">
                {moodEmojis.map(emoji => (
                    <span key={emoji} className={`mood-emoji ${selectedTodayMood === emoji ? 'selected' : ''}`} onClick={() => onMoodSelect(emoji)}>{emoji}</span>
                ))}
            </div>
        </div>

        <div className="card">
            <h3 className="urdu" style={{ textAlign: 'right', marginBottom: '0.5rem' }}>آج کا سکون</h3>
            <p className="urdu" style={{ textAlign: 'right' }}>"چھوٹے قدم بھی منزل کی طرف لے جاتے ہیں۔"</p>
        </div>

        <div className="quick-access">
            <div className="access-card" onClick={() => setView('BREATHE')}>
                <svg fill="currentColor" viewBox="0 0 20 20"><path d="M10 4a1 1 0 011 1v2.268a2 2 0 11-2 0V5a1 1 0 011-1zM3.21 8.35a1 1 0 011.09.22l1.54 1.54a2 2 0 11-2.83 2.83l-1.54-1.54a1 1 0 01.22-1.09 1.02 1.02 0 011 .04zM10 14a1 1 0 01-1-1v-2.268a2 2 0 112 0V13a1 1 0 01-1 1zM16.79 8.35a1 1 0 01-.22 1.09l-1.54 1.54a2 2 0 112.83 2.83l1.54-1.54a1 1 0 01-.78-1.77zM5.84 4.71a1 1 0 011.41 0l1.29 1.29a2 2 0 11-2.82 2.82L4.42 7.53a1 1 0 010-1.41l1.42-1.41zM14.16 4.71a1 1 0 010 1.41l-1.29 1.29a2 2 0 112.82 2.82l1.29-1.29a1 1 0 010-1.41l-1.41-1.41a1 1 0 01-1.41 0z"></path></svg>
                <p className="urdu">سانس لیں</p>
            </div>
            <div className="access-card" onClick={() => setView('AUDIO')}>
                <svg fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                <p className="urdu">آڈیو تھراپی</p>
            </div>
        </div>
        <button className="panic-button urdu" onClick={() => setView('PANIC')}>مجھے فوراً سکون چاہیے</button>
    </div>
);

const MoodTrackerScreen: React.FC<{ moodLogs: MoodLog[], addMoodLog: (note: string, emoji: string) => void }> = ({ moodLogs, addMoodLog }) => {
    const [note, setNote] = React.useState("");
    const [selectedMood, setSelectedMood] = React.useState('😊');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMoodLog(note, selectedMood);
        setNote("");
        setSelectedMood('😊');
    };

    return (
        <div className="screen">
            <h2 className="urdu">موڈ ٹریکر</h2>
            <div className="card mood-entry-form">
                <form onSubmit={handleSubmit}>
                    <p className="urdu" style={{ textAlign: 'right' }}>آج کا انتخاب کریں:</p>
                    <div className="mood-selector">
                        {moodEmojis.map(emoji => (
                            <span key={emoji} className={`mood-emoji ${selectedMood === emoji ? 'selected' : ''}`} onClick={() => setSelectedMood(emoji)}>{emoji}</span>
                        ))}
                    </div>
                    <textarea
                        className="urdu urdu-input"
                        placeholder="کچھ لکھیں..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <button type="submit" className="submit-btn urdu">محفوظ کریں</button>
                </form>
            </div>

            <div className="mood-history">
                <h3 className="urdu" style={{ textAlign: 'right' }}>گزشتہ اندراجات</h3>
                {moodLogs.length === 0 ? (
                    <p className="urdu" style={{ textAlign: 'right' }}>کوئی اندراج موجود نہیں۔</p>
                ) : (
                    moodLogs.map((log, index) => (
                        <div className="mood-log-item" key={index}>
                            <div className="urdu">
                                <p>{log.date}</p>
                                <p style={{ color: 'var(--text-secondary-color)' }}>{log.note || "کوئی نوٹ نہیں"}</p>
                            </div>
                            <span className="emoji">{log.emoji}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const AudioTherapyScreen: React.FC = () => (
    <div className="screen">
        <h2 className="urdu">آڈیو لائبریری</h2>
        {audioTherapySessions.map(session => (
            <div className="card audio-card" key={session.id}>
                <div className="audio-card-content urdu">
                    <h3>{session.title}</h3>
                    <p>{session.description}</p>
                </div>
                <div className="audio-card-footer">
                    <button className="play-button" aria-label="Play">
                        <svg fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 4.31A1 1 0 018 5.14v9.72a1 1 0 01-1.7.71l-5-4.86A1 1 0 011 10a1 1 0 01.3-.71l5-4.86zM13.7 4.31A1 1 0 0115 5.14v9.72a1 1 0 01-1.7.71l-5-4.86A1 1 0 018 10a1 1 0 01.3-.71l5-4.86z"></path></svg>
                    </button>
                    <span className="duration urdu">{session.duration}</span>
                </div>
            </div>
        ))}
    </div>
);

const CommunityScreen: React.FC<{ posts: CommunityPost[], addPost: (text: string) => void }> = ({ posts, addPost }) => {
    const [newPost, setNewPost] = React.useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPost.trim()) {
            addPost(newPost.trim());
            setNewPost("");
        }
    };
    
    return (
        <div className="screen">
            <h2 className="urdu">کمیونٹی فورم</h2>
            {posts.map(post => (
                <div className="card post-card" key={post.id}>
                    <p className="urdu">{post.text}</p>
                    <div className="post-card-footer urdu">
                        <span>{post.time}</span>
                        <span>{post.replies} جوابات</span>
                    </div>
                </div>
            ))}
            <div className="card new-post-form">
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="urdu urdu-input"
                        placeholder="اپنی بات یہاں لکھیں..."
                        value={newPost}
                        onChange={e => setNewPost(e.target.value)}
                    />
                    <button type="submit" className="submit-btn urdu">پوسٹ کریں</button>
                </form>
            </div>
        </div>
    );
};

const SettingsScreen: React.FC<{ theme: string, toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
    <div className="screen">
        <h2 className="urdu" style={{textAlign: 'left'}}>Settings</h2>
        <div className="card">
            <div className="settings-item">
                <span className="label">Dark Mode</span>
                <label className="switch">
                    <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                    <span className="slider"></span>
                </label>
            </div>
             <div className="settings-item">
                <span className="label urdu">زبان</span>
                <span className="urdu">اردو</span>
            </div>
             <div className="settings-item">
                <span className="label">Premium</span>
                <span style={{color: 'var(--accent-primary)'}}>Upgrade</span>
            </div>
        </div>
    </div>
);


const BottomNav: React.FC<{ view: View, setView: (view: View) => void }> = ({ view, setView }) => {
    const navItems = [
        { id: 'HOME', label: 'Home', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
        { id: 'MOOD', label: 'Tracker', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
        { id: 'COMMUNITY', label: 'Community', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
        { id: 'SETTINGS', label: 'Settings', icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></> }
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map(item => (
                <button
                    key={item.id}
                    className={`nav-item ${view === item.id ? 'active' : ''}`}
                    onClick={() => setView(item.id as View)}
                    aria-label={item.label}
                >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{item.icon}</svg>
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
};


const App: React.FC = () => {
    const [view, setView] = React.useState<View>('HOME');
    const [theme, setTheme] = React.useState('light');
    const [showOnboarding, setShowOnboarding] = React.useState(false);
    
    // State for mood logs and community posts
    const [moodLogs, setMoodLogs] = React.useState<MoodLog[]>([]);
    const [communityPosts, setCommunityPosts] = React.useState<CommunityPost[]>(initialCommunityPosts);
    const [selectedTodayMood, setSelectedTodayMood] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Theme persistence
        const savedTheme = localStorage.getItem('sukoon-theme') || 'light';
        setTheme(savedTheme);
        document.body.dataset.theme = savedTheme;

        // Onboarding check
        const hasOnboarded = localStorage.getItem('sukoon-onboarded');
        if (!hasOnboarded) {
            setView('ONBOARDING');
            setShowOnboarding(true);
        }
        
        // Load data from local storage
        const savedMoods = localStorage.getItem('sukoon-moods');
        if (savedMoods) {
            setMoodLogs(JSON.parse(savedMoods));
        }
        const savedPosts = localStorage.getItem('sukoon-posts');
        if(savedPosts) {
            setCommunityPosts(JSON.parse(savedPosts));
        }
    }, []);
    
    React.useEffect(() => {
        localStorage.setItem('sukoon-moods', JSON.stringify(moodLogs));
    }, [moodLogs]);

    React.useEffect(() => {
        localStorage.setItem('sukoon-posts', JSON.stringify(communityPosts));
    }, [communityPosts]);


    const handleStart = () => {
        localStorage.setItem('sukoon-onboarded', 'true');
        setShowOnboarding(false);
        setView('HOME');
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.dataset.theme = newTheme;
        localStorage.setItem('sukoon-theme', newTheme);
    };

    const addMoodLog = (note: string, emoji: string) => {
        const newLog: MoodLog = {
            emoji,
            note,
            date: new Date().toLocaleDateString('ur-PK-u-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' }),
        };
        setMoodLogs([newLog, ...moodLogs]);
    };
    
    const handleDailyMoodSelect = (emoji: string) => {
        setSelectedTodayMood(emoji);
        addMoodLog("Daily check-in", emoji);
    };

    const addPost = (text: string) => {
        const newPost: CommunityPost = {
            id: Date.now(),
            text,
            replies: 0,
            time: "ابھی ابھی"
        };
        setCommunityPosts([newPost, ...communityPosts]);
    };


    const renderView = () => {
        switch (view) {
            case 'HOME':
                return <HomeScreen setView={setView} onMoodSelect={handleDailyMoodSelect} selectedTodayMood={selectedTodayMood} />;
            case 'MOOD':
                return <MoodTrackerScreen moodLogs={moodLogs} addMoodLog={addMoodLog}/>;
            case 'AUDIO':
                return <AudioTherapyScreen />;
            case 'BREATHE':
                return <BreatheScreen />;
            case 'COMMUNITY':
                return <CommunityScreen posts={communityPosts} addPost={addPost} />;
            case 'SETTINGS':
                return <SettingsScreen theme={theme} toggleTheme={toggleTheme}/>;
            default:
                return <HomeScreen setView={setView} onMoodSelect={handleDailyMoodSelect} selectedTodayMood={selectedTodayMood}/>;
        }
    };
    
    if (showOnboarding) {
        return <Onboarding onStart={handleStart} />;
    }
    
    if(view === 'PANIC') {
        return <PanicScreen onClose={() => setView('HOME')} />;
    }

    return (
        <div className="app-container">
            {renderView()}
            <BottomNav view={view} setView={setView} />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
