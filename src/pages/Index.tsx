import Link from 'next/link';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Blank App</h1>
        <p className="mb-8 text-xl text-muted-foreground">Start building your amazing project here!</p>
        
        {/* Botón para agregar producto */}
        <Link href="/admin/add-product">
          <button className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">
            ➕ Agregar Nuevo Producto
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Index;