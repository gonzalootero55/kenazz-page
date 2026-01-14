import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.TIENDANUBE_ACCESS_TOKEN;
  const storeId = process.env.TIENDANUBE_STORE_ID;

  // Verificamos que las variables existan
  if (!token || !storeId) {
    return NextResponse.json({ error: "Faltan credenciales en .env.local" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.tiendanube.com/v1/${storeId}/products`, {
  method: 'GET',
  headers: {
  // Prueba quitando el espacio o asegurándote de que 'bearer' esté en minúsculas
  'Authentication': `bearer ${token.trim()}`, 
  'Content-Type': 'application/json',
  'User-Agent': 'Kenazz (goterodelmagro@gmail.com)' 
},
  cache: 'no-store'
});

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error de Tiendanube:", errorData); // Esto saldrá en tu terminal de VS Code
      return NextResponse.json({ error: "Tiendanube rechazó la petición", detail: errorData }, { status: response.status });
    }

    const products = await response.json();
    return NextResponse.json(products);

  } catch (error) {
    console.error("Error de red:", error);
    return NextResponse.json({ error: "Error de conexión con el servidor" }, { status: 500 });
  }
}