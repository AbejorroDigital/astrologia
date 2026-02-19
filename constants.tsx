
import { ZodiacSign, Element, Modality, AstrologicalHouse, CelestialBody, Aspect } from './types';

export const SIGNS: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', symbol: '♈', element: Element.Fire, modality: Modality.Cardinal, ruler: 'Mars', description: 'El pionero, impulsivo y valiente.' },
  { id: 'taurus', name: 'Tauro', symbol: '♉', element: Element.Earth, modality: Modality.Fixed, ruler: 'Venus', description: 'Estable, sensorial y perseverante.' },
  { id: 'gemini', name: 'Géminis', symbol: '♊', element: Element.Air, modality: Modality.Mutable, ruler: 'Mercury', description: 'Comunicativo, curioso y dual.' },
  { id: 'cancer', name: 'Cáncer', symbol: '♋', element: Element.Water, modality: Modality.Cardinal, ruler: 'Moon', description: 'Emocional, protector y hogareño.' },
  { id: 'leo', name: 'Leo', symbol: '♌', element: Element.Fire, modality: Modality.Fixed, ruler: 'Sun', description: 'Creativo, líder y generoso.' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', element: Element.Earth, modality: Modality.Mutable, ruler: 'Mercury', description: 'Analítico, práctico y perfeccionista.' },
  { id: 'libra', name: 'Libra', symbol: '♎', element: Element.Air, modality: Modality.Cardinal, ruler: 'Venus', description: 'Equilibrado, diplomático y sociable.' },
  { id: 'scorpio', name: 'Escorpio', symbol: '♏', element: Element.Water, modality: Modality.Fixed, ruler: 'Pluto', description: 'Intenso, transformador y profundo.' },
  { id: 'sagittarius', name: 'Sagitario', symbol: '♐', element: Element.Fire, modality: Modality.Mutable, ruler: 'Jupiter', description: 'Aventurero, optimista y filosófico.' },
  { id: 'capricorn', name: 'Capricornio', symbol: '♑', element: Element.Earth, modality: Modality.Cardinal, ruler: 'Saturn', description: 'Ambicioso, disciplinado y realista.' },
  { id: 'aquarius', name: 'Acuario', symbol: '♒', element: Element.Air, modality: Modality.Fixed, ruler: 'Uranus', description: 'Innovador, humanitario e independiente.' },
  { id: 'pisces', name: 'Piscis', symbol: '♓', element: Element.Water, modality: Modality.Mutable, ruler: 'Neptune', description: 'Sojador, compasivo e intuitivo.' },
];

export const HOUSES: AstrologicalHouse[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  keyword: [
    'El Yo y la Identidad', 'Recursos y Valores', 'Comunicación y Entorno Cercano',
    'Hogar y Raíces', 'Creatividad y Romance', 'Salud y Rutina',
    'Relaciones y Socios', 'Transformación y Bienes Compartidos', 'Filosofía y Viajes',
    'Carrera y Estatus Social', 'Amigos y Aspiraciones', 'Espiritualidad e Inconsciente'
  ][i],
  description: `La casa ${i + 1} rige ${[
    'la autoimagen y cómo nos presentamos al mundo.',
    'las finanzas, posesiones y el sentido de autovalía.',
    'la mente concreta, hermanos y desplazamientos cortos.',
    'la familia, la madre/padre y la vida privada.',
    'la expresión personal, los hijos y el placer.',
    'el trabajo diario, el servicio y el bienestar físico.',
    'el matrimonio, los contratos y los enemigos abiertos.',
    'el sexo, la muerte, los impuestos y el ocultismo.',
    'la educación superior, la religión y el extranjero.',
    'la reputación, la ambición y la figura de autoridad.',
    'los grupos, la tecnología y los ideales sociales.',
    'el karma, el aislamiento y la conexión con lo divino.'
  ][i]}`,
  naturalRuler: SIGNS[i].ruler
}));

export const PLANETS: CelestialBody[] = [
  { id: 'sun', name: 'Sol', symbol: '☉', type: 'Planet', description: 'Identidad, propósito y vitalidad.', astrologicalSignificance: 'Representa el ego consciente y la esencia del individuo.' },
  { id: 'moon', name: 'Luna', symbol: '☽', type: 'Planet', description: 'Emociones, instintos y nutrición.', astrologicalSignificance: 'Rige el mundo emocional y la respuesta instintiva.' },
  { id: 'mercury', name: 'Mercurio', symbol: '☿', type: 'Planet', description: 'Mente, comunicación y lógica.', astrologicalSignificance: 'Muestra cómo procesamos y transmitimos información.' },
  { id: 'venus', name: 'Venus', symbol: '♀', type: 'Planet', description: 'Amor, belleza y valores.', astrologicalSignificance: 'Define nuestra forma de amar y lo que valoramos.' },
  { id: 'mars', name: 'Marte', symbol: '♂', type: 'Planet', description: 'Acción, deseo y energía.', astrologicalSignificance: 'Indica cómo luchamos y nuestra pulsión sexual.' },
  { id: 'jupiter', name: 'Júpiter', symbol: '♃', type: 'Planet', description: 'Expansión, suerte y sabiduría.', astrologicalSignificance: 'Representa el crecimiento y la búsqueda de significado.' },
  { id: 'saturn', name: 'Saturno', symbol: '♄', type: 'Planet', description: 'Estructura, tiempo y karma.', astrologicalSignificance: 'Muestra nuestras limitaciones y áreas de responsabilidad.' },
  { id: 'uranus', name: 'Urano', symbol: '♅', type: 'Planet', description: 'Cambio, rebelión e inventiva.', astrologicalSignificance: 'Rige las rupturas con lo tradicional y la genialidad.' },
  { id: 'neptune', name: 'Neptuno', symbol: '♆', type: 'Planet', description: 'Sueños, ilusión y espiritualidad.', astrologicalSignificance: 'Representa la disolución de fronteras y lo místico.' },
  { id: 'pluto', name: 'Plutón', symbol: '♇', type: 'Planet', description: 'Transformación, poder y sombra.', astrologicalSignificance: 'Rige los procesos de muerte y renacimiento profundo.' },
];

export const ASTEROIDS: CelestialBody[] = [
  { id: 'lilith', name: 'Lilith', symbol: '⚸', type: 'Asteroid', description: 'La Luna Negra. Rebeldía y deseo reprimido.', astrologicalSignificance: 'Representa el lado oscuro, la independencia radical y el magnetismo primal.' },
  { id: 'chiron', name: 'Quirón', symbol: '⚷', type: 'Asteroid', description: 'El sanador herido.', astrologicalSignificance: 'Marca donde tenemos una herida profunda que, al sanar, nos permite ayudar a otros.' },
  { id: 'juno', name: 'Juno', symbol: '⚵', type: 'Asteroid', description: 'Compromiso y matrimonio.', astrologicalSignificance: 'Rige las asociaciones a largo plazo y la lealtad.' },
  { id: 'ceres', name: 'Ceres', symbol: '⚳', type: 'Asteroid', description: 'Nutrición y maternidad.', astrologicalSignificance: 'Muestra cómo cuidamos de otros y cómo necesitamos ser cuidados.' },
  { id: 'vesta', name: 'Vesta', symbol: '⚴', type: 'Asteroid', description: 'Devoción y enfoque.', astrologicalSignificance: 'Representa el fuego sagrado interno y lo que consideramos sagrado.' },
  { id: 'pallas', name: 'Palas', symbol: '⚓', type: 'Asteroid', description: 'Sabiduría y estrategia.', astrologicalSignificance: 'Muestra nuestra capacidad de percibir patrones y resolver problemas creativamente.' },
  { id: 'psyche', name: 'Psique', symbol: 'ψ', type: 'Asteroid', description: 'Evolución del alma.', astrologicalSignificance: 'Rige el proceso de metamorfosis psicológica y el amor del alma.' },
  { id: 'nessus', name: 'Nessus', symbol: '⚿', type: 'Asteroid', description: 'Límites y karma genealógico.', astrologicalSignificance: 'Trata sobre el abuso de poder y la liberación de ciclos tóxicos.' },
  { id: 'eros', name: 'Eros', symbol: '💘', type: 'Asteroid', description: 'Pasión y vitalidad erótica.', astrologicalSignificance: 'Representa lo que nos enciende y la energía de vida creativa.' },
  { id: 'hecate', name: 'Hécate', symbol: '🗝️', type: 'Asteroid', description: 'Encrucijadas y sabiduría oculta.', astrologicalSignificance: 'Rige las transiciones, el conocimiento de la noche y la guía en momentos de crisis.' },
];

export const ASPECTS: Aspect[] = [
  { name: 'Conjunción', symbol: '☌', angle: 0, nature: 'Neutral', description: 'Unión de energías potentes.' },
  { name: 'Oposición', symbol: '☍', angle: 180, nature: 'Challenging', description: 'Tensión externa y polaridad.' },
  { name: 'Trígono', symbol: '△', angle: 120, nature: 'Harmonious', description: 'Flujo fácil y talentos naturales.' },
  { name: 'Cuadratura', symbol: '□', angle: 90, nature: 'Challenging', description: 'Conflicto interno que impulsa la acción.' },
  { name: 'Sextil', symbol: '⚹', angle: 60, nature: 'Harmonious', description: 'Oportunidades que requieren esfuerzo.' },
];
