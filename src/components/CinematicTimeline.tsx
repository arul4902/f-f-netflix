import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { timelineData } from '../data/timelineData';
import { TimelineNode } from '../types';

interface CinematicTimelineProps {
  onSelectChapterById: (chapterId: string) => void;
}

export const CinematicTimeline: React.FC<CinematicTimelineProps> = ({
  onSelectChapterById,
}) => {
  const [selectedNode, setSelectedNode] = useState<TimelineNode>(timelineData[0]);
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');

  const years = ['all', '2017', '2018', '2019', '2022', '2023', '2024', '2025', '2026'];

  const filteredNodes = selectedYearFilter === 'all'
    ? timelineData
    : timelineData.filter((n) => n.year === selectedYearFilter);

  return (
    <section id="timeline" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-midnight-950 overflow-hidden w-full">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-berry/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-wine-900/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine-900/60 border border-gold/30 text-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]">
            <Calendar className="w-3.5 h-3.5 flex-none" />
            <span>2017 – Present Day</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-ivory tracking-tight">
            THE CHRONOLOGICAL SAGA
          </h2>

          <p className="font-serif italic text-sm sm:text-base md:text-lg text-gold-light/90">
            "Nine years of choosing each other through continents, exams, bus rides, ICU prayers, and dreams come true."
          </p>

          {/* Quick Year Filters (Swipeable on mobile) */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar pt-2 pb-1 max-w-full">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYearFilter(y)}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex-none min-h-[36px] ${
                  selectedYearFilter === y
                    ? 'bg-gold text-midnight-950 font-bold shadow'
                    : 'bg-wine-900/40 text-ivory/60 hover:text-ivory hover:bg-wine-900/80 border border-gold/15'
                }`}
              >
                {y === 'all' ? 'All Milestones' : y}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Layout: Mobile preview card at top, desktop on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Mobile Preview Banner (Visible on <1024px) */}
          <div className="block lg:hidden w-full">
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#1C1224] via-midnight-900 to-[#120A17] border border-gold/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gold">
                <span className="uppercase tracking-widest">{selectedNode.date}</span>
                <span className="px-2 py-0.5 rounded-full bg-berry/30 border border-berry/50 text-[10px] text-rose-dusty">
                  {selectedNode.tag}
                </span>
              </div>

              {selectedNode.imageSrc && (
                <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-lg overflow-hidden border border-gold/20">
                  <img src={selectedNode.imageSrc} alt={selectedNode.title} className="w-full h-full object-cover object-[center_20%]" />
                </div>
              )}

              <div>
                <h4 className="font-display font-bold text-base text-ivory">
                  {selectedNode.title}
                </h4>
                <p className="text-xs text-ivory/80 leading-relaxed font-light mt-1">
                  {selectedNode.description}
                </p>
              </div>

              {selectedNode.chapterId && (
                <button
                  onClick={() => onSelectChapterById(selectedNode.chapterId!)}
                  className="w-full py-2.5 rounded-lg bg-gold hover:bg-gold-light text-midnight-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Explore Chapter</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Left/Middle: Interactive Milestone List */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3 max-h-[520px] sm:max-h-[620px] overflow-y-auto pr-1 sm:pr-2 no-scrollbar w-full">
            {filteredNodes.map((node, index) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <motion.div
                  key={node.id}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 sm:p-4 md:p-5 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 sm:gap-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-wine-900/90 to-berry/40 border-gold shadow-xl'
                      : 'bg-[#150E1C] border-gold/15 hover:border-gold/40 hover:bg-wine-900/30'
                  }`}
                >
                  {/* Step Indicator & Year */}
                  <div className="flex flex-col items-center flex-none">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-mono font-bold transition-colors ${
                        isSelected
                          ? 'bg-gold text-midnight-950 shadow-md'
                          : 'bg-wine-900 text-gold border border-gold/30'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    {index !== filteredNodes.length - 1 && (
                      <div className="w-0.5 h-8 sm:h-10 bg-gold/20 my-1" />
                    )}
                  </div>

                  {/* Content Preview */}
                  <div className="flex-1 space-y-0.5 sm:space-y-1">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-[11px] sm:text-xs font-mono text-gold font-semibold uppercase tracking-wider">
                        {node.date}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-midnight-950 text-ivory/60 border border-ivory/10">
                        {node.tag}
                      </span>
                    </div>

                    <h3
                      className={`font-display font-bold text-sm sm:text-base transition-colors ${
                        isSelected ? 'text-ivory' : 'text-ivory/80'
                      }`}
                    >
                      {node.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-ivory/60 line-clamp-2 leading-relaxed font-light">
                      {node.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Right: Sticky Featured Milestone Detail Card (>=1024px) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#1C1224] via-midnight-900 to-[#120A17] border border-gold/40 shadow-2xl space-y-4"
              >
                {/* Media */}
                {selectedNode.imageSrc ? (
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden border border-gold/20 bg-midnight-950">
                    <img
                      src={selectedNode.imageSrc}
                      alt={selectedNode.title}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3">
                      <span className="text-[10px] font-mono text-gold bg-midnight-950/80 px-2 py-0.5 rounded border border-gold/30">
                        Real Milestone Asset
                      </span>
                    </div>
                  </div>
                ) : selectedNode.videoSrc ? (
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden border border-gold/20 bg-midnight-950">
                    <video
                      src={selectedNode.videoSrc}
                      poster={selectedNode.imageSrc}
                      controls
                      playsInline
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-xl bg-wine-900/40 border border-gold/20 flex flex-col items-center justify-center p-6 text-center">
                    <Sparkles className="w-8 h-8 text-gold/70 mb-2" />
                    <span className="font-serif italic text-sm text-gold-light">
                      Milestone {selectedNode.date}
                    </span>
                  </div>
                )}

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gold uppercase tracking-widest">
                      {selectedNode.date}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-berry/30 border border-berry/50 text-[10px] font-mono text-rose-dusty">
                      {selectedNode.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-ivory">
                    {selectedNode.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Jump to Chapter */}
                {selectedNode.chapterId && (
                  <div className="pt-2 border-t border-gold/15">
                    <button
                      onClick={() => onSelectChapterById(selectedNode.chapterId!)}
                      className="w-full py-3 rounded-xl bg-gold hover:bg-gold-light text-midnight-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer min-h-[44px]"
                    >
                      <span>Explore Chapter In Depth</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
