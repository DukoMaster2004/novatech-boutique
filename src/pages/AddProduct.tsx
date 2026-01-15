import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configurar Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AddProduct() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (!formData.nombre || !formData.precio) {
        throw new Error('El nombre y precio son obligatorios');
      }

      const { data, error: insertError } = await supabase
        .from('productos') // CAMBIAR AL NOMBRE DE TU TABLA
        .insert([
          {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock) || 0,
            categoria: formData.categoria,
            created_at: new Date()
          }
        ]);

      if (insertError) throw insertError;

      setMessage('✅ Producto agregado exitosamente');
      setFormData({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
      
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Agregar Nuevo Producto
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Laptop Dell XPS"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe el producto..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Precio ($) *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categoría
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-slate-700 dark:text-white"
            >
              <option value="">Seleccionar categoría</option>
              <option value="electronica">Electrónica</option>
              <option value="ropa">Ropa</option>
              <option value="alimentos">Alimentos</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-100 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-100 text-sm">
              {message}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Guardando...' : '✅ Agregar Producto'}
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          * Campos obligatorios
        </p>
      </div>
    </div>
  );
}