# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTIBILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.

import random
import os
import bpy
from bpy.types import Operator

# --- 1. Definición del Operador ---
# Esta clase define la acción que ocurrirá cuando se presione el botón.
class RZK_OT_RandomThemeButton(Operator):
    """Operador para aplicar un tema de UI aleatorio."""
    bl_idname = "rzk.random_theme_button"  # Identificador único para el operador
    bl_label = "Random Theme"              # Etiqueta usada en búsquedas y tooltips (si no hay descripción)
    bl_description = "Aplica un tema de UI aleatorio (actualmente es un marcador de posición)" # Tooltip del botón
    # bl_options = {'REGISTER'} # Opciones del operador, {'REGISTER'} es el predeterminado.
                                # Podrías añadir {'UNDO'} si la operación fuera fácilmente reversible.

    def execute(self, context):
        theme_preset_paths = []
        # Obtener las rutas a los directorios de presets de temas
        for preset_dir in bpy.utils.preset_paths("interface_theme"):
            if os.path.isdir(preset_dir):
                for filename in os.listdir(preset_dir):
                    if filename.endswith(".xml"): # Los temas son archivos .xml
                        theme_preset_paths.append(os.path.join(preset_dir, filename))

        if not theme_preset_paths:
            self.report({'WARNING'}, "No se encontraron presets de temas de UI.")
            print("No se encontraron presets de temas de UI.")
            return {'CANCELLED'}

        # Seleccionar un tema aleatorio de la lista
        random_theme_path = random.choice(theme_preset_paths)
        
        # Extraer el nombre del tema para el mensaje (opcional, pero útil)
        theme_name = os.path.splitext(os.path.basename(random_theme_path))[0].replace("_", " ").title()

        try:
            # Aplicar el tema seleccionado
            bpy.ops.script.execute_preset(filepath=random_theme_path, menu_idname="USERPREF_MT_interface_theme_presets")
            self.report({'INFO'}, f"Tema aleatorio aplicado: {theme_name}")
            print(f"Tema aleatorio aplicado: {theme_name} (desde {random_theme_path})")
        except RuntimeError as e:
            self.report({'ERROR'}, f"Error al aplicar el tema: {e}")
            print(f"Error al aplicar el tema {random_theme_path}: {e}")
            return {'CANCELLED'}

        return {'FINISHED'}

# --- 2. Función de Dibujo para el Header ---
# Esta función le dice a Blender cómo dibujar nuestro botón en la UI.
def rzk_draw_random_theme_button_ui(self, context):
    # 'self' aquí es la instancia del elemento de UI donde se dibuja (ej. TOPBAR_HT_upper_bar).
    # 'context' es el contexto actual de Blender.
    layout = self.layout  # Obtenemos el layout del header para añadir elementos.
    # Añadimos un botón que ejecuta nuestro operador.
    # text="" hace que el botón sea solo un icono.
    # icon='SEQUENCE_COLOR_01' es un ejemplo de icono; puedes encontrar más con el Icon Viewer de Blender.
    layout.operator(RZK_OT_RandomThemeButton.bl_idname, text="", icon='SEQUENCE_COLOR_01')

# --- Lista de clases para registrar/desregistrar ---
classes_to_register = (
    RZK_OT_RandomThemeButton,
)

def register():
    for cls in classes_to_register:
        bpy.utils.register_class(cls)
    # Añadimos nuestra función de dibujo al final (append) de la barra superior de la Topbar (Workspaces).
    # Esto hará que el botón aparezca en el lado derecho de las pestañas de Workspaces.
    bpy.types.TOPBAR_HT_upper_bar.append(rzk_draw_random_theme_button_ui)

def unregister():
    # Es importante quitar la función de dibujo cuando el addon se desregistra.
    bpy.types.TOPBAR_HT_upper_bar.remove(rzk_draw_random_theme_button_ui)
    # Desregistramos las clases en orden inverso.
    for cls in reversed(classes_to_register):
        bpy.utils.unregister_class(cls)
