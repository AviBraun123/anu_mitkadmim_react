import ChatIntro from './ChatIntro';

function ChatListResults({ chating, setChosen , setClicked }) {
    var a = [chating]
    const chatsList = chating.map((a, key) => {
        return <ChatIntro {...a.contact} setChosen={setChosen} setClicked={setClicked} key={key} />
        
    });

    return (
        <div className="dudidu">
            {chatsList}
        </div>
        );
}

export default ChatListResults;