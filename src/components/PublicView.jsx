import { t, LANG } from '../i18n';

const PublicView = ({ onLogin, onSosClick, lang = LANG.HI }) => (
    <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-red-500 tracking-tight">{t(lang, 'appTitle')}</h1>
            <p className="text-lg md:text-2xl mt-2 text-gray-300">{t(lang, 'tagline')}</p>
            <p className="text-md md:text-lg mt-8 max-w-2xl mx-auto">{t(lang, 'sosInstruction')}</p>
        </div>
        <button onClick={onSosClick} className="relative mt-12 w-48 h-48 md:w-64 md:h-64 bg-red-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl hover:bg-red-700 transition-transform transform hover:scale-105 active:scale-95 animate-pulse">
            {t(lang, 'sos')}
        </button>
        
    </div>
);

export default PublicView;

