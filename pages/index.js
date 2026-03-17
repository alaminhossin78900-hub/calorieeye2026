import { useState, useRef, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a0a0f;--surface:#13131a;--glass:rgba(255,255,255,0.04);--glass-border:rgba(255,255,255,0.08);--accent:#c8f55a;--accent2:#5af5c8;--text:#f0f0f8;--muted:#6b6b80;--danger:#f55a5a}
.light{--bg:#f0f0f5;--surface:#ffffff;--glass:rgba(255,255,255,0.6);--glass-border:rgba(0,0,0,0.08);--text:#0a0a0f;--muted:#888899}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;transition:background 0.3s}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes scanLine{0%{top:0%}100%{top:100%}}
@keyframes countUp{from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.nav{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;backdrop-filter:blur(20px);background:var(--glass);border-bottom:1px solid var(--glass-border);position:sticky;top:0;z-index:100}
.logo{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:8px}
.logo-dot{width:10px;height:10px;background:var(--accent);border-radius:50%;animation:pulse 2s infinite}
.nav-btns{display:flex;gap:8px;align-items:center}
.btn-icon{background:var(--glass);border:1px solid var(--glass-border);color:var(--text);width:38px;height:38px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all 0.2s}
.btn-icon:hover{background:var(--accent);color:#0a0a0f}
.btn-outline{background:transparent;border:1px solid var(--glass-border);color:var(--text);padding:8px 16px;border-radius:10px;cursor:pointer;font-size:14px;transition:all 0.2s}
.btn-outline:hover{border-color:var(--accent);color:var(--accent)}
.btn-primary{background:var(--accent);border:none;color:#0a0a0f;padding:8px 18px;border-radius:10px;cursor:pointer;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;transition:all 0.2s}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(200,245,90,0.4)}
.page{min-height:calc(100vh - 60px);padding:32px 20px;max-width:1000px;margin:0 auto;animation:fadeUp 0.5s ease}
.hero{text-align:center;padding:60px 0 40px}
.badge{display:inline-flex;align-items:center;gap:6px;background:var(--glass);border:1px solid var(--glass-border);border-radius:100px;padding:5px 14px;font-size:11px;color:var(--accent);letter-spacing:1px;text-transform:uppercase;margin-bottom:24px}
.hero h1{font-family:'Syne',sans-serif;font-size:clamp(36px,8vw,80px);font-weight:800;line-height:1;letter-spacing:-2px;margin-bottom:20px}
.hero h1 span{color:var(--accent)}
.hero p{font-size:16px;color:var(--muted);max-width:500px;margin:0 auto 32px;line-height:1.7}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-hero{background:var(--accent);color:#0a0a0f;border:none;padding:14px 32px;border-radius:14px;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer;transition:all 0.3s}
.btn-hero:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(200,245,90,0.5)}
.btn-ghost{background:var(--glass);color:var(--text);border:1px solid var(--glass-border);padding:14px 32px;border-radius:14px;font-size:14px;cursor:pointer;transition:all 0.2s;backdrop-filter:blur(10px)}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent)}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:48px}
.stat{background:var(--glass);border:1px solid var(--glass-border);border-radius:16px;padding:24px;text-align:center;backdrop-filter:blur(16px);transition:all 0.3s}
.stat:hover{border-color:var(--accent);transform:translateY(-4px)}
.stat-n{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:var(--accent)}
.stat-l{font-size:12px;color:var(--muted);margin-top:4px}
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:48px}
.feat{background:var(--glass);border:1px solid var(--glass-border);border-radius:16px;padding:24px;backdrop-filter:blur(16px);transition:all 0.3s}
.feat:hover{border-color:var(--accent2);transform:translateY(-4px)}
.feat-icon{font-size:28px;margin-bottom:12px;animation:float 3s ease-in-out infinite}
.feat h3{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;margin-bottom:6px}
.feat p{font-size:13px;color:var(--muted);line-height:1.6}
.upload-page{}
.upload-head{text-align:center;margin-bottom:32px}
.upload-head h2{font-family:'Syne',sans-serif;font-size:clamp(24px,4vw,40px);font-weight:800;letter-spacing:-1px}
.upload-head p{color:var(--muted);margin-top:6px;font-size:14px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.dropzone{background:var(--glass);border:2px dashed var(--glass-border);border-radius:20px;padding:40px 24px;text-align:center;cursor:pointer;transition:all 0.3s;backdrop-filter:blur(16px)}
.dropzone:hover,.dropzone.drag{border-color:var(--accent);background:rgba(200,245,90,0.04)}
.dz-icon{font-size:44px;margin-bottom:12px;animation:float 3s ease-in-out infinite}
.dropzone h3{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:6px}
.dropzone p{font-size:12px;color:var(--muted);margin-bottom:20px}
.preview{position:relative;border-radius:20px;overflow:hidden;background:var(--surface);border:1px solid var(--glass-border)}
.preview img{width:100%;max-height:300px;object-fit:cover;display:block}
.preview-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%);display:flex;align-items:flex-end;padding:16px}
.scan{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);animation:scanLine 2s linear infinite;pointer-events:none}
.analyze-btn{width:100%;background:var(--accent);color:#0a0a0f;border:none;padding:16px;border-radius:14px;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer;transition:all 0.3s;margin-top:12px;display:flex;align-items:center;justify-content:center;gap:8px}
.analyze-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 36px rgba(200,245,90,0.4)}
.analyze-btn:disabled{opacity:0.5;cursor:not-allowed}
.spinner{width:18px;height:18px;border:2px solid rgba(0,0,0,0.2);border-top-color:#0a0a0f;border-radius:50%;animation:spin 0.7s linear infinite}
.result{background:var(--glass);border:1px solid var(--glass-border);border-radius:20px;padding:24px;backdrop-filter:blur(16px);animation:fadeUp 0.5s ease}
.food-name{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.5px;margin-bottom:4px}
.portion{font-size:12px;color:var(--muted);margin-bottom:20px}
.cal-box{background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:16px;padding:20px;text-align:center;margin-bottom:20px;animation:countUp 0.6s cubic-bezier(0.34,1.56,0.64,1)}
.cal-num{font-family:'Syne',sans-serif;font-size:56px;font-weight:800;color:#0a0a0f;line-height:1}
.cal-label{font-size:12px;font-weight:600;color:rgba(0,0,0,0.6);text-transform:uppercase;letter-spacing:1px}
.macros{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.macro{background:var(--surface);border:1px solid var(--glass-border);border-radius:12px;padding:14px;text-align:center}
.macro-v{font-family:'Syne',sans-serif;font-size:20px;font-weight:800}
.macro-v.p{color:#5af5c8}.macro-v.c{color:#f5c85a}.macro-v.f{color:#f55a5a}
.macro-n{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:2px}
.conf{margin-bottom:16px}
.conf-top{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:4px}
.bar{background:var(--surface);border-radius:100px;height:5px;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:100px;transition:width 1s cubic-bezier(0.34,1.56,0.64,1)}
.insight{background:var(--surface);border:1px solid var(--glass-border);border-radius:12px;padding:14px}
.insight-t{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px}
.insight-p{font-size:13px;color:var(--muted);line-height:1.6}
.history{margin-top:40px}
.sec-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
.hist-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
.hist-card{background:var(--glass);border:1px solid var(--glass-border);border-radius:16px;overflow:hidden;cursor:pointer;transition:all 0.3s;backdrop-filter:blur(16px)}
.hist-card:hover{transform:translateY(-4px);border-color:var(--accent)}
.hist-img{width:100%;height:120px;object-fit:cover}
.hist-info{padding:12px}
.hist-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:700}
.hist-cal{font-size:12px;color:var(--accent);font-weight:600}
.hist-date{font-size:10px;color:var(--muted);margin-top:2px}
.clear-btn{font-size:12px;color:var(--danger);background:none;border:1px solid var(--danger);border-radius:6px;padding:3px 10px;cursor:pointer;opacity:0.7}
.clear-btn:hover{opacity:1}
.auth-wrap{max-width:400px;margin:0 auto;padding:48px 20px}
.auth-card{background:var(--glass);border:1px solid var(--glass-border);border-radius:24px;padding:36px;backdrop-filter:blur(20px)}
.auth-title{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;letter-spacing:-0.5px;margin-bottom:6px}
.auth-sub{font-size:13px;color:var(--muted);margin-bottom:28px}
.form-g{margin-bottom:14px}
.form-l{font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;display:block}
.form-i{width:100%;background:var(--surface);border:1px solid var(--glass-border);border-radius:10px;padding:12px 14px;font-size:14px;color:var(--text);outline:none;transition:border-color 0.2s}
.form-i:focus{border-color:var(--accent)}
.form-s{width:100%;background:var(--accent);color:#0a0a0f;border:none;padding:14px;border-radius:12px;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer;transition:all 0.3s;margin-top:6px}
.form-s:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(200,245,90,0.4)}
.auth-sw{text-align:center;font-size:13px;color:var(--muted);margin-top:16px}
.auth-sw button{background:none;border:none;color:var(--accent);cursor:pointer;font-weight:600}
.err{background:rgba(245,90,90,0.1);border:1px solid rgba(245,90,90,0.3);border-radius:8px;padding:8px 12px;font-size:12px;color:var(--danger);margin-bottom:14px}
.dash-head{margin-bottom:32px}
.dash-head h2{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;letter-spacing:-1px}
.dash-head p{color:var(--muted);font-size:14px;margin-top:4px}
.user-badge{display:inline-flex;align-items:center;gap:8px;background:var(--glass);border:1px solid var(--glass-border);border-radius:100px;padding:6px 16px;margin-bottom:20px;backdrop-filter:blur(10px)}
.avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:12px;color:#0a0a0f}
.dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:32px}
.ds{background:var(--glass);border:1px solid var(--glass-border);border-radius:16px;padding:20px;backdrop-filter:blur(16px)}
.ds-n{font-family:'Syne',sans-serif;font-size:28px;font-weight:800}
.ds-l{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-top:2px}
.empty{text-align:center;padding:48px 20px;color:var(--muted)}
.empty .e{font-size:44px;margin-bottom:12px;animation:float 3s ease-in-out infinite}
.footer{border-top:1px solid var(--glass-border);padding:20px;text-align:center;font-size:12px;color:var(--muted)}
.footer span{color:var(--accent);font-weight:600}
.shimmer{background:linear-gradient(90deg,var(--surface) 25%,var(--glass) 50%,var(--surface) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:10px}
.tag{display:inline-flex;align-items:center;background:rgba(200,245,90,0.1);border:1px solid rgba(200,245,90,0.2);color:var(--accent);border-radius:100px;padding:2px 10px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px}
@media(max-width:600px){.grid,.features,.stats,.dash-stats{grid-template-columns:1fr}.feat:nth-child(n+4){display:none}}
`;

const USERS_KEY="ce_users";
const SESSION_KEY="ce_session";
const HISTORY_KEY="ce_history";

function getUsers(){try{return JSON.parse(localStorage.getItem(USERS_KEY)||"{}")}catch{return{}}}
function saveUser(e,p){const u=getUsers();if(u[e])return{error:"Email already registered"};u[e]={password:p};localStorage.setItem(USERS_KEY,JSON.stringify(u));return{success:true}}
function loginUser(e,p){const u=getUsers();if(!u[e])return{error:"No account found"};if(u[e].password!==p)return{error:"Wrong password"};localStorage.setItem(SESSION_KEY,JSON.stringify({email:e}));return{success:true,email:e}}
function getSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY))}catch{return null}}
function logout(){localStorage.removeItem(SESSION_KEY)}
function getHistory(){try{return JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]")}catch{return[]}}
function saveHistory(e){const h=getHistory();h.unshift(e);localStorage.setItem(HISTORY_KEY,JSON.stringify(h.slice(0,20)))}
function clearHistory(){localStorage.removeItem(HISTORY_KEY)}

async function analyzeFood(base64Image){
  const response=await fetch("/api/analyze",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({base64Image})
  });
  const data=await response.json();
  return data;
}

function Nav({setPage,user,onLogout,dark,setDark}){
  return(
    <nav className="nav">
      <div className="logo" onClick={()=>setPage("home")}>
        <div className="logo-dot"/>
        <span>Calorie<span style={{color:"var(--accent)"}}>Eye</span></span>
      </div>
      <div className="nav-btns">
        <button className="btn-icon" onClick={()=>setDark(!dark)}>{dark?"☀️":"🌙"}</button>
        {user?(
          <>
            <button className="btn-outline" onClick={()=>setPage("upload")}>Analyze</button>
            <button className="btn-outline" onClick={()=>setPage("dashboard")}>Dashboard</button>
            <button className="btn-primary" onClick={onLogout}>Sign Out</button>
          </>
        ):(
          <>
            <button className="btn-outline" onClick={()=>setPage("login")}>Login</button>
            <button className="btn-primary" onClick={()=>setPage("signup")}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}

function Home({setPage}){
  return(
    <div className="page">
      <div className="hero">
        <div className="badge">✨ AI-Powered Nutrition</div>
        <h1>See Every<br/><span>Calorie.</span></h1>
        <p>Upload any food photo and instantly get calories, macros, and health insights powered by AI.</p>
        <div className="hero-btns">
          <button className="btn-hero" onClick={()=>setPage("upload")}>🔍 Analyze Food</button>
          <button className="btn-ghost" onClick={()=>setPage("signup")}>Create Free Account →</button>
        </div>
      </div>
      <div className="stats">
        {[{n:"500K+",l:"Foods Analyzed"},{n:"98%",l:"Accuracy"},{n:"<5s",l:"Analysis Time"}].map((s,i)=>(
          <div className="stat" key={i}><div className="stat-n">{s.n}</div><div className="stat-l">{s.l}</div></div>
        ))}
      </div>
      <div className="features">
        {[
          {i:"🔬",t:"AI Vision",d:"Advanced AI identifies food with high accuracy"},
          {i:"📊",t:"Macro Breakdown",d:"Protein, carbs, and fat values instantly"},
          {i:"💡",t:"Health Insights",d:"Personalized nutrition tips for each meal"},
          {i:"📜",t:"Meal History",d:"Track your food analysis over time"},
          {i:"⚡",t:"Instant Results",d:"Get nutrition data in under 5 seconds"},
          {i:"🔒",t:"100% Private",d:"Your images are never stored on servers"},
        ].map((f,i)=>(
          <div className="feat" key={i}>
            <div className="feat-icon">{f.i}</div>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Upload({user,setPage}){
  const [img,setImg]=useState(null);
  const [b64,setB64]=useState(null);
  const [analyzing,setAnalyzing]=useState(false);
  const [result,setResult]=useState(null);
  const [error,setError]=useState(null);
  const [history,setHistory]=useState(getHistory());
  const [drag,setDrag]=useState(false);
  const [barW,setBarW]=useState(0);
  const inputRef=useRef();

  useEffect(()=>{if(result)setTimeout(()=>setBarW(result.confidence),100)},[result]);

  const handleFile=(file)=>{
    if(!file||!file.type.startsWith("image/"))return;
    const r=new FileReader();
    r.onload=(e)=>{setImg(e.target.result);setB64(e.target.result.split(",")[1]);setResult(null);setError(null)};
    r.readAsDataURL(file);
  };

  const analyze=async()=>{
    if(!b64)return;
    setAnalyzing(true);setError(null);setBarW(0);
    try{
      const data=await analyzeFood(b64);
      setResult(data);
      saveHistory({...data,imagePreview:img,date:new Date().toLocaleDateString()});
      setHistory(getHistory());
    }catch(e){setError("Could not analyze. Try a clearer food photo.")}
    finally{setAnalyzing(false)}
  };

  return(
    <div className="page upload-page">
      <div className="upload-head">
        <div className="tag" style={{marginBottom:10}}>⚡ AI Powered</div>
        <h2>Analyze Your Meal</h2>
        <p>Upload a food photo for instant nutrition data</p>
      </div>
      <div className="grid">
        <div>
          {!img?(
            <div className={`dropzone${drag?" drag":""}`}
              onClick={()=>inputRef.current?.click()}
              onDragOver={(e)=>{e.preventDefault();setDrag(true)}}
              onDragLeave={()=>setDrag(false)}
              onDrop={(e)=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}}>
              <div className="dz-icon">📷</div>
              <h3>Drop food photo here</h3>
              <p>JPG, PNG, WEBP supported</p>
              <button className="btn-primary" style={{pointerEvents:"none"}}>Browse Files</button>
              <input ref={inputRef} type="file" accept="image/*" style={{display:"none"}} onChange={(e)=>handleFile(e.target.files[0])}/>
            </div>
          ):(
            <div className="preview">
              <img src={img} alt="preview"/>
              {analyzing&&<div className="scan"/>}
              <div className="preview-ov">
                <span style={{color:"white",fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:600}}>
                  {analyzing?"🔬 Analyzing...":"✅ Ready"}
                </span>
              </div>
            </div>
          )}
          {img&&<button className="btn-outline" style={{width:"100%",marginTop:10,borderRadius:12,padding:"8px"}} onClick={()=>{setImg(null);setB64(null);setResult(null)}}>↩ New Image</button>}
          {error&&<div className="err" style={{marginTop:10}}>⚠️ {error}</div>}
          {img&&<button className="analyze-btn" onClick={analyze} disabled={analyzing}>{analyzing?<><div className="spinner"/>Analyzing...</>:"🔬 Analyze Calories"}</button>}
        </div>
        <div>
          {!result&&!analyzing&&<div className="empty"><div className="e">🥗</div><p>Results a
