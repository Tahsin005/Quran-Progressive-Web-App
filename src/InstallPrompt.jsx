import { useEffect, useState } from 'react';

function InstallPrompt() {
    const [promptEvent, setPromptEvent] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setPromptEvent(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = () => {
        if (promptEvent) {
            promptEvent.prompt();
            promptEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User installed the app');
                }
                setPromptEvent(null);
            });
        }
    };

    if (!promptEvent) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
            Install Quran PWA
        </button>
    );
}

export default InstallPrompt;