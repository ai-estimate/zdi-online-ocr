export interface ISelectedMapMenu {
  basemap?: boolean;
  edit?: boolean;
  snapping?: boolean;
  panAction?: 'layer' | 'move_feature' | 'mapbox' | 'pan' | 'enable_view' | '';
  formSelect?: string;
  events?: 'onEdit' | 'onDelete' | null;
}
export interface ISelectedFormLayer {
  formId: string;
  layer: Record<string, any>;
  formFilter: string[];
  formEdit: string[];
  mapsLayerId: string;
  position: number | null;
}
export interface IMapSidebar {
  action: 'layer_form' | 'change_style' | 'search_layer' | 'manage_label';
  layer?: any;
}

export enum RecoilStateKeys {
  MAP_LAYER = 'mapLayerState',
  SELECTED_MAP_MENU = 'selectedMapMenuState',
  SELECTED_DRAWING_OPTION = 'selectedDrawingOption',
  SELECTED_FUNC_LAYER = 'selectedFuncLayer',
  SELECTED_LAYER_FORM = 'selectedLayerForm',
  SELECT_FEATURE = 'selectedSelectFeatureState',
  SELECTED_MOVE_LAYER = 'selectedMoveLayerState',
  SELECTED_FORM_LAYER = 'selectedFormLayerState',
  MEDIA_UPLOADING = 'mediaUploading',
  MAP_SIDEBAR = 'mapSidebarState',
}
