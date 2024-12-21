import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Incident } from '../../types/incident';
import { incidentsApi } from '../../api/incidents';
import { Tag } from '../../components/Tag';

interface IncidentCardProps {
  incident: Incident;
  index: number;
  isExpanded: boolean;
  totalCards: number;
}

function IncidentCard({ incident, index, isExpanded, totalCards }: IncidentCardProps) {
  // Reuse the same animation logic from ArtifactCard
  const getCollapsedPosition = () => {
    if (isExpanded) return 0;
    return index * 32; // Each collapsed card shows 32px of the next card
  };

  const zIndex = isExpanded ? totalCards - index : totalCards - index;

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
        {/* Header */}
        <div className="p-4 pb-2 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{incident.title}</h3>
              <p className="text-gray-400 text-sm">Owner: {incident.owner}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
          <Tag active>{`Severity: ${incident.severity}`}</Tag>
          <Tag active>{`Status: ${incident.status}`}</Tag>
        </div>

        {/* Content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          className="overflow-hidden"
        >
          <div className="p-4 border-t border-gray-700">
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">Source:</span> {incident.source}
              </p>
              {incident.trigger && (
                <p className="text-gray-300">
                  <span className="font-medium">Trigger:</span> {incident.trigger}
                </p>
              )}
              <p className="text-gray-300">
                <span className="font-medium">Created:</span>{' '}
                {new Date(incident.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Last Updated:</span>{' '}
                {new Date(incident.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await incidentsApi.getAll();
        setIncidents(data);
      } catch (err) {
        setError('Failed to fetch incidents');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading incidents...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Incidents</h1>
        {isTimelineExpanded && (
          <button
            onClick={() => setIsTimelineExpanded(false)}
            className="text-gray-400 hover:text-white text-sm font-medium"
          >
            Collapse All
          </button>
        )}
      </div>

      <div
        className="relative"
        style={{ height: isTimelineExpanded ? 'auto' : `${incidents.length * 48 + 200}px` }}
      >
        <div
          className={`${isTimelineExpanded ? 'space-y-4' : 'relative'}`}
          onClick={() => {
            if (!isTimelineExpanded) {
              setIsTimelineExpanded(true);
            }
          }}
        >
          {incidents.map((incident, index) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              index={index}
              isExpanded={isTimelineExpanded}
              totalCards={incidents.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
