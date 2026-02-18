import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Car, 
  Users, 
  Crosshair,
  DoorOpen,
  Clock,
  Radio,
  ChevronUp,
  MapPin,
  Camera,
  Pause,
  SkipBack,
  Volume2,
  AlertCircle,
  X,
  CheckCircle,
  Wifi,
  Eye,
  AlertOctagon
} from 'lucide-react';

// Tipos de datos
type Priority = 'ALTO' | 'MEDIO' | 'BAJO';

interface Alert {
  id: string;
  type: string;
  icon: React.ElementType;
  priority: Priority;
  location: string;
  camera: string;
  elapsed: string;
  risk: number;
}

// Datos mock
const mockAlerts: Alert[] = [
  { id: '1', type: 'Portonazo', icon: Car, priority: 'ALTO', location: 'Av. Kennedy', camera: 'Cam 12', elapsed: '3:40', risk: 86 },
  { id: '2', type: 'Aglomeración', icon: Users, priority: 'MEDIO', location: 'Plaza Central', camera: 'Cam 8', elapsed: '5:12', risk: 62 },
  { id: '3', type: 'Arma detectada', icon: AlertTriangle, priority: 'ALTO', location: 'Calle Moneda', camera: 'Cam 15', elapsed: '1:20', risk: 94 },
  { id: '4', type: 'Puertas abiertas', icon: DoorOpen, priority: 'BAJO', location: 'Mall Norte', camera: 'Cam 3', elapsed: '8:40', risk: 28 },
  { id: '5', type: 'Atropello', icon: AlertCircle, priority: 'ALTO', location: 'Av. Libertador', camera: 'Cam 21', elapsed: '2:15', risk: 89 },
  { id: '6', type: 'Portonazo', icon: Car, priority: 'MEDIO', location: 'Av. Providencia', camera: 'Cam 9', elapsed: '6:30', risk: 55 },
  { id: '7', type: 'Aglomeración', icon: Users, priority: 'BAJO', location: 'Estación Metro', camera: 'Cam 5', elapsed: '10:05', risk: 42 },
  { id: '8', type: 'Arma detectada', icon: AlertTriangle, priority: 'ALTO', location: 'Sector Centro', camera: 'Cam 18', elapsed: '0:45', risk: 91 },
];

const App: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<Alert>(mockAlerts[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [silenceMode, setSilenceMode] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('Unidad 1');
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [selectedEscalate, setSelectedEscalate] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState('Falso positivo');

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'ALTO': return 'bg-risk-high';
      case 'MEDIO': return 'bg-risk-medium';
      case 'BAJO': return 'bg-risk-low';
    }
  };

  const getPriorityBorder = (priority: Priority) => {
    switch (priority) {
      case 'ALTO': return 'border-risk-high';
      case 'MEDIO': return 'border-risk-medium';
      case 'BAJO': return 'border-risk-low';
    }
  };

  return (
    <div className="w-[1440px] h-[900px] bg-background overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* HEADER SUPERIOR */}
      <header className="h-[52px] bg-surface px-4 flex items-center justify-between border-b border-border-subtle shrink-0 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 state-transition">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
            <span className="text-[13px] font-semibold text-success">EDGE OK</span>
          </div>
          <div className="flex items-center gap-2 state-transition">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
            <span className="text-[13px] font-semibold text-success">CAMERAS OK</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] font-medium text-text-secondary">
            <Wifi className="w-3.5 h-3.5" />
            Latency 42ms
          </div>
        </div>
        
        <div className="text-[13px] font-medium text-text-secondary px-3 py-1.5 bg-surface-2 rounded-lg">
          📡 Turno: Noche
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-medium text-text-secondary">👤 Operador: SR</span>
          <button 
            onClick={() => setSilenceMode(!silenceMode)}
            className={`px-3 py-1.5 rounded-lg border text-[12px] font-semibold transition-all state-transition ${
              silenceMode 
                ? 'bg-risk-low/20 border-risk-low text-risk-low shadow-lg' 
                : 'bg-transparent border-border-subtle text-text-secondary hover:border-text-disabled'
            }`}
          >
            🔕 Modo Silencio {silenceMode ? 'ON' : 'OFF'}
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL - 3 COLUMNAS */}
      <div className="flex-1 flex overflow-hidden">
        {/* COLUMNA IZQUIERDA - COLA DE ALERTAS */}
        <aside className="w-[320px] bg-surface border-r border-border-subtle p-4 flex flex-col gap-3 shrink-0 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-text-primary flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-risk-high" />
              Cola
            </h2>
            <span className="text-[14px] font-bold text-risk-high bg-risk-high/20 px-2.5 py-1 rounded-lg">{mockAlerts.length}</span>
          </div>
          
          <div className="flex flex-col gap-2 overflow-y-auto pr-2">
            {mockAlerts.map((alert) => {
              const Icon = alert.icon;
              const isSelected = selectedAlert.id === alert.id;
              
              return (
                <button
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-3 rounded-[10px] border transition-all text-left state-transition group ${
                    isSelected 
                      ? 'bg-surface-2 border-risk-low shadow-lg shadow-risk-low/20 ring-1 ring-risk-low/30' 
                      : 'bg-surface-2 border-border-subtle hover:border-risk-low/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 text-text-primary shrink-0 mt-0.5 transition-all ${isSelected ? 'text-risk-low scale-110' : 'group-hover:text-risk-low'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[14px] font-semibold text-text-primary truncate">
                          {alert.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${getPriorityColor(alert.priority)} text-background shadow-md`}>
                          {alert.priority}
                        </span>
                      </div>
                      <div className="text-[12px] text-text-secondary truncate">
                        {alert.camera} • {alert.location}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-text-disabled flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3" />
                          {alert.elapsed}
                        </span>
                        <div className="text-[10px] font-bold text-risk-high bg-risk-high/20 px-1.5 py-0.5 rounded">
                          {alert.risk}% riesgo
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* COLUMNA CENTRAL - VIDEO Y CONTROLES */}
        <main className="flex-1 bg-surface p-4 flex flex-col gap-3">
          {/* Área de video */}
          <div className="flex-1 bg-background rounded-[10px] relative overflow-hidden shadow-2xl border border-border-subtle">
            {/* Video CCTV real */}
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/6eUtb9ycmno?autoplay=1&mute=1&loop=1&playlist=6eUtb9ycmno" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              className="rounded-[10px]"
            />
            
            {/* Overlay con indicadores */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Indicador LIVE */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-risk-high animate-pulse"></div>
                <span className="text-[12px] font-bold text-risk-high">LIVE</span>
              </div>
              
              {/* Información de cámara */}
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg text-[11px] font-medium text-text-secondary border border-border-subtle">
                {selectedAlert.camera} • {selectedAlert.location}
              </div>
              
              {/* Marcador de riesgo */}
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg text-[12px] font-semibold text-text-primary border border-border-subtle flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-risk-high" />
                Riesgo: {selectedAlert.risk}%
              </div>
              
              {/* Contador de tiempo */}
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg text-[12px] font-medium text-text-secondary border border-border-subtle">
                {selectedAlert.elapsed}
              </div>
            </div>
            
            {/* Overlay superior con info del evento */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/90 to-transparent p-4">
              <div className="flex items-center gap-3 text-[13px] font-medium text-text-primary">
                <span>EVENTO: <span className="text-text-primary">{selectedAlert.type}</span></span>
                <span className="text-text-disabled">|</span>
                <span>Riesgo: <span className="text-risk-high">{selectedAlert.risk}</span></span>
                <span className="text-text-disabled">|</span>
                <span>T–evento: <span className="text-text-primary">{selectedAlert.elapsed}</span></span>
                <span className="text-text-disabled">|</span>
                <span>{selectedAlert.camera} – {selectedAlert.location}</span>
              </div>
            </div>

            {/* Indicador LIVE */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-risk-high px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-text-primary animate-pulse"></div>
              <span className="text-[12px] font-semibold text-text-primary">LIVE</span>
            </div>
          </div>

          {/* Controles de video */}
          <div className="flex items-center justify-center gap-3">
            <button className="px-6 py-3 bg-surface-2 border border-border-subtle rounded-[10px] text-[14px] font-medium text-text-primary hover:bg-surface hover:border-text-disabled transition-colors flex items-center gap-2">
              <SkipBack className="w-4 h-4" />
              -30s
            </button>
            <button className="px-8 py-3 bg-surface-2 border border-border-subtle rounded-[10px] text-[14px] font-semibold text-text-primary hover:bg-surface hover:border-text-disabled transition-colors">
              LIVE
            </button>
          </div>
        </main>

        {/* COLUMNA DERECHA - ACCIONES */}
        <aside className="w-[340px] bg-surface border-l border-border-subtle p-4 flex flex-col gap-4 shrink-0 overflow-y-auto shadow-lg">
          <h2 className="text-[16px] font-bold text-text-primary flex items-center gap-2">
            <Eye className="w-5 h-5 text-risk-low" />
            Acción
          </h2>
          
          {/* Botón ENVIAR PATRULLA */}
          <div className="flex flex-col gap-2">
            <button className="w-full h-[56px] bg-gradient-to-r from-risk-low to-[#1A7FE6] rounded-[10px] text-[15px] font-bold text-white hover:shadow-lg hover:shadow-risk-low/30 transition-all state-transition font-semibold">
              🚗 ENVIAR PATRULLA
            </button>
            <div className="flex gap-2">
              {['Unidad 1', 'Unidad 2', 'Central'].map((unit) => (
                <button
                  key={unit}
                  onClick={() => setSelectedUnit(unit)}
                  className={`flex-1 px-3 py-2 rounded-lg text-[12px] font-bold border transition-all state-transition ${
                    selectedUnit === unit
                      ? 'bg-risk-low/20 border-risk-low text-risk-low shadow-md'
                      : 'bg-surface-2 border-border-subtle text-text-secondary hover:border-risk-low hover:bg-surface-2/80'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Botón AUDIO DISUASIVO */}
          <div className="flex flex-col gap-2">
            <button className="w-full h-[56px] bg-surface-2 border border-border-subtle rounded-[10px] text-[15px] font-bold text-text-primary hover:bg-surface-2/80 hover:border-text-disabled hover:shadow-md transition-all state-transition flex items-center justify-center gap-2">
              <Volume2 className="w-5 h-5" />
              AUDIO DISUASIVO
            </button>
            <div className="flex flex-wrap gap-2">
              {['Área monitoreada', 'Retírese del lugar', 'Cierre puertas / aléjese'].map((audio) => (
                <button
                  key={audio}
                  onClick={() => setSelectedAudio(audio)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all state-transition ${
                    selectedAudio === audio
                      ? 'bg-risk-medium/20 border-risk-medium text-risk-medium shadow-md'
                      : 'bg-surface-2 border-border-subtle text-text-secondary hover:border-risk-medium hover:bg-surface'
                  }`}
                >
                  {audio}
                </button>
              ))}
            </div>
          </div>

          {/* Botón ESCALAR */}
          <div className="flex flex-col gap-2">
            <button className="w-full h-[56px] bg-surface-2 border border-border-subtle rounded-[10px] text-[15px] font-bold text-text-primary hover:bg-surface-2/80 hover:border-text-disabled hover:shadow-md transition-all state-transition flex items-center justify-center gap-2">
              <ChevronUp className="w-5 h-5" />
              ESCALAR
            </button>
            <div className="flex gap-2">
              {['Supervisor', 'Emergencia'].map((escalate) => (
                <button
                  key={escalate}
                  onClick={() => setSelectedEscalate(escalate)}
                  className={`flex-1 px-3 py-2 rounded-lg text-[12px] font-bold border transition-all state-transition ${
                    selectedEscalate === escalate
                      ? 'bg-risk-medium/20 border-risk-medium text-risk-medium shadow-md'
                      : 'bg-surface-2 border-border-subtle text-text-secondary hover:border-risk-medium hover:bg-surface'
                  }`}
                >
                  {escalate}
                </button>
              ))}
            </div>
          </div>

          {/* Separador */}
          <div className="border-t border-border-subtle/50 my-2"></div>

          {/* Botones DESCARTAR y RESUELTO */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button className="flex-1 h-[44px] bg-risk-high/10 border border-risk-high rounded-[10px] text-[14px] font-bold text-risk-high hover:bg-risk-high/20 transition-all state-transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <X className="w-4 h-4" />
                DESCARTAR
              </button>
              <select 
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="h-[44px] px-3 bg-surface-2 border border-border-subtle rounded-[10px] text-[12px] font-semibold text-text-secondary hover:border-text-disabled transition-colors"
              >
                <option>Falso positivo</option>
                <option>No concluyente</option>
              </select>
            </div>
            
            <button className="w-full h-[44px] bg-success/10 border border-success rounded-[10px] text-[14px] font-bold text-success hover:bg-success/20 transition-all state-transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
              <CheckCircle className="w-4 h-4" />
              RESUELTO
            </button>
          </div>

          {/* Botón Ver detalles */}
          <button 
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="w-full py-2 text-[13px] font-semibold text-risk-low hover:text-risk-low/80 hover:bg-risk-low/10 transition-all state-transition rounded-lg"
          >
            📋 Ver detalles
          </button>
        </aside>

        {/* DRAWER DE DETALLES */}
        {drawerOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-background/80 z-40"
              onClick={() => setDrawerOpen(false)}
            ></div>
            
            {/* Drawer */}
            <div className="fixed right-0 top-0 bottom-0 w-[380px] bg-surface border-l border-border-subtle z-50 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-semibold text-text-primary">Detalles</h3>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-surface-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              {/* Mini mapa placeholder */}
              <div className="mb-4">
                <h4 className="text-[13px] font-medium text-text-secondary mb-2">Ubicación</h4>
                <div className="h-[180px] bg-surface-2 rounded-[10px] border border-border-subtle flex items-center justify-center relative">
                  <MapPin className="w-8 h-8 text-risk-high absolute" />
                  <span className="text-[12px] text-text-disabled mt-16">Mapa placeholder</span>
                </div>
              </div>

              {/* Cámaras cercanas */}
              <div className="mb-4">
                <h4 className="text-[13px] font-medium text-text-secondary mb-2">Cámaras cercanas</h4>
                <div className="flex flex-col gap-2">
                  {['Cam 11 – 50m', 'Cam 13 – 80m', 'Cam 10 – 120m'].map((cam) => (
                    <div 
                      key={cam}
                      className="p-3 bg-surface-2 rounded-lg border border-border-subtle flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-text-secondary" />
                      <span className="text-[13px] text-text-primary">{cam}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nota rápida */}
              <div>
                <h4 className="text-[13px] font-medium text-text-secondary mb-2">Nota rápida</h4>
                <input 
                  type="text"
                  placeholder="Max 80 caracteres"
                  maxLength={80}
                  className="w-full px-3 py-2 bg-surface-2 border border-border-subtle rounded-lg text-[13px] text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-risk-low transition-colors"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
