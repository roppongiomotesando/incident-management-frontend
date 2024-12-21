'use client'

import { useState } from 'react';
import { ArtifactCard } from './ArtifactCard';
import { FloatingActionButton } from './FloatingActionButton';
import { Tag } from './Tag';
import { Artifact } from '../types/artifact';

const mockArtifacts: Artifact[] = [
  {
    id: '1',
    type: 'prometheus',
    title: 'CPU Usage Spike',
    description: 'Sudden increase in CPU usage detected',
    tags: ['critical', 'performance'],
    content: 'Prometheus chart data here',
    metric: {
      value: 92,
      label: 'CPU Usage %'
    }
  },
  {
    id: '2',
    type: 'grafana',
    title: 'Memory Utilization',
    description: 'Memory usage over the last 24 hours',
    tags: ['monitoring', 'resource'],
    content: 'Grafana panel data here',
    metric: {
      value: 76,
      label: 'Memory Usage %'
    }
  },
  {
    id: '3',
    type: 'note',
    title: 'Incident Response',
    description: 'Steps taken to mitigate the issue',
    tags: ['action', 'resolution'],
    content: 'At 2:30 PM, we identified the root cause of the CPU spike and implemented a fix by optimizing the database queries.',
  },
];

export function Timeline() {
  const [artifacts] = useState<Artifact[]>(mockArtifacts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  const allTags = Array.from(
    new Set(artifacts.flatMap(artifact => artifact.tags))
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredArtifacts = artifacts.filter(artifact =>
    selectedTags.length === 0 ||
    artifact.tags.some(tag => selectedTags.includes(tag))
  );

  // Calculate the total height needed for the stack container
  const stackHeight = isTimelineExpanded
    ? 'auto'
    : `${filteredArtifacts.length * 48 + 200}px`;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Incident Timeline</h1>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allTags.map(tag => (
              <button key={tag} onClick={() => toggleTag(tag)}>
                <Tag active={selectedTags.includes(tag)}>{tag}</Tag>
              </button>
            ))}
          </div>
          {isTimelineExpanded && (
            <button
              onClick={() => setIsTimelineExpanded(false)}
              className="text-gray-400 hover:text-white text-sm font-medium"
            >
              Collapse All
            </button>
          )}
        </div>
      </div>
      
      <div 
        className="relative"
        style={{ height: stackHeight }}
      >
        <div 
          className={`${isTimelineExpanded ? 'space-y-4' : 'relative'}`}
          onClick={() => {
            if (!isTimelineExpanded) {
              setIsTimelineExpanded(true);
            }
            console.log('Timeline clicked, expanding:', !isTimelineExpanded);
          }}
        >
          {filteredArtifacts.map((artifact, index) => (
            <ArtifactCard
              key={artifact.id}
              artifact={artifact}
              index={index}
              isExpanded={isTimelineExpanded}
              totalCards={filteredArtifacts.length}
            />
          ))}
        </div>
      </div>
      
      <FloatingActionButton onClick={() => {}} />
    </div>
  );
}
