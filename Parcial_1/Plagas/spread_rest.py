from entidades import Plaga
from datos import plagas

nueva_plaga = Plaga(4, "Gorgojo del maíz", "Sitophilus zeamais", True, "México")

# Spread: clonar arreglo + nuevo
plagas_actualizadas = [*plagas, nueva_plaga]

# Rest: recibir múltiples plagas
def registrar_plagas(*lista: Plaga):
    for p in lista:
        print(f"Registrada: {p.nombre} en {p.ubicacion}")
