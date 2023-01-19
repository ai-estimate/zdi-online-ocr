import {debounce, omit} from 'lodash';
import useStates from './useState';
import {z1MapAPI} from '@z1data/rest-api';
import * as helper from 'utils/helpers';
import {useAppDispatch} from '@redux/hooks';
import {setBoundaryCenter, reset} from '@redux/reducers/boundaryCenterSlice';

type IProps = {
  map: any;
};
let oldSource: any = {};
let pingMarker: any;

export const useSearchBase = ({map}: IProps) => {
  const dispatch = useAppDispatch();

  const [state, setState]: any = useStates({
    isFocus: false,
    loadMore: false,
    loading: false,
    results: undefined,
    pageInfo: undefined,
  });
  const filteredTags = [
    // 'village',
    // 'village_center',
    'commune_boundary',
    // 'commune_center',
    'district_boundary',
    // 'district_center',
    'province_boundary',
    // 'province_center',
  ];

  const tags = {tags: filteredTags.join(',')};

  const categories = {categories: 'landmark'};

  const newParams = {...tags, ...categories};

  const apiRequest = async (param: any = {}) => {
    const params = {per_page: 12, ...newParams, ...param};
    const {data} = await z1MapAPI.fetchPlaceTextSearch(params, (source) => {
      oldSource = source;
    });
    const results = params.q ? data.data : [];
    const pageInfo = {...params, ...omit(data, ['data'])};
    return {results, pageInfo};
  };

  const fetchingAPI = debounce(async (search: string) => {
    cancelRequest('researching');
    setState({loading: true});
    try {
      const resp: any = await apiRequest({q: search});
      setState({...resp});
    } catch (err: any) {
      if (err?.message) return;
      setState({results: [], pageInfo: {}});
    } finally {
      setState({loading: false});
    }
  }, 360);

  const fetchAPINext = async (params = {}) => {
    if (state.loadMore) return;
    cancelRequest('researching');
    setState({loadMore: true});
    const resp = await apiRequest(params);
    setState({loadMore: false});
    return resp;
  };

  const flyToMarker = (place: string) => {
    pingMarker = helper.flyToMarker(place, map);
  };

  const flytoAPlace = async ({href}: any) => {
    cancelRequest('researchingAdminPlace');
    const {
      data: {data},
    } = await z1MapAPI.fetchingPlacesByBoundary(href);
    helper.flyTo(data.center.geometry.coordinates, map);
    dispatch(setBoundaryCenter({boundary: data.boundary, center: data.center}));
  };

  const handleClearMarker = () => {
    map.z1.fire('pushRouter', {at: null});
    pingMarker && pingMarker.remove();
    dispatch(reset());
  };

  const cancelRequest = (msg = 'cancelled') => {
    oldSource?.cancel && oldSource.cancel(msg);
  };

  const handleSearch = (value: string) => {
    if (value) {
      if (helper.isLatLonText(value)) {
        setState({results: undefined, pageInfo: undefined});
        return;
      }
      fetchingAPI(value);
    } else {
      setState({results: undefined, pageInfo: undefined});
    }
  };

  const handleSubmit = async (field: any) => {
    if (helper.isLatLonText(field.search)) {
      const search = helper.stringToLocation(field.search);
      flyToMarker(search);
      setState({results: undefined, pageInfo: undefined});
      return;
    }
    handleSearch(field.search);
  };

  const handleItemSelect = (form: any, item: any) => {
    handleClearMarker();
    dispatch(reset());
    form.change('search', item.name);
    if (item && item?.href) {
      flytoAPlace(item);
      return;
    }
    item && flyToMarker(item);
  };
  const handleClickLocation = (location: string) => {
    flyToMarker(location);
  };
  const handleClearData = (form: any) => {
    form.reset();
    handleClearMarker();
    setState({results: undefined, pageInfo: undefined});
  };
  return {
    ...state,
    onSearch: handleSearch,
    onSelectedItem: handleItemSelect,
    setState,
    fetchAPINext,
    onSubmit: handleSubmit,
    onClickLocation: handleClickLocation,
    onClearData: handleClearData,
  };
};
