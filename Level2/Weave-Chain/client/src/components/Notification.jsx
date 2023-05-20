import { useState, useEffect } from 'react'

const Notification = ({ msg, open, bgColor }) => {
    const [isOpen, setIsOpen] = useState(open)
    // const [color, setColor] = useState();

    const handleClose = () => {
        setIsOpen(false);
    }
    // useEffect(() => {
    //     setIsOpen(open);
    //     if (type === 'red') {
    //         setColor('red');
    //     }
    //     else if (type === 'green') {
    //         setColor('green');
    //     }
    // }, [type, open]);

    return (
        <div className={`fixed ${bgColor === 'red' ? 'bg-red-300' : 'bg-green-300'} rounded mt-4 shadow-sm top-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg p-4 ${isOpen ? '' : 'hidden'}`}>
            <div className="text-black rounded-md p-2 flex items-center justify-between">
                <p className="text-sm">{msg}</p>
                <button onClick={handleClose} className="text-black font-bold hover:text-blue-700 text-sm">
                    x
                </button>
            </div>
        </div>
    )
}

export default Notification
