import {connect} from 'react-redux'
import {addFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import {getConnectionStatus} from '../../../features/database/DatabaseSlice'
import {executeCypherQuery} from '../../../features/cypher/CypherSlice'
import Editor from '../presentations/Editor'
const mapStateToProps = (state)  => {
    return {
        alertList: state.alerts,
        database: state.database
    }
}


const mapDispatchToProps = { addFrame, addAlert, getConnectionStatus, executeCypherQuery }

export default connect(mapStateToProps, mapDispatchToProps)(Editor);