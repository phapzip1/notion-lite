const BubbleToolbar = () => {
    return (
        <div className="bubble">
            <button className="bubble-btn" title="bold"><b>B</b></button>
            <button className="bubble-btn" title="italic"><i>I</i></button>
            <button className="bubble-btn" title="underline"><u>U</u></button>
            <button className="bubble-btn" title="strikeThrough"><s>S</s></button>
            <div className="bubble-sep"></div>
            <button className="bubble-btn" title="link">Link</button>
            <button className="bubble-btn" title="code">Code</button>
            <div className="bubble-sep"></div>
            <button className="bubble-btn" title="h1">Code</button>
            <button className="bubble-btn" title="h2">Code</button>
            <button className="bubble-btn" title="p">Code</button>
        </div>
    );
}

export default BubbleToolbar;
