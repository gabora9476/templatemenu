import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Users, Settings, LogOut, Plus, Trash2, Eye, Copy, Clock, DollarSign } from 'lucide-react';

const DigitalMenuSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userType, setUserType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [time, setTime] = useState(new Date());
  const [exchangeRate, setExchangeRate] = useState('36.50');
  
  // Simulación de base de datos
  const [users, setUsers] = useState({
    admin: { password: 'admin123', type: 'admin', name: 'Administrador' },
    cliente1: { password: 'cliente123', type: 'client', name: 'Restaurant Demo', monitors: [] }
  });
  
  const [monitors, setMonitors] = useState({});
  const [selectedMonitor, setSelectedMonitor] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Componente de Login
  const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [monitorCode, setMonitorCode] = useState('');
    const [loginType, setLoginType] = useState(null);

    const handleLogin = () => {
      if (loginType === 'monitor') {
        const monitor = Object.values(monitors).find(m => m.code === monitorCode);
        if (monitor) {
          setSelectedMonitor(monitor);
          setCurrentView('display');
        } else {
          alert('Código de monitor inválido');
        }
      } else {
        const user = users[username];
        if (user && user.password === password) {
          setCurrentUser({ username, ...user });
          setUserType(user.type);
          if (user.type === 'admin') {
            setCurrentView('admin');
          } else if (user.type === 'client') {
            setCurrentView('client-dashboard');
          }
        } else {
          alert('Credenciales inválidas');
        }
      }
    };

    if (!loginType) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Menú Digital</h1>
            <div className="space-y-4">
              <button
                onClick={() => setLoginType('monitor')}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-3 transition"
              >
                <Monitor size={24} />
                <span className="text-lg font-semibold">Monitor/TV</span>
              </button>
              <button
                onClick={() => setLoginType('admin')}
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-3 transition"
              >
                <Settings size={24} />
                <span className="text-lg font-semibold">Administrador</span>
              </button>
              <button
                onClick={() => setLoginType('client')}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-3 transition"
              >
                <Users size={24} />
                <span className="text-lg font-semibold">Cliente</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (loginType === 'monitor') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <button onClick={() => setLoginType(null)} className="mb-4 text-gray-600 hover:text-gray-800">
              ← Volver
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Acceso Monitor</h2>
            <input
              type="text"
              placeholder="Código de Monitor"
              value={monitorCode}
              onChange={(e) => setMonitorCode(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Acceder
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <button onClick={() => setLoginType(null)} className="mb-4 text-gray-600 hover:text-gray-800">
            ← Volver
          </button>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {loginType === 'admin' ? 'Acceso Administrador' : 'Acceso Cliente'}
          </h2>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Iniciar Sesión
          </button>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Demo: usuario: <b>admin</b> / <b>cliente1</b>, contraseña: <b>admin123</b> / <b>cliente123</b>
          </p>
        </div>
      </div>
    );
  };

  // Panel de Administrador
  const AdminPanel = () => {
    const [clients, setClients] = useState([{ id: 1, name: 'Restaurant Demo', username: 'cliente1', monitors: 2 }]);
    const [newClientName, setNewClientName] = useState('');
    const [showAddClient, setShowAddClient] = useState(false);

    const addClient = () => {
      if (newClientName) {
        const newClient = {
          id: clients.length + 1,
          name: newClientName,
          username: `cliente${clients.length + 1}`,
          monitors: 0
        };
        setClients([...clients, newClient]);
        setNewClientName('');
        setShowAddClient(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
          <button
            onClick={() => { setCurrentView('login'); setCurrentUser(null); }}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <LogOut size={20} />
            Salir
          </button>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
              <Users size={32} className="mb-2" />
              <h3 className="text-xl font-semibold">Clientes</h3>
              <p className="text-3xl font-bold">{clients.length}</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
              <Monitor size={32} className="mb-2" />
              <h3 className="text-xl font-semibold">Monitores Activos</h3>
              <p className="text-3xl font-bold">{clients.reduce((acc, c) => acc + c.monitors, 0)}</p>
            </div>
            <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
              <Smartphone size={32} className="mb-2" />
              <h3 className="text-xl font-semibold">Menús Móviles</h3>
              <p className="text-3xl font-bold">{clients.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Gestión de Clientes</h2>
              <button
                onClick={() => setShowAddClient(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                Nuevo Cliente
              </button>
            </div>

            {showAddClient && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={addClient}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setShowAddClient(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Nombre</th>
                    <th className="p-3 text-left">Usuario</th>
                    <th className="p-3 text-left">Monitores</th>
                    <th className="p-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{client.id}</td>
                      <td className="p-3 font-semibold">{client.name}</td>
                      <td className="p-3">{client.username}</td>
                      <td className="p-3">{client.monitors}</td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">
                          <Eye size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard del Cliente
  const ClientDashboard = () => {
    const [clientMonitors, setClientMonitors] = useState([
      { id: 1, name: 'Monitor Principal', code: 'MON-001', screens: 5, status: 'active' },
      { id: 2, name: 'Monitor Secundario', code: 'MON-002', screens: 3, status: 'active' }
    ]);
    const [mobileMenuCode] = useState('MENU-MOBILE-001');
    const [showAddMonitor, setShowAddMonitor] = useState(false);
    const [editingMonitor, setEditingMonitor] = useState(null);

    const MonitorConfig = ({ monitor }) => {
      const [screens, setScreens] = useState(monitor?.screens || [
        { id: 1, type: 'image', url: '', duration: 5, transition: 'fade' }
      ]);

      const addScreen = () => {
        if (screens.length < 5) {
          setScreens([...screens, { id: screens.length + 1, type: 'image', url: '', duration: 5, transition: 'fade' }]);
        }
      };

      const updateScreen = (id, field, value) => {
        setScreens(screens.map(s => s.id === id ? { ...s, [field]: value } : s));
      };

      const removeScreen = (id) => {
        setScreens(screens.filter(s => s.id !== id));
      };

      return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Configuración de Pantallas</h3>
            <button
              onClick={() => setEditingMonitor(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {screens.map((screen, index) => (
              <div key={screen.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-700">Pantalla {index + 1}</h4>
                  {screens.length > 1 && (
                    <button
                      onClick={() => removeScreen(screen.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                      value={screen.type}
                      onChange={(e) => updateScreen(screen.id, 'type', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="image">Imagen</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Duración (seg)</label>
                    <input
                      type="number"
                      value={screen.duration}
                      onChange={(e) => updateScreen(screen.id, 'duration', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      min="1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">URL {screen.type === 'image' ? 'de Imagen' : 'de Video'}</label>
                    <input
                      type="text"
                      value={screen.url}
                      onChange={(e) => updateScreen(screen.id, 'url', e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Transición</label>
                    <select
                      value={screen.transition}
                      onChange={(e) => updateScreen(screen.id, 'transition', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="fade">Fade</option>
                      <option value="slide">Slide</option>
                      <option value="zoom">Zoom</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {screens.length < 5 && (
              <button
                onClick={addScreen}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Agregar Pantalla ({screens.length}/5)
              </button>
            )}

            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
              Guardar Configuración
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{currentUser.name}</h1>
            <p className="text-sm text-gray-600">Panel de Cliente</p>
          </div>
          <button
            onClick={() => { setCurrentView('login'); setCurrentUser(null); }}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <LogOut size={20} />
            Salir
          </button>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          {!editingMonitor ? (
            <>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Mis Monitores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clientMonitors.map(monitor => (
                    <div key={monitor.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
                      <div className="flex items-start justify-between mb-3">
                        <Monitor size={32} className="text-blue-600" />
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${monitor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {monitor.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{monitor.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">Código: <span className="font-mono font-semibold">{monitor.code}</span></p>
                      <p className="text-sm text-gray-600 mb-4">Pantallas: {monitor.screens}/5</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingMonitor(monitor)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
                        >
                          Configurar
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(monitor.code);
                            alert('Código copiado');
                          }}
                          className="bg-gray-200 text-gray-700 px-3 rounded-lg hover:bg-gray-300"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setShowAddMonitor(true)}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition flex flex-col items-center justify-center min-h-[200px]"
                  >
                    <Plus size={40} className="text-gray-400 mb-2" />
                    <span className="text-gray-600 font-semibold">Agregar Monitor</span>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Menú Móvil</h2>
                    <p className="text-sm opacity-90 mb-3">Comparte este código con tus clientes</p>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 font-mono text-lg font-bold inline-block">
                      {mobileMenuCode}
                    </div>
                  </div>
                  <Smartphone size={64} className="opacity-50" />
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(mobileMenuCode);
                    alert('Código copiado al portapapeles');
                  }}
                  className="mt-4 bg-white text-green-600 px-6 py-2 rounded-lg hover:bg-opacity-90 font-semibold flex items-center gap-2"
                >
                  <Copy size={18} />
                  Copiar Código
                </button>
              </div>
            </>
          ) : (
            <MonitorConfig monitor={editingMonitor} />
          )}
        </div>
      </div>
    );
  };

  // Pantalla de Visualización del Monitor
  const DisplayScreen = () => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const demoScreens = [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200',
        title: 'Hamburguesas Premium'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200',
        title: 'Bebidas Refrescantes'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
        title: 'Postres Deliciosos'
      }
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentScreen((prev) => (prev + 1) % demoScreens.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="fixed inset-0 bg-black">
        {/* Widgets superiores */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-6 z-10">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock size={24} />
                <span className="text-2xl font-bold">
                  {time.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="text-lg">
                {time.toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg">
              <DollarSign size={20} />
              <span className="text-lg font-bold">Bs. {exchangeRate}</span>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="w-full h-full flex items-center justify-center">
          {demoScreens.map((screen, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentScreen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={screen.url}
                alt={screen.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
                  {screen.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de pantalla */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {demoScreens.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentScreen ? 'bg-white w-8' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Vista móvil del menú
  const MobileMenuView = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const menuPages = [
      {
        title: 'Hamburguesas',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
        items: ['Big Mac - Bs. 5.50', 'Cuarto de Libra - Bs. 6.00', 'McNuggets - Bs. 4.50']
      },
      {
        title: 'Bebidas',
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800',
        items: ['Coca-Cola - Bs. 2.00', 'Sprite - Bs. 2.00', 'Té Helado - Bs. 2.50']
      },
      {
        title: 'Postres',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        items: ['Sundae - Bs. 3.00', 'McFlurry - Bs. 4.00', 'Pay de Manzana - Bs. 2.50']
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500">
        <div className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">Menú Digital</h1>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)] snap-y snap-mandatory">
          {menuPages.map((page, index) => (
            <div key={index} className="min-h-[calc(100vh-64px)] snap-start flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={page.image}
                  alt={page.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                  <h2 className="text-white text-4xl font-bold p-6">{page.title}</h2>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-t-3xl -mt-8 p-6 space-y-4">
                {page.items.map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 shadow-md">
                    <p className="text-lg font-semibold text-gray-800">{item}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 flex justify-center gap-2">
                {menuPages.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === index ? 'bg-orange-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-20 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg">
          <p className="text-xs font-semibold">Desliza ↓</p>
        </div>
      </div>
    );
  };

  // Renderizado principal
  return (
    <div className="font-sans">
      {currentView === 'login' && <LoginScreen />}
      {currentView === 'admin' && <AdminPanel />}
      {currentView === 'client-dashboard' && <ClientDashboard />}
      {currentView === 'display' && <DisplayScreen />}
      {currentView === 'mobile-menu' && <MobileMenuView />}
    </div>
  );
};

export default DigitalMenuSystem;
