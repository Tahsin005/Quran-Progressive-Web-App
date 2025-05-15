import { useState, useEffect } from 'react';
import SurahList from './SurahList';
import SurahDetail from './SurahDetail';
import InstallPrompt from './InstallPrompt';

function App() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOnline) return;
    setLoading(true);
    fetch('https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah.json')
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching surah list:', err);
        setLoading(false);
      });
  }, [isOnline]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const filteredSurahs = surahs.filter((surah) =>
    `${surah.title} ${surah.titleAr}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          القرآن الكريم
        </h1>

        {isOnline ? (
          <>
            {loading ? (
              <div className="text-center text-gray-600 text-lg">
                Loading Surahs...
              </div>
            ) : (
              <>
                {selectedSurah ? (
                  <>
                    <button
                      onClick={() => setSelectedSurah(null)}
                      className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 text-white bg-green-600 hover:bg-green-700 rounded-xl shadow transition duration-200"
                    >
                      ← Back to Surah List
                    </button>
                    <SurahDetail surahIndex={selectedSurah} />
                  </>
                ) : (
                  <>
                    <div className="mb-6 mx-auto flex">
                      <input
                        type="text"
                        placeholder="Search Surah by name (Arabic or English)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-2xl mx-auto px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                      />
                    </div>

                    <SurahList surahs={filteredSurahs} onSelectSurah={setSelectedSurah} />
                  </>
                )}
              </>
            )}
            <div className="mt-8">
              <InstallPrompt />
            </div>
          </>
        ) : (
          <div className="bg-white border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center shadow-sm">
            Please connect to the internet to view the Quran.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;