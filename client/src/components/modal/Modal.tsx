import Message from "./Message"
import Settings from "./Settings"

// modal container that renders only one modal at a time ensuring only one modal is displayed at a time in the whole app
export default function Modal({name}: {name: string}) {
    return (
        <div className="absolute inset-0 z-10 bg-slate-600/50 flex items-center justify-center">
            {name === 'message' && <Message />}
            {name === 'settings' && <Settings />}
        </div>
    )
}
