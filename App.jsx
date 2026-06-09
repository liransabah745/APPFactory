import { useState, useMemo, useEffect } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BUSINESS_TYPES = [
  { id: "detailing", label: "פחחות וצבע רכב", emoji: "🚗" },
  { id: "clinic", label: "קליניקה / טיפולים", emoji: "🏥" },
  { id: "agency", label: "סוכנות שיווק", emoji: "📱" },
  { id: "beauty", label: "מספרה / קוסמטיקה", emoji: "💅" },
  { id: "contractors", label: "קבלן / שיפוצים", emoji: "🔨" },
];

const DEMO_DATA = {
  detailing: {
    bizName: "פחחות ישי — דטיילינג מקצועי",
    contacts: [
      { id:1, name:"רועי אברהם", company:"פרטי", phone:"052-1234567", email:"roey@gmail.com", status:"לקוח פעיל", value:2800, tag:"דטיילינג מלא", lastContact:"2026-06-07", notes:"רכב BMW — מגיע כל 3 חודשים" },
      { id:2, name:"שירה לוי", company:"ליסינג כלמוביל", phone:"054-9876543", email:"shira@cal.co.il", status:"הצעה נשלחה", value:1400, tag:"פוליש + ציפוי", lastContact:"2026-06-05", notes:"רכב חברה, צריך אישור" },
      { id:3, name:"דני כהן", company:"פרטי", phone:"050-5556677", email:"dani@walla.co.il", status:"ליד חדש", value:0, tag:"שאלה על מחיר", lastContact:"2026-06-09", notes:"הגיע מאינסטגרם" },
      { id:4, name:"מיכל ברק", company:"נסשן קארס", phone:"053-1112233", email:"michal@nexus.co.il", status:"בטיפול", value:5200, tag:"צי רכבים", lastContact:"2026-06-08", notes:"3 רכבים — תמחור מיוחד" },
      { id:5, name:"אבי שפיר", company:"פרטי", phone:"058-4443322", email:"avi@gmail.com", status:"לקוח פעיל", value:900, tag:"שטיפה + ניקוי פנים", lastContact:"2026-06-01", notes:"לקוח קבוע כל חודש" },
    ]
  },
  clinic: {
    bizName: "מרפאת שלום — פיזיותרפיה",
    contacts: [
      { id:1, name:"נועה כהן", company:"פרטי", phone:"052-1111222", email:"noa@gmail.com", status:"לקוח פעיל", value:1800, tag:"כאבי גב", lastContact:"2026-06-08", notes:"טיפול שבועי, 6 פגישות נותרו" },
      { id:2, name:"יוסי לוי", company:"מכבי שירותי בריאות", phone:"054-3334455", email:"yosi@maccabi.co.il", status:"הצעה נשלחה", value:3200, tag:"שיקום ברך", lastContact:"2026-06-06", notes:"אחרי ניתוח, מחכה להפנייה" },
      { id:3, name:"רחל אברהם", company:"פרטי", phone:"050-6667788", email:"rachel@gmail.com", status:"ליד חדש", value:0, tag:"כאבי צוואר", lastContact:"2026-06-09", notes:"התקשרה דרך אתר" },
    ]
  },
  agency: {
    bizName: "פיקסל — סוכנות דיגיטל",
    contacts: [
      { id:1, name:"תמר גולן", company:"מסעדת הים", phone:"052-2223344", email:"tamar@hayam.co.il", status:"לקוח פעיל", value:8500, tag:"ניהול סושיאל", lastContact:"2026-06-07", notes:"חוזה שנתי, מרוצה" },
      { id:2, name:"עמית שרון", company:"בוטיק שרון", phone:"054-5556677", email:"amit@sharon.co.il", status:"בטיפול", value:4200, tag:"בניית אתר", lastContact:"2026-06-05", notes:"מחכים לתוכן מהלקוח" },
      { id:3, name:"דנה פרץ", company:"דנה קוסמטיקס", phone:"050-8889900", email:"dana@cosmetics.co.il", status:"הצעה נשלחה", value:12000, tag:"קמפיין שנתי", lastContact:"2026-06-08", notes:"הצעה ל-12 חודש" },
    ]
  },
  beauty: {
    bizName: "סטודיו נטע — עיצוב שיער",
    contacts: [
      { id:1, name:"ליאת כץ", company:"פרטי", phone:"052-1234000", email:"liat@gmail.com", status:"לקוח פעיל", value:600, tag:"תספורת + צבע", lastContact:"2026-06-06", notes:"לקוחה קבועה כל 6 שבועות" },
      { id:2, name:"מאיה אוחנה", company:"פרטי", phone:"054-9870000", email:"maya@gmail.com", status:"ליד חדש", value:0, tag:"שאלה על קרטין", lastContact:"2026-06-09", notes:"הגיעה מהמלצה" },
    ]
  },
  contractors: {
    bizName: "בניה אמיתית — שיפוצים",
    contacts: [
      { id:1, name:"מוטי כהן", company:"כהן נדל\"ן", phone:"052-5554444", email:"moti@cohen-re.co.il", status:"לקוח פעיל", value:45000, tag:"שיפוץ דירה", lastContact:"2026-06-07", notes:"פרויקט 3 חדרים, בעיצומו" },
      { id:2, name:"ורד לוי", company:"פרטי", phone:"054-3332222", email:"vered@gmail.com", status:"הצעה נשלחה", value:28000, tag:"חדר אמבטיה", lastContact:"2026-06-04", notes:"מחכה להחלטה" },
      { id:3, name:"אסף גרין", company:"גרין השקעות", phone:"050-7776666", email:"asaf@green.co.il", status:"ליד חדש", value:0, tag:"שיפוץ משרד", lastContact:"2026-06-09", notes:"4 קומות" },
    ]
  }
};

const STATUSES = ["ליד חדש","בטיפול","הצעה נשלחה","לקוח פעיל","נסגר"];
const STATUS_META = {
  "ליד חדש":      { bg:"#EEF2FF", text:"#4338CA", dot:"#6366F1" },
  "בטיפול":       { bg:"#FFF7ED", text:"#C2410C", dot:"#F97316" },
  "הצעה נשלחה":  { bg:"#FEFCE8", text:"#A16207", dot:"#EAB308" },
  "לקוח פעיל":   { bg:"#F0FDF4", text:"#15803D", dot:"#22C55E" },
  "נסגר":         { bg:"#F1F5F9", text:"#475569", dot:"#94A3B8" },
};

const fmtCurrency = n => n ? `₪${Number(n).toLocaleString("he-IL")}` : "—";
const fmtDate = d => d ? new Date(d).toLocaleDateString("he-IL",{day:"numeric",month:"short"}) : "—";

// ─── Components ───────────────────────────────────────────────────────────────

function Badge({ status }) {
  const m = STATUS_META[status] || STATUS_META["ליד חדש"];
  return (
    <span style={{background:m.bg,color:m.text,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:600,display:"inline-flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
      <span style={{width:6,height:6,borderRadius:"50%",background:m.dot,flexShrink:0}}/>
      {status}
    </span>
  );
}

function Avatar({ name, size=36 }) {
  const colors = ["#6366F1","#8B5CF6","#EC4899","#14B8A6","#F97316","#3B82F6"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:size*0.38,flexShrink:0}}>
      {name[0]}
    </div>
  );
}

// ─── Onboarding Wizard ────────────────────────────────────────────────────────

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [bizName, setBizName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const key = selected || "detailing";
      const data = DEMO_DATA[key];
      onComplete({ key, bizName: bizName || data.bizName, contacts: data.contacts });
    }, 2200);
  };

  if (loading) return (
    <div style={{minHeight:"100vh",background:"#0F172A",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24,direction:"rtl",fontFamily:"'Segoe UI',Arial,sans-serif"}}>
      <div style={{fontSize:48}}>🧠</div>
      <div style={{color:"#fff",fontSize:20,fontWeight:700}}>בונה את המערכת שלך...</div>
      <div style={{color:"#94A3B8",fontSize:14}}>יוצר לקוחות, הזדמנויות, ונתונים מותאמים לעסק</div>
      <div style={{display:"flex",gap:8,marginTop:8}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{width:10,height:10,borderRadius:"50%",background:"#6366F1",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#0F172A",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,direction:"rtl",fontFamily:"'Segoe UI',Arial,sans-serif"}}>
      <div style={{width:"100%",maxWidth:520}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(99,102,241,0.15)",border:"1px solid rgba(99,102,241,0.3)",borderRadius:12,padding:"8px 16px",marginBottom:20}}>
            <span style={{fontSize:20}}>💼</span>
            <span style={{color:"#A5B4FC",fontWeight:700,fontSize:15}}>AppFactory AI</span>
          </div>
          <h1 style={{color:"#fff",fontSize:28,fontWeight:800,margin:0,lineHeight:1.3}}>תאר את העסק שלך<br/><span style={{background:"linear-gradient(90deg,#6366F1,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>קבל מערכת תוך דקה</span></h1>
        </div>

        {step === 0 && (
          <div>
            <div style={{color:"#94A3B8",fontSize:14,marginBottom:20,textAlign:"center"}}>מה סוג העסק שלך?</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {BUSINESS_TYPES.map(b => (
                <button key={b.id} onClick={()=>{setSelected(b.id);setStep(1);}} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",borderRadius:14,border:`1.5px solid ${selected===b.id?"#6366F1":"rgba(255,255,255,0.1)"}`,background:selected===b.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.04)",color:"#fff",cursor:"pointer",fontFamily:"inherit",fontSize:15,fontWeight:500,transition:"all 0.15s",textAlign:"right"}}>
                  <span style={{fontSize:22}}>{b.emoji}</span>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{color:"#94A3B8",fontSize:14,marginBottom:16,textAlign:"center"}}>מה שם העסק? (אופציונלי)</div>
            <input value={bizName} onChange={e=>setBizName(e.target.value)} placeholder={DEMO_DATA[selected]?.bizName || "שם העסק שלך..."} style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#fff",fontSize:15,fontFamily:"inherit",direction:"rtl",outline:"none",boxSizing:"border-box",marginBottom:20}} onKeyDown={e=>e.key==="Enter"&&handleGenerate()}/>
            <button onClick={handleGenerate} style={{width:"100%",padding:"15px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              🚀 בנה לי את המערכת
            </button>
            <button onClick={()=>setStep(0)} style={{width:"100%",marginTop:10,padding:"12px",borderRadius:14,border:"none",background:"transparent",color:"#64748B",fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>← חזור</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Self Registration Modal ──────────────────────────────────────────────────

function RegModal({ bizName, onClose, onAdd }) {
  const [form, setForm] = useState({name:"",phone:"",email:"",company:"",notes:""});
  const [sent, setSent] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    onAdd({ ...form, id: Date.now(), status:"ליד חדש", value:0, tag:"נרשם עצמאית", lastContact: new Date().toISOString().split("T")[0] });
    setSent(true);
  };

  const inp = { width:"100%",padding:"10px 12px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:14,background:"#fff",color:"#1E293B",outline:"none",boxSizing:"border-box",fontFamily:"inherit",direction:"rtl" };
  const lbl = { fontSize:12,fontWeight:600,color:"#64748B",marginBottom:4,display:"block" };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.6)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:440,boxShadow:"0 25px 60px rgba(0,0,0,0.25)",direction:"rtl"}} onClick={e=>e.stopPropagation()}>
        {sent ? (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:52,marginBottom:12}}>✅</div>
            <div style={{fontSize:18,fontWeight:700,color:"#0F172A",marginBottom:8}}>נרשמת בהצלחה!</div>
            <div style={{fontSize:14,color:"#64748B",marginBottom:20}}>הפרטים שלך נשמרו במערכת של {bizName}</div>
            <button onClick={onClose} style={{padding:"10px 24px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>סגור</button>
          </div>
        ) : (
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#0F172A"}}>📲 הצטרפות ל-{bizName}</h2>
              <button onClick={onClose} style={{background:"#F1F5F9",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:"#64748B",fontSize:16}}>×</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              {[["name","שם מלא *"],["phone","טלפון *"],["email","אימייל"],["company","חברה / עסק"]].map(([k,l])=>(
                <div key={k}>
                  <label style={lbl}>{l}</label>
                  <input style={inp} value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={l.replace(" *","")}/>
                </div>
              ))}
              <div style={{gridColumn:"1/-1"}}>
                <label style={lbl}>הערה</label>
                <input style={inp} value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder="כתוב מה אתה מחפש..."/>
              </div>
            </div>
            <button onClick={handleSubmit} disabled={!form.name||!form.phone} style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:form.name&&form.phone?"linear-gradient(135deg,#6366F1,#8B5CF6)":"#E2E8F0",color:form.name&&form.phone?"#fff":"#94A3B8",fontWeight:700,cursor:form.name&&form.phone?"pointer":"default",fontFamily:"inherit",fontSize:14}}>
              שלח פרטים
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Contact Modal ────────────────────────────────────────────────────────────

function ContactModal({ contact, onClose, onSave }) {
  const [form, setForm] = useState(contact || {name:"",company:"",phone:"",email:"",status:"ליד חדש",value:"",tag:"",notes:""});
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const inp = {width:"100%",padding:"10px 12px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:14,background:"#fff",color:"#1E293B",outline:"none",boxSizing:"border-box",fontFamily:"inherit",direction:"rtl"};
  const lbl = {fontSize:12,fontWeight:600,color:"#64748B",marginBottom:4,display:"block"};
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.5)",zIndex:1500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:500,boxShadow:"0 25px 60px rgba(0,0,0,0.2)",direction:"rtl"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:700,color:"#0F172A"}}>{contact?.id?"עריכה":"איש קשר חדש"}</h2>
          <button onClick={onClose} style={{background:"#F1F5F9",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:"#64748B",fontSize:16}}>×</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["name","שם מלא"],["company","חברה"],["phone","טלפון"],["email","אימייל"],["tag","תגית"],["value","שווי (₪)"]].map(([k,l])=>(
            <div key={k}>
              <label style={lbl}>{l}</label>
              <input style={inp} value={form[k]||""} onChange={e=>set(k,e.target.value)} placeholder={l}/>
            </div>
          ))}
          <div>
            <label style={lbl}>סטטוס</label>
            <select style={{...inp,cursor:"pointer"}} value={form.status} onChange={e=>set("status",e.target.value)}>
              {STATUSES.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{gridColumn:"1/-1"}}>
            <label style={lbl}>הערות</label>
            <textarea style={{...inp,resize:"vertical",minHeight:64}} value={form.notes||""} onChange={e=>set("notes",e.target.value)} placeholder="הערות..."/>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:20,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{padding:"10px 18px",borderRadius:10,border:"1.5px solid #E2E8F0",background:"#fff",color:"#475569",fontWeight:600,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>ביטול</button>
          <button onClick={()=>onSave({...form,value:Number(form.value)||0,id:form.id||Date.now(),lastContact:form.lastContact||new Date().toISOString().split("T")[0]})} style={{padding:"10px 22px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>שמור</button>
        </div>
      </div>
    </div>
  );
}

// ─── AI Assistant ─────────────────────────────────────────────────────────────

function AIPanel({ contacts, bizName, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = {
    total: contacts.length,
    active: contacts.filter(c=>c.status==="לקוח פעיל").length,
    leads: contacts.filter(c=>c.status==="ליד חדש").length,
    pipeline: contacts.reduce((s,c)=>s+(Number(c.value)||0),0),
  };

  useEffect(() => {
    const welcome = `היי! אני העוזר החכם של ${bizName} 🧠\n\nאני רואה ${stats.total} אנשי קשר — ${stats.active} לקוחות פעילים, ${stats.leads} לידים חדשים, וצינור של ${fmtCurrency(stats.pipeline)}.\n\nמה תרצה לעשות?`;
    setMsgs([{role:"assistant",text:welcome}]);
  }, []);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m=>[...m,{role:"user",text:userMsg}]);
    setLoading(true);

    try {
      const systemPrompt = `אתה עוזר CRM חכם לעסק "${bizName}".
נתוני CRM: ${JSON.stringify(contacts.map(c=>({name:c.name,status:c.status,value:c.value,tag:c.tag,lastContact:c.lastContact,notes:c.notes})))}
סטטיסטיקות: ${JSON.stringify(stats)}

תפקידך: לנתח את הנתונים ולתת המלצות מעשיות. ענה בעברית, קצר וממוקד (3-4 משפטים). אל תשתמש ב-** או ## — כתוב טבעי.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:400,
          system: systemPrompt,
          messages:[{role:"user",content:userMsg}]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "לא הצלחתי לעבד את הבקשה.";
      setMsgs(m=>[...m,{role:"assistant",text:reply}]);
    } catch {
      setMsgs(m=>[...m,{role:"assistant",text:"שגיאה זמנית. נסה שוב."}]);
    }
    setLoading(false);
  };

  const suggestions = ["מי צריך מעקב דחוף?","כתוב הודעת וואטסאפ ללידים חדשים","מה הצעד הבא לסגירת עסקאות?","תן לי תובנות על הצינור שלי"];

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.6)",zIndex:3000,display:"flex",alignItems:"flex-end",justifyContent:"flex-end",padding:20}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:400,height:"70vh",display:"flex",flexDirection:"column",boxShadow:"0 25px 60px rgba(0,0,0,0.3)",direction:"rtl",overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{background:"linear-gradient(135deg,#0F172A,#1E293B)",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🧠</div>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:14}}>עוזר AI חכם</div>
              <div style={{color:"#64748B",fontSize:11}}>מנתח את הנתונים שלך</div>
            </div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",color:"#94A3B8",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:12}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-start":"flex-end"}}>
              <div style={{maxWidth:"85%",padding:"10px 14px",borderRadius:m.role==="user"?"14px 14px 14px 4px":"14px 14px 4px 14px",background:m.role==="user"?"#F1F5F9":"linear-gradient(135deg,#6366F1,#8B5CF6)",color:m.role==="user"?"#1E293B":"#fff",fontSize:13,lineHeight:1.5,whiteSpace:"pre-wrap"}}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <div style={{padding:"10px 14px",borderRadius:"14px 14px 4px 14px",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",display:"flex",gap:4}}>
                {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,0.6)",animation:`pulse 1s ${i*0.2}s infinite`}}/>)}
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {msgs.length <= 1 && (
          <div style={{padding:"0 12px 8px",display:"flex",gap:6,flexWrap:"wrap"}}>
            {suggestions.map(s=>(
              <button key={s} onClick={()=>{setInput(s);}} style={{padding:"5px 10px",borderRadius:20,border:"1.5px solid #E2E8F0",background:"#F8FAFC",color:"#475569",fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{padding:12,borderTop:"1px solid #F1F5F9",display:"flex",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="שאל את העוזר שלך..." style={{flex:1,padding:"10px 14px",border:"1.5px solid #E2E8F0",borderRadius:12,fontSize:13,fontFamily:"inherit",direction:"rtl",outline:"none",color:"#1E293B"}}/>
          <button onClick={send} disabled={!input.trim()||loading} style={{width:40,height:40,borderRadius:12,border:"none",background:input.trim()?"linear-gradient(135deg,#6366F1,#8B5CF6)":"#E2E8F0",color:"#fff",cursor:input.trim()?"pointer":"default",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>→</button>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
    </div>
  );
}

// ─── Main CRM App ─────────────────────────────────────────────────────────────

function CRMApp({ bizKey, bizName, initialContacts }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("הכל");
  const [tab, setTab] = useState("contacts");
  const [modal, setModal] = useState(null);
  const [showReg, setShowReg] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  const filtered = useMemo(()=>contacts.filter(c=>{
    const s = !search || c.name.includes(search)||c.company?.includes(search)||c.phone?.includes(search);
    const st = filterStatus==="הכל" || c.status===filterStatus;
    return s && st;
  }),[contacts,search,filterStatus]);

  const stats = useMemo(()=>({
    total: contacts.length,
    active: contacts.filter(c=>c.status==="לקוח פעיל").length,
    pipeline: contacts.filter(c=>["בטיפול","הצעה נשלחה"].includes(c.status)).reduce((s,c)=>s+(Number(c.value)||0),0),
    revenue: contacts.filter(c=>c.status==="לקוח פעיל").reduce((s,c)=>s+(Number(c.value)||0),0),
  }),[contacts]);

  const saveContact = (form) => {
    if (form.id && contacts.find(c=>c.id===form.id)) {
      setContacts(cs=>cs.map(c=>c.id===form.id?form:c));
      showToast("✅ פרטים עודכנו");
    } else {
      setContacts(cs=>[...cs,form]);
      showToast("✅ איש קשר נוסף");
    }
    setModal(null);
  };

  const addSelfReg = (form) => {
    setContacts(cs=>[...cs,form]);
    showToast("📲 ליד חדש נוסף מרישום עצמי!");
  };

  const tabBtn = (t,l) => (
    <button onClick={()=>setTab(t)} style={{padding:"8px 18px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600,background:tab===t?"linear-gradient(135deg,#6366F1,#8B5CF6)":"transparent",color:tab===t?"#fff":"#64748B",transition:"all 0.15s"}}>
      {l}
    </button>
  );

  return (
    <div style={{minHeight:"100vh",background:"#F8FAFC",direction:"rtl",fontFamily:"'Segoe UI',Arial,sans-serif",color:"#1E293B"}}>

      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#0F172A 0%,#1E293B 100%)",padding:"0 20px",boxShadow:"0 4px 24px rgba(0,0,0,0.3)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#6366F1,#8B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>💼</div>
            <div>
              <div style={{color:"#fff",fontWeight:800,fontSize:15}}>{bizName}</div>
              <div style={{color:"#64748B",fontSize:10}}>AppFactory AI · CRM</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setShowReg(true)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"#A5B4FC",borderRadius:10,padding:"7px 14px",fontWeight:600,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>
              📲 הזמן לקוח
            </button>
            <button onClick={()=>setModal("new")} style={{background:"linear-gradient(135deg,#6366F1,#8B5CF6)",border:"none",color:"#fff",borderRadius:10,padding:"7px 14px",fontWeight:700,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>
              + הוסף
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 16px"}}>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
          {[
            {label:"אנשי קשר",value:stats.total,icon:"👥",color:"#6366F1"},
            {label:"לקוחות פעילים",value:stats.active,icon:"✅",color:"#22C55E"},
            {label:"בצינור",value:fmtCurrency(stats.pipeline),icon:"🔄",color:"#F97316"},
            {label:"הכנסות",value:fmtCurrency(stats.revenue),icon:"💰",color:"#8B5CF6"},
          ].map(s=>(
            <div key={s.label} style={{background:"#fff",borderRadius:14,padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:"1px solid #F1F5F9"}}>
              <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:20,fontWeight:800,color:s.color,marginBottom:2}}>{s.value}</div>
              <div style={{fontSize:11,color:"#94A3B8",fontWeight:500}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,background:"#F1F5F9",borderRadius:12,padding:4,marginBottom:20,width:"fit-content"}}>
          {tabBtn("contacts","📋 אנשי קשר")}
          {tabBtn("kanban","🗂 קנבן")}
          {tabBtn("stats","📊 סטטיסטיקות")}
        </div>

        {/* CONTACTS */}
        {tab==="contacts" && (
          <div style={{background:"#fff",borderRadius:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:"1px solid #F1F5F9",overflow:"hidden"}}>
            <div style={{padding:"14px 16px",borderBottom:"1px solid #F1F5F9",display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  חיפוש..." style={{flex:1,minWidth:160,padding:"8px 12px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:13,fontFamily:"inherit",direction:"rtl",outline:"none",color:"#1E293B"}}/>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {["הכל",...STATUSES].map(s=>(
                  <button key={s} onClick={()=>setFilterStatus(s)} style={{padding:"5px 12px",borderRadius:8,border:"1.5px solid",borderColor:filterStatus===s?"#6366F1":"#E2E8F0",background:filterStatus===s?"#EEF2FF":"#fff",color:filterStatus===s?"#6366F1":"#64748B",fontWeight:600,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{s}</button>
                ))}
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{background:"#F8FAFC"}}>
                    {["איש קשר","תגית","סטטוס","שווי","עדכון","פעולות"].map(h=>(
                      <th key={h} style={{padding:"10px 14px",textAlign:"right",fontSize:10,fontWeight:700,color:"#94A3B8",textTransform:"uppercase",letterSpacing:0.5}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length===0 ? (
                    <tr><td colSpan={6} style={{textAlign:"center",padding:40,color:"#94A3B8",fontSize:13}}>לא נמצאו תוצאות</td></tr>
                  ) : filtered.map(c=>(
                    <tr key={c.id} style={{borderBottom:"1px solid #F8FAFC"}} onMouseEnter={e=>e.currentTarget.style.background="#FAFBFF"} onMouseLeave={e=>e.currentTarget.style.background=""}>
                      <td style={{padding:"12px 14px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <Avatar name={c.name}/>
                          <div>
                            <div style={{fontWeight:600,color:"#0F172A",fontSize:13}}>{c.name}</div>
                            <div style={{fontSize:11,color:"#94A3B8"}}>{c.company||c.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{padding:"12px 14px"}}>{c.tag&&<span style={{background:"#F1F5F9",color:"#475569",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:500}}>{c.tag}</span>}</td>
                      <td style={{padding:"12px 14px"}}><Badge status={c.status}/></td>
                      <td style={{padding:"12px 14px",fontSize:13,fontWeight:600,color:"#0F172A"}}>{fmtCurrency(c.value)}</td>
                      <td style={{padding:"12px 14px",fontSize:11,color:"#94A3B8"}}>{fmtDate(c.lastContact)}</td>
                      <td style={{padding:"12px 14px"}}>
                        <div style={{display:"flex",gap:5}}>
                          <button onClick={()=>setModal(c)} style={{padding:"4px 10px",borderRadius:6,border:"1.5px solid #E2E8F0",background:"#fff",color:"#6366F1",fontWeight:600,cursor:"pointer",fontSize:11}}>עריכה</button>
                          <button onClick={()=>{setContacts(cs=>cs.filter(x=>x.id!==c.id));showToast("🗑 נמחק");}} style={{padding:"4px 10px",borderRadius:6,border:"1.5px solid #FEE2E2",background:"#fff",color:"#EF4444",fontWeight:600,cursor:"pointer",fontSize:11}}>מחק</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{padding:"10px 16px",borderTop:"1px solid #F1F5F9",fontSize:11,color:"#94A3B8"}}>{filtered.length} מתוך {contacts.length}</div>
          </div>
        )}

        {/* KANBAN */}
        {tab==="kanban" && (
          <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:12}}>
            {STATUSES.map(status=>{
              const col = contacts.filter(c=>c.status===status);
              const m = STATUS_META[status];
              return (
                <div key={status} style={{minWidth:200,background:"#fff",borderRadius:14,border:"1px solid #F1F5F9",overflow:"hidden",flex:1,boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
                  <div style={{padding:"12px 14px",borderBottom:`3px solid ${m.dot}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontWeight:700,fontSize:12,color:"#0F172A"}}>{status}</span>
                    <span style={{background:m.bg,color:m.text,borderRadius:20,padding:"1px 7px",fontSize:11,fontWeight:700}}>{col.length}</span>
                  </div>
                  <div style={{padding:8,display:"flex",flexDirection:"column",gap:7}}>
                    {col.map(c=>(
                      <div key={c.id} onClick={()=>setModal(c)} style={{background:"#F8FAFC",borderRadius:10,padding:"10px 11px",cursor:"pointer",border:"1px solid #F1F5F9"}}
                        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 3px 10px rgba(0,0,0,0.08)"}
                        onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
                          <Avatar name={c.name} size={26}/>
                          <div style={{fontWeight:600,fontSize:12,color:"#0F172A"}}>{c.name}</div>
                        </div>
                        {c.tag&&<div style={{fontSize:10,color:"#94A3B8",marginBottom:3}}>{c.tag}</div>}
                        {c.value>0&&<div style={{fontSize:11,fontWeight:700,color:m.text}}>{fmtCurrency(c.value)}</div>}
                      </div>
                    ))}
                    {col.length===0&&<div style={{textAlign:"center",padding:16,color:"#CBD5E1",fontSize:11}}>ריק</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STATS */}
        {tab==="stats" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{background:"#fff",borderRadius:14,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:"1px solid #F1F5F9"}}>
              <h3 style={{margin:"0 0 16px",fontSize:14,fontWeight:700,color:"#0F172A"}}>התפלגות סטטוסים</h3>
              {STATUSES.map(s=>{
                const cnt = contacts.filter(c=>c.status===s).length;
                const pct = contacts.length?Math.round(cnt/contacts.length*100):0;
                const m = STATUS_META[s];
                return (
                  <div key={s} style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:12,fontWeight:600,color:"#475569"}}>{s}</span>
                      <span style={{fontSize:11,color:"#94A3B8"}}>{cnt} ({pct}%)</span>
                    </div>
                    <div style={{background:"#F1F5F9",borderRadius:6,height:7,overflow:"hidden"}}>
                      <div style={{width:`${pct}%`,height:"100%",background:m.dot,borderRadius:6,transition:"width 0.5s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{background:"#fff",borderRadius:14,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:"1px solid #F1F5F9"}}>
              <h3 style={{margin:"0 0 16px",fontSize:14,fontWeight:700,color:"#0F172A"}}>טופ לקוחות</h3>
              {[...contacts].sort((a,b)=>(b.value||0)-(a.value||0)).slice(0,5).map((c,i)=>(
                <div key={c.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:["linear-gradient(135deg,#F59E0B,#D97706)","linear-gradient(135deg,#94A3B8,#64748B)","linear-gradient(135deg,#C4A882,#A58462)","#E2E8F0","#E2E8F0"][i]||"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:i<3?"#fff":"#64748B",flexShrink:0}}>{i+1}</div>
                  <Avatar name={c.name} size={28}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600,color:"#0F172A"}}>{c.name}</div>
                    <div style={{fontSize:10,color:"#94A3B8"}}>{c.tag||c.company}</div>
                  </div>
                  <div style={{fontSize:12,fontWeight:700,color:"#6366F1"}}>{fmtCurrency(c.value)}</div>
                </div>
              ))}
            </div>
            <div style={{gridColumn:"1/-1",background:"linear-gradient(135deg,#0F172A,#1E293B)",borderRadius:14,padding:20}}>
              <h3 style={{margin:"0 0 14px",fontSize:14,fontWeight:700,color:"#fff"}}>סיכום עסקי</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                {[
                  {label:"סה״כ צינור",value:fmtCurrency(contacts.reduce((s,c)=>s+(Number(c.value)||0),0))},
                  {label:"ממוצע לעסקה",value:fmtCurrency(Math.round(contacts.filter(c=>c.value>0).reduce((s,c)=>s+(Number(c.value)||0),0)/(contacts.filter(c=>c.value>0).length||1)))},
                  {label:"אחוז המרה",value:`${Math.round(stats.active/contacts.length*100)}%`},
                ].map(item=>(
                  <div key={item.label}>
                    <div style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:3}}>{item.value}</div>
                    <div style={{fontSize:11,color:"#64748B"}}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI FAB */}
      <button onClick={()=>setShowAI(true)} style={{position:"fixed",bottom:24,left:24,background:"linear-gradient(135deg,#6366F1,#8B5CF6)",border:"none",borderRadius:20,padding:"12px 20px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14,fontFamily:"inherit",boxShadow:"0 8px 32px rgba(99,102,241,0.4)",display:"flex",alignItems:"center",gap:8,zIndex:100}}>
        🧠 <span>שפר את העסק שלי</span>
      </button>

      {/* Toast */}
      {toast && (
        <div style={{position:"fixed",bottom:80,left:"50%",transform:"translateX(-50%)",background:"#0F172A",color:"#fff",padding:"10px 20px",borderRadius:12,fontSize:13,fontWeight:600,zIndex:9999,boxShadow:"0 8px 24px rgba(0,0,0,0.2)",whiteSpace:"nowrap"}}>
          {toast}
        </div>
      )}

      {modal && <ContactModal contact={modal==="new"?null:modal} onClose={()=>setModal(null)} onSave={saveContact}/>}
      {showReg && <RegModal bizName={bizName} onClose={()=>setShowReg(false)} onAdd={addSelfReg}/>}
      {showAI && <AIPanel contacts={contacts} bizName={bizName} onClose={()=>setShowAI(false)}/>}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [app, setApp] = useState(null);

  if (!app) return <Onboarding onComplete={setApp}/>;
  return <CRMApp bizKey={app.key} bizName={app.bizName} initialContacts={app.contacts}/>;
}
