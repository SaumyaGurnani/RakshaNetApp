// src/components/RequirementModal.jsx

import { useEffect, useRef, useState } from 'react';
import { t, LANG } from '../i18n';

export default function RequirementModal({ isOpen, onClose, onSubmit, lang = LANG.HI }) {
    const [textMessage, setTextMessage] = useState(""); // State for the text message
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [error, setError] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    useEffect(() => {
        if (!isOpen) {
            setTextMessage("");
            setIsRecording(false);
            setAudioBlob(null);
            setError(null);
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
        }
    }, [isOpen]);

    const startRecording = async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mr = new MediaRecorder(stream);
            chunksRef.current = [];
            mr.ondataavailable = e => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };
            mr.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                stream.getTracks().forEach(t => t.stop());
            };
            mediaRecorderRef.current = mr;
            mr.start();
            setIsRecording(true);
        } catch (e) {
            console.error(e);
            setError(t(lang, 'micDenied'));
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    const handleSubmit = () => {
        // Pass both the text message and audio blob to the parent
        onSubmit(textMessage, audioBlob);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl">
                <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
                    <h3 className="font-bold text-lg">{t(lang, 'requestAssist')}</h3>
                    <button onClick={onClose} className="text-white text-2xl">&times;</button>
                </div>
                <div className="p-6 space-y-6">
                    {/* Text Message Input */}
                    <div>
                        <label htmlFor="message" className="font-semibold mb-2 block text-gray-700">
                            Describe your situation (Optional)
                        </label>
                        <textarea
                            id="message"
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                            rows="3"
                            placeholder="Example: Two people are trapped, need medical help..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Voice Recording Input */}
                    <div>
                        <p className="font-semibold mb-2 text-gray-700">{t(lang, 'recordHindiTitle')} (Optional)</p>
                        <div className="flex items-center gap-3">
                            {!isRecording ? (
                                <button onClick={startRecording} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">{t(lang, 'startRecording')}</button>
                            ) : (
                                <button onClick={stopRecording} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">{t(lang, 'stop')}</button>
                            )}
                            {audioBlob && (
                                <audio controls src={URL.createObjectURL(audioBlob)} className="h-10" />
                            )}
                        </div>
                        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                        <p className="text-xs text-gray-500 mt-1">{t(lang, 'voiceNoteInfo')}</p>
                    </div>
                </div>
                <div className="p-4 border-t bg-gray-50 rounded-b-lg flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-100">{t(lang, 'cancel')}</button>
                    {/* Submit button is always enabled */}
                    <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                        {t(lang, 'submitRequest')}
                    </button>
                </div>
            </div>
        </div>
    );
};