import React from 'react';
import { TEACHER_RPP_INFO } from '../data/curriculumData';
import { BookOpen, CheckCircle2, Award, Users, HeartHandshake, X } from 'lucide-react';

interface CatholicTeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatholicTeacherGuideModal: React.FC<CatholicTeacherGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-300 max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900">
                Panduan Guru & Modul Ajar Kurikulum Merdeka
              </h3>
              <p className="text-xs text-stone-500">
                Pendidikan Agama Katolik dan Budi Pekerti · Fase D (SMP Kelas 7)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Essential Curriculum Matrix */}
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">
              Mata Pelajaran & Fase:
            </span>
            <p className="font-semibold text-stone-900 text-sm">
              {TEACHER_RPP_INFO.mataPelajaran} ({TEACHER_RPP_INFO.faseKelas})
            </p>
            <p className="text-stone-600">
              Elemen: <strong>{TEACHER_RPP_INFO.elemen}</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <span className="font-bold text-stone-500 uppercase tracking-wider block text-[10px]">
              Metode & Media Pembelajaran:
            </span>
            <p className="text-stone-700 leading-relaxed">
              {TEACHER_RPP_INFO.metodePembelajaran}
            </p>
          </div>
        </div>

        {/* Capaian Pembelajaran */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-700" />
            <span>Capaian Pembelajaran (CP) Fase D:</span>
          </h4>
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif">
            {TEACHER_RPP_INFO.capaianPembelajaran}
          </p>
        </div>

        {/* Dimensi Profil Pelajar Pancasila */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700">
            Keterkaitan Profil Pelajar Pancasila:
          </h4>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            {TEACHER_RPP_INFO.dimensiProfilPancasila.map((dim, i) => (
              <div key={i} className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-800 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span className="leading-snug">{dim}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rubrik Penilaian Sikap & Kolaborasi */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700">
            Panduan Penilaian Gamifikasi & Kolaborasi:
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100 text-stone-700">
                  <th className="p-2.5 font-semibold">Aktivitas Web</th>
                  <th className="p-2.5 font-semibold">Indikator Sikap & Keterampilan</th>
                  <th className="p-2.5 font-semibold">Bukti Belajar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr>
                  <td className="p-2.5 font-medium text-stone-900">Mosaik Katedral</td>
                  <td className="p-2.5">Kemampuan mengenali talenta pribadi & mensyukurinya secara jujur.</td>
                  <td className="p-2.5">Keping Mosaik & Doa Dedikasi terpasang.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-stone-900">Misi Tubuh Kristus</td>
                  <td className="p-2.5">Kolaborasi tim; tidak menganggap diri paling penting (1 Kor 12).</td>
                  <td className="p-2.5">Skor Sinergi & Pemecahan Kasus.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-stone-900">Dinding Apresiasi</td>
                  <td className="p-2.5">Empati kristiani & sikap anti-bullying terhadap sesama.</td>
                  <td className="p-2.5">Kartu Apresiasi Sahabat yang dikirim.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            Dipersiapkan untuk pembelajaran kelas atau laboratorium komputer SMP.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
