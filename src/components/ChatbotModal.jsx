// src/components/ChatbotModal.jsx

import { useState, useEffect, useRef } from 'react';
import { callGeminiApi } from '../api/geminiApi';
import { t, LANG } from '../i18n';

const containsDevanagari = (text) => /[\u0900-\u097F]/.test(text);

const ChatbotModal = ({ isChatbotOpen, closeChatbot, initialMessage, lang = LANG.HI }) => {
    const [messages, setMessages] = useState([
        { from: "bot", text: t(lang, 'chatbotPrompt') }
    ]);
    const [input, setInput] = useState("");
    const [isBotReplying, setIsBotReplying] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [autoSpeak, setAutoSpeak] = useState(true);
    const [replyLang, setReplyLang] = useState(lang === LANG.HI ? 'hi' : 'en');
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (isChatbotOpen && initialMessage) {
            setMessages([{ from: 'bot', text: initialMessage }]);
        } else if (isChatbotOpen) {
            setMessages([{ from: "bot", text: t(lang, 'chatbotPrompt') }]);
        }
    }, [isChatbotOpen, initialMessage, lang]);

    useEffect(() => {
        if (!autoSpeak) return;
        const last = messages[messages.length - 1];
        if (last?.from === 'bot' && last.text !== t(lang, 'chatbotPrompt') && typeof window !== 'undefined' && window.speechSynthesis) {
            const utter = new SpeechSynthesisUtterance(last.text);
            utter.lang = replyLang === 'hi' ? 'hi-IN' : 'en-US';
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utter);
        }
    }, [messages, autoSpeak, replyLang, lang]);

    const initRecognition = () => {  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return null;
        const recog = new SR();
        // Let browser auto-detect as much as possible. If needed, set default to Hindi UI language.
        recog.lang = lang === LANG.HI ? 'hi-IN' : 'en-IN';
        recog.interimResults = false;
        recog.maxAlternatives = 1;
        recog.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            setInput(prev => (prev ? prev + ' ' : '') + transcript);
            setReplyLang(containsDevanagari(transcript) ? 'hi' : 'en');
        };
        recog.onerror = () => setIsListening(false);
        recog.onend = () => setIsListening(false);
        return recog;};
    const handleMicToggle = () => {  if (isListening) {
            recognitionRef.current && recognitionRef.current.stop();
            setIsListening(false);
            return;
        }
        const recog = initRecognition();
        if (!recog) return;
        recognitionRef.current = recog;
        setIsListening(true);
        recog.start(); };

    const handleSend = async () => {
        if (!input.trim()) return;
        const detected = containsDevanagari(input) ? 'hi' : 'en';
        setReplyLang(detected);

        const newMessages = [...messages, { from: "user", text: input }];
        setMessages(newMessages);
        setInput("");
        setIsBotReplying(true);

        const langInstruction = detected === 'hi'
            ? 'Answer only in Hindi. Keep it short and actionable.'
            : 'Answer only in English. Keep it short and actionable.';
        const prompt = `${langInstruction} Provide immediate, clear survival instructions for this situation: "${input}".`;
        const response = await callGeminiApi(prompt, {});
        
        setIsBotReplying(false);
        setMessages(prev => [...prev, { from: "bot", text: response.text }]);
    };

    if (!isChatbotOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg flex flex-col h-2/3">
                <header className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="font-bold text-lg">{t(lang, 'chatbotTitle')}</h2>
                    <div className="flex items-center gap-3">
                        <label className="flex items-center text-sm text-gray-600 gap-1">
                            <input type="checkbox" checked={autoSpeak} onChange={e => setAutoSpeak(e.target.checked)} /> TTS
                        </label>
                        <button onClick={closeChatbot} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                    </div>
                </header>
                <main className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                            {/* --- CHANGED HERE: User message is now green --- */}
                            <div className={`p-3 rounded-lg max-w-xs ${msg.from === 'bot' ? 'bg-gray-200 text-gray-800' : 'bg-green-600 text-white'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                     {isBotReplying && <div className="flex justify-start"><div className="p-3 rounded-lg bg-gray-200 text-gray-500">...</div></div>}
                </main>
                <footer className="p-4 border-t bg-gray-50 flex items-center gap-2">
                    <button onClick={handleMicToggle} className={`px-3 py-2 rounded-lg ${isListening ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>{isListening ? '● Rec' : '🎤'}</button>
                    {/* --- CHANGED HERE: Input focus ring is now green --- */}
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder={t(lang, 'chatbotPrompt')} className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
                    {/* --- CHANGED HERE: Send button is now green --- */}
                    <button onClick={handleSend} disabled={isBotReplying} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400">Send</button>
                </footer>
            </div>
        </div>
    );
};

export default ChatbotModal;