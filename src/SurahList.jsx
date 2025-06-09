function SurahList({ surahs, onSelectSurah }) {
    return (
        <div className="w-full max-w-2xl mx-auto py-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                📖 Surah List
            </h2>
            <ul className="space-y-4">
                {surahs.map((surah, idx) => (
                    <li
                        key={surah.index}
                        className="p-5 bg-gradient-to-tr from-white to-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => onSelectSurah(parseInt(surah.index))}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xl font-semibold text-gray-800">
                                {surah.index}. {surah.title}
                                <span className="ml-2 text-xl font-normal text-green-600 arabic-font">
                                    ({surah.titleAr})
                                </span>
                            </span>
                            <span className="text-sm text-gray-500">
                                {surah.count} verses
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            {surah.place} • {surah.type}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SurahList;
