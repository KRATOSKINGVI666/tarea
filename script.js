async function convertir() {
  const cantidadInput = document.getElementById("cantidad");
  const origenInput = document.getElementById("origen");
  const destinoInput = document.getElementById("destino");
  const resultado = document.getElementById("resultado");

  const cantidad = parseFloat(cantidadInput.value);
  const origen = origenInput.value;
  const destino = destinoInput.value;

  if (isNaN(cantidad) || cantidad <= 0) {
    resultado.textContent = "Ingresa una cantidad válida";
    return;
  }

  try {
    resultado.textContent = "Cargando..."; // Feedback visual al usuario
    
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${origen}`);
    if (!response.ok) throw new Error("Error en la respuesta de la API");
    
    const data = await response.json();
    const tasa = data.rates[destino];

    if (tasa) {
      const total = (cantidad * tasa).toFixed(2);
      resultado.textContent = `${cantidad} ${origen} = ${total} ${destino}`;
      resultado.classList.add("animar");
    } else {
      resultado.textContent = "Moneda de destino no soportada.";
    }

  } catch (error) {
    console.error(error);
    resultado.textContent = "Error al obtener datos. Intenta más tarde.";
  }
}