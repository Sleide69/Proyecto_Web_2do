import asyncio
from datos import plaga1
from funciones import crear_plaga, mostrar_plaga
from spread_rest import registrar_plagas
from callbacks import procesar_plaga
from promesas import guardar_plaga

async def main():
    # Crear nueva plaga
    nueva = crear_plaga(5, "Trips del tabaco", "Thrips tabaci", False, "Asia")

    # Mostrar plaga
    mostrar_plaga(nueva)

    # Callback
    procesar_plaga(nueva, mostrar_plaga)

    # Registrar usando *args
    registrar_plagas(nueva)

    # Async/Await con Promesa
    resultado = await guardar_plaga(nueva)
    print(resultado)

if __name__ == "__main__":
    asyncio.run(main())
