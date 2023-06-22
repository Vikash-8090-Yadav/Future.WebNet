import { createContext,useState } from "react";
import PropTypes from 'prop-types';

export const DataContext = createContext()

const DataProvider = ({children}) =>{
    const [html,setHtml] = useState('')
    const [css,setCss] = useState('')
    const [js,setJs] = useState('')
    return (
        <DataContext.Provider value={{
            html,
            setHtml,
            css,
            setCss,
            js,
            setJs
        }}>
            {children}
        </DataContext.Provider>
    )
}
DataProvider.propTypes = {
    children: PropTypes.node.isRequired
}
export default DataProvider