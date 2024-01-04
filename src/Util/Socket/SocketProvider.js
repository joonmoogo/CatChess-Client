import { Socket } from "./Socket";


const SocketProvider = ({ children }) => {
    useEffect(() => {
        Socket.init();
    }, []);
    return (
        <div>
            {children}
        </div>
    );
};

export default SocketProvider;