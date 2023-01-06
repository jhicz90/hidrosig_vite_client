export const ControlUiMap = {
    draw: {
        toolbar: {
            // #TODO: this should be reorganized where actions are nested in actions
            // ex: actions.undo  or actions.cancel
            actions: {
                title: 'Cancelar dibujo',
                text: 'Cancelar'
            },
            finish: {
                title: 'Terminar dibujo',
                text: 'Finalizar'
            },
            undo: {
                title: 'Eliminar último punto dibujado',
                text: 'Eliminar último punto'
            },
            buttons: {
                polyline: 'Dibujar una polilínea',
                polygon: 'Dibujar un polígono',
                rectangle: 'Dibujar un rectangulo',
                circle: 'Dibujar un círculo',
                marker: 'Dibujar una marca o punto',
                circlemarker: 'Dibujar una marca circular',
            }
        },
        handlers: {
            circle: {
                tooltip: {
                    start: 'Haga clic y arrastre para dibujar un círculo.'
                },
                radius: 'Radio'
            },
            circlemarker: {
                tooltip: {
                    start: 'Haga clic en el mapa para colocar el marcador circular.'
                }
            },
            marker: {
                tooltip: {
                    start: 'Haga clic en el mapa para colocar el marcador.'
                }
            },
            polygon: {
                tooltip: {
                    start: 'Haga clic para comenzar a dibujar la forma.',
                    cont: 'Haga clic para continuar dibujando la forma.',
                    end: 'Haga clic en el primer punto para cerrar esta forma.'
                }
            },
            polyline: {
                error: '¡<strong>Error:</strong> los bordes de la forma no pueden cruzarse!',
                tooltip: {
                    start: 'Haga clic para comenzar a dibujar la línea.',
                    cont: 'Haga clic para continuar dibujando la línea.',
                    end: 'Haga clic en el último punto para terminar la línea.'
                }
            },
            rectangle: {
                tooltip: {
                    start: 'Haga clic y arrastre para dibujar un rectángulo.'
                }
            },
            simpleshape: {
                tooltip: {
                    end: 'Suelte el mouse para terminar de dibujar.'
                }
            }
        }
    },
    edit: {
        toolbar: {
            actions: {
                save: {
                    title: 'Guardar cambios',
                    text: 'Guardar'
                },
                cancel: {
                    title: 'Cancelar edición, descarta todos los cambios',
                    text: 'Cancelar'
                },
                clearAll: {
                    title: 'Borrar todas las capas',
                    text: 'Borrar todo'
                }
            },
            buttons: {
                edit: 'Editar capas',
                editDisabled: 'No hay capas para editar',
                remove: 'Eliminar capas',
                removeDisabled: 'No hay capas para eliminar'
            }
        },
        handlers: {
            edit: {
                tooltip: {
                    text: 'Arrastre o marque para editar las figuras.',
                    subtext: 'Click en cancelar para deshacer los cambios.'
                }
            },
            remove: {
                tooltip: {
                    text: 'Dar click en una figura para quitarla.'
                }
            }
        }
    }
}