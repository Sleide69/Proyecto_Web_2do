from entidades import Plaga

def crear_plaga(id: int, nombre: str, especie: str, peligrosa: bool, ubicacion: str) -> Plaga:
    return Plaga(id, nombre, especie, peligrosa, ubicacion)

def mostrar_plaga(plaga: Plaga) -> None:
    print(f"{plaga.nombre} ({plaga.especie}) - Peligrosa: {plaga.peligrosa} - Ubicación: {plaga.ubicacion}")
