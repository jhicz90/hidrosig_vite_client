import { FcCalculator, FcConferenceCall, FcHome, FcOpenedFolder, FcOrganization, FcPuzzle, FcSalesPerformance, FcSettings, FcTreeStructure } from 'react-icons/all'

export const menuModule = [
    {
        label: 'Página principal',
        icon: 1068,
        rcIcon: FcHome,
        to: 'home',
    },
    {
        label: 'Ámbito',
        icon: 4001,
        rcIcon: FcOrganization,
        to: 'ambit',
        meta: ['ambit'],
        detail: 'Vista resumen del módulo de Ámbito.',
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Organización',
                to: 'orgz',
                meta: ['organization'],
                detail: 'Sub módulo de lista de juntas y comisiones de usuarios.'
            },
            {
                label: 'Territorio',
                to: 'trrty',
                meta: ['territory'],
                detail: 'Sub módulo de lista de registros que hacen referencia a una zona o ubicación, se pueden listar como ZONAS, BLOQUES DE RIEGO y LOCALIDADES.'
            },
            {
                label: 'Objeto geográfico',
                to: 'geoobj',
                meta: ['geographic'],
                detail: 'Lista de gráficos como polígonos, líneas o figuras, que detallan áreas o delimitaciones.'
            }
        ]
    },
    {
        label: 'Padrón de usuarios',
        icon: 1081,
        rcIcon: FcConferenceCall,
        to: 'user_reg',
        meta: ['userreg'],
        detail: 'Lista de usuarios y predios inscritos en el sistema.',
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Usuarios agrarios',
                to: 'user_farm',
                meta: ['userfarm'],
                detail: 'Lista de los registros de usuarios, aqui podra registrarlos o editarlos.'
            },
            {
                label: 'Predios o áreas',
                to: 'area',
                meta: ['area'],
                detail: 'Lista de los registros de usuarios o predios, aqui podra registrarlos o editarlos.'
            },
            {
                label: 'Delegados',
                to: 'delegate',
                meta: ['delegate'],
                detail: 'Lista de los delegados o personas con cargo especifico en algún sector de riego.'
            }
        ]
    },
    {
        label: 'Esquema de riego',
        icon: 1088,
        rcIcon: FcTreeStructure,
        to: 'schm',
        meta: ['irrigschm'],
        children: [
            {
                label: 'Red de riego',
                to: 'irrig',
                meta: ['irrignet'],
                detail: 'Vista de la red de riego, se podrá registrar estructuras y tramos.'
            },
            {
                label: 'Sectores de riego',
                to: 'sector',
                meta: ['sector'],
                detail: 'Los sectores de riego son zonas a cargo de los delegados o algún usuario que se encargan de la distribución del recurso hídrico.'
            },
            {
                label: 'Variables',
                to: 'var',
                meta: ['variables'],
                detail: 'Se registran las variables o constantes que se usan en los cálculos de la eficiencia o clasificación de las estructuras.'
            }
        ]
    },
    {
        label: 'Recaudación de tarifa',
        icon: 1046,
        rcIcon: FcSalesPerformance,
        to: 'collect',
        meta: ['ratecollect'],
        children: [
            {
                label: 'Cobranza',
                to: 'bill',
                meta: ['billing'],
                detail: 'Sub módulo de cobranza coactiva, aqui se verán los saldos o cuentas por usuario o predio, según el consumo declarado.'
            },
            {
                label: 'Volumen de cultivos',
                to: 'vol',
                meta: ['volumestatement'],
                detail: 'Declaración de consumo de los cultivos según datos de medición o captura de datos.'
            }
        ]
    },
    {
        label: 'Contabilidad',
        icon: 1089,
        rcIcon: FcCalculator,
        to: 'acct',
        meta: ['accounting'],
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Caja chica',
                to: 'pettycash',
                meta: ['pettycash'],
                detail: 'Lista y registro de caja chica, para un mejor control y detalle de los comprobantes.'
            }
        ]
    },
    {
        label: 'Archivos',
        icon: 1029,
        rcIcon: FcOpenedFolder,
        to: 'exp',
        meta: ['explorer'],
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Recursos',
                to: 'resources',
                meta: ['resources'],
                detail: 'Lista de los recursos o archivos del sistema, además podra subir o editar dichos archivos según el tipo de archivo.'
            }
        ]
    },
    {
        label: 'SIGA',
        icon: 9000,
        rcIcon: FcPuzzle,
        to: 'siga',
        meta: ['siga'],
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Reportes',
                to: 'report',
                meta: ['report-siga'],
                detail: 'Apartado especializado en reportes del sistema SIGA.'
            }
        ]
    },
    {
        label: 'Ajustes de sistema',
        icon: 1060,
        rcIcon: FcSettings,
        to: 'sys',
        meta: ['system'],
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Usuarios de sistema',
                to: 'user_sys',
                meta: ['usersys'],
                detail: 'Lista de usuarios o cuentas de usuario registradas en el sistema.'
            },
            {
                label: 'Roles de usuario',
                to: 'role',
                meta: ['role'],
                detail: 'Lista de roles y restricciones de las cuentas de usuario.'
            },
            {
                label: 'Ocupaciones',
                to: 'occup',
                meta: ['occupation'],
                detail: 'Lista de ocupaciones que detallan la cuenta de usuario o su función.'
            },
            {
                label: 'Configuración',
                to: 'settings',
                meta: ['settings'],
                detail: 'Lista de ajustes del sistema para su buen funcionanmiento según se requiera.'
            }
        ]
    }
]