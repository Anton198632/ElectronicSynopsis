import { useDispatch, useSelector } from "react-redux";
import "./items-list.css";
import useDataBaseService from "../../../services/DataBaseService";

import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StyledTreeItem from './styled-tree-item';

import { setSelectedItem, setShowAddItemWindow, setItemMenuCoords, setData } from "../../../redux/actions";

export default function () {


    const {getServerAddress, getData} = useDataBaseService();

    const {items, itemsListWidth} = useSelector(state=>state);

    const dispatch = useDispatch();


    const onClickHandle = (item) => {

        dispatch(setSelectedItem(item));

        getData(item.id).then(response => {
            dispatch(setData(response.data))
        })

    }


    const buildCodeList = (childs) => {

        if (childs)
           return childs.map((child, i) => {

               return (
                   <StyledTreeItem 


                       key={child.id}
                       nodeId={`${child.id}`} labelText={child.title} 
                       children={child.childs?buildCodeList(child.childs):null}
                       labelIcon={child.icon!==""?`${getServerAddress()}/static/${child.icon}?v=${Math.random()}`:''}

                       itemId={child.id}
                       
                       onClick={e=>onClickHandle(child)}

                     
                   />
               )


           })

       return <></>

   }

    const itemsList = buildCodeList(items)


    return (

        <div className='items-list'  >

            

            <TreeView

              aria-label="gmail"
            //   defaultExpanded={['1']}
              defaultCollapseIcon={<ArrowDropDownIcon />}
              defaultExpandIcon={<ArrowRightIcon />}
              defaultEndIcon={<div style={{ width: 24 }} />}
              sx={{ height: "auto", flexGrow: 1, maxWidth: itemsListWidth, marginTop: "12px"  }}
            >

                {itemsList}
                    {/* {codeList !== null?items: <CodeListSkeleton />} */}
               

            </TreeView>


        </div>

    )

}

