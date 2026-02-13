export type TabType = 'PC-Hardware' | 'P-Games' | 'Media';
export type MediaType = 'Music' | 'Video';

export interface HardwareItem {
  label: string;
  value: string;
}

export interface GameItem {
  name: string;
  status: string;
}

export interface MediaItem {
  title: string;
  link: string;
  type: MediaType;
  author?: string; // Опционально для музыки
}

export const TABS_DATA = {
  HARDWARE: [
    { label: 'OS', value: 'Windows 11 Pro' },
    { label: 'CPU', value: 'Ryzen 5 5600' },
    { label: 'RAM', value: 'ADATA XPG SPECTRIX D41 16*2 GB' },
    { label: 'GPU', value: 'RTX 4060 CYCLONE OC' },
    { label: 'Cooler', value: 'ID-COOLING SE-206-XT ARGB' },
    { label: 'Motherboard', value: 'ASRock B550 Phantom Gaming 4' }
  ] as HardwareItem[],
  
  GAMES: [
    { name: 'Counter Strike 2', status: 'Sometimes' },
    { name: 'Gunfire Reborn', status: 'Sometimes' },
    { name: 'GTA V Enchanced', status: 'Sometimes' },
    { name: 'Osu! Lazer', status: 'Often' },
    { name: 'VR Chat', status: 'Sometimes' }
  ] as GameItem[],

  MEDIA: [
    { 
      title: 'Mr Kinako \\/ Geoxor - Nana \\/ Avee Player', 
      link: 'https://youtu.be/dq3OOk88nlk', 
      type: 'Video' 
    },
    { 
      title: `Agressive Radio-Toxic "phonk" (v2)`,
      author: 'Mr_Kinako / Suno AI',
      link: `/myMusic/Agressive Radio-Toxic _phonk_ (v2).mp3`, 
      type: 'Music' 
    },
    { 
      title: `The Void's Rain hymn (reupload)`,
      author: 'Mr_Kinako / Suno AI',
      link: `/myMusic/The Void's Rain hymn (reupload).mp3`, 
      type: 'Music' 
    },
    { 
      title: `MelancholicRain vs AgressivePhonk`,
      author: 'Mr_Kinako / Suno AI',
      link: `/myMusic/MelancholicRain vs AgressivePhonk.mp3`, 
      type: 'Music' 
    },
    { 
      title: `Worthless? (reupload)`,
      author: 'Mr_Kinako / Suno AI',
      link: `/myMusic/Worthless_ (reupload).mp3`, 
      type: 'Music' 
    },
    { 
      title: `What Is "Normal"? (reupload)`,
      author: 'Mr_Kinako / Suno AI',
      link: `/myMusic/What Is _Normal__ (reupload).mp3`, 
      type: 'Music' 
    },
    { 
      title: `"Вечный цикл Мыслей" (ver.2)`,
      author: 'Mr_Kinako / Suno AI',
      link: `/myMusic/_Вечный цикл Мыслей_ (ver.2).mp3`, 
      type: 'Music' 
    },
    { 
      title: `Мой внутренний реактор (reupload)`,
      author: 'Mr_Kinako / Suno AI',
      link: `/myMusic/Мой внутренний реактор (reupload).mp3`, 
      type: 'Music' 
    }
  ] as MediaItem[]
};