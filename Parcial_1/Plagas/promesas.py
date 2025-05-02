import asyncio
from entidades import Plaga

async def guardar_plaga(plaga: Plaga) -> str:
    await asyncio.sleep(1)
    return f"✅ Plaga {plaga.nombre} registrada exitosamente."
