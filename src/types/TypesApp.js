export const typesApp = {
    appAdminInit: '[app] admin login',
    appLastAuth: '[app] last authenticated',
    systemBackupStart: '[system] start generate backup',
    systemBackupFinish: '[system] finish generate backup',
    loadActiveSystemSettings: '[system] active system settings',
    editActiveSystemSettings: '[system] edit active system settings',
    removeActiveSystemSettings: '[system] remove active system settings',

    authChecking: '[auth] checking login state',
    authCheckingInit: '[auth] init checking login state',
    authCheckingFinish: '[auth] finish checking login state',
    authLoginStart: '[auth] start login',
    authLoginFail: '[auth] start login fail',
    authLogin: '[auth] login',
    authTokenRenewStart: '[auth] start token renew',
    authLogout: '[auth] logout',

    seePageHeader: '[ui] see page header',
    hidePageHeader: '[ui] hide page header',
    editTitlePageHeader: '[ui] edit title page header',
    editDescPageHeader: '[ui] edit desc page header',
    editActionPageHeader: '[ui] edit action page header',
    clearPageHeader: '[ui] clear page header',
    seeSidebar: '[ui] see sidebar',
    hideSidebar: '[ui] hide sidebar',
    seeExportData: '[ui] open modal export data',
    hideExportData: '[ui] close modal export data',
    seeImportData: '[ui] open modal import data',
    hideImportData: '[ui] close modal import data',

    loadWidgetSizeStorage: '[wstorage] load size storage',
    removeWidgetSizeStorage: '[wstorage] remove size storage',
    loadWidgetSizeStorageUsed: '[wstorage] load size used storage',
    removeWidgetSizeStorageUsed: '[wstorage] remove size used storage',

    alertAdd: '[alert] add alert',
    alertRemove: '[alert] remove alert',
    alertRemoveAll: '[alert] remove all alert',

    searchPagePath: '[pagepath] search of page paths',
    loadListPagePath: '[pagepath] list of page paths',
    loadActivePagePath: '[pagepath] active page path',

    // JUNTA
    searchJunta: '[junta] search of juntas',
    loadListJunta: '[junta] list of juntas',
    startLoadingListJunta: '[junta] start loading list of juntas',
    stopLoadingListJunta: '[junta] stop loading list of juntas',
    loadActiveJunta: '[junta] active junta',
    editActiveJunta: '[junta] edit active junta',
    removeActiveJunta: '[junta] remove active junta',

    openModalNewJunta: '[junta] open modal new junta',
    closeModalNewJunta: '[junta] close modal new junta',
    loadActiveNewJunta: '[junta] active new junta',
    editActiveNewJunta: '[junta] edit active new junta',
    removeActiveNewJunta: '[junta] remove active new junta',
    // JUNTA

    // COMMITTEE
    searchCommittee: '[committee] search of committees',
    loadListCommittee: '[committee] list of committees',
    startLoadingListCommittee: '[committee] start loading list of committees',
    stopLoadingListCommittee: '[committee] stop loading list of committees',
    loadActiveCommittee: '[committee] active committee',
    editActiveCommittee: '[committee] edit active committee',
    removeActiveCommittee: '[committee] remove active committee',

    openModalNewCommittee: '[committee] open modal new committee',
    closeModalNewCommittee: '[committee] close modal new committee',
    loadActiveNewCommittee: '[committee] active new committee',
    editActiveNewCommittee: '[committee] edit active new committee',
    removeActiveNewCommittee: '[committee] remove active new committee',
    // COMMITTEE

    // ZONE
    searchZone: '[zone] search of zones',
    loadListZone: '[zone] list of zones',
    startLoadingListZone: '[zone] start loading list of zones',
    stopLoadingListZone: '[zone] stop loading list of zones',
    loadActiveZone: '[zone] active zone',
    editActiveZone: '[zone] edit active zone',
    removeActiveZone: '[zone] remove active zone',

    openModalNewZone: '[zone] open modal new zone',
    closeModalNewZone: '[zone] close modal new zone',
    loadActiveNewZone: '[zone] active new zone',
    editActiveNewZone: '[zone] edit active new zone',
    removeActiveNewZone: '[zone] remove active new zone',
    // ZONE

    // GEOOBJECT
    searchGeoObject: '[geoobject] search of geo objects',
    loadListGeoObject: '[geoobject] list of geo objects',
    startLoadingListGeoObject: '[geoobject] start loading list of geo objects',
    stopLoadingListGeoObject: '[geoobject] stop loading list of geo objects',
    loadActiveGeoObject: '[geoobject] active geo object',
    editActiveGeoObject: '[geoobject] edit active geo object',
    removeActiveGeoObject: '[geoobject] remove active geo object',

    openModalNewGeoObject: '[geoobject] open modal new geo object',
    closeModalNewGeoObject: '[geoobject] close modal new geo object',
    loadActiveNewGeoObject: '[geoobject] active new geo object',
    editActiveNewGeoObject: '[geoobject] edit active new geo object',
    removeActiveNewGeoObject: '[geoobject] remove active new geo object',

    addNewGeoObjectOfFeature: '[geoobject] add new geo object to feature collection',
    removeNewGeoObjectOfFeature: '[geoobject] remove new geo object to feature collection',
    clearNewObjectOfFeature: '[geoobject] remove all new geo object to feature collection',
    // GEOOBJECT

    // WATER SOURCE
    searchWaterSource: '[watersource] search of water source',
    loadListWaterSource: '[watersource] list of water source',
    startLoadingListWaterSource: '[watersource] start loading list of water sources',
    stopLoadingListWaterSource: '[watersource] stop loading list of water sources',
    loadActiveWaterSource: '[watersource] active water source',
    editActiveWaterSource: '[watersource] edit active water source',
    removeActiveWaterSource: '[watersource] remove active water source',

    openModalNewWaterSource: '[watersource] open modal new water source',
    closeModalNewWaterSource: '[watersource] close modal new water source',
    loadActiveNewWaterSource: '[watersource] active new water source',
    editActiveNewWaterSource: '[watersource] edit active new water source',
    removeActiveNewWaterSource: '[watersource] remove active new water source',
    // WATER SOURCE

    searchOrderChannel: '[orderchannel] search of orderchannels',
    loadListOrderChannel: '[orderchannel] list of orderchannels',
    loadActiveOrderChannel: '[orderchannel] active orderchannel',
    editActiveOrderChannel: '[orderchannel] edit active orderchannel',
    removeActiveOrderChannel: '[orderchannel] remove active orderchannel',
    openModalNewOrderChannel: '[orderchannel] open modal new orderchannel',
    closeModalNewOrderChannel: '[orderchannel] close modal new orderchannel',

    searchRugosity: '[rugosity] search of rugosities',
    loadListRugosity: '[rugosity] list of rugosities',
    loadActiveRugosity: '[rugosity] active rugosity',
    editActiveRugosity: '[rugosity] edit active rugosity',
    removeActiveRugosity: '[rugosity] remove active rugosity',
    openModalNewRugosity: '[rugosity] open modal new rugosity',
    closeModalNewRugosity: '[rugosity] close modal new rugosity',

    // STRUCTURE
    searchStructure: '[structure] search of structures',
    loadListStructure: '[structure] list of structures',
    startLoadingListStructure: '[structure] start loading list of structures',
    stopLoadingListStructure: '[structure] stop loading list of structures',
    loadActiveStructure: '[structure] active structure',
    editActiveStructure: '[structure] edit active structure',
    removeActiveStructure: '[structure] remove active structure',

    openModalNewStructure: '[structure] open modal new structure',
    closeModalNewStructure: '[structure] close modal new structure',
    loadActiveNewStructure: '[structure] active new structure',
    editActiveNewStructure: '[structure] edit active new structure',
    removeActiveNewStructure: '[structure] remove active new structure',
    // STRUCTURE

    // SECTION
    searchSection: '[section] search of section',
    loadListSection: '[section] list of section',
    startLoadingListSection: '[section] start loading list of sections',
    stopLoadingListSection: '[section] stop loading list of sections',
    loadActiveSection: '[section] active section',
    editActiveSection: '[section] edit active section',
    removeActiveSection: '[section] remove active section',

    openModalNewSection: '[section] open modal new section',
    closeModalNewSection: '[section] close modal new section',
    loadActiveNewSection: '[section] active new section',
    editActiveNewSection: '[section] edit active new section',
    removeActiveNewSection: '[section] remove active new section',
    // SECTION

    // CHANNEL NETWORK
    searchChannelNetwork: '[channelnetwork] search of channel network',
    loadActiveAmbit: '[channelnetwork] load active id junta channel network',
    removeActiveAmbit: '[channelnetwork] remove active id junta channel network',
    loadActiveNode: '[channelnetwork] load active id node channel network',
    removeActiveNode: '[channelnetwork] remove active id node channel network',
    loadActiveNetIrrig: '[channelnetwork] laod active channel network',
    removeActiveNetIrrig: '[channelnetwork] remove active channel network',
    loadActiveNetIrrigExpanded: '[channelnetwork] laod active channel network expanded',
    removeActiveNetIrrigExpanded: '[channelnetwork] remove active channel network expanded',
    loadActiveNetIrrigChecked: '[channelnetwork] laod active channel network expanded',
    removeActiveNetIrrigChecked: '[channelnetwork] remove active channel network expanded',
    // CHANNEL NETWORK

    searchLocation: '[location] search of locations',
    loadListLocation: '[location] list of locations',
    loadActiveLocation: '[location] active location',
    editActiveLocation: '[location] edit active location',
    removeActiveLocation: '[location] remove active location',

    // BLOCK
    searchBlock: '[block] search of blocks',
    loadListBlock: '[block] list of blocks',
    startLoadingListBlock: '[block] start loading list of blocks',
    stopLoadingListBlock: '[block] stop loading list of blocks',
    loadActiveBlock: '[block] active block',
    editActiveBlock: '[block] edit active block',
    removeActiveBlock: '[block] remove active block',

    addMultiActiveBlock: '[block] add y show multi active block',
    editMultiActiveBlock: '[block] edit multi active block',
    hideMultiActiveBlock: '[block] hide multi active block',
    removeAllHideMultiActiveBlock: '[block] remove all hide multi active block',
    removeMultiActiveBlock: '[block] remove multi active block',

    openModalNewBlock: '[block] open modal new block',
    closeModalNewBlock: '[block] close modal new block',
    loadActiveNewBlock: '[block] active new block',
    editActiveNewBlock: '[block] edit active new block',
    removeActiveNewBlock: '[block] remove active new block',
    // BLOCK

    searchSector: '[sector] search of sectors',
    loadListSector: '[sector] list of sectors',
    loadActiveSector: '[sector] active sector',
    editActiveSector: '[sector] edit active sector',
    removeActiveSector: '[sector] remove active sector',

    // USERFARM
    searchUserFarm: '[userfarm] search of usersfarm',
    loadListUserFarm: '[userfarm] list of usersfarm',
    startLoadingListUserFarm: '[userfarm] start loading list of usersfarm',
    stopLoadingListUserFarm: '[userfarm] stop loading list of usersfarm',
    loadActiveUserFarm: '[userfarm] active userfarm',
    editActiveUserFarm: '[userfarm] edit active userfarm',
    removeActiveUserFarm: '[userfarm] remove active userfarm',

    openModalNewUserFarm: '[userfarm] open modal new userfarm',
    closeModalNewUserFarm: '[userfarm] close modal new userfarm',
    loadActiveNewUserFarm: '[userfarm] active new userfarm',
    editActiveNewUserFarm: '[userfarm] edit active new userfarm',
    removeActiveNewUserFarm: '[userfarm] remove active new userfarm',
    // USERFARM

    // SIGA
    loadActiveSIGAReport: '[siga] active siga report',
    loadActiveSIGAComm: '[siga] active siga committe',
    loadActiveSIGARate: '[siga] active siga rate',
    loadListSIGAComms: '[siga] list of siga committes',
    loadListSIGARates: '[siga] list of siga rates',
    loadStartDateSigaReport: '[siga] active siga start date report',
    loadEndDateSigaReport: '[siga] active siga end date report',
    searchSIGANetIrrig: '[siga] search of siga network irrigation',
    loadActiveSIGANetIrrig: '[siga] laod active siga network irrigation',
    removeActiveSIGANetIrrig: '[siga] remove active siga network irrigation',
    loadActiveSIGANetIrrigExpanded: '[siga] laod active siga network irrigation expanded',
    removeActiveSIGANetIrrigExpanded: '[siga] remove active siga network irrigation expanded',
    loadActiveSIGANetIrrigChecked: '[siga] laod active siga network irrigation checked',
    removeActiveSIGANetIrrigChecked: '[siga] remove active siga network irrigation checked',
    // SIGA

    // PERMISSION
    searchPermission: '[perms] search of permissions',
    loadListPermission: '[perms] list of permissions',
    startLoadingListPermission: '[perms] start loading list of permissions',
    stopLoadingListPermission: '[perms] stop loading list of permissions',
    loadActivePermission: '[perms] active permission',
    editActivePermission: '[perms] edit active permission',
    removeActivePermission: '[perms] remove active permission',

    openModalNewPermission: '[perms] open modal new permission',
    closeModalNewPermission: '[perms] close modal new permission',
    loadActiveNewPermission: '[perms] active new permission',
    editActiveNewPermission: '[perms] edit active new permission',
    removeActiveNewPermission: '[perms] remove active new permission',
    // PERMISSION

    // OCCUPATION
    searchOccupation: '[occup] search of occupations',
    loadListOccupation: '[occup] list of occupations',
    startLoadingListOccupation: '[occup] start loading list of occupations',
    stopLoadingListOccupation: '[occup] stop loading list of occupations',
    loadActiveOccupation: '[occup] active occupation',
    editActiveOccupation: '[occup] edit active occupation',
    removeActiveOccupation: '[occup] remove active occupation',

    openModalNewOccupation: '[occup] open modal new occupation',
    closeModalNewOccupation: '[occup] close modal new occupation',
    loadActiveNewOccupation: '[occup] active new occupation',
    editActiveNewOccupation: '[occup] edit active new occupation',
    removeActiveNewOccupation: '[occup] remove active new occupation',
    // OCCUPATION

    // USERSYS
    searchUserSys: '[usersys] search of userssys',
    loadListUserSys: '[usersys] list of userssys',
    startLoadingListUserSys: '[usersys] start loading list of userssys',
    stopLoadingListUserSys: '[usersys] stop loading list of userssys',
    loadActiveUserSys: '[usersys] active usersys',
    editActiveUserSys: '[usersys] edit active usersys',
    removeActiveUserSys: '[usersys] remove active usersys',

    openModalNewUserSys: '[usersys] open modal new usersys',
    closeModalNewUserSys: '[usersys] close modal new usersys',
    loadActiveNewUserSys: '[usersys] active new usersys',
    editActiveNewUserSys: '[usersys] edit active new usersys',
    removeActiveNewUserSys: '[usersys] remove active new usersys',
    // USERSYS

    // RESOURCE
    searchResource: '[resource] search of resource',
    loadListResource: '[resource] list of resource',
    startLoadingListResource: '[resource] start loading list of resources',
    stopLoadingListResource: '[resource] stop loading list of resources',
    loadActiveResource: '[resource] active resource',
    editActiveResource: '[resource] edit active resource',
    removeActiveResource: '[resource] remove active resource',

    searchSystemResource: '[resource] search of resources system',
    loadListSystemResource: '[resource] list of resources system',
    startLoadingListSystemResource: '[resource] start loading list of resources system',
    stopLoadingListSystemResource: '[resource] stop loading list of resources system',
    endListSystemResource: '[resource] end list of resources system',

    searchUploadedResource: '[resource] search of resources uploaded',
    loadListUploadedResource: '[resource] list of resources uploaded',
    startLoadingListUploadedResource: '[resource] start loading list of resources uploaded',
    stopLoadingListUploadedResource: '[resource] stop loading list of resources uploaded',
    endListUploadedResource: '[resource] end list of resources uploaded',

    searchToUploadResource: '[resource] search of resources to upload',
    loadListToUploadResource: '[resource] list of resources to upload',
    startLoadingListToUploadResource: '[resource] start loading list of resources to upload',
    stopLoadingListToUploadResource: '[resource] stop loading list of resources to upload',
    endListToUploadResource: '[resource] end list of resources to upload',

    openModalNewResource: '[resource] open modal new resource',
    closeModalNewResource: '[resource] close modal new resource',
    initModalNewResource: '[resource] init modal new resource',
    tagsModalNewResource: '[resource] tags modal new resource',
    acceptModalNewResource: '[resource] accept modal new resource',
    multipleModalNewResource: '[resource] multi modal new resource',
    limitModalNewResource: '[resource] limit modal new resource',
    titleModalNewResource: '[resource] title modal new resource',
    setArchiveModalNewResource: '[resource] set archive modal new resource',
    resetModalNewResource: '[resource] reset modal new resource',
    // RESOURCE

    // PETTYCASH
    searchPettyCash: '[pettycash] search of pettycash',
    loadListPettyCash: '[pettycash] list of pettycash',
    startLoadingListPettyCash: '[pettycash] start loading list of pettycash',
    stopLoadingListPettyCash: '[pettycash] stop loading list of pettycash',
    loadActivePettyCash: '[pettycash] active pettycash',
    editActivePettyCash: '[pettycash] edit active pettycash',
    removeActivePettyCash: '[pettycash] remove active pettycash',

    openModalNewPettyCash: '[pettycash] open modal new pettycash',
    closeModalNewPettyCash: '[pettycash] close modal new pettycash',
    loadActiveNewPettyCash: '[pettycash] active new pettycash',
    editActiveNewPettyCash: '[pettycash] edit active new pettycash',
    removeActiveNewPettyCash: '[pettycash] remove active new pettycash',
    // PETTYCASH

    // VOUCHER
    searchVoucher: '[voucher] search of voucher',
    loadListVoucher: '[voucher] list of voucher',
    startLoadingListVoucher: '[voucher] start loading list of voucher',
    stopLoadingListVoucher: '[voucher] stop loading list of voucher',
    loadActiveVoucher: '[voucher] active voucher',
    editActiveVoucher: '[voucher] edit active voucher',
    removeActiveVoucher: '[voucher] remove active voucher',

    openModalNewVoucher: '[voucher] open modal new voucher',
    closeModalNewVoucher: '[voucher] close modal new voucher',
    loadActiveNewVoucher: '[voucher] active new voucher',
    editActiveNewVoucher: '[voucher] edit active new voucher',
    removeActiveNewVoucher: '[voucher] remove active new voucher',
    // VOUCHER
}