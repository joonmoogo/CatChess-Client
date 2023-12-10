export default function Reload() {
    function reloadHandler(event){
        console.log('Reload button was clicked');
    }
    return (
        <button onClick={reloadHandler}>Reload</button>
    )
}