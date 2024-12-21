export interface Artifact {
  id: string;
  type: 'prometheus' | 'grafana' | 'note';
  title: string;
  description: string;
  tags: string[];
  content: string;
  metric?: {
    value: number;
    label: string;
  };
}

