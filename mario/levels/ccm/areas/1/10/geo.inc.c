// 0x0E0004E4
const GeoLayout ccm_geo_0004E4[] = {
    GEO_CULLING_RADIUS(3500),
    GEO_OPEN_NODE(),
        GEO_RENDER_RANGE(-3000, 6000),
        GEO_OPEN_NODE(),
            GEO_DISPLAY_LIST(LAYER_OPAQUE, ccm_seg7_dl_07010660),
            GEO_DISPLAY_LIST(LAYER_ALPHA, ccm_seg7_dl_070109D0),
            GEO_DISPLAY_LIST(LAYER_TRANSPARENT, ccm_seg7_dl_07010B50),
        GEO_CLOSE_NODE(),
    GEO_CLOSE_NODE(),
    GEO_END(),
};
