
export default function CreateMsg(props) {
    const {namE, timE, bodY, statuS} = props;
    
    return (
        <div className="chat chat-end">
           
            <div className="chat-header flex items-center">
                <time className="text-xs opacity-50 ml-2">{timE}</time>
            </div>
            <div className="chat-bubble">
                {bodY}
            </div>
            <div className="chat-footer opacity-50">
                {statuS}
            </div>
        </div>
    )
}

 {/* <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={Img}/>
                </div>
            </div> */}