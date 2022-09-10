export const listPermissions = [
    {
        name: 'Ámbito',
        desc: 'Estos permisos solo deberán otorgarse a ciertos usuarios de nivel 1 (Administrador) y talvez de nivel 2 (Junta de usuarios)',
        perms: [
            {
                name: 'Junta - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'juntacreate'
            },
            {
                name: 'Junta - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'juntasave'
            },
            {
                name: 'Junta - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'juntaget'
            },
            {
                name: 'Junta - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'juntaedit'
            },
            {
                name: 'Junta - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'juntalist'
            },
            {
                name: 'Junta - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'juntadelete'
            },
            {
                name: 'Junta - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'juntaerase'
            },
            {
                name: 'Comisión - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'commttcreate'
            },
            {
                name: 'Comisión - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'commttsave'
            },
            {
                name: 'Comisión - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'commttget'
            },
            {
                name: 'Comisión - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'commttedit'
            },
            {
                name: 'Comisión - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'commttlist'
            },
            {
                name: 'Comisión - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'commttdelete'
            },
            {
                name: 'Comisión - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'commtterase'
            },
            {
                name: 'Zona - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'zonecreate'
            },
            {
                name: 'Zona - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'zonesave'
            },
            {
                name: 'Zona - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'zoneget'
            },
            {
                name: 'Zona - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'zoneedit'
            },
            {
                name: 'Zona - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'zonelist'
            },
            {
                name: 'Zona - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'zonedelete'
            },
            {
                name: 'Zona - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'zoneerase'
            },
            {
                name: 'Bloque de riego - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'blockcreate'
            },
            {
                name: 'Bloque de riego - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'blocksave'
            },
            {
                name: 'Bloque de riego - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'blockget'
            },
            {
                name: 'Bloque de riego - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'blockedit'
            },
            {
                name: 'Bloque de riego - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'blocklist'
            },
            {
                name: 'Bloque de riego - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'blockdelete'
            },
            {
                name: 'Bloque de riego - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'blockerase'
            },
            {
                name: 'Localidades - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'localitiesreate'
            },
            {
                name: 'Localidades - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'localitiesave'
            },
            {
                name: 'Localidades - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'localitieset'
            },
            {
                name: 'Localidades - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'localitiesdit'
            },
            {
                name: 'Localidades - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'localitieslist'
            },
            {
                name: 'Localidades - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'localitiesdelete'
            },
            {
                name: 'Localidades - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'localitieserase'
            }
        ]
    },
    {
        name: 'Esquema de riego',
        desc: 'Permisos para crear todo tipo de estructuras de riego',
        perms: [
            {
                name: 'Estructuras - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'structurecreate'
            },
            {
                name: 'Estructuras - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'structuresave'
            },
            {
                name: 'Estructuras - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'structureget'
            },
            {
                name: 'Estructuras - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'structureedit'
            },
            {
                name: 'Estructuras - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'structurelist'
            },
            {
                name: 'Estructuras - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'structuredelete'
            },
            {
                name: 'Estructuras - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'structureerase'
            },
            {
                name: 'Tramos de estructura - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'sectioncreate'
            },
            {
                name: 'Tramos de estructura - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'sectionsave'
            },
            {
                name: 'Tramos de estructura - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'sectionget'
            },
            {
                name: 'Tramos de estructura - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'sectionedit'
            },
            {
                name: 'Tramos de estructura - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'sectionlist'
            },
            {
                name: 'Tramos de estructura - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'sectiondelete'
            },
            {
                name: 'Tramos de estructura - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'sectionerase'
            },
            {
                name: 'Sectores de riego - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'sectorreate'
            },
            {
                name: 'Sectores de riego - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'sectorave'
            },
            {
                name: 'Sectores de riego - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'sectoret'
            },
            {
                name: 'Sectores de riego - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'sectordit'
            },
            {
                name: 'Sectores de riego - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'sectorlist'
            },
            {
                name: 'Sectores de riego - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'sectordelete'
            },
            {
                name: 'Sectores de riego - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'sectorerase'
            },
            {
                name: 'Rugosidad - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'rugositycreate'
            },
            {
                name: 'Rugosidad - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'rugositysave'
            },
            {
                name: 'Rugosidad - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'rugosityget'
            },
            {
                name: 'Rugosidad - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'rugosityedit'
            },
            {
                name: 'Rugosidad - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'rugositylist'
            },
            {
                name: 'Rugosidad - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'rugositydelete'
            },
            {
                name: 'Rugosidad - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'rugosityerase'
            },
            {
                name: 'Orden de canal - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'orderchannelcreate'
            },
            {
                name: 'Orden de canal - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'orderchannelsave'
            },
            {
                name: 'Orden de canal - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'orderchannelget'
            },
            {
                name: 'Orden de canal - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'orderchanneledit'
            },
            {
                name: 'Orden de canal - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'orderchannellist'
            },
            {
                name: 'Orden de canal - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'orderchanneldelete'
            },
            {
                name: 'Orden de canal - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'orderchannelerase'
            }
        ]
    },
    {
        name: 'Recaudación de tarifa',
        desc: 'Los permisos de cobranza deberan otorgarse con cuidado, ya que podrian modificar o eliminar pagos',
        perms: [
            {
                name: 'Recaudación de tarifas - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'ratecollectcreate'
            },
            {
                name: 'Recaudación de tarifas - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'ratecollectsave'
            },
            {
                name: 'Recaudación de tarifas - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'ratecollectget'
            },
            {
                name: 'Recaudación de tarifas - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'ratecollectedit'
            },
            {
                name: 'Recaudación de tarifas - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'ratecollectlist'
            },
            {
                name: 'Recaudación de tarifas - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'ratecollectdelete'
            },
            {
                name: 'Recaudación de tarifas - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'ratecollecterase'
            },
            {
                name: 'Volumen de cultivos - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'volumencreate'
            },
            {
                name: 'Volumen de cultivos - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'volumensave'
            },
            {
                name: 'Volumen de cultivos - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'volumenget'
            },
            {
                name: 'Volumen de cultivos - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'volumenedit'
            },
            {
                name: 'Volumen de cultivos - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'volumenlist'
            },
            {
                name: 'Volumen de cultivos - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'volumendelete'
            },
            {
                name: 'Volumen de cultivos - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'volumenerase'
            }
        ]
    },
    {
        name: 'Archivos o recursos',
        desc: 'Por lo general este permiso deberia aplicarse a todos ya que en su mayoria suben o cargan archivos',
        perms: [
            {
                name: 'Archivos o recursos - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'resourcecreate'
            },
            {
                name: 'Archivos o recursos - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'resourcesave'
            },
            {
                name: 'Archivos o recursos - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'resourceget'
            },
            {
                name: 'Archivos o recursos - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'resourceedit'
            },
            {
                name: 'Archivos o recursos - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'resourcelist'
            },
            {
                name: 'Archivos o recursos - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'resourcedelete'
            },
            {
                name: 'Archivos o recursos - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'resourceerase'
            }
        ]
    },
    {
        name: 'Contabilidad',
        desc: 'Permisos que son exclusivos de contabilidad',
        perms: [
            {
                name: 'Contabilidad - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'accountingcreate'
            },
            {
                name: 'Contabilidad - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'accountingsave'
            },
            {
                name: 'Contabilidad - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'accountingget'
            },
            {
                name: 'Contabilidad - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'accountingedit'
            },
            {
                name: 'Contabilidad - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'accountinglist'
            },
            {
                name: 'Contabilidad - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'accountingdelete'
            },
            {
                name: 'Contabilidad - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'accountingerase'
            }
        ]
    },
    {
        name: 'Usuarios de sistema',
        desc: 'Aqui se especifican o se crean las párametros en base a los usuarios del sistema que son los usuarios mismos, las ocupaciones y los permisos que tienen estos',
        perms: [
            {
                name: 'Usuarios de sistema - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'usersyscreate'
            },
            {
                name: 'Usuarios de sistema - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'usersyssave'
            },
            {
                name: 'Usuarios de sistema - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'usersysget'
            },
            {
                name: 'Usuarios de sistema - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'usersysedit'
            },
            {
                name: 'Usuarios de sistema - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'usersyslist'
            },
            {
                name: 'Usuarios de sistema - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'usersysdelete'
            },
            {
                name: 'Usuarios de sistema - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'usersyserase'
            },
            {
                name: 'Permisos - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'permsscreate'
            },
            {
                name: 'Permisos - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'permsssave'
            },
            {
                name: 'Permisos - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'permssget'
            },
            {
                name: 'Permisos - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'permssedit'
            },
            {
                name: 'Permisos - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'permsslist'
            },
            {
                name: 'Permisos - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'permssdelete'
            },
            {
                name: 'Permisos - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'permsserase'
            },
            {
                name: 'Ocupación - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'occupcreate'
            },
            {
                name: 'Ocupación - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'occupsave'
            },
            {
                name: 'Ocupación - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'occupget'
            },
            {
                name: 'Ocupación - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'occupedit'
            },
            {
                name: 'Ocupación - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'occuplist'
            },
            {
                name: 'Ocupación - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'occupdelete'
            },
            {
                name: 'Ocupación - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'occuperase'
            }
        ]
    },
    {
        name: 'Sistema',
        desc: 'Los permisos se usan en su mayoria para cambiar las opciones del sistema',
        perms: [
            {
                name: 'Sistema - CREAR',
                desc: 'Permiso para crear o generar los modelos para los nuevos registros',
                value: 'systemcreate'
            },
            {
                name: 'Sistema - GRABAR',
                desc: 'Da el permiso de poder grabar o guardar un nuevo registro, tomar en cuenta que esto no es igual a EDITAR',
                value: 'systemsave'
            },
            {
                name: 'Sistema - VER',
                desc: 'Permiso para ver el registro individual o obtener datos del mismo',
                value: 'systemget'
            },
            {
                name: 'Sistema - EDITAR',
                desc: 'Permiso para actualizar cualquier dato de un registro que lo requiera',
                value: 'systemedit'
            },
            {
                name: 'Sistema - LISTA',
                desc: 'Permiso para poder ver listas de registros o reportes',
                value: 'systemlist'
            },
            {
                name: 'Sistema - ELIMINAR',
                desc: 'Permiso para eliminar un registro',
                value: 'systemdelete'
            },
            {
                name: 'Sistema - BORRAR',
                desc: 'Permite borrar de la base de datos el registro de forma permanente',
                value: 'systemerase'
            }
        ]
    }
]