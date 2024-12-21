'use client'

import { motion } from 'framer-motion';
import { Activity, MoreVertical } from 'lucide-react';
import { Artifact } from '../types/artifact';
import { Tag } from './Tag';

interface ArtifactCardProps {
  artifact: Artifact;
  index: number;
  isExpanded: boolean;
  totalCards: number;
}

export function ArtifactCard({ artifact, index, isExpanded, totalCards }: ArtifactCardProps) {
  // Calculate the stacking position when collapsed
  const getCollapsedPosition = () => {
    if (isExpanded) return 0;
    return index * 32; // Each collapsed card shows 32px of the next card
  };

  // Calculate the z-index to ensure proper stacking
  const zIndex = isExpanded ? totalCards - index : totalCards - index;

  console.log('ArtifactCard expanded:', isExpanded);

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        y: isExpanded ? 0 : getCollapsedPosition(),
        zIndex: zIndex,
        scale: isExpanded ? 1 : 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={`absolute w-full origin-top ${isExpanded ? 'relative mb-12' : ''}`}
      style={{
        transformOrigin: "top center"
      }}
    >
      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
        {/* Header - Always visible */}
        <div className="p-4 pb-2 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{artifact.title}</h3>
              <p className="text-gray-400 text-sm">{artifact.description}</p>
            </div>
          </div>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Tags - Always visible */}
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
          {artifact.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>

        {/* Content - Always visible in expanded state */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          className="overflow-hidden"
        >
          <div className="p-4 border-t border-gray-700">
            {artifact.metric && (
              <div className="mb-4 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {artifact.metric.value}
                  </span>
                </div>
                <div className="text-gray-400">
                  {artifact.metric.label}
                </div>
              </div>
            )}
            {artifact.type === 'prometheus' && (
              <div className="bg-gray-900 rounded-xl p-4 h-48">
                <img src="/placeholder.svg?height=200&width=400" alt="Prometheus Chart" className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
            {artifact.type === 'grafana' && (
              <div className="bg-gray-900 rounded-xl p-4 h-48">
                <iframe src="about:blank" className="w-full h-full rounded-lg" title="Grafana Panel"></iframe>
              </div>
            )}
            {artifact.type === 'note' && (
              <p className="text-gray-300">{artifact.content}</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
