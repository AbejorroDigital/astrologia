
import React, { useState, useEffect } from 'react';
import { SIGNS, HOUSES, PLANETS, ASTEROIDS, ASPECTS } from './constants';
import { getAsteroidInterpretation } from './services/geminiService';
import CosmicChart from './components/CosmicChart';
import { ZodiacSign, AstrologicalHouse, CelestialBody } from './types';

const App: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(SIGNS[0]);
  const [selectedHouse, setSelectedHouse] = useState<AstrologicalHouse>(HOUSES[0]);
  const [selectedAsteroid, setSelectedAsteroid] = useState<CelestialBody>(ASTEROIDS[0]);
  const [asteroidInterpretation, setAsteroidInterpretation] = useState<string>('Selecciona un asteroide para ver su interpretación...');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'explore' | 'chart'>('explore');
  const [birthDate, setBirthDate] = useState('');

  const fetchInterpretation = async (body: CelestialBody, context: 'sign' | 'house') => {
    setIsLoading(true);
    const contextName = context === 'sign' ? selectedSign.name : `Casa ${selectedHouse.id}`;
    const result = await getAsteroidInterpretation(body.name, context, contextName);
    setAsteroidInterpretation(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInterpretation(selectedAsteroid, 'sign');
  }, [selectedSign, selectedAsteroid]);

  const getSignColor = (sign: ZodiacSign) => {
    switch (sign.element) {
      case 'Fire': return 'border-red-500 text-red-400';
      case 'Earth': return 'border-emerald-500 text-emerald-400';
      case 'Air': return 'border-cyan-500 text-cyan-400';
      case 'Water': return 'border-violet-500 text-violet-400';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-200">
      {/* Header */}
      <header className="py-8 px-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]">
              <i className="fas fa-moon text-2xl"></i>
            </div>
            <h1 className="text-4xl font-cinzel font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              ASTROLOGÍA
            </h1>
          </div>
          <nav className="flex gap-4">
            <button 
              onClick={() => setViewMode('explore')}
              className={`px-6 py-2 rounded-full transition-all ${viewMode === 'explore' ? 'bg-indigo-600 shadow-lg' : 'hover:bg-gray-800'}`}
            >
              Explorar
            </button>
            <button 
              onClick={() => setViewMode('chart')}
              className={`px-6 py-2 rounded-full transition-all ${viewMode === 'chart' ? 'bg-indigo-600 shadow-lg' : 'hover:bg-gray-800'}`}
            >
              Carta Natal
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {viewMode === 'explore' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Selectors */}
            <div className="lg:col-span-4 space-y-8">
              <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-cinzel mb-4 flex items-center gap-2">
                  <i className="fas fa-star-of-david text-indigo-400"></i>
                  Signos del Zodiaco
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  {SIGNS.map(sign => (
                    <button
                      key={sign.id}
                      onClick={() => setSelectedSign(sign)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        selectedSign.id === sign.id 
                        ? `${getSignColor(sign)} bg-gray-800 shadow-inner scale-105` 
                        : 'border-transparent hover:bg-gray-800'
                      }`}
                      title={sign.name}
                    >
                      <span className="text-2xl">{sign.symbol}</span>
                      <span className="text-[10px] uppercase font-bold mt-1">{sign.name.slice(0,3)}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-cinzel mb-4 flex items-center gap-2">
                  <i className="fas fa-home text-indigo-400"></i>
                  Casas Astrológicas
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  {HOUSES.map(house => (
                    <button
                      key={house.id}
                      onClick={() => setSelectedHouse(house)}
                      className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                        selectedHouse.id === house.id 
                        ? 'border-indigo-500 bg-gray-800 text-indigo-400 scale-105' 
                        : 'border-transparent hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg font-bold">{house.id}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-cinzel mb-4 flex items-center gap-2">
                  <i className="fas fa-meteor text-indigo-400"></i>
                  Asteroides Clave
                </h2>
                <div className="flex flex-wrap gap-2">
                  {ASTEROIDS.map(ast => (
                    <button
                      key={ast.id}
                      onClick={() => setSelectedAsteroid(ast)}
                      className={`px-4 py-2 rounded-full border text-sm transition-all ${
                        selectedAsteroid.id === ast.id 
                        ? 'border-pink-500 bg-pink-500/10 text-pink-400' 
                        : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      {ast.symbol} {ast.name}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-8 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-8 rounded-3xl border ${getSignColor(selectedSign)} bg-gray-900/60 shadow-xl`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-cinzel font-bold">{selectedSign.name}</h3>
                    <span className="text-5xl opacity-40">{selectedSign.symbol}</span>
                  </div>
                  <p className="text-slate-300 italic mb-4">"{selectedSign.description}"</p>
                  <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest opacity-80">
                    <div>Elemento: <span className="text-indigo-300">{selectedSign.element}</span></div>
                    <div>Modalidad: <span className="text-indigo-300">{selectedSign.modality}</span></div>
                    <div>Regente: <span className="text-indigo-300">{selectedSign.ruler}</span></div>
                  </div>
                </div>

                <div className="p-8 rounded-3xl border border-gray-700 bg-gray-900/60 shadow-xl">
                  <h3 className="text-3xl font-cinzel font-bold mb-4">Casa {selectedHouse.id}</h3>
                  <p className="text-indigo-300 font-bold mb-2 uppercase tracking-tighter">{selectedHouse.keyword}</p>
                  <p className="text-slate-300">{selectedHouse.description}</p>
                </div>
              </div>

              {/* Asteroid Detail */}
              <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-3xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{selectedAsteroid.symbol}</span>
                    <div>
                      <h4 className="text-2xl font-cinzel font-bold">{selectedAsteroid.name} en {selectedSign.name}</h4>
                      <p className="text-sm text-indigo-300">{selectedAsteroid.description}</p>
                    </div>
                  </div>

                  <div className="min-h-[150px] bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="animate-pulse text-indigo-300">Consultando a los astros...</p>
                      </div>
                    ) : (
                      <p className="text-lg leading-relaxed first-letter:text-4xl first-letter:font-cinzel first-letter:mr-1 first-letter:float-left text-slate-100">
                        {asteroidInterpretation}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-8 flex gap-4">
                    <button 
                      onClick={() => fetchInterpretation(selectedAsteroid, 'sign')}
                      className="px-6 py-2 bg-indigo-600/30 border border-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-sync-alt"></i> Ver en Signo
                    </button>
                    <button 
                      onClick={() => fetchInterpretation(selectedAsteroid, 'house')}
                      className="px-6 py-2 bg-purple-600/30 border border-purple-500 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-sync-alt"></i> Ver en Casa {selectedHouse.id}
                    </button>
                  </div>
                </div>
              </div>

              {/* Planetary Relationships Table */}
              <section className="mt-12">
                <h2 className="text-2xl font-cinzel mb-6 flex items-center gap-2">
                  <i className="fas fa-project-diagram text-indigo-400"></i>
                  Aspectos Planetarios Principales
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
                  <table className="w-full text-left">
                    <thead className="bg-gray-800 text-indigo-300 text-sm uppercase tracking-wider">
                      <tr>
                        <th className="p-4">Aspecto</th>
                        <th className="p-4">Simbolo</th>
                        <th className="p-4">Ángulo</th>
                        <th className="p-4">Naturaleza</th>
                        <th className="p-4">Significado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {ASPECTS.map(asp => (
                        <tr key={asp.name} className="hover:bg-gray-800/50 transition-colors">
                          <td className="p-4 font-bold">{asp.name}</td>
                          <td className="p-4 text-xl">{asp.symbol}</td>
                          <td className="p-4">{asp.angle}°</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                              asp.nature === 'Harmonious' ? 'bg-emerald-500/20 text-emerald-400' : 
                              asp.nature === 'Challenging' ? 'bg-red-500/20 text-red-400' : 
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {asp.nature}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-slate-400">{asp.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        ) : (
          /* Natal Chart Mode */
          <div className="flex flex-col items-center max-w-4xl mx-auto space-y-12">
            <section className="w-full bg-gray-900/50 p-8 rounded-3xl border border-gray-800 text-center">
              <h2 className="text-3xl font-cinzel mb-4">Cálculo de Posiciones Celestiales</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Ingresa tu fecha de nacimiento para visualizar una representación simbólica de los planetas y asteroides en la rueda zodiacal.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <input 
                  type="date" 
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="bg-gray-800 border border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-auto"
                />
                <button className="w-full md:w-auto px-8 py-4 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all font-bold">
                  Generar Mapa Cósmico
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
              <CosmicChart />
              <div className="space-y-6">
                <h3 className="text-2xl font-cinzel">Sinfonía Planetaria</h3>
                <div className="space-y-4">
                  {PLANETS.slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center gap-4 p-4 bg-gray-800/40 border border-gray-700 rounded-2xl">
                      <span className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full border border-gray-700">{p.symbol}</span>
                      <div>
                        <h4 className="font-bold text-indigo-300">{p.name}</h4>
                        <p className="text-xs text-slate-400">{p.astrologicalSignificance}</p>
                      </div>
                    </div>
                  ))}
                  <p className="text-center text-sm text-slate-500 italic">
                    Las posiciones en este gráfico son ilustrativas. Para un cálculo astronómico exacto, se requiere hora y lugar de nacimiento específicos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 px-6 border-t border-gray-800 bg-gray-900/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-cinzel text-xl mb-4">Astrología</h4>
            <p className="text-slate-400 text-sm">
              Una herramienta educativa diseñada para profundizar en los misterios del cosmos y la psicología moderna a través de la astrología.
            </p>
          </div>
          <div>
            <h4 className="font-cinzel text-xl mb-4">Planetas y Puntos</h4>
            <ul className="text-slate-400 text-sm space-y-2">
              <li>Lilith: La fuerza indómita.</li>
              <li>Quirón: La llave a la sanación.</li>
              <li>Hécate: La sabiduría en la encrucijada.</li>
              <li>Juno: El poder del compromiso.</li>
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="font-cinzel text-xl mb-4">Cosmos Conectado</h4>
            <p className="text-slate-400 text-sm mb-4">Powered by Gemini AI para interpretaciones dinámicas.</p>
            <div className="flex gap-4">
              <i className="fab fa-twitter text-xl text-indigo-400 hover:text-white transition-colors cursor-pointer"></i>
              <i className="fab fa-instagram text-xl text-indigo-400 hover:text-white transition-colors cursor-pointer"></i>
              <i className="fas fa-envelope text-xl text-indigo-400 hover:text-white transition-colors cursor-pointer"></i>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-800 text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Astrofonia. Todos los derechos reservados. El destino está en las estrellas, el camino es tuyo.
        </div>
      </footer>
    </div>
  );
};

export default App;
