function Display(props){
    return(
        <div className="messageBubble" id={props.sender}>
            <p dangerouslySetInnerHTML={{ __html: props.text }} className="response"></p>
        </div>
    );
}
export default Display