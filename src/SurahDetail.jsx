import { useState, useEffect } from 'react';

function SurahDetail({ surahIndex }) {
  const [arabic, setArabic] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Arabic
    fetch(`https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah/surah_${surahIndex}.json`)
      .then((res) => res.json())
      .then((data) => {
        setArabic(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching Arabic text:', err);
        setLoading(false);
      });

    // Translation
    fetch(`https://raw.githubusercontent.com/semarketir/quranjson/master/source/translation/en/en_translation_${surahIndex}.json`)
      .then((res) => res.json())
      .then((data) => setTranslation(data))
      .catch((err) => console.error('Error fetching translation:', err));
  }, [surahIndex]);

  if (loading || !arabic || !translation) {
    return <p className="text-center text-gray-600">Loading verses...</p>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
        {arabic.name} <span className="text-lg text-gray-600">({translation.name})</span>
      </h2>

      <div className="space-y-6">
        {Object.keys(arabic.verse).map((verseKey) => (
          <div key={verseKey} className="p-5 bg-white rounded-xl shadow hover:shadow-md transition duration-200">
            <p className="text-2xl text-right text-gray-900 font-semibold arabic-font leading-relaxed mb-2">
              {arabic.verse[verseKey]}
            </p>
            <p className="text-gray-700 text-base leading-snug">{translation.verse[verseKey]}</p>
            <div className="mt-3 text-sm text-gray-500">
              <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-md">
                {verseKey.replace('verse_', 'Verse ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurahDetail;
