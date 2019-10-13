import React, {useCallback} from 'react';
import './App.css';
import "./loader.css"
import {useDispatch, useSelector} from "react-redux";
import {State} from "./state";
import {changeContentAction, showPickerAction, updateContentAction, uploadFileAction} from "./redux";


const App: React.FC = React.memo(() => {
    const {isLoading, fileInfo, content} = useSelector((state: State) => {
        return state
    })

    const dispatch = useDispatch();

    const handleContentChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(updateContentAction(event.target.value))
        },
        [dispatch])

    console.log(process.env.REACT_APP_ONEDRIVE_CLIENT_ID)

    return (
        <div className="container">
            <header>
                <span className="fileName">{fileInfo.map(fi => fi.name).getOrElse("unnamed")}</span>
            </header>
            <div className="fileContent">

                <textarea value={content} onChange={handleContentChange}></textarea>

            </div>
            <footer>
                {isLoading ?
                    <div className="loader">
                        <Loader/>
                    </div>
                    :
                    <div className="buttons">
                        <OpenFromOneDrive clientId={process.env.ONEDRIVE_CLIENT_ID as string}/>
                        <SaveToOneDrive clientId={process.env.ONEDRIVE_CLIENT_ID as string}/>
                    </div>}
            </footer>
        </div>
    );
})

const Loader: React.FC = () => {
    return (
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

interface OneDriverPickerOptions {
    clientId: string
}

const OpenFromOneDrive: React.FC<OneDriverPickerOptions> = props => {
    const dispatch = useDispatch();


    const openFile = useCallback(
        () => dispatch(showPickerAction(props.clientId)),
        [dispatch, props.clientId])

    return (
        <button onClick={openFile}>Open file from OneDrive</button>
    )
}

const SaveToOneDrive: React.FC<OneDriverPickerOptions> = props => {
    const dispatch = useDispatch();

    const saveFile = useCallback(
        () => dispatch(uploadFileAction(props.clientId)),
        [dispatch,props.clientId] )

    return (
        <button onClick={saveFile}>Save file to OneDrive </button>
    )

}

export default App;
