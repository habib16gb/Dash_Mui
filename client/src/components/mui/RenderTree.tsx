import { useContext } from "react";
import { inNavList } from "../../main";
import MuiNavList from "./MuiNavList";
import { DashContext, tyDashContext } from "../../App";

interface Props {
  navList: inNavList[];
}

const RenderTree = ({ navList }: Props) => {
  const { open } = useContext(DashContext) as tyDashContext;
  console.log(open);
  return (
    <div className='flex items-center gap-4 justify-start'>
      {navList.map((nav, index) => (
        <div className='capitalize ' key={index}>
          <MuiNavList nav={nav} />
          <div className={`${open && "pl-4"}`}>
            {nav.children && <RenderTree navList={nav.children} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderTree;
