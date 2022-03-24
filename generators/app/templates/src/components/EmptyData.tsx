import React, { FC } from "react";
import { useModelState } from '@/shared/imvc';

const EmptyData: FC = ():JSX.Element => {
  const {publicPath} = useModelState()
  return <div className="component-empty-data">
    <div className="component-empty-data-icon">
      <img src={`${publicPath}/assets/image/empty.png`} alt="" />
    </div>
    <p>暂无数据</p>
  </div>
}

export default EmptyData;