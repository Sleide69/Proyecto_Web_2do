from dataclasses import dataclass

@dataclass
class Plaga:
    id: int
    nombre: str
    especie: str
    peligrosa: bool
    ubicacion: str
