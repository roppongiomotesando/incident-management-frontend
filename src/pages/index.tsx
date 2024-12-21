import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Plus, MoreVertical } from 'lucide-react';
import { Incident, IncidentSeverity, IncidentStatus, CreateIncidentDto, UpdateIncidentDto } from '../types/incident';
import { incidentsApi } from '../api/incidents';
import { Tag } from '../components/Tag';
import { IncidentDialog } from '../components/IncidentDialog';
import { showToast } from '../utils/toast';
import toast from 'react-hot-toast';

interface IncidentCardProps {
  incident: Incident;
  index: number;
  isExpanded: boolean;
  totalCards: number;
  onStatusChange: (status: IncidentStatus) => void;
  onSeverityChange: (severity: IncidentSeverity) => void;
  onEdit: () => void;
}

function IncidentCard({
  incident,
  index,
  isExpanded,
  totalCards,
  onStatusChange,
  onSeverityChange,
  onEdit
}: IncidentCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCollapsedPosition = () => {
    if (isExpanded) return 0;
    return index * 32;
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
          <div className="relative">
            <button
              className="text-gray-400 hover:text-white p-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-50"
                onClick={e => e.stopPropagation()}
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                  >
                    Edit Incident
                  </button>
                  <div className="px-4 py-2">
                    <label className="block text-sm text-gray-400 mb-1">Status</label>
                    <select
                      value={incident.status}
                      onChange={(e) => {
                        onStatusChange(e.target.value as IncidentStatus);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gray-800 text-white rounded px-2 py-1 text-sm"
                    >
                      <option value="open">Open</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="px-4 py-2">
                    <label className="block text-sm text-gray-400 mb-1">Severity</label>
                    <select
                      value={incident.severity}
                      onChange={(e) => {
                        onSeverityChange(Number(e.target.value) as IncidentSeverity);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gray-800 text-white rounded px-2 py-1 text-sm"
                    >
                      <option value={1}>Critical</option>
                      <option value={2}>High</option>
                      <option value={3}>Medium</option>
                      <option value={4}>Low</option>
                      <option value={5}>Info</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | undefined>();

  const handleCreateIncident = useCallback(async (data: CreateIncidentDto) => {
    const loadingToast = showToast.loading('Creating incident...');
    try {
      const newIncident = await incidentsApi.create(data);
      setIncidents(prev => [newIncident, ...prev]);
      showToast.success('Incident created successfully');
    } catch (err) {
      showToast.error('Failed to create incident');
      console.error(err);
    } finally {
      toast.dismiss(loadingToast);
    }
  }, []);

  const handleUpdateIncident = useCallback(async (id: string, data: UpdateIncidentDto) => {
    const loadingToast = showToast.loading('Updating incident...');
    try {
      const updatedIncident = await incidentsApi.update(id, data);
      setIncidents(prev => prev.map(inc => inc.id === id ? updatedIncident : inc));
      showToast.success('Incident updated successfully');
    } catch (err) {
      showToast.error('Failed to update incident');
      console.error(err);
    } finally {
      toast.dismiss(loadingToast);
    }
  }, []);

  const handleUpdateStatus = useCallback(async (id: string, status: IncidentStatus) => {
    const loadingToast = showToast.loading('Updating status...');
    try {
      const updatedIncident = await incidentsApi.updateStatus(id, status);
      setIncidents(prev => prev.map(inc => inc.id === id ? updatedIncident : inc));
      showToast.success('Status updated successfully');
    } catch (err) {
      showToast.error('Failed to update status');
      console.error(err);
    } finally {
      toast.dismiss(loadingToast);
    }
  }, []);

  const handleUpdateSeverity = useCallback(async (id: string, severity: IncidentSeverity) => {
    const loadingToast = showToast.loading('Updating severity...');
    try {
      const updatedIncident = await incidentsApi.updateSeverity(id, severity);
      setIncidents(prev => prev.map(inc => inc.id === id ? updatedIncident : inc));
      showToast.success('Severity updated successfully');
    } catch (err) {
      showToast.error('Failed to update severity');
      console.error(err);
    } finally {
      toast.dismiss(loadingToast);
    }
  }, []);

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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Incidents</h1>
          <div className="flex items-center gap-4">
            {isTimelineExpanded && (
              <button
                onClick={() => setIsTimelineExpanded(false)}
                className="text-gray-400 hover:text-white text-sm font-medium"
              >
                Collapse All
              </button>
            )}
            <button
              onClick={() => {
                setSelectedIncident(undefined);
                setIsDialogOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <Plus size={16} />
              New Incident
            </button>
          </div>
        </div>
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
              onStatusChange={(status) => handleUpdateStatus(incident.id, status)}
              onSeverityChange={(severity) => handleUpdateSeverity(incident.id, severity)}
              onEdit={() => {
                setSelectedIncident(incident);
                setIsDialogOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <IncidentDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedIncident(undefined);
        }}
        onSubmit={async (data) => {
          if (selectedIncident) {
            await handleUpdateIncident(selectedIncident.id, data);
          } else {
            await handleCreateIncident(data);
          }
        }}
        incident={selectedIncident}
      />
    </div>
  );
}
