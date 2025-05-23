import bpy
from mathutils import *

# D = bpy.data # Puedes descomentar estas si las necesitas más adelante
# C = bpy.context # Puedes descomentar estas si las necesitas más adelante

bl_info = {
    "name": "Mi Addon Compositor",
    "author": "RZK",
    "version": (1, 0),
    "blender": (2, 80, 0), # Versión mínima de Blender compatible
    "location": "Compositor > Sidebar > Output_Gen",
    "description": "File output tools for eevee compositor",
    "warning": "",
    "doc_url": "",
    "category": "Compositing",
}

# Funciones para registrar y desregistrar propiedades personalizadas
def register_custom_properties():
    bpy.types.Scene.my_addon_output_selections_expanded = bpy.props.BoolProperty(
        name="Output Selections Expanded",
        description="Define si la sección 'Output selections' está expandida o contraída",
        default=True  # Por defecto, la sección estará expandida
    )
    # Propiedad para el checkbox "Combined"
    bpy.types.Scene.my_addon_combined_checkbox = bpy.props.BoolProperty(
        name="Combined", # Nueva etiqueta que se mostrará junto al checkbox
        description="Activar o desactivar la salida Combined",
        default=False # Por defecto, estará desmarcado
    )
    # Propiedad para el checkbox "Z"
    bpy.types.Scene.my_addon_z_checkbox = bpy.props.BoolProperty(
        name="Z",
        description="Activar o desactivar la salida Z Depth",
        default=False
    )
    # Propiedad para el checkbox "Mist"
    bpy.types.Scene.my_addon_mist_checkbox = bpy.props.BoolProperty(
        name="Mist",
        description="Activar o desactivar la salida Mist",
        default=False
    )
    # Propiedad para el checkbox "Normal"
    bpy.types.Scene.my_addon_normal_checkbox = bpy.props.BoolProperty(
        name="Normal",
        description="Activar o desactivar la salida Normal",
        default=False
    )
    # Propiedad para el checkbox "Position"
    bpy.types.Scene.my_addon_position_checkbox = bpy.props.BoolProperty(
        name="Position",
        description="Activar o desactivar la salida Position",
        default=False
    )
    # Propiedad para el checkbox "Vector"
    bpy.types.Scene.my_addon_vector_checkbox = bpy.props.BoolProperty(
        name="Vector",
        description="Activar o desactivar la salida Vector",
        default=False
    )
    # Propiedad para la sección colapsable "Light"
    bpy.types.Scene.my_addon_light_section_expanded = bpy.props.BoolProperty(
        name="Light Section Expanded",
        description="Define si la sección 'Light' está expandida o contraída",
        default=True # Por defecto, la sección estará expandida
    )
    # Propiedad para la sección colapsable "Cryptomatte"
    bpy.types.Scene.my_addon_cryptomatte_section_expanded = bpy.props.BoolProperty(
        name="Cryptomatte Section Expanded",
        description="Define si la sección 'Cryptomatte' está expandida o contraída",
        default=True # Por defecto, la sección estará expandida
    )
    # Propiedades para la sección "Light"
    bpy.types.Scene.my_addon_light_diffuse_light = bpy.props.BoolProperty(
        name="Diffuse Light",
        description="Activar o desactivar Diffuse Light pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_diffuse_color = bpy.props.BoolProperty(
        name="Diffuse Color",
        description="Activar o desactivar Diffuse Color pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_specular_light = bpy.props.BoolProperty(
        name="Specular Light",
        description="Activar o desactivar Specular Light pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_specular_color = bpy.props.BoolProperty(
        name="Specular Color",
        description="Activar o desactivar Specular Color pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_volume_light = bpy.props.BoolProperty(
        name="Volume Light",
        description="Activar o desactivar Volume Light pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_emission = bpy.props.BoolProperty(
        name="Emission",
        description="Activar o desactivar Emission pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_environment = bpy.props.BoolProperty(
        name="Environment",
        description="Activar o desactivar Environment pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_shadow = bpy.props.BoolProperty(
        name="Shadow",
        description="Activar o desactivar Shadow pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_ambient_occlusion = bpy.props.BoolProperty(
        name="Ambient Occlusion",
        description="Activar o desactivar Ambient Occlusion pass",
        default=False
    )
    bpy.types.Scene.my_addon_light_transparent = bpy.props.BoolProperty(
        name="Transparent",
        description="Activar o desactivar Transparent pass",
        default=False
    )



def unregister_custom_properties():
    if hasattr(bpy.types.Scene, 'my_addon_output_selections_expanded'):
        del bpy.types.Scene.my_addon_output_selections_expanded

    if hasattr(bpy.types.Scene, 'my_addon_combined_checkbox'):
        del bpy.types.Scene.my_addon_combined_checkbox
    if hasattr(bpy.types.Scene, 'my_addon_z_checkbox'):
        del bpy.types.Scene.my_addon_z_checkbox
    if hasattr(bpy.types.Scene, 'my_addon_mist_checkbox'):
        del bpy.types.Scene.my_addon_mist_checkbox
    if hasattr(bpy.types.Scene, 'my_addon_normal_checkbox'):
        del bpy.types.Scene.my_addon_normal_checkbox
    if hasattr(bpy.types.Scene, 'my_addon_position_checkbox'):
        del bpy.types.Scene.my_addon_position_checkbox
    if hasattr(bpy.types.Scene, 'my_addon_vector_checkbox'):
        del bpy.types.Scene.my_addon_vector_checkbox
    if hasattr(bpy.types.Scene, 'my_addon_light_section_expanded'):
        del bpy.types.Scene.my_addon_light_section_expanded
    if hasattr(bpy.types.Scene, 'my_addon_cryptomatte_section_expanded'):
        del bpy.types.Scene.my_addon_cryptomatte_section_expanded
    
    # Desregistrar propiedades de la sección "Light"
    if hasattr(bpy.types.Scene, 'my_addon_light_diffuse_light'):
        del bpy.types.Scene.my_addon_light_diffuse_light
    if hasattr(bpy.types.Scene, 'my_addon_light_diffuse_color'):
        del bpy.types.Scene.my_addon_light_diffuse_color
    if hasattr(bpy.types.Scene, 'my_addon_light_specular_light'):
        del bpy.types.Scene.my_addon_light_specular_light
    if hasattr(bpy.types.Scene, 'my_addon_light_specular_color'):
        del bpy.types.Scene.my_addon_light_specular_color
    if hasattr(bpy.types.Scene, 'my_addon_light_volume_light'):
        del bpy.types.Scene.my_addon_light_volume_light
    if hasattr(bpy.types.Scene, 'my_addon_light_emission'):
        del bpy.types.Scene.my_addon_light_emission
    if hasattr(bpy.types.Scene, 'my_addon_light_environment'):
        del bpy.types.Scene.my_addon_light_environment
    if hasattr(bpy.types.Scene, 'my_addon_light_shadow'):
        del bpy.types.Scene.my_addon_light_shadow
    if hasattr(bpy.types.Scene, 'my_addon_light_ambient_occlusion'):
        del bpy.types.Scene.my_addon_light_ambient_occlusion
    if hasattr(bpy.types.Scene, 'my_addon_light_transparent'):
        del bpy.types.Scene.my_addon_light_transparent

class COMPOSITOR_OT_match_passes(bpy.types.Operator):
    """Operador para el botón Match Passes"""
    bl_idname = "scene.match_my_addon_passes"
    bl_label = "Match Passes" # Etiqueta interna, el texto del botón se puede sobrescribir
    bl_options = {'REGISTER', 'UNDO'}

    # Mapeo de las propiedades del addon a las propiedades de los pases de ViewLayer.
    # Clave: Nombre de la propiedad BoolProperty en `scene` para el checkbox del addon.
    # Valor: Tupla de strings, donde cada string es la ruta de acceso a la propiedad del pase en ViewLayer.
    #        - Si es un nombre simple (e.g., "use_pass_z"), se accede directamente en `view_layer`.
    #        - Si contiene un punto (e.g., "eevee.use_pass_shadow"), se navega (e.g., `view_layer.eevee.use_pass_shadow`).
    #        - Si hay múltiples strings en la tupla, el checkbox del addon se activará si CUALQUIERA de ellos es True (lógica OR).
    PASS_MAPPING = {
        "my_addon_combined_checkbox": ("use_pass_combined",),
        "my_addon_z_checkbox": ("use_pass_z",),
        "my_addon_mist_checkbox": ("use_pass_mist",),
        "my_addon_normal_checkbox": ("use_pass_normal",),
        "my_addon_position_checkbox": ("use_pass_position",),  # Nota: Principalmente un pase de Cycles. En Eevee, este checkbox de pase suele estar desactivado.
        "my_addon_vector_checkbox": ("use_pass_vector",),

        "my_addon_light_diffuse_light": ("use_pass_diffuse_direct", "use_pass_diffuse_indirect"),
        "my_addon_light_diffuse_color": ("use_pass_diffuse_color",),
        "my_addon_light_specular_light": ("use_pass_glossy_direct", "use_pass_glossy_indirect"), # Blender usa 'glossy' para especular en los pases
        "my_addon_light_specular_color": ("use_pass_glossy_color",),
        
        "my_addon_light_volume_light": ("eevee.use_pass_volume_direct",), # Específico de Eevee para su pase "Volume"
        "my_addon_light_emission": ("use_pass_emit",),
        "my_addon_light_environment": ("use_pass_environment",),
        "my_addon_light_shadow": ("use_pass_shadow",), 
        "my_addon_light_ambient_occlusion": ("use_pass_ambient_occlusion",), # Corresponde al pase "Ambient Occlusion" en la sección Data de View Layer
        
        "my_addon_light_transparent": ("eevee.use_pass_transparent",), # Corresponde al pase "Transparent" específico de Eevee
    }

    def execute(self, context):
        scene = context.scene
        view_layer = context.view_layer

        if not view_layer:
            self.report({'WARNING'}, "No se encontró una capa de vista (View Layer) activa.")
            return {'CANCELLED'}

        is_eevee_engine = (scene.render.engine == 'BLENDER_EEVEE')

        if not is_eevee_engine:
            self.report({'INFO'}, "Intentando emparejar con pases de Eevee. El motor actual NO es Eevee. Algunos pases podrían no corresponder.")

        updated_count = 0
        for addon_prop_name, pass_prop_paths_tuple in self.PASS_MAPPING.items():
            if not hasattr(scene, addon_prop_name):
                print(f"Advertencia: La propiedad del addon '{addon_prop_name}' no se encontró en la escena.")
                continue

            addon_checkbox_should_be_active = False
            for pass_prop_path_str in pass_prop_paths_tuple:
                obj_to_check = view_layer
                prop_name_to_check = pass_prop_path_str

                if '.' in pass_prop_path_str: # Indica propiedad anidada, e.g., "eevee.use_pass_shadow"
                    parts = pass_prop_path_str.split('.', 1)
                    if hasattr(view_layer, parts[0]):
                        obj_to_check = getattr(view_layer, parts[0])
                        prop_name_to_check = parts[1]
                    else:
                        # print(f"Advertencia: No se pudo resolver la ruta base '{parts[0]}' para '{pass_prop_path_str}'.")
                        continue # Saltar esta ruta de pase específica
                
                # Si es una propiedad específica de Eevee y el motor no es Eevee, consideramos el pase como inactivo.
                if "eevee." in pass_prop_path_str and not is_eevee_engine:
                    pass_is_active_on_vl = False
                elif hasattr(obj_to_check, prop_name_to_check):
                    pass_is_active_on_vl = getattr(obj_to_check, prop_name_to_check)
                else:
                    # print(f"Advertencia: La propiedad de ViewLayer '{prop_name_to_check}' (de '{pass_prop_path_str}') no se encontró.")
                    pass_is_active_on_vl = False
                
                if pass_is_active_on_vl:
                    addon_checkbox_should_be_active = True
                    break # Lógica OR: si un pase está activo, el checkbox del addon se activa.
            
            if getattr(scene, addon_prop_name) != addon_checkbox_should_be_active:
                setattr(scene, addon_prop_name, addon_checkbox_should_be_active)
                updated_count += 1
        
        if updated_count > 0:
            self.report({'INFO'}, f"Se actualizaron {updated_count} checkboxes del addon para coincidir con los pases.")
        else:
            self.report({'INFO'}, "Los checkboxes del addon ya coinciden con los pases activos.")
            
        return {'FINISHED'}


class COMPOSITOR_OT_generate_outputs(bpy.types.Operator):
    """Operador para el botón Generar"""
    bl_idname = "scene.generate_my_addon_outputs"
    bl_label = "Generar Salidas" # Etiqueta interna, el texto del botón se puede sobrescribir
    bl_options = {'REGISTER', 'UNDO'}

    # Mapeo de nombres de propiedades internas a los nombres de UI (que serán los nombres de los slots)
    PASS_PROPERTY_MAPPING = {
        "my_addon_combined_checkbox": "Combined",
        "my_addon_z_checkbox": "Z",
        "my_addon_mist_checkbox": "Mist",
        "my_addon_normal_checkbox": "Normal",
        "my_addon_position_checkbox": "Position",
        "my_addon_vector_checkbox": "Vector",
        "my_addon_light_diffuse_light": "Diffuse Light",
        "my_addon_light_diffuse_color": "Diffuse Color",
        "my_addon_light_specular_light": "Specular Light",
        "my_addon_light_specular_color": "Specular Color",
        "my_addon_light_volume_light": "Volume Light",
        "my_addon_light_emission": "Emission",
        "my_addon_light_environment": "Environment",
        "my_addon_light_shadow": "Shadow",
        "my_addon_light_ambient_occlusion": "Ambient Occlusion",
        "my_addon_light_transparent": "Transparent",
    }

    def execute(self, context):
        scene = context.scene

        # Verificar que estamos en el editor de nodos del Compositor
        if not (context.space_data and \
                context.space_data.type == 'NODE_EDITOR' and \
                context.space_data.tree_type == 'CompositorNodeTree'):
            self.report({'ERROR'}, "Debe estar en el editor de nodos del Compositor.")
            return {'CANCELLED'}

        node_tree = context.space_data.edit_tree
        if not node_tree:
            self.report({'ERROR'}, "No se encontró un árbol de nodos del Compositor.")
            return {'CANCELLED'}

        # Crear el nodo File Output
        try:
            file_output_node = node_tree.nodes.new(type='CompositorNodeOutputFile')
        except Exception as e:
            self.report({'ERROR'}, f"No se pudo crear el nodo File Output: {e}")
            return {'CANCELLED'}

        # Posicionar el nuevo nodo (opcional, para mejor UX)
        active_node = node_tree.nodes.active
        if active_node:
            file_output_node.location = (active_node.location.x + active_node.width + 50, 
                                         active_node.location.y)
        else:
            # Si no hay nodo activo, colocar en una posición por defecto o cerca del cursor si es posible
            # (la posición del cursor es más compleja de manejar directamente aquí)
            file_output_node.location = (200, 200) 

        # Limpiar los slots por defecto (el nodo File Output se crea con un slot "Image")
        file_output_node.file_slots.clear()

        added_slots_count = 0
        print("Generando nodo File Output con los siguientes slots:")
        for prop_name, slot_ui_name in self.PASS_PROPERTY_MAPPING.items():
            if scene.get(prop_name, False): # Verificar si el checkbox está marcado
                try:
                    file_output_node.file_slots.new(slot_ui_name)
                    print(f"- Slot añadido: {slot_ui_name}")
                    added_slots_count += 1
                except Exception as e:
                    print(f"Error al añadir el slot '{slot_ui_name}': {e}")
                    self.report({'WARNING'}, f"No se pudo añadir el slot: {slot_ui_name}")
        
        if added_slots_count == 0:
            self.report({'WARNING'}, "Nodo File Output creado sin slots (ningún pase seleccionado).")
        else:
            self.report({'INFO'}, f"Nodo File Output creado con {added_slots_count} slot(s).")
        
        return {'FINISHED'}


class COMPOSITOR_PT_mi_panel_personalizado(bpy.types.Panel):
    """Crea un Panel en la Sidebar del Compositor de Nodos"""
    bl_label = "Output_Gen" # El título que se verá en la pestaña
    bl_idname = "COMPOSITOR_PT_mi_panel"
    bl_space_type = 'NODE_EDITOR'  # Especifica que es para el editor de nodos
    bl_region_type = 'UI'          # Especifica que es para la Sidebar (UI)
    bl_category = "Output_Gen"     # El nombre de la pestaña en la Sidebar
    bl_context = "compositing"     # Solo visible en el contexto de 'compositing' del editor de nodos

    def draw(self, context):
        layout = self.layout
        scene = context.scene

        # --- Sección colapsable "Data" ---
        # Usamos un layout.box() para agrupar visualmente la sección
        data_box = layout.box()
        
        # Fila para el encabezado de la sección colapsable
        data_row = data_box.row()
        # El prop se encarga de dibujar el triángulo y el texto, y de alternar el valor booleano
        data_row.prop(scene, "my_addon_output_selections_expanded",
                      text="Data",
                      icon='TRIA_DOWN' if scene.my_addon_output_selections_expanded else 'TRIA_RIGHT',
                      emboss=False)

        # Si la sección está expandida, dibujamos su contenido
        if scene.my_addon_output_selections_expanded:
            data_content_col = data_box.column(align=True)
            data_content_col.prop(scene, "my_addon_combined_checkbox")
            data_content_col.prop(scene, "my_addon_z_checkbox")
            data_content_col.prop(scene, "my_addon_mist_checkbox")
            data_content_col.prop(scene, "my_addon_normal_checkbox")
            data_content_col.prop(scene, "my_addon_position_checkbox")
            data_content_col.prop(scene, "my_addon_vector_checkbox")

        # --- Sección colapsable "Light" ---
        light_box = layout.box()
        light_row = light_box.row()
        light_row.prop(scene, "my_addon_light_section_expanded",
                       text="Light",
                       icon='TRIA_DOWN' if scene.my_addon_light_section_expanded else 'TRIA_RIGHT',
                       emboss=False)

        if scene.my_addon_light_section_expanded:
            light_content_col = light_box.column(align=True) # Usamos una columna para alinear
            light_content_col.prop(scene, "my_addon_light_diffuse_light")
            light_content_col.prop(scene, "my_addon_light_diffuse_color")
            light_content_col.prop(scene, "my_addon_light_specular_light")
            light_content_col.prop(scene, "my_addon_light_specular_color")
            light_content_col.prop(scene, "my_addon_light_volume_light")
            light_content_col.prop(scene, "my_addon_light_emission")
            light_content_col.prop(scene, "my_addon_light_environment")
            light_content_col.prop(scene, "my_addon_light_shadow")
            light_content_col.prop(scene, "my_addon_light_ambient_occlusion")
            light_content_col.prop(scene, "my_addon_light_transparent")



        # --- Sección colapsable "Cryptomatte" ---
        crypto_box = layout.box()
        crypto_row = crypto_box.row()
        crypto_row.prop(scene, "my_addon_cryptomatte_section_expanded",
                        text="Cryptomatte",
                        icon='TRIA_DOWN' if scene.my_addon_cryptomatte_section_expanded else 'TRIA_RIGHT',
                        emboss=False)

        if scene.my_addon_cryptomatte_section_expanded:
            crypto_content_box = crypto_box.box() # Usamos otro box para el contenido
            crypto_content_box.label(text="Contenido de la sección Cryptomatte")
            # Aquí añadirás los checkboxes y otros elementos para "Cryptomatte"
        
        # Botones
        layout.separator() # Añade un espacio visual

        # Botón "Match Passes"
        layout.operator(COMPOSITOR_OT_match_passes.bl_idname, text="Match Passes")

        # Botón "Generar"
        layout.operator(COMPOSITOR_OT_generate_outputs.bl_idname, text="Generar")


classes_to_register = (
    COMPOSITOR_PT_mi_panel_personalizado,
    COMPOSITOR_OT_generate_outputs,
    COMPOSITOR_OT_match_passes,
)

def register():
    register_custom_properties()
    for cls in classes_to_register:
        bpy.utils.register_class(cls)

def unregister():
    unregister_custom_properties()
    for cls in reversed(classes_to_register): # Es buena práctica desregistrar en orden inverso
        bpy.utils.unregister_class(cls)

if __name__ == "__main__":
    register()
