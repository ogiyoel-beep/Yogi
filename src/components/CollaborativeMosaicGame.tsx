import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MosaicTile, TalentCategory } from '../types';
import { TALENT_CATEGORIES, INITIAL_MOSAIC_TILES } from '../data/curriculumData';
import { soundManager } from '../utils/audio';
import {
  Sparkles,
  Users,
  Plus,
  Heart,
  Share2,
  RefreshCw,
  Info,
  CheckCircle,
  Eye,
  Maximize2
} from 'lucide-react';

const STORAGE_KEY = 'imago_dei_mosaic_tiles_v1';
const ROOM_STORAGE_KEY = 'imago_dei_mosaic_room_v1';

export const CollaborativeMosaicGame: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string>('SMP7-KATOLIK');
  const [tiles, setTiles] = useState<MosaicTile[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_MOSAIC_TILES;
  });

  const [selectedTile, setSelectedTile] = useState<MosaicTile | null>(INITIAL_MOSAIC_TILES[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedAlert, setCopiedAlert] = useState<boolean>(false);

  // Form states for adding a tile
  const [formName, setFormName] = useState<string>('');
  const [formClass, setFormClass] = useState<string>('SMP 7A');
  const [formCategory, setFormCategory] = useState<TalentCategory>('kasih_empati');
  const [formTalentName, setFormTalentName] = useState<string>('');
  const [formAffirmation, setFormAffirmation] = useState<string>('');
  const [targetSlot, setTargetSlot] = useState<{ x: number; y: number } | null>(null);

  const channelRef = useRef<BroadcastChannel | null>(null);

  // Initialize BroadcastChannel for cross-tab collaboration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('imago_dei_cathedral');
      channelRef.current = bc;

      bc.onmessage = (event) => {
        if (event.data?.type === 'TILES_UPDATED') {
          setTiles(event.data.payload);
        } else if (event.data?.type === 'LIKE_TILE') {
          setTiles((prev) =>
            prev.map((t) => (t.id === event.data.tileId ? { ...t, likes: t.likes + 1 } : t))
          );
        }
      };

      return () => {
        bc.close();
      };
    }
  }, []);

  // Save to localStorage and broadcast whenever tiles change
  const updateTiles = (newTiles: MosaicTile[]) => {
    setTiles(newTiles);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTiles));
      channelRef.current?.postMessage({
        type: 'TILES_UPDATED',
        payload: newTiles
      });
    }
  };

  // Matrix configuration (6 columns x 4 rows = 24 stained glass panes)
  const COLS = 6;
  const ROWS = 4;

  const tileMap = useMemo(() => {
    const map = new Map<string, MosaicTile>();
    tiles.forEach((t) => {
      map.set(`${t.x}-${t.y}`, t);
    });
    return map;
  }, [tiles]);

  // Synergy metrics
  const uniqueCategories = useMemo(() => {
    const categoriesPresent = new Set(tiles.map((t) => t.talentCategory));
    return categoriesPresent;
  }, [tiles]);

  const synergyPercentage = Math.min(100, Math.round((uniqueCategories.size / 6) * 100));

  const handleTileClick = (tile: MosaicTile) => {
    soundManager.playClick();
    setSelectedTile(tile);
  };

  const handleEmptySlotClick = (x: number, y: number) => {
    soundManager.playClick();
    setTargetSlot({ x, y });
    setIsModalOpen(true);
  };

  const handleLikeTile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playBell(587.33); // D5 chime
    const updated = tiles.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t));
    updateTiles(updated);
    if (selectedTile && selectedTile.id === id) {
      setSelectedTile({ ...selectedTile, likes: selectedTile.likes + 1 });
    }
    channelRef.current?.postMessage({ type: 'LIKE_TILE', tileId: id });
  };

  const handleSubmitTile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTalentName.trim() || !formAffirmation.trim()) return;

    // Determine coordinate: either targetSlot or first available
    let slotX = targetSlot?.x ?? 0;
    let slotY = targetSlot?.y ?? 0;

    if (!targetSlot) {
      let found = false;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (!tileMap.has(`${c}-${r}`)) {
            slotX = c;
            slotY = r;
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }

    const newTile: MosaicTile = {
      id: `tile-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      x: slotX,
      y: slotY,
      authorName: formName.trim(),
      schoolRole: formClass.trim() || 'SMP 7',
      talentCategory: formCategory,
      talentName: formTalentName.trim(),
      affirmation: formAffirmation.trim(),
      timestamp: Date.now(),
      likes: 1
    };

    const nextTiles = [...tiles.filter((t) => !(t.x === slotX && t.y === slotY)), newTile];
    updateTiles(nextTiles);
    setSelectedTile(newTile);
    setIsModalOpen(false);
    setTargetSlot(null);

    // Play organ harmony
    soundManager.playHarmonyChord();

    // Reset some form inputs
    setFormTalentName('');
    setFormAffirmation('');
  };

  // Simulate an active classmate joining
  const handleSimulateClassmate = () => {
    const peers = [
      { name: 'Klemens Rafael', role: 'SMP 7A', cat: 'pelayanan_aksi' as TalentCategory, talent: 'Merapikan Alkitab & Buku Pujian di Kapel', aff: 'Menjaga rumah Tuhan tetap rapi membawa sukacita di hatiku.' },
      { name: 'Bernadetta Laura', role: 'SMP 7B', cat: 'kasih_empati' as TalentCategory, talent: 'Menemani Teman Sakit di UKS', aff: 'Hadir mendampingi sesama adalah caraku meneladani Bunda Teresa.' },
      { name: 'Aloysius Bima', role: 'SMP 7C', cat: 'seni_kreasi' as TalentCategory, talent: 'Memainkan Organ Misa Sekolah', aff: 'Setiap denting tuts nada kupersembahkan untuk kemuliaan nama Kristus.' },
      { name: 'Katarina Vania', role: 'SMP 7A', cat: 'spiritualitas_doa' as TalentCategory, talent: 'Mendoakan Ujud Teman di Gua Maria', aff: 'Doa hening adalah benteng kedamaian kita bersama.' },
      { name: 'Dominikus Sandy', role: 'SMP 7B', cat: 'hikmat_nalar' as TalentCategory, talent: 'Membuat Rangkuman Pelajaran Agama', aff: 'Berbagi catatan belajar agar kami semua bisa bertumbuh bersama.' }
    ];

    // Pick random empty slot
    const emptySlots: { x: number; y: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!tileMap.has(`${c}-${r}`)) {
          emptySlots.push({ x: c, y: r });
        }
      }
    }

    if (emptySlots.length === 0) {
      alert('Semua 24 jendela mosaik katedral telah terisi penuh oleh persekutuan kelas!');
      return;
    }

    const randomSlot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
    const randomPeer = peers[Math.floor(Math.random() * peers.length)];

    const simTile: MosaicTile = {
      id: `tile-sim-${Date.now()}`,
      x: randomSlot.x,
      y: randomSlot.y,
      authorName: randomPeer.name,
      schoolRole: randomPeer.role,
      talentCategory: randomPeer.cat,
      talentName: randomPeer.talent,
      affirmation: randomPeer.aff,
      timestamp: Date.now(),
      likes: Math.floor(Math.random() * 5) + 1
    };

    const nextTiles = [...tiles, simTile];
    updateTiles(nextTiles);
    setSelectedTile(simTile);
    soundManager.playBell(659.25);
  };

  const handleResetMosaic = () => {
    if (confirm('Kembalikan mosaik ke susunan awal kelas?')) {
      updateTiles(INITIAL_MOSAIC_TILES);
      setSelectedTile(INITIAL_MOSAIC_TILES[0]);
    }
  };

  const handleCopyRoom = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`Gabung Mosaik Katolik Y7 di Ruang: ${roomCode}`);
      setCopiedAlert(true);
      setTimeout(() => setCopiedAlert(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            <span>Game Visual Kolaboratif</span>
            <span aria-hidden="true">·</span>
            <span>1 Korintus 12:12-27</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Persekutuan Kelas</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Mosaik Katedral Tubuh Kristus
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
            Setiap siswa menaruh satu keping kaca patri yang memancarkan karunia uniknya.
            Ketika seluruh karunia bersatu, jendela katedral memancarkan kemuliaan Allah yang utuh.
          </p>
        </div>

        {/* Room & Collaboration Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-300 text-xs text-stone-700">
            <span className="font-semibold text-stone-900">Ruang Kelas:</span>
            <span className="font-mono font-bold text-amber-800">{roomCode}</span>
            <button
              onClick={handleCopyRoom}
              className="text-stone-500 hover:text-stone-900 p-0.5 ml-1 transition-colors"
              title="Salin tautan ruang kelas"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleSimulateClassmate}
            className="px-3.5 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>+ Simulasi Teman Kelas</span>
          </button>

          <button
            onClick={() => {
              setTargetSlot(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Pasang Keping Karuniaku</span>
          </button>

          <button
            onClick={handleResetMosaic}
            className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
            title="Reset ke keping awal"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copiedAlert && (
        <div className="p-2 rounded-lg bg-amber-100 border border-amber-300 text-xs text-amber-900 text-center font-medium animate-fade-in">
          Kode Ruang Berhasil Disalin! Bagikan kepada teman sekelas untuk berkolaborasi.
        </div>
      )}

      {/* Synergy Indicator Strip */}
      <div className="p-4 rounded-xl bg-stone-900 text-stone-100 border border-amber-800/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-amber-200 tracking-wide uppercase">
              Harmoni Tubuh Kristus ({synergyPercentage}% Karunia Terwakili)
            </h4>
            <p className="text-xs text-stone-300">
              {synergyPercentage === 100
                ? 'Puji Tuhan! Seluruh 6 spektrum karunia telah bersatu dalam jendela katedral!'
                : `Masih dibutuhkan ${6 - uniqueCategories.size} spektrum karunia lagi untuk melengkapi mosaik.`}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full sm:w-64 bg-stone-800 h-2.5 rounded-full overflow-hidden border border-stone-700">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-teal-400 transition-all duration-500"
            style={{ width: `${synergyPercentage}%` }}
          />
        </div>
      </div>

      {/* Filter by Talent Category */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-stone-500 font-medium whitespace-nowrap shrink-0">Filter Karunia:</span>
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            filterCategory === 'all'
              ? 'bg-stone-900 text-white font-semibold'
              : 'bg-stone-100 text-stone-600 hover:text-stone-900'
          }`}
        >
          Semua ({tiles.length})
        </button>
        {Object.values(TALENT_CATEGORIES).map((cat) => {
          const count = tiles.filter((t) => t.talentCategory === cat.id).length;
          const isSelected = filterCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-800 text-white font-semibold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.name} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage: The Cathedral Stained Glass Window */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Visual Cathedral Window (8 cols) */}
        <div className="lg:col-span-8 bg-stone-950 p-6 sm:p-8 rounded-3xl border-4 border-amber-900/60 shadow-2xl relative overflow-hidden">
          {/* Subtle Gothic Arch Background Line Art */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Central Cathedral Cross Header */}
          <div className="text-center mb-6 relative z-10">
            <span className="font-cinzel text-xs text-amber-400 font-semibold tracking-widest uppercase">
              † ECCLESIA CORPUS CHRISTI †
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl text-stone-200 font-bold">
              Jendela Mosaik Persekutuan SMP Kelas VII
            </h3>
          </div>

          {/* Matrix Grid: 6 columns x 4 rows */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {Array.from({ length: ROWS }).map((_, rowIndex) =>
              Array.from({ length: COLS }).map((_, colIndex) => {
                const tile = tileMap.get(`${colIndex}-${rowIndex}`);
                const isSelected = selectedTile?.id === tile?.id;
                const matchesFilter = !tile || filterCategory === 'all' || tile.talentCategory === filterCategory;

                if (tile) {
                  const meta = TALENT_CATEGORIES[tile.talentCategory] || TALENT_CATEGORIES.kasih_empati;
                  return (
                    <button
                      key={`${colIndex}-${rowIndex}`}
                      onClick={() => handleTileClick(tile)}
                      className={`group aspect-square rounded-xl p-2.5 flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                        isSelected
                          ? 'ring-4 ring-amber-300 scale-105 z-20 shadow-xl'
                          : 'hover:scale-102 hover:shadow-lg'
                      } ${matchesFilter ? 'opacity-100' : 'opacity-25'}`}
                      style={{
                        backgroundColor: `${meta.color}25`,
                        border: `2px solid ${meta.color}90`,
                        boxShadow: isSelected ? `0 0 25px ${meta.color}80` : `0 0 10px ${meta.color}30`
                      }}
                    >
                      {/* Glass Glare Sheen Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity" />

                      <div className="flex items-center justify-between relative z-10">
                        <span
                          className="w-2.5 h-2.5 rounded-full shadow-xs"
                          style={{ backgroundColor: meta.color }}
                        />
                        <span className="text-[10px] font-mono font-medium text-stone-400 group-hover:text-stone-200">
                          {tile.schoolRole}
                        </span>
                      </div>

                      <div className="relative z-10 my-auto">
                        <p className="text-xs font-bold text-white line-clamp-2 leading-tight drop-shadow-sm">
                          {tile.authorName}
                        </p>
                        <p className="text-[10px] text-amber-200/90 line-clamp-1 mt-0.5">
                          {tile.talentName}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-stone-300 relative z-10 pt-1 border-t border-white/10">
                        <span className="text-[9px] uppercase tracking-wider truncate max-w-[60px]">
                          {meta.name.split(' ')[1]}
                        </span>
                        <span className="flex items-center gap-0.5 text-rose-300 font-semibold">
                          <Heart className="w-2.5 h-2.5 fill-rose-400 text-rose-400" />
                          <span>{tile.likes}</span>
                        </span>
                      </div>
                    </button>
                  );
                }

                // Empty Slot
                return (
                  <button
                    key={`${colIndex}-${rowIndex}`}
                    onClick={() => handleEmptySlotClick(colIndex, rowIndex)}
                    className="aspect-square rounded-xl border-2 border-dashed border-stone-800 hover:border-amber-500/70 bg-stone-900/40 hover:bg-amber-950/20 flex flex-col items-center justify-center gap-1 text-stone-600 hover:text-amber-300 transition-all p-2 cursor-pointer group"
                  >
                    <Plus className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 group-hover:text-amber-300">
                      Pasang
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Stained Glass Footer Inscription */}
          <div className="mt-6 text-center text-xs text-amber-200/70 font-cinzel italic tracking-wide">
            &ldquo;Semua anggota itu, sekalipun banyak, merupakan satu tubuh (1 Kor 12:12)&rdquo;
          </div>
        </div>

        {/* Right: Selected Tile Inspector Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedTile ? (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                    <span>{selectedTile.schoolRole}</span>
                    <span aria-hidden="true">·</span>
                    <span>Warga Tubuh Kristus</span>
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-stone-900 leading-snug">
                    {selectedTile.authorName}
                  </h3>
                </div>

                {/* Talent Category Badge */}
                {(() => {
                  const meta = TALENT_CATEGORIES[selectedTile.talentCategory] || TALENT_CATEGORIES.kasih_empati;
                  return (
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.name}
                    </span>
                  );
                })()}
              </div>

              {/* Talent Details */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                    Karunia & Talenta yang Diberikan Tuhan:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                    {selectedTile.talentName}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Doa Syukur & Dedikasi Pribadi:
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 italic font-serif leading-relaxed">
                    &ldquo;{selectedTile.affirmation}&rdquo;
                  </p>
                </div>
              </div>

              {/* Biblical Companion Example */}
              {(() => {
                const meta = TALENT_CATEGORIES[selectedTile.talentCategory] || TALENT_CATEGORIES.kasih_empati;
                return (
                  <div className="text-xs text-stone-600 bg-stone-100 p-3 rounded-lg border border-stone-200">
                    <span className="font-semibold text-stone-800 block text-[11px] mb-0.5">
                      Teladan Kitab Suci:
                    </span>
                    {meta.biblicalExample}
                  </div>
                );
              })()}

              {/* Action Buttons: Like / Amen & Add your own */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={(e) => handleLikeTile(selectedTile.id, e)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span>Katakan Amin / Kasih ({selectedTile.likes})</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500 space-y-3">
              <Eye className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs sm:text-sm">
                Klik salah satu keping kaca patri pada jendela untuk membaca karunia dan doa syukur temanmu.
              </p>
            </div>
          )}

          {/* Quick Guide Card */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-stone-800">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>Cara Bermain Kolaboratif:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-stone-600 pl-1 leading-relaxed">
              <li>Pilih slot kosong bertanda (+) untuk menaruh keping karunia unikmu.</li>
              <li>Tuliskan bakat nyata (musik, empati, logika, olahraga, dll).</li>
              <li>Setiap tab browser yang dibuka akan tersinkronisasi otomatis secara langsung!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal: Add Tile Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-300 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-stone-900">
                  Pasang Keping Kaca Patri Karuniaku
                </h3>
                <p className="text-xs text-stone-500">
                  Persembahkan keunikan talenta yang Tuhan anugerahkan bagimu.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitTile} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Nama Lengkap / Panggilan:</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Fransiskus"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Kelas / Kelompok:</label>
                  <input
                    type="text"
                    required
                    value={formClass}
                    onChange={(e) => setFormClass(e.target.value)}
                    placeholder="Contoh: SMP 7A"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Kategori Karunia Rohani:</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(TALENT_CATEGORIES).map((cat) => {
                    const isSelected = formCategory === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setFormCategory(cat.id as TalentCategory)}
                        className={`p-2 rounded-lg text-left text-xs border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold ring-1 ring-amber-500'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="truncate">{cat.name.split(' ')[1]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Talenta / Bakat Unik yang Dimiliki:</label>
                <input
                  type="text"
                  required
                  value={formTalentName}
                  onChange={(e) => setFormTalentName(e.target.value)}
                  placeholder="Contoh: Menjadi pendengar setia, bermain gitar koor, menyemangati teman..."
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Doa Syukur / Komitmen Berbagi:</label>
                <textarea
                  rows={3}
                  required
                  value={formAffirmation}
                  onChange={(e) => setFormAffirmation(e.target.value)}
                  placeholder="Contoh: Aku bersyukur Tuhan memberiku bakat ini, dan aku berjanji menggunakannya untuk menolong sesama tanpa sombong..."
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Pasang di Jendela Katedral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
