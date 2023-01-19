import {isEqual} from 'lodash';
import {useEffect} from 'react';
import {usePrevious} from './usePrevious';
import useUndo from './useUndo';
export * from './useToast';

export const useShouldUpdate = (onUpdate: (props: any) => any, props: any) => {
  const oldProps = usePrevious(props);
  useEffect(() => {
    let unmount;
    if (!isEqual(props, oldProps)) {
      unmount = onUpdate(props);
    }
    return unmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, oldProps]);
};
export {usePrevious, useUndo};
