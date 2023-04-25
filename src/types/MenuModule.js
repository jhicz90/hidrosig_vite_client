import { FcCalculator, FcConferenceCall, FcHome, FcOpenedFolder, FcOrganization, FcPuzzle, FcSalesPerformance, FcSettings, FcSupport, FcTreeStructure } from 'react-icons/all'
import { IconSysAccount, IconSysConfig, IconSysFiles, IconSysHome, IconSysIrrigSchm, IconSysOrg, IconSysSales, IconSysSIGA, IconSysTools, IconSysUserReg } from '../icons'

export const menuModule = [
    {
        label: 'Página principal',
        icon: IconSysHome,
        to: 'home',
    },
    {
        label: 'Ámbito',
        icon: IconSysOrg,
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
        label: 'Esquema de riego',
        icon: IconSysIrrigSchm,
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
        ]
    },
    {
        label: 'Padrón de usuarios',
        icon: IconSysUserReg,
        to: 'user_reg',
        meta: ['userreg'],
        detail: 'Lista de usuarios y predios inscritos en el sistema.',
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Usuarios y predios',
                to: 'user_farm',
                meta: ['farmuser'],
                detail: 'Lista de los registros de usuarios, aqui podra registrarlos o editarlos.'
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
        label: 'Recaudación de tarifa',
        icon: IconSysSales,
        rcIcon: FcSalesPerformance,
        to: 'coll',
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
        icon: IconSysAccount,
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
                to: 'petty_cash',
                meta: ['pettycash'],
                detail: 'Lista y registro de caja chica, para un mejor control y detalle de los comprobantes.'
            },
            {
                label: 'Comprobantes',
                to: 'voucher',
                meta: ['voucher'],
                detail: 'Lista de comprobantes registrados en contabilidad.'
            }
        ]
    },
    {
        label: 'Herramientas',
        icon: IconSysTools,
        rcIcon: FcSupport,
        to: 'tools',
        meta: ['tools'],
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Elaboración de presupuestos',
                to: 'budget',
                meta: ['budget'],
                detail: 'Herramienta para elaborar fichas a partir de metrados y datos del proyecto a realizar.'
            },
            {
                label: 'Diseño de estructuras',
                to: 'design',
                meta: ['design'],
                detail: 'Herramienta para diseñar estructuras a partir de metrados o datos de la misma para exportar a AUTOCAD, IMAGEN o PDF.'
            }
        ]
    },
    {
        label: 'Archivos',
        icon: IconSysFiles,
        rcIcon: FcOpenedFolder,
        to: 'files',
        meta: ['explorer'],
        children: [
            {
                label: 'Resumen',
                to: 'resume'
            },
            {
                label: 'Recursos',
                to: 'res',
                meta: ['resources'],
                detail: 'Lista de los recursos o archivos del sistema, además podra subir o editar dichos archivos según el tipo de archivo.'
            }
        ]
    },
    {
        label: 'SIGA',
        icon: IconSysSIGA,
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
        icon: IconSysConfig,
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
                label: 'Configuración',
                to: 'settings',
                meta: ['settings'],
                detail: 'Lista de ajustes del sistema para su buen funcionanmiento según se requiera.'
            }
        ]
    }
]