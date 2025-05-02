from entidades import Plaga
from funciones import mostrar_plaga

def procesar_plaga(plaga: Plaga, callback):
    print("Procesando...")
    callback(plaga)
